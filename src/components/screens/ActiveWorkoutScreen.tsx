"use client";

import { useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkoutStore } from "@/store/workoutStore";
import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { useWorkoutTimer } from "@/hooks/useWorkoutTimer";
import { useWakeLock } from "@/hooks/useWakeLock";
import { CircularTimer } from "@/components/ui/CircularTimer";
import { ExerciseImage } from "@/components/ui/ExercisePlaceholder";
import { formatTime, getProgress } from "@/lib/timer";
import { ensureAudioContextResumed } from "@/lib/audio";
import { calculateWorkoutMinutes } from "@/lib/workout";
import { buildWorkout } from "@/lib/difficulty";
import type { WorkoutTemplate } from "@/types";

interface Props {
  workoutId: string;
  template: WorkoutTemplate;
}

const sectionLabel: Record<string, string> = {
  intro: "Get Ready",
  warmup: "Warm Up",
  exercise: "Exercise",
  rest: "Rest",
  cooldown: "Cool Down",
  complete: "Done!",
};

const sectionColor: Record<string, string> = {
  warmup: "text-warmup",
  exercise: "text-exercise",
  rest: "text-rest",
  cooldown: "text-cooldown",
  intro: "text-slate-400",
  complete: "text-lime",
};

export function ActiveWorkoutScreen({ workoutId, template }: Props) {
  const router = useRouter();
  const level = useUserStore((s) => s.level);
  const builtWorkout = useMemo(
    () => buildWorkout(template, level),
    [template, level],
  );
  const hasStartedRef = useRef(false);

  const section = useWorkoutStore((s) => s.section);
  const exerciseIndex = useWorkoutStore((s) => s.exerciseIndex);
  const isGetReady = useWorkoutStore((s) => s.isGetReady);
  const isPaused = useWorkoutStore((s) => s.isPaused);
  const timer = useWorkoutStore((s) => s.timer);
  const workoutStartTs = useWorkoutStore((s) => s.workoutStartTs);

  const startWorkout = useWorkoutStore((s) => s.startWorkout);
  const beginSession = useWorkoutStore((s) => s.beginSession);
  const pauseWorkout = useWorkoutStore((s) => s.pauseWorkout);
  const resumeWorkout = useWorkoutStore((s) => s.resumeWorkout);
  const next = useWorkoutStore((s) => s.next);
  const prev = useWorkoutStore((s) => s.prev);
  const skip = useWorkoutStore((s) => s.skip);
  const getCurrentExercise = useWorkoutStore((s) => s.getCurrentExercise);
  const getNextExercise = useWorkoutStore((s) => s.getNextExercise);
  const getTotalExerciseCount = useWorkoutStore((s) => s.getTotalExerciseCount);
  const getOverallExerciseNumber = useWorkoutStore(
    (s) => s.getOverallExerciseNumber,
  );
  const recordCompletion = useProgressStore((s) => s.recordCompletion);

  useWakeLock(section !== "complete" && section !== "intro");

  // Initialize workout on mount — build from template + user level
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startWorkout(buildWorkout(template, level));
    }
  }, [template, level, startWorkout]);

  // Navigate to complete page when done
  useEffect(() => {
    if (section === "complete") {
      const durationMs = workoutStartTs ? Date.now() - workoutStartTs : 0;
      recordCompletion(workoutId, durationMs, level);
      router.replace(`/workout/${workoutId}/complete`);
    }
  }, [section, workoutId, workoutStartTs, recordCompletion, router]);

  const { remainingMs, totalWorkoutElapsed } = useWorkoutTimer();
  const progress = getProgress(timer);

  const currentExercise = getCurrentExercise();
  const nextExercise = getNextExercise();
  const totalCount = getTotalExerciseCount();
  const overallNumber = getOverallExerciseNumber();

  const handlePauseResume = useCallback(async () => {
    await ensureAudioContextResumed();
    if (isPaused) resumeWorkout();
    else pauseWorkout();
  }, [isPaused, pauseWorkout, resumeWorkout]);

  const handleSkip = useCallback(() => {
    skip();
  }, [skip]);

  const handlePrev = useCallback(() => {
    prev();
  }, [prev]);

  const handleBegin = useCallback(async () => {
    await ensureAudioContextResumed();
    beginSession();
  }, [beginSession]);

  // ─── Intro Screen ──────────────────────────────────────────────────────────
  if (section === "intro") {
    return (
      <div className="fixed max-w-xl mx-auto inset-0 bg-navy flex flex-col items-center justify-center px-6 safe-top safe-bottom">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-charcoal/80 flex items-center justify-center active:bg-charcoal"
          style={{ marginTop: "env(safe-area-inset-top)" }}
          aria-label="Back"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-offwhite"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <img
            src={template.coverImage}
            alt={template.name}
            className="w-24 h-24 rounded-2xl object-cover mb-6 mx-auto"
          />
          <h1 className="text-offwhite text-3xl font-bold mb-2">
            {template.name}
          </h1>
          <p className="text-slate-400 mb-2">
            {template.warmups.length} warmups ·{" "}
            {builtWorkout.exercises.filter((e) => !e.isRest).length} exercises ·{" "}
            {template.cooldowns.length} stretches
          </p>
          <p className="text-slate-500 text-sm mb-10">
            {calculateWorkoutMinutes(builtWorkout)} minutes
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleBegin}
            className="bg-lime text-navy font-bold text-xl px-12 py-5 rounded-2xl w-full max-w-xs active:bg-lime-dim"
          >
            Let's MOOV!
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const isRest = currentExercise?.isRest ?? false;
  const displaySection = isRest ? "rest" : section;
  const exercise = isRest ? null : currentExercise;

  return (
    <div className="fixed max-w-xl mx-auto inset-0 bg-navy flex flex-col safe-top safe-bottom">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 shrink-0">
        <div className="flex items-center gap-2 w-20">
          <span className="text-lime text-lg tabular-nums">
            {overallNumber}/{totalCount}
          </span>
        </div>
        <div className="flex items-center justify-center flex-1">
          <span
            className={`text-lg font-bold uppercase tracking-widest ${sectionColor[displaySection]}`}
          >
            {sectionLabel[displaySection]}
          </span>
        </div>
        <div className="flex items-center justify-end w-20">
          <span className="text-lime text-lg tabular-nums">
            {formatTime(totalWorkoutElapsed)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-charcoal mx-4 rounded-full shrink-0">
        <motion.div
          className="h-full bg-lime rounded-full"
          style={{ width: `${(overallNumber / totalCount) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Exercise image */}
      <div
        className="relative mx-4 mt-3 rounded-2xl overflow-hidden shrink-0"
        style={{ height: 220 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${section}-${exerciseIndex}-${isRest}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {isRest ? (
              <div className="w-full h-full bg-linear-to-br from-rest/20 to-white/20 flex flex-col items-center justify-center">
                <span className="text-6xl mb-3">🧘</span>
                <p className="text-rest font-semibold text-lg">Take a breath</p>
              </div>
            ) : (
              <ExerciseImage
                src={exercise?.image[0] ?? ""}
                alt={exercise?.name ?? ""}
                className="w-full h-full"
                category={exercise?.category}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Exercise name */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`name-${section}-${exerciseIndex}-${isRest}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="px-4 mt-3 shrink-0"
        >
          <h2 className="text-offwhite text-4xl font-bold leading-snug">
            {isRest ? "Rest" : (exercise?.name ?? "")}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* Timer — central focus */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <CircularTimer
          progress={progress}
          remainingMs={remainingMs}
          size={160}
          strokeWidth={5}
          isRest={isRest}
        />
      </div>

      {/* Next up */}
      <div className="px-4 pb-1 shrink-0 min-h-9">
        {isGetReady && (
          <motion.p
            key={`get-ready-${section}-${exerciseIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lime text-xl"
          >
            <span className="uppercase font-bold tracking-widest animate-pulse">
              Get Ready
            </span>
          </motion.p>
        )}
        {nextExercise && !isGetReady && (
          <motion.p
            key={`next-${section}-${exerciseIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-300 text-xl"
          >
            <span className="text-slate-500">Next →</span>{" "}
            <span
              className={
                nextExercise.isRest ? "text-electric-green" : "text-slate-400"
              }
            >
              {nextExercise.isRest ? "Rest" : nextExercise.name}
            </span>
          </motion.p>
        )}
      </div>

      {/* Controls */}
      <div className="px-6 pb-6 pt-2 shrink-0 relative">
        <div className="flex items-center justify-between gap-4">
          {/* Prev */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center active:bg-slate-700"
            aria-label="Previous"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-slate-300"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </motion.button>

          {/* Pause / Resume */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handlePauseResume}
            className="flex-1 h-14 rounded-2xl bg-lime flex items-center justify-center gap-2 active:bg-lime-dim z-20"
            aria-label={isPaused ? "Resume" : "Pause"}
          >
            <AnimatePresence mode="wait">
              {isPaused ? (
                <motion.div
                  key="resume"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 text-charcoal"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-charcoal font-semibold text-lg">
                    Resume
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="pause"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 text-charcoal"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  <span className="text-charcoal font-semibold text-lg">
                    Pause
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Skip */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSkip}
            className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center active:bg-slate-700"
            aria-label="Skip"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-slate-300"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Pause overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-navy/90 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <button
              onClick={() => {
                router.replace(`/workout/${workoutId}`);
              }}
              className="pointer-events-auto w-60 m-auto h-16 text-slate-300 text-lg font-semibold rounded-2xl border border-lime flex items-center justify-center gap-2"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5.5 h-5.5 text-lime"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
              </svg>
              End Workout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
