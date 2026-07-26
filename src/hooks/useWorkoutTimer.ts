"use client";

import { useEffect, useRef, useState } from "react";
import { useWorkoutStore } from "@/store/workoutStore";
import { useProgressStore } from "@/store/progressStore";
import { playCountdownBeep, playGoBeep } from "@/lib/audio";
import { getRemainingMs } from "@/lib/timer";

export function useWorkoutTimer(onComplete?: () => void) {
  const next = useWorkoutStore((s) => s.next);
  const finishGetReady = useWorkoutStore((s) => s.finishGetReady);
  const isPaused = useWorkoutStore((s) => s.isPaused);
  const section = useWorkoutStore((s) => s.section);
  const isGetReady = useWorkoutStore((s) => s.isGetReady);
  const timer = useWorkoutStore((s) => s.timer);
  const workoutStartTs = useWorkoutStore((s) => s.workoutStartTs);
  const pausedDurationMs = useWorkoutStore((s) => s.pausedDurationMs);
  const pausedAt = useWorkoutStore((s) => s.pausedAt);
  const soundEnabled = useProgressStore((s) => s.settings.soundEnabled);

  const currentExercise = useWorkoutStore((s) => s.getCurrentExercise());

  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs(timer));
  const lastBeepRef = useRef<number>(-1);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    hasCompletedRef.current = false;
    lastBeepRef.current = -1;
    setRemainingMs(getRemainingMs(timer));
  }, [timer.startTs, timer.duration]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isPaused || section === "complete" || section === "intro") return;

    const interval = setInterval(() => {
      const ms = getRemainingMs(timer);
      setRemainingMs(ms);

      if (!isPaused) {
        const secs = Math.ceil(ms / 1000);
        if (secs <= 3 && secs >= 1 && secs !== lastBeepRef.current) {
          lastBeepRef.current = secs;
          if (soundEnabled) playCountdownBeep(secs);
        }
      }

      if (ms <= 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (isGetReady) {
          if (soundEnabled) playGoBeep();
          finishGetReady();
        } else {
          if (soundEnabled) playGoBeep();
          next();
        }
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [
    isPaused,
    section,
    timer,
    soundEnabled,
    isGetReady,
    next,
    onComplete,
    finishGetReady,
  ]);

  // Paused: getRemainingMs is pinned to the snapshot's pausedTs, so deriving it
  // here is both exact and stable across re-renders. Running: fall back to the
  // ticked state, which the interval keeps fresh.
  const displayedRemainingMs = isPaused ? getRemainingMs(timer) : remainingMs;

  // While paused, hold "now" at the moment of the pause so the accumulated time
  // stops. pausedDurationMs only absorbs the pause on resume, so without this
  // the clock would keep climbing on any re-render behind the pause overlay.
  const totalWorkoutElapsed = workoutStartTs
    ? Math.max(
        0,
        (isPaused && pausedAt ? pausedAt : Date.now()) -
          workoutStartTs -
          pausedDurationMs,
      )
    : 0;

  return { remainingMs: displayedRemainingMs, totalWorkoutElapsed };
}

