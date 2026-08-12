"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Exercise } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExerciseRow } from "@/components/exercises/ExerciseRow";
import { ExerciseFilterBar } from "@/components/exercises/ExerciseFilterBar";
import { ExerciseModal } from "./ExerciseModal";
import { exerciseCatalog } from "@/data/exerciseCatalog";
import { filterExercises, NO_FILTERS, type ExerciseFilters } from "@/lib/exercises";
import { GrYoga } from "react-icons/gr";

export function MoovmentsScreen() {
  const [filters, setFilters] = useState<ExerciseFilters>(NO_FILTERS);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const exercises = useMemo(
    () => filterExercises(exerciseCatalog, filters),
    [filters],
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
      >
        <div className="px-4 pt-8 mb-6">
          <SectionHeader label="MOOVments" icon={<GrYoga size={20} />} />
          <p className="text-slate-500 text-sm mb-4 mx-2">
            Every move in the program, warm-ups and stretches included. Tap one
            for the details.
          </p>

          <ExerciseFilterBar
            filters={filters}
            onChange={setFilters}
            resultCount={exercises.length}
          />

          {exercises.length === 0 ? (
            <p className="text-slate-500 text-sm text-center bg-charcoal/50 rounded-2xl py-10 px-4">
              No MOOVments match those filters.
            </p>
          ) : (
            <div className="bg-charcoal/50 rounded-2xl px-4">
              {exercises.map((exercise, i) => (
                <ExerciseRow
                  key={exercise.id}
                  exercise={exercise}
                  index={i}
                  onClick={() => setSelectedExercise(exercise)}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </>
  );
}
