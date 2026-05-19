"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";
import { FaDumbbell, FaTrophy } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import { IoFlame } from "react-icons/io5";
import { GiCycle } from "react-icons/gi";
import { Achievements } from "./Achievements";

const CRATERS = [
  { cx: 44, cy: 68, rx: 7, ry: 6.5 },
  { cx: 68, cy: 30, rx: 4.5, ry: 4 },
  { cx: 62, cy: 50, rx: 2.5, ry: 2.5 },
  { cx: 28, cy: 52, rx: 4, ry: 3.5 },
  { cx: 35, cy: 32, rx: 2.2, ry: 2 },
  { cx: 72, cy: 60, rx: 5, ry: 4.5 },
  { cx: 50, cy: 26, rx: 1.5, ry: 1.5 },
  { cx: 38, cy: 78, rx: 3, ry: 2.8 },
  { cx: 25, cy: 40, rx: 1.8, ry: 1.6 },
];

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
  icon?: React.ReactNode;
  border?: boolean;
}

function StatRow({
  label,
  value,
  description,
  icon,
  border = true,
}: StatRowProps) {
  return (
    <div className={`py-4 ${border ? "border-b border-lime/50" : ""}`}>
      <div className="flex items-center justify-between gap-4 text-lime">
        {icon ?? <FaDumbbell size={40} />}
        <div className="flex w-full items-baseline justify-between gap-3 mb-1">
          <p className="text-offwhite font-medium">{label}</p>
          <span className="text-lime font-orbitron font-bold tracking-widest text-xl shrink-0">
            {value}
          </span>
        </div>
      </div>
      {/* <p className="text-slate-400 text-xs leading-relaxed">{description}</p> */}
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
      `My MOOV stats 🌕\n` +
      `🔥 Current Streak: ${streak.currentStreak} day${streak.currentStreak !== 1 ? "s" : ""}\n` +
      `🏆 Longest Streak: ${streak.longestStreak} day${streak.longestStreak !== 1 ? "s" : ""}\n` +
      `🏋️‍♀️ Workouts Completed: ${completed.length}\n` +
      `🔄 Cycles Completed: ${totalCycles} cycle${totalCycles !== 1 ? "s" : ""}\n` +
      `🌒 Lunar Cycles: ${lunarCycles} lunar cycle${lunarCycles !== 1 ? "s" : ""}\n` +
      `⏱️ Total Workout Time: ${formatDuration(totalTimeMs)}\n\n` +
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

      <div className="px-4 flex flex-col gap-6">
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <StatRow
            label="Current Streak"
            value={`${streak.currentStreak}d`}
            description="Consecutive days you've completed at least one workout. Multiple workouts in a single day still count as one. The streak resets if you miss a day."
            icon={<IoFlame size={40} />}
          />
          <StatRow
            label="Longest Streak"
            value={`${streak.longestStreak}d`}
            description="Your longest run of consecutive workout days ever recorded. Keep pushing to beat it."
            icon={<FaTrophy size={40} />}
          />
          <StatRow
            label="Workouts Completed"
            value={completed.length}
            description="The total number of workouts you've finished across your entire history, including all past cycles."
          />
          <StatRow
            label="Cycles Completed"
            value={totalCycles}
            description="The total number of times you've completed all 28 workouts, regardless of time frame."
            icon={<GiCycle size={40} />}
          />
          <StatRow
            label="Lunar Cycles Completed"
            value={lunarCycles}
            description="The number of times you've completed all 28 workouts within a single 28-day window — one workout for each phase of the moon."
            icon={
              <svg viewBox="0 0 100 100" className="w-10 h-10" aria-hidden>
                <defs>
                  <clipPath id="sm-clip">
                    <circle cx="50" cy="50" r="40" />
                  </clipPath>
                  <radialGradient id="sm-grad" cx="40%" cy="36%" r="65%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="65%" stopColor="white" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.55" />
                  </radialGradient>
                </defs>
                <g clipPath="url(#sm-clip)">
                  <circle cx="50" cy="50" r="40" fill="#b7e63b" />
                  <path
                    d="M 50 10 A 40 40 0 0 1 50 90 A 17.36 40 0 0 0 50 10 Z"
                    fill="rgba(0,0,0,0.7)"
                  />
                  <g opacity="0.55">
                    {CRATERS.map((c, i) => (
                      <ellipse
                        key={i}
                        cx={c.cx}
                        cy={c.cy}
                        rx={c.rx}
                        ry={c.ry}
                        fill="rgba(0,0,0,0.7)"
                        stroke="#b7e63b"
                        strokeWidth="1"
                        strokeOpacity="1"
                      />
                    ))}
                  </g>
                </g>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#b7e63b"
                  strokeOpacity={1}
                  strokeWidth={6}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="white"
                  strokeOpacity={0.18}
                  strokeWidth={1}
                />
              </svg>
            }
          />
          <StatRow
            label="Total Workout Time"
            value={formatDuration(totalTimeMs)}
            description="The cumulative time you've spent working out across all sessions. Every second counts!"
            icon={<MdOutlineTimer size={40} />}
            border={false}
          />
        </div>

         <Achievements />

        <div className="bg-charcoal/50 rounded-2xl px-4">
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
