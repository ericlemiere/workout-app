"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";

const APP_URL = "https://moov-1.vercel.app/";

function formatDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  if (totalMin < 1) return "0m";
  if (totalMin < 60) return `${totalMin}m`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

interface StatRowProps {
  label: string;
  value: string | number;
  description: string;
  border?: boolean;
}

function StatRow({ label, value, description, border = true }: StatRowProps) {
  return (
    <div className={`py-4 ${border ? "border-b border-lime/50" : ""}`}>
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <p className="text-offwhite font-medium">{label}</p>
        <span className="text-lime font-orbitron font-bold tracking-widest text-xl shrink-0">
          {value}
        </span>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
    </div>
  );
}

export function StatsScreen() {
  const completed = useProgressStore((s) => s.completed);
  const streak = useProgressStore((s) => s.streak);
  const lunarCycles = useProgressStore((s) => s.lunarCycles);
  const totalCycles = useProgressStore((s) => s.totalCycles);

  const totalTimeMs = useMemo(
    () => completed.reduce((sum, c) => sum + c.durationMs, 0),
    [completed],
  );

  async function handleShare() {
    const text =
      `My MOOV stats 🌙\n` +
      `${completed.length} workouts completed\n` +
      `${streak.currentStreak} day streak\n` +
      `${totalCycles} cycle${totalCycles !== 1 ? "s" : ""} finished\n` +
      `${formatDuration(totalTimeMs)} total workout time\n\n` +
      APP_URL;
    try {
      await navigator.share({ text });
    } catch (_) {}
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <div className="px-4 pt-8 pb-6">
        <h1 className="text-offwhite text-3xl font-bold font-orbitron tracking-wider">
          Stats
        </h1>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <StatRow
            label="Current Streak 🔥"
            value={`${streak.currentStreak}d`}
            description="Consecutive days you've completed at least one workout. Multiple workouts in a single day still count as one. The streak resets if you miss a day."
          />
          <StatRow
            label="Longest Streak 🏆"
            value={`${streak.longestStreak}d`}
            description="Your longest run of consecutive workout days ever recorded. Keep pushing to beat it."
          />
          <StatRow
            label="Workouts Completed 🏋️‍♀️"
            value={completed.length}
            description="The total number of workouts you've finished across your entire history, including all past cycles."
          />
          <StatRow
            label="Cycles Completed 🔄"
            value={totalCycles}
            description="The total number of times you've completed all 28 workouts, regardless of time frame."
          />
          <StatRow
            label="Lunar Cycles 🌙"
            value={lunarCycles}
            description="The number of times you've completed all 28 workouts within a single 28-day window — one workout for each phase of the moon."
          />
          <StatRow
            label="Total Time Spent ⏱️"
            value={formatDuration(totalTimeMs)}
            description="The cumulative time you've spent working out across all sessions. Every second counts!"
          />

          <div className="flex items-center justify-between gap-2 py-4">
            <div>
              <p className="text-offwhite font-medium">Brag To Someone!</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Share your MOOV stats
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl active:bg-slate-600 flex items-center gap-1.5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
