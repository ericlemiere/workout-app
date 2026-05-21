"use client";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Workout } from "@/types";
import { useProgressStore } from "@/store/progressStore";
import { MoonIcon } from "@/lib/moonIcon";
import { IoFlame } from "react-icons/io5";
import { CycleCompleteScreen } from "@/components/workout/CycleCompleteScreen";

interface Props {
  workouts: Workout[];
}

const tagColor: Record<string, string> = {
  "lower body": "border-electric-cyan/55",
  "upper body": "border-electric-green/55",
  core: "border-electric-violet/55",
  "full body": "border-lime/55",
};

const tagTextColor: Record<string, string> = {
  "lower body": "text-electric-cyan",
  "upper body": "text-electric-green",
  core: "text-electric-violet",
  "full body": "text-lime",
};

function focusTag(tags: string[]): string {
  const order = ["lower body", "upper body", "core", "full body"];
  return order.find((t) => tags.includes(t)) ?? tags[0] ?? "";
}

const DAYS_IN_CYCLE = 28;

export function WorkoutLibrary({ workouts }: Props) {
  const completed = useProgressStore((s) => s.completed);
  const streak = useProgressStore((s) => s.streak);
  const cycleStartedAt = useProgressStore((s) => s.cycleStartedAt);
  const cycleCompleteAcknowledged = useProgressStore(
    (s) => s.cycleCompleteAcknowledged,
  );
  const resetGrid = useProgressStore((s) => s.resetGrid);

  const completedIds = useMemo(
    () =>
      new Set(
        completed
          .filter((c) => !cycleStartedAt || c.completedAt >= cycleStartedAt)
          .map((c) => c.workoutId),
      ),
    [completed, cycleStartedAt],
  );

  const cycleDone = completedIds.size >= workouts.length && workouts.length > 0;

  const isLunarCycle = useMemo(() => {
    if (!cycleStartedAt) return false;
    const elapsed = Date.now() - new Date(cycleStartedAt).getTime();
    return elapsed <= DAYS_IN_CYCLE * 24 * 60 * 60 * 1000;
  }, [cycleStartedAt]);

  const showCycleComplete = cycleDone && !cycleCompleteAcknowledged;

  return (
    <>
      <AnimatePresence>
        {showCycleComplete && (
          <CycleCompleteScreen isLunarCycle={isLunarCycle} />
        )}
      </AnimatePresence>

      <div className="min-h-screen max-w-xl mx-auto bg-navy pb-28 safe-top">
        {/* Header */}
        <div className="py-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full overflow-hidden relative"
          >
            <Image
              src="/moov-logo-transparent.png"
              alt="MOOV Logo"
              width={850}
              height={289}
              className="w-full h-auto"
              loading="eager"
            />
          </motion.div>
          <h1 className="sr-only">MOOV Exercise App</h1>
        </div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex w-full justify-center bg-charcoal/50 mb-5 px-4.5 py-1.5 border-y border-lime/30"
        >
          <IoFlame size={24} className="text-lime mr-1" />
          <div className="w-fit border-lime/30 flex items-center justify-center gap-2">
            <span className="text-slate-300 text-xs">Current Streak:</span>
            <span className="text-offwhite font-orbitron text-xl font-bold">
              {streak.currentStreak}
            </span>
            <span className="text-slate-300 text-xs">
              {streak.currentStreak === 1 ? "day" : "days"}
            </span>
          </div>

          {cycleDone && (
            <div className="px-4 pt-2">
              <button
                onClick={resetGrid}
                className="w-full py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 text-xs font-medium active:bg-slate-700/60"
              >
                Restart Cycle
              </button>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="px-4 mb-2 grid grid-cols-4 justify-center gap-2"
        >
          {Object.entries(tagTextColor).map(([tag, color]) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 w-full text-center justify-center"
            >
              <span className={`text-xs capitalize ${color}`}>{tag}</span>
            </div>
          ))}
        </motion.div>

        {/* Workout grid */}
        <div className="px-4 grid grid-cols-4 gap-3">
          {workouts.map((workout, i) => {
            const num = i + 1;
            const done = completedIds.has(workout.id);
            const focus = focusTag(workout.tags);
            const border = tagColor[focus] ?? "border-slate-700/85";

            return (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.25 }}
                whileTap={{ scale: 0.93 }}
              >
                <Link href={`/workout/${workout.id}`} className="block">
                  <div
                    className={`aspect-square rounded border ${border} flex flex-col items-center justify-center relative shadow-[2px_2px_4px_0px_rgba(255,255,255,0.2)]`}
                  >
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <MoonIcon num={num} />
                    </div>
                    <span
                      className={`relative text-3xl font-bold font-orbitron ${done ? "text-offwhite opacity-20" : ""}`}
                    >
                      {num}
                    </span>
                    {done && (
                      <div className="absolute opacity-30 top-0 left-0 w-full h-full flex items-center justify-center">
                        <svg
                          viewBox="0 0 10 10"
                          fill="none"
                          className="w-16 h-16"
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
                            strokeWidth="0.85"
                            filter="url(#checkShadow)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
    </>
  );
}
