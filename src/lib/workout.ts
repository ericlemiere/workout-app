import type { Workout } from "@/types";

export const REST_DURATION = 30;
export const GET_READY_DEFAULT = 10;
export const GET_READY_SHORT = 8;

// Spoken once on the completion screen. Pre-cached alongside the workout's
// other cues so it still speaks offline.
export const WORKOUT_COMPLETE_CUE = "Workout complete.";

// Takes just the exercise lists so buildWorkout() can call these while
// assembling a Workout, before estimatedDuration exists.
type WorkoutExercises = Pick<Workout, "warmups" | "exercises" | "cooldowns">;

// Every move the user actually performs: warmups + cooldowns + the main
// exercises with rest intervals excluded.
export function countRealExercises(workout: WorkoutExercises): number {
  return (
    workout.warmups.length +
    workout.exercises.filter((e) => !e.isRest).length +
    workout.cooldowns.length
  );
}

export function calculateWorkoutMinutes(workout: WorkoutExercises): number {
  const totalSeconds =
    countRealExercises(workout) * GET_READY_DEFAULT +
    workout.warmups.reduce((a, e) => a + e.duration, 0) +
    workout.exercises.reduce((a, e) => a + e.duration, 0) +
    workout.cooldowns.reduce((a, e) => a + e.duration, 0);

  return Math.ceil(totalSeconds / 60);
}
