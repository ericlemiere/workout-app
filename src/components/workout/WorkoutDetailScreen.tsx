"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Workout, Exercise } from "@/types";
import { ExerciseImage } from "@/components/ui/ExercisePlaceholder";
import { formatDuration } from "@/lib/timer";
import { GET_READY_SECS } from "@/lib/workout";

interface Props {
  workout: Workout;
}

const categoryColor: Record<string, string> = {
  "warm-up": "text-amber-400",
  exercise: "text-blue-400",
  "cool-down": "text-purple-400",
};

function ExerciseRow({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  if (exercise.isRest) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04 }}
        className="flex items-center justify-between gap-3 py-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-900/30 flex items-center justify-center shrink-0 text-xl">
            🧘
          </div>
          <span className="text-emerald-400 text-sm font-medium">Rest</span>
        </div>
        <span className="text-slate-500 text-xs shrink-0">
          {formatDuration(exercise.duration)}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-3 py-3 border-b border-slate-800/50 last:border-0`}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
        <ExerciseImage
          src={exercise.image[0]}
          alt=""
          className="w-full h-full"
          category={exercise.category}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-offwhite text-sm font-medium leading-snug">
          {exercise.name}
        </p>
        <p className={`text-xs ${categoryColor[exercise.category]} capitalize`}>
          {exercise.target}
        </p>
      </div>
      <span className="text-slate-500 text-xs shrink-0">
        {formatDuration(exercise.duration)}
      </span>
    </motion.div>
  );
}

export function WorkoutDetailScreen({ workout }: Props) {
  const totalRealExercises =
    workout.warmups.length +
    workout.exercises.filter((e) => !e.isRest).length +
    workout.cooldowns.length;

  const totalSeconds =
    totalRealExercises * GET_READY_SECS +
    workout.warmups.reduce((a, e) => a + e.duration, 0) +
    workout.exercises.reduce((a, e) => a + e.duration, 0) +
    workout.cooldowns.reduce((a, e) => a + e.duration, 0);
  const estimatedMinutes = Math.ceil(totalSeconds / 60);

  return (
    <div className="min-h-screen max-w-xl mx-auto pb-32 safe-top">
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
          {[
            { label: `~${estimatedMinutes}m`, icon: "⏱" },
            { label: `${totalRealExercises} moves`, icon: "💪" },
            { label: workout.tags[0] ?? "general", icon: "🎯" },
          ].map(({ label, icon }) => (
            <span
              key={label}
              className="bg-charcoal text-slate-300 text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5"
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
          <h2 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            Warm Up · {workout.warmups.length} exercises
          </h2>
          <div className="bg-charcoal/50 rounded-2xl px-4">
            {workout.warmups.map((ex, i) => (
              <ExerciseRow key={`${ex.id}-${i}`} exercise={ex} index={i} />
            ))}
          </div>
        </div>

        {/* Main exercises */}
        <div className="mb-6">
          <h2 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            Exercises · {workout.exercises.length} exercises
          </h2>
          <div className="bg-charcoal/50 rounded-2xl px-4">
            {workout.exercises.map((ex, i) => (
              <ExerciseRow key={`${ex.id}-${i}`} exercise={ex} index={i} />
            ))}
          </div>
        </div>

        {/* Cooldown */}
        <div className="mb-6">
          <h2 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">
            Cool Down · {workout.cooldowns.length} stretches
          </h2>
          <div className="bg-charcoal/50 rounded-2xl px-4">
            {workout.cooldowns.map((ex, i) => (
              <ExerciseRow key={`${ex.id}-${i}`} exercise={ex} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
