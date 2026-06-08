import type { Workout } from "@/types";
import { getFromCache, saveToCache } from "@/lib/ttsCache";
import { formatForGoogle } from "@/lib/ttsCorrections";

export async function preCacheWorkoutAudio(
  workout: Workout,
  voiceName: string,
): Promise<void> {
  const exercises = [
    ...workout.warmups,
    ...workout.exercises,
    ...workout.cooldowns,
  ].filter((ex) => !ex.isRest);

  const texts = exercises.flatMap((ex) =>
    ([ex.name, ex.instructions] as (string | undefined)[]).filter(
      (t): t is string => !!t,
    ),
  );

  for (const text of texts) {
    try {
      const cached = await getFromCache(text, voiceName);
      if (cached) continue;

      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: formatForGoogle(text), voiceName }),
      });
      if (!res.ok) continue;

      const blob = await res.blob();
      await saveToCache(text, voiceName, blob);

      // Throttle to avoid hitting Google TTS rate limits
      await new Promise((r) => setTimeout(r, 400));
    } catch {
      // fail silently — pre-caching is best-effort
    }
  }
}
