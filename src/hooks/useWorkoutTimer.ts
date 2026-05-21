"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useWorkoutStore } from "@/store/workoutStore";
import { useProgressStore } from "@/store/progressStore";
import { playCountdownBeep, playGoBeep, playRestBeep } from "@/lib/audio";
import { getRemainingMs } from "@/lib/timer";

export function useWorkoutTimer(onComplete?: () => void) {
  const next = useWorkoutStore((s) => s.next);
  const finishGetReady = useWorkoutStore((s) => s.finishGetReady);
  const isPaused = useWorkoutStore((s) => s.isPaused);
  const section = useWorkoutStore((s) => s.section);
  const isGetReady = useWorkoutStore((s) => s.isGetReady);
  const timer = useWorkoutStore((s) => s.timer);
  const workoutStartTs = useWorkoutStore((s) => s.workoutStartTs);
  const soundEnabled = useProgressStore((s) => s.settings.soundEnabled);
  const autoAdvance = useProgressStore((s) => s.settings.autoAdvance);

  const currentExercise = useWorkoutStore((s) => s.getCurrentExercise());

  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs(timer));
  const lastBeepRef = useRef<number>(-1);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    hasCompletedRef.current = false;
    lastBeepRef.current = -1;
    setRemainingMs(getRemainingMs(timer));
    let restBeepTimeout: ReturnType<typeof setTimeout> | undefined;
    if (soundEnabled && !isGetReady && currentExercise?.isRest) {
      restBeepTimeout = setTimeout(() => playRestBeep(), 500);
    }
    return () => clearTimeout(restBeepTimeout);
  }, [timer.startTs, timer.duration]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isPaused || section === "complete" || section === "intro") return;

    const interval = setInterval(() => {
      const ms = getRemainingMs(timer);
      setRemainingMs(ms);

      if (soundEnabled && !isPaused) {
        const secs = Math.ceil(ms / 1000);
        if (secs <= 3 && secs >= 1 && secs !== lastBeepRef.current) {
          lastBeepRef.current = secs;
          playCountdownBeep(secs);
        }
      }

      if (ms <= 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        if (isGetReady) {
          if (soundEnabled) playGoBeep();
          finishGetReady();
        } else {
          if (soundEnabled) playGoBeep();
          if (autoAdvance) next();
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
    autoAdvance,
    isGetReady,
    next,
    onComplete,
    finishGetReady,
  ]);

  const totalWorkoutElapsed = workoutStartTs ? Date.now() - workoutStartTs : 0;

  return { remainingMs, totalWorkoutElapsed };
}

export function useVibration() {
  return useCallback((pattern: number | number[] = 50) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);
}
