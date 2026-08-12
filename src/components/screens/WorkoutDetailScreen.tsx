"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { WorkoutTemplate, Exercise } from "@/types";
import { ExerciseImage } from "@/components/ui/ExercisePlaceholder";
import { ExerciseModal } from "./ExerciseModal";
import { ExerciseRow } from "@/components/exercises/ExerciseRow";
import { buildWorkout } from "@/lib/difficulty";
import { countRealExercises } from "@/lib/workout";
import { useUserStore } from "@/store/userStore";
import { useProgressStore } from "@/store/progressStore";
import { preCacheWorkoutAudio } from "@/lib/preCacheAudio";
import { MdOutlineTimer } from "react-icons/md";
import { SlTarget } from "react-icons/sl";
import { GrYoga } from "react-icons/gr";

interface Props {
  template: WorkoutTemplate;
}

export function WorkoutDetailScreen({ template }: Props) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const level = useUserStore((s) => s.level);
  const setLevel = useUserStore((s) => s.setLevel);
  const voiceName = useUserStore((s) => s.voiceName);
  const voiceCuesEnabled = useProgressStore((s) => s.settings.voiceCuesEnabled);
  const workout = useMemo(
    () => buildWorkout(template, level),
    [template, level],
  );

  useEffect(() => {
    if (!voiceCuesEnabled) return;
    const controller = new AbortController();
    preCacheWorkoutAudio(workout, voiceName, { signal: controller.signal });

    return () => controller.abort();
  }, [workout, voiceName, voiceCuesEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalRealExercises = countRealExercises(workout);
  const estimatedMinutes = workout.estimatedDuration;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen max-w-xl mx-auto pb-32 safe-top"
      >
        {/* Hero */}
        <div className="relative h-56">
          <ExerciseImage
            src={workout.coverImage ?? ""}
            alt={workout.name}
            className="w-full h-full"
            category="exercise"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Back button */}
          <Link
            href="/"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-sm flex items-center justify-center"
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
          </Link>
        </div>

        <div className="px-4 -mt-6 relative z-10">
          {/* Title block */}
          <div className="mb-5">
            <h1 className="text-offwhite text-3xl font-bold mb-1">
              {workout.name}
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Stats pills */}
          <div className="flex gap-2 flex-wrap mb-6">
            {/* Level */}
            <div className="bg-charcoal text-slate-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="tracking-widest text-xs text-lime font-bold mt-px">
                LVL
              </span>
              <span className="">{level}</span>
            </div>

            {[
              {
                label: `${estimatedMinutes}m`,
                icon: <MdOutlineTimer color="#b7e63b" />,
              },
              {
                label: `${totalRealExercises} moves`,
                icon: <GrYoga color="#b7e63b" />,
              },
              {
                label: workout.tags[0] ?? "general",
                icon: <SlTarget color="#b7e63b" />,
              },
            ].map(({ label, icon }) => (
              <span
                key={label}
                className="bg-charcoal text-slate-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <span>{icon}</span>
                <span className="capitalize">{label}</span>
              </span>
            ))}
          </div>

          {/* Start button */}
          <Link href={`/workout/${workout.id}/active`}>
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="bg-lime text-navy font-bold text-xl text-center py-5 rounded-2xl mb-8 active:bg-lime-dim"
            >
              Start Workout
            </motion.div>
          </Link>

          {/* Warmup section */}
          <div className="mb-6">
            <h2 className="text-warmup text-xs font-bold uppercase tracking-widest mb-3">
              Warm Up · {workout.warmups.length} exercises
            </h2>
            <div className="bg-charcoal/50 rounded-2xl px-4">
              {workout.warmups.map((ex, i) => (
                <ExerciseRow
                  key={`${ex.id}-${i}`}
                  exercise={ex}
                  index={i}
                  onClick={() => setSelectedExercise(ex)}
                />
              ))}
            </div>
          </div>

          {/* Main exercises */}
          <div className="mb-6">
            <h2 className="text-exercise text-xs font-bold uppercase tracking-widest mb-3">
              Exercises · {workout.exercises.filter((e) => !e.isRest).length}{" "}
              exercises + rest
            </h2>
            <div className="bg-charcoal/50 rounded-2xl px-4">
              {workout.exercises.map((ex, i) => (
                <ExerciseRow
                  key={`${ex.id}-${i}`}
                  exercise={ex}
                  index={i}
                  onClick={
                    ex.isRest ? undefined : () => setSelectedExercise(ex)
                  }
                />
              ))}
            </div>
          </div>

          {/* Cooldown */}
          <div className="mb-6">
            <h2 className="text-cooldown text-xs font-bold uppercase tracking-widest mb-3">
              Cool Down · {workout.cooldowns.length} stretches
            </h2>
            <div className="bg-charcoal/50 rounded-2xl px-4">
              {workout.cooldowns.map((ex, i) => (
                <ExerciseRow
                  key={`${ex.id}-${i}`}
                  exercise={ex}
                  index={i}
                  onClick={() => setSelectedExercise(ex)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </>
  );
}
