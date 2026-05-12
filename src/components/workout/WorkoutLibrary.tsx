"use client";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Workout } from "@/types";
import { useProgressStore } from "@/store/progressStore";

interface Props {
  workouts: Workout[];
}

const tagColor: Record<string, string> = {
  "lower body": "bg-cat-lower/15 border-cat-lower/25",
  "upper body": "bg-cat-upper/15 border-cat-upper/25",
  core: "bg-cat-core/15 border-cat-core/25",
  "full body": "bg-cat-full/15 border-cat-full/25",
};

const tagTextColor: Record<string, string> = {
  "lower body": "text-cat-lower",
  "upper body": "text-cat-upper",
  core: "text-cat-core",
  "full body": "text-cat-full",
};

function focusTag(tags: string[]): string {
  const order = ["lower body", "upper body", "core", "full body"];
  return order.find((t) => tags.includes(t)) ?? tags[0] ?? "";
}

export function WorkoutLibrary({ workouts }: Props) {
  const completed = useProgressStore((s) => s.completed);
  const streak = useProgressStore((s) => s.streak);
  const cycleStartedAt = useProgressStore((s) => s.cycleStartedAt);

  const completedIds = useMemo(
    () =>
      new Set(
        completed
          .filter((c) => !cycleStartedAt || c.completedAt >= cycleStartedAt)
          .map((c) => c.workoutId),
      ),
    [completed, cycleStartedAt],
  );

  return (
    <div className="min-h-screen pb-28 safe-top">
      {/* Header */}
      <div className="p-0">
        <div className="w-full overflow-hidden relative">
          <Image
            src="/header-image.png"
            alt="Lunar Gravity Logo"
            width={850}
            height={289}
            className="w-full h-auto"
            loading="eager"
          />

          {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent via-70% to-navy" /> */}
        </div>
        <h1 className="sr-only">Lunar Gravity</h1>
      </div>

      {/* Stats row */}

      <div className="mb-5">
        <div className="border-t border-b border-lime/30 p-2 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-offwhite text-xl font-bold">
              {completed.length}
            </div>
            <div className="text-slate-300 text-xs mt-0.5">completed</div>
          </div>

          <div className="text-center">
            <div className="text-offwhite text-xl font-bold">
              {streak.currentStreak}
            </div>
            <div className="text-slate-300 text-xs mt-0.5">day streak</div>
          </div>
          <div className="text-center">
            <div className="text-offwhite text-xl font-bold">
              {streak.longestStreak}
            </div>
            <div className="text-slate-300 text-xs mt-0.5">best streak</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 mb-2 grid grid-cols-4 justify-center gap-2">
        {Object.entries(tagTextColor).map(([tag, color]) => (
          <div
            key={tag}
            className="flex items-center gap-1.5 w-full text-center justify-center"
          >
            <span className={`text-xs capitalize ${color}`}>{tag}</span>
          </div>
        ))}
      </div>

      {/* Workout grid */}
      <div className="px-4 grid grid-cols-4 gap-3">
        {workouts.map((workout, i) => {
          const num = i + 1;
          const done = completedIds.has(workout.id);
          const focus = focusTag(workout.tags);
          const bg = tagColor[focus] ?? "bg-slate-800/60 border-slate-700/50";
          const tc = tagTextColor[focus] ?? "text-slate-400";

          return (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.025, duration: 0.25 }}
              whileTap={{ scale: 0.93 }}
            >
              <Link href={`/workout/${workout.id}`} className="block">
                <div
                  className={`aspect-square rounded border flex flex-col items-center justify-center relative ${done ? "bg-gray-800" : bg}`}
                >
                  <span className={`text-4xl font-bold text-shadow-2xl ${tc}`}>
                    {num}
                  </span>
                  {done && (
                    <div className="absolute opacity-50 top-0 left-0 w-full h-full rounded flex items-center justify-center">
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        className="w-28 h-28"
                      >
                        <defs>
                          <filter
                            id="checkShadow"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                          >
                            <feDropShadow
                              dx="0"
                              dy="0.3"
                              stdDeviation="0.4"
                              floodColor="black"
                              floodOpacity="1"
                            />
                          </filter>
                        </defs>

                        <path
                          d="M2 5l2 2 4-4"
                          stroke="white"
                          strokeWidth="1"
                          filter="url(#checkShadow)"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
