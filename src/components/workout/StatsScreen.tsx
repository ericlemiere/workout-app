"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";
import { FaDumbbell, FaTrophy } from "react-icons/fa6";
import { RiCalendarCheckLine } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { IoFlame } from "react-icons/io5";
import { GiCycle } from "react-icons/gi";
import { MoonIconStats } from "@/lib/moonIcon";
import { SignalIcon } from "@/lib/customIcons";
import { Achievements } from "./Achievements";
import { ModalFromBottom } from "./ModalFromBottom";

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
  onClick?: () => void;
}

function StatRow({ label, value, icon, border = true, onClick }: StatRowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-4 ${border ? "border-b border-lime/50" : ""} active:bg-white/5 transition-colors`}
    >
      <div className="flex items-center justify-between gap-4 text-lime">
        {icon ?? <FaDumbbell size={40} />}
        <div className="flex w-full items-baseline justify-between gap-3 mb-1">
          <p className="text-offwhite font-medium">{label}</p>
          <span className="text-lime font-orbitron font-bold tracking-widest text-xl shrink-0">
            {value}
          </span>
        </div>
      </div>
    </button>
  );
}

interface ActiveStat {
  label: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

export function StatsScreen() {
  const completed = useProgressStore((s) => s.completed);
  const streak = useProgressStore((s) => s.streak);
  const lunarCycles = useProgressStore((s) => s.lunarCycles);
  const totalCycles = useProgressStore((s) => s.totalCycles);
  const levelCycles = useProgressStore((s) => s.levelCycles);
  const level1Cycles = levelCycles[1];
  const level2Cycles = levelCycles[2];
  const level3Cycles = levelCycles[3];

  const totalTimeMs = useMemo(
    () => completed.reduce((sum, c) => sum + c.durationMs, 0),
    [completed],
  );

  const daysWithWorkout = useMemo(
    () => new Set(completed.map((c) => c.completedAt.slice(0, 10))).size,
    [completed],
  );

  const [activeStat, setActiveStat] = useState<ActiveStat | null>(null);

  async function handleShare() {
    const text =
      `My MOOV stats 🌕\n` +
      `🔥 Current Streak: ${streak.currentStreak} day${streak.currentStreak !== 1 ? "s" : ""}\n` +
      `🏆 Longest Streak: ${streak.longestStreak} day${streak.longestStreak !== 1 ? "s" : ""}\n` +
      `📅 Days With A Workout: ${daysWithWorkout}\n` +
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
            onClick={() =>
              setActiveStat({
                label: "Current Streak",
                value: `${streak.currentStreak}d`,
                description:
                  "Consecutive days you've completed at least one workout. Multiple workouts in a single day still count as one. The streak resets if you miss a day.",
                icon: <IoFlame size={48} />,
              })
            }
          />
          <StatRow
            label="Longest Streak"
            value={`${streak.longestStreak}d`}
            description="Your longest run of consecutive workout days ever recorded. Keep pushing to beat it."
            icon={<FaTrophy size={40} />}
            onClick={() =>
              setActiveStat({
                label: "Longest Streak",
                value: `${streak.longestStreak}d`,
                description:
                  "Your longest run of consecutive workout days ever recorded. Keep pushing to beat it.",
                icon: <FaTrophy size={48} />,
              })
            }
          />
          <StatRow
            label="Days With A Workout"
            value={daysWithWorkout}
            description="The total number of calendar days on which you completed at least one workout. Unlike streaks, this keeps counting even after a miss."
            icon={<RiCalendarCheckLine size={40} />}
            onClick={() =>
              setActiveStat({
                label: "Days With A Workout",
                value: daysWithWorkout,
                description:
                  "The total number of calendar days on which you completed at least one workout. Unlike streaks, this keeps counting even after a miss.",
                icon: <RiCalendarCheckLine size={48} />,
              })
            }
          />
          <StatRow
            label="Workouts Completed"
            value={completed.length}
            description="The total number of workouts you've finished across your entire history, including all past cycles."
            onClick={() =>
              setActiveStat({
                label: "Workouts Completed",
                value: completed.length,
                description:
                  "The total number of workouts you've finished across your entire history, including all past cycles.",
                icon: <FaDumbbell size={48} />,
              })
            }
          />
          <StatRow
            label="Level 1 Cycles Completed"
            value={level1Cycles}
            description="The total number of times you've completed all 28 workouts at Level 1."
            onClick={() =>
              setActiveStat({
                label: "Level 1 Cycles Completed",
                value: level1Cycles,
                description:
                  "The total number of times you've completed all 28 workouts at Level 1.",
                icon: <SignalIcon bars={1} size={12} />,
              })
            }
            icon={<SignalIcon bars={1} size={10} />}
          />
          <StatRow
            label="Level 2 Cycles Completed"
            value={level2Cycles}
            description="The total number of times you've completed all 28 workouts at Level 2."
            onClick={() =>
              setActiveStat({
                label: "Level 2 Cycles Completed",
                value: level2Cycles,
                description:
                  "The total number of times you've completed all 28 workouts at Level 2.",
                icon: <SignalIcon bars={2} size={12} />,
              })
            }
            icon={<SignalIcon bars={2} size={10} />}
          />
          <StatRow
            label="Level 3 Cycles Completed"
            value={level3Cycles}
            description="The total number of times you've completed all 28 workouts at Level 3."
            onClick={() =>
              setActiveStat({
                label: "Level 3 Cycles Completed",
                value: level3Cycles,
                description:
                  "The total number of times you've completed all 28 workouts at Level 3.",
                icon: <SignalIcon bars={3} size={12} />,
              })
            }
            icon={<SignalIcon bars={3} size={10} />}
          />
          <StatRow
            label="Total Cycles Completed"
            value={totalCycles}
            description="The total number of times you've completed all 28 workouts, regardless of time frame."
            icon={<GiCycle size={40} />}
            onClick={() =>
              setActiveStat({
                label: "Total Cycles Completed",
                value: totalCycles,
                description:
                  "The total number of times you've completed all 28 workouts, regardless of time frame.",
                icon: <GiCycle size={48} />,
              })
            }
          />

          <StatRow
            label="Lunar Cycles Completed"
            value={lunarCycles}
            description="The number of times you've completed all 28 workouts within a single 28-day window — one workout for each phase of the moon."
            onClick={() =>
              setActiveStat({
                label: "Lunar Cycles Completed",
                value: lunarCycles,
                description:
                  "The number of times you've completed all 28 workouts within a single 28-day window — one workout for each phase of the moon.",
                icon: <MoonIconStats size="w-12 h-12" />,
              })
            }
            icon={<MoonIconStats size="w-10 h-10" />}
          />
          <StatRow
            label="Total Workout Time"
            value={formatDuration(totalTimeMs)}
            description="The cumulative time you've spent working out across all sessions. Every second counts!"
            icon={<MdOutlineTimer size={40} />}
            border={false}
            onClick={() =>
              setActiveStat({
                label: "Total Workout Time",
                value: formatDuration(totalTimeMs),
                description:
                  "The cumulative time you've spent working out across all sessions. Every second counts!",
                icon: <MdOutlineTimer size={48} />,
              })
            }
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

      <ModalFromBottom
        open={activeStat !== null}
        onClose={() => setActiveStat(null)}
      >
        {activeStat && (
          <div className="flex flex-col items-center text-center px-6 pt-4 pb-10 gap-5">
            <div className="text-lime mt-2">{activeStat.icon}</div>
            <div>
              <p className="text-offwhite font-bold font-orbitron tracking-wider text-lg">
                {activeStat.label}
              </p>
              <p className="text-lime font-orbitron font-bold tracking-widest text-3xl mt-2">
                {activeStat.value}
              </p>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed max-w-xs">
                {activeStat.description}
              </p>
            </div>
          </div>
        )}
      </ModalFromBottom>
    </motion.div>
  );
}
