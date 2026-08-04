import type { Workout, WorkoutTemplate } from "@/types";
import { buildWorkout } from "@/lib/difficulty";
import { lowerBodyTemplates } from "./workoutsLowerBody";
import { upperBodyTemplates } from "./workoutsUpperBody";
import { coreTemplates } from "./workoutsCore";
import { fullBodyTemplates } from "./workoutsFullBody";

// Interleave the four categories: Lower Body · Upper Body · Core · Full Body
export const workoutTemplates: WorkoutTemplate[] = Array.from(
  { length: 7 },
  (_, i) => [
    lowerBodyTemplates[i],
    upperBodyTemplates[i],
    coreTemplates[i],
    fullBodyTemplates[i],
  ],
).flat();

export function getWorkoutTemplateById(
  id: string,
): WorkoutTemplate | undefined {
  return workoutTemplates.find((t) => t.id === id);
}

// Level-1 builds for any code that still needs a Workout object directly
export const workouts: Workout[] = workoutTemplates.map((t) =>
  buildWorkout(t, 1),
);

export function getWorkoutById(id: string): Workout | undefined {
  const t = getWorkoutTemplateById(id);
  return t ? buildWorkout(t, 1) : undefined;
}
