"use client";

import type { Exercise } from "@/types";
import { ExerciseImage } from "@/components/ui/ExercisePlaceholder";
import { SlTarget } from "react-icons/sl";
import { ModalFromBottom } from "@/components/ui/ModalFromBottom";

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
            <div className="mb-3">
              <h2 className="text-offwhite text-xl font-bold leading-snug pr-10">
                {exercise.name}
              </h2>
              <p
                className={`flex items-center text-sm capitalize mt-0.5 ${categoryColor[exercise.category] ?? "text-slate-400"}`}
              >
                <SlTarget className="inline-block mr-1" />
                {exercise.target}
              </p>
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
