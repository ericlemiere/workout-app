"use client";

import type { Exercise } from "@/types";
import { ExerciseImage } from "@/components/ui/ExercisePlaceholder";
import { SlTarget } from "react-icons/sl";
import { ModalFromBottom } from "@/components/workout/ModalFromBottom";

interface Props {
  exercise: Exercise | null;
  onClose: () => void;
}

const categoryColor: Record<string, string> = {
  "warm-up": "text-lime",
  exercise: "text-blue-400",
  "cool-down": "text-purple-400",
};

export function ExerciseModal({ exercise, onClose }: Props) {
  return (
    <ModalFromBottom open={!!exercise} onClose={onClose}>
      {exercise && (
        <>
          <div className="px-5 pt-4 pb-8">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-offwhite text-xl font-bold leading-snug">
                  {exercise.name}
                </h2>
                <p
                  className={`flex items-center text-sm capitalize mt-0.5 ${categoryColor[exercise.category] ?? "text-slate-400"}`}
                >
                  <SlTarget className="inline-block mr-1" />
                  {exercise.target}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="w-4 h-4 text-slate-300"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {exercise.instructions && (
              <p className="text-slate-300 text-sm leading-relaxed">
                {exercise.instructions}
              </p>
            )}
          </div>
          <div className="h-52 w-full overflow-hidden">
            <ExerciseImage
              src={exercise.image?.[0] ?? ""}
              alt={exercise.name}
              className="w-full h-full"
              category={exercise.category}
            />
          </div>
        </>
      )}
    </ModalFromBottom>
  );
}
