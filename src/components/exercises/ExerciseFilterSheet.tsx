"use client";

import type { ExerciseCategory, MuscleTarget, UserLevel, WorkoutArea } from "@/types";
import { ModalFromBottom } from "@/components/ui/ModalFromBottom";
import { FilterChipGroup } from "./FilterChipGroup";
import { catalogTargets } from "@/data/exerciseCatalog";
import {
  activeFilterCount,
  CATEGORY_LABEL,
  EXERCISE_CATEGORIES,
  NO_FILTERS,
  USER_LEVELS,
  WORKOUT_AREAS,
  type ExerciseFilters,
} from "@/lib/exercises";

interface Props {
  open: boolean;
  onClose: () => void;
  filters: ExerciseFilters;
  onChange: (filters: ExerciseFilters) => void;
  resultCount: number;
}

const levelOptions = USER_LEVELS.map((level) => ({
  value: level,
  label: `Level ${level}`,
}));

const categoryOptions = EXERCISE_CATEGORIES.map((category) => ({
  value: category,
  label: CATEGORY_LABEL[category],
}));

const areaOptions = WORKOUT_AREAS.map((area) => ({ value: area, label: area }));

const targetOptions = catalogTargets.map((target) => ({
  value: target,
  label: target,
}));

export function ExerciseFilterSheet({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
}: Props) {
  const count = activeFilterCount(filters);

  return (
    <ModalFromBottom open={open} onClose={onClose}>
      <div className="px-5 pt-5 pb-8 space-y-5">
        <h2 className="text-offwhite text-xl font-bold pr-10">Filters</h2>

        <FilterChipGroup<UserLevel>
          label="Level"
          value={filters.level}
          options={levelOptions}
          onChange={(level) => onChange({ ...filters, level })}
        />
        <FilterChipGroup<ExerciseCategory>
          label="Type"
          value={filters.category}
          options={categoryOptions}
          onChange={(category) => onChange({ ...filters, category })}
        />
        <FilterChipGroup<WorkoutArea>
          label="Workout Area"
          value={filters.area}
          options={areaOptions}
          onChange={(area) => onChange({ ...filters, area })}
        />
        <FilterChipGroup<MuscleTarget>
          label="Target Area"
          value={filters.target}
          options={targetOptions}
          onChange={(target) => onChange({ ...filters, target })}
        />

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={() => onChange(NO_FILTERS)}
            disabled={count === 0}
            className="shrink-0 px-4 py-3 rounded-2xl text-sm font-semibold bg-slate-700 text-slate-200 active:bg-slate-600 disabled:opacity-40"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-lime text-navy font-bold active:bg-lime-dim"
          >
            Show {resultCount}{" "}
            {resultCount === 1 ? "MOOVment" : "MOOVments"}
          </button>
        </div>
      </div>
    </ModalFromBottom>
  );
}
