import type {
  CatalogExercise,
  Exercise,
  ExerciseCategory,
  MuscleTarget,
  UserLevel,
  WorkoutArea,
} from "@/types";

export const CATEGORY_TEXT_COLOR: Record<ExerciseCategory, string> = {
  "warm-up": "text-warmup",
  exercise: "text-exercise",
  "cool-down": "text-cooldown",
};

export const CATEGORY_LABEL: Record<ExerciseCategory, string> = {
  "warm-up": "Warm-Up",
  exercise: "Exercise",
  "cool-down": "Cool-Down",
};

export const EXERCISE_CATEGORIES: ExerciseCategory[] = [
  "warm-up",
  "exercise",
  "cool-down",
];

export const WORKOUT_AREAS: WorkoutArea[] = [
  "upper body",
  "lower body",
  "core",
  "full body",
];

export const USER_LEVELS: UserLevel[] = [1, 2, 3];

const AREA_BY_TARGET: Record<MuscleTarget, WorkoutArea> = {
  "upper body": "upper body",
  chest: "upper body",
  arms: "upper body",
  shoulders: "upper body",
  back: "upper body",
  "lower body": "lower body",
  legs: "lower body",
  glutes: "lower body",
  core: "core",
};

// Warm-ups and cool-downs aren't filed under a workout area the way the main
// exercises are, so infer one from the primary (first) target unless the
// exercise names its own area.
export function deriveArea(exercise: Exercise): WorkoutArea {
  if (exercise.area) return exercise.area;
  const primary = exercise.target[0];
  return primary ? AREA_BY_TARGET[primary] : "full body";
}

export function formatTargets(target: MuscleTarget[]): string {
  return target.join(" · ");
}

// An exercise with no level is used at every level, so it matches all of them.
export function matchesLevel(
  exercise: Exercise,
  level: UserLevel | null,
): boolean {
  return (
    level === null || exercise.level === undefined || exercise.level === level
  );
}

export function formatLevel(exercise: Exercise): string {
  return exercise.level ? `Level ${exercise.level}` : "All levels";
}

export interface ExerciseFilters {
  level: UserLevel | null;
  category: ExerciseCategory | null;
  area: WorkoutArea | null;
  target: MuscleTarget | null;
}

export const NO_FILTERS: ExerciseFilters = {
  level: null,
  category: null,
  area: null,
  target: null,
};

export function activeFilterCount(filters: ExerciseFilters): number {
  return Object.values(filters).filter((v) => v !== null).length;
}

export function filterExercises(
  exercises: CatalogExercise[],
  { level, category, area, target }: ExerciseFilters,
): CatalogExercise[] {
  return exercises.filter(
    (e) =>
      matchesLevel(e, level) &&
      (category === null || e.category === category) &&
      (area === null || e.area === area) &&
      (target === null || e.target.includes(target)),
  );
}
