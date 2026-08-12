"use client";

import { motion } from "framer-motion";
import type { Exercise } from "@/types";
import { ExerciseImage } from "@/components/ui/ExercisePlaceholder";
import { formatDuration } from "@/lib/timer";
import { CATEGORY_TEXT_COLOR, formatTargets } from "@/lib/exercises";

interface Props {
  exercise: Exercise;
  index: number;
  onClick?: () => void;
}

// Cap the stagger so long lists don't animate in for several seconds.
const MAX_STAGGERED_ROWS = 12;

export function ExerciseRow({ exercise, index, onClick }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index, MAX_STAGGERED_ROWS) * 0.04 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 border-b border-slate-800/50 last:border-0 text-left active:bg-slate-800/30 rounded-lg"
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
        <ExerciseImage
          src={exercise.image?.[0] ?? ""}
          alt=""
          className="w-full h-full"
          category={exercise.category}
          isRest={exercise.isRest}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`${exercise.isRest ? "text-rest" : "text-offwhite"} text-sm font-medium leading-snug`}
        >
          {exercise.name}
        </p>
        {!exercise.isRest && (
          <p
            className={`text-xs ${CATEGORY_TEXT_COLOR[exercise.category]} capitalize`}
          >
            {formatTargets(exercise.target)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-slate-500 text-xs">
          {formatDuration(exercise.duration)}
        </span>
      </div>
    </motion.button>
  );
}
