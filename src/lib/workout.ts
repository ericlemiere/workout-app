import type { Workout } from "@/types";

export const REST_DURATION = 30;
export const GET_READY_DEFAULT = 10;
export const GET_READY_SHORT = 8;

// Spoken once on the completion screen. Pre-cached alongside the workout's
// other cues so it still speaks offline.
export const WORKOUT_COMPLETE_CUE = "Workout complete";

export function calculateWorkoutMinutes(workout: Workout): number {
  const realExerciseCount =
    workout.warmups.length +
    workout.exercises.filter((e) => !e.isRest).length +
    workout.cooldowns.length;

  const totalSeconds =
    realExerciseCount * GET_READY_DEFAULT +
    workout.warmups.reduce((a, e) => a + e.duration, 0) +
    workout.exercises.reduce((a, e) => a + e.duration, 0) +
    workout.cooldowns.reduce((a, e) => a + e.duration, 0);

  return Math.ceil(totalSeconds / 60);
}
