"use client";

import { motion } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";

interface Props {
  isLunarCycle: boolean;
}

export function CycleCompleteScreen({ isLunarCycle }: Props) {
  const completeCycle = useProgressStore((s) => s.completeCycle);
  const acknowledgeCycleComplete = useProgressStore((s) => s.acknowledgeCycleComplete);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center px-6 safe-top safe-bottom mt-24"
    >
      {/* Moon / star graphic */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
        className="text-8xl mb-6 select-none"
      >
        {isLunarCycle ? "🌕" : "✨"}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-center mb-6"
      >
        <h1 className="text-offwhite text-3xl font-bold mb-3">
          {isLunarCycle ? "Lunar Cycle Complete!" : "All 28 Workouts Done!"}
        </h1>

        {isLunarCycle ? (
          <p className="text-slate-300 text-base leading-relaxed max-w-xs mx-auto">
            You completed all 28 workouts within a single lunar cycle. That&apos;s real dedication — your body has transformed through every phase of the moon.
          </p>
        ) : (
          <p className="text-slate-300 text-base leading-relaxed max-w-xs mx-auto">
            You finished the full 28-workout cycle. Every workout checked off. Time to reset and go again.
          </p>
        )}
      </motion.div>

      {isLunarCycle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="bg-lime/10 border border-lime/30 rounded-2xl px-5 py-3 mb-6 text-center"
        >
          <p className="text-lime text-sm font-semibold">Lunar Cycle Earned 🌙</p>
          <p className="text-slate-400 text-xs mt-0.5">Your lunar cycles counter has been updated</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs flex flex-col gap-3"
      >
        <button
          onClick={() => completeCycle(isLunarCycle)}
          className="bg-lime text-navy font-bold text-lg py-4 rounded-2xl active:opacity-80"
        >
          Start New Cycle
        </button>
        <button
          onClick={acknowledgeCycleComplete}
          className="bg-slate-700 text-slate-200 font-semibold text-lg py-4 rounded-2xl active:bg-slate-600"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
