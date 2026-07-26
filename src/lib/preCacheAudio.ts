import type { Workout } from "@/types";
import { getFromCache, saveToCache } from "@/lib/ttsCache";
import { formatForGoogle } from "@/lib/ttsCorrections";
import { WORKOUT_COMPLETE_CUE } from "@/lib/workout";

export async function preCacheWorkoutAudio(
  workout: Workout,
  voiceName: string,
  options?: { signal?: AbortSignal },
): Promise<void> {
  const signal = options?.signal;

  const exercises = [
    ...workout.warmups,
    ...workout.exercises,
    ...workout.cooldowns,
  ].filter((ex) => !ex.isRest);

  const texts = [
    ...exercises.flatMap((ex) =>
      ([ex.name, ex.instructions] as (string | undefined)[]).filter(
        (t): t is string => !!t,
      ),
    ),
    WORKOUT_COMPLETE_CUE,
  ];

  for (const text of texts) {
    if (signal?.aborted) return;
    const cloudText = formatForGoogle(text);

    try {
      const cached = await getFromCache(cloudText, voiceName);
      if (cached) continue;

      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cloudText, voiceName }),
        signal,
      });
      if (!res.ok) {
        // Stop pre-caching when cloud TTS is currently unavailable.
        if (res.status === 400 || res.status === 429) return;
        continue;
      }

      const blob = await res.blob();
      await saveToCache(cloudText, voiceName, blob);

      // Throttle to avoid hitting Google TTS rate limits
      await new Promise((r) => setTimeout(r, 400));
    } catch (err) {
      if (
        err instanceof DOMException &&
        (err.name === "AbortError" || err.name === "TimeoutError")
      ) {
        return;
      }

      // fail silently — pre-caching is best-effort
    }
  }
}
