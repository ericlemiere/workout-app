import type { CatalogExercise, Exercise, MuscleTarget, WorkoutArea } from "@/types";
import { deriveArea } from "@/lib/exercises";
import * as core from "./exercisesCore";
import * as upperBody from "./exercisesUpperBody";
import * as lowerBody from "./exercisesLowerBody";
import * as fullBody from "./exercisesFullBody";
import * as warmUps from "./warmUps";
import * as coolDowns from "./coolDowns";

type ExerciseModule = Record<string, unknown>;

function isExercise(value: unknown): value is Exercise {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const e = value as Partial<Exercise>;
  return (
    typeof e.id === "string" &&
    typeof e.name === "string" &&
    typeof e.duration === "number" &&
    Array.isArray(e.target)
  );
}

// Reads whatever a data module exports instead of a hand-maintained list, so a
// new exercise appears in the catalog the moment it's added to a data file.
// Warm-ups and cool-downs have no module-wide area — theirs is derived.
function collect(
  exerciseModule: ExerciseModule,
  moduleArea?: WorkoutArea,
): CatalogExercise[] {
  return Object.values(exerciseModule)
    .filter(isExercise)
    .map((e) => ({
      ...e,
      name: e.name.trim(),
      area: e.area ?? moduleArea ?? deriveArea(e),
    }));
}

function dedupeById(exercises: CatalogExercise[]): CatalogExercise[] {
  const byId = new Map<string, CatalogExercise>();
  for (const e of exercises) {
    if (!byId.has(e.id)) byId.set(e.id, e);
  }
  return [...byId.values()];
}

export const exerciseCatalog: CatalogExercise[] = dedupeById([
  ...collect(core, "core"),
  ...collect(upperBody, "upper body"),
  ...collect(lowerBody, "lower body"),
  ...collect(fullBody, "full body"),
  ...collect(warmUps),
  ...collect(coolDowns),
]).sort((a, b) => a.name.localeCompare(b.name));

// Every target actually used by an exercise, so the filter never offers a
// muscle with no matches behind it.
export const catalogTargets: MuscleTarget[] = [
  ...new Set(exerciseCatalog.flatMap((e) => e.target)),
].sort((a, b) => a.localeCompare(b));
