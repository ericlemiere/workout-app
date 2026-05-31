"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Workout } from "@/types";
import { useProgressStore } from "@/store/progressStore";
import { useWorkoutStore } from "@/store/workoutStore";
import { playCompleteSound } from "@/lib/audio";
import { formatTime } from "@/lib/timer";
import { calculateWorkoutMinutes } from "@/lib/workout";
import { ACHIEVEMENTS } from "@/components/workout/Achievements";
import { GiPartyPopper } from "react-icons/gi";

interface Props {
  workout: Workout;
}

const APP_URL = "https://moov-1.vercel.app/";

export function CompletionScreen({ workout }: Props) {
  const streak = useProgressStore((s) => s.streak);
  const completed = useProgressStore((s) => s.completed);
  const pendingAchievements = useProgressStore((s) => s.pendingAchievements);
  const dismissPendingAchievement = useProgressStore((s) => s.dismissPendingAchievement);
  const resetWorkout = useWorkoutStore((s) => s.resetWorkout);

  const pendingAchievement = pendingAchievements.length > 0
    ? ACHIEVEMENTS.find(a => a.id === pendingAchievements[0]) ?? null
    : null;

  async function handleShare() {
    const streakText = `🔥 ${streak.currentStreak} day streak!`;

    try {
      await navigator.share({
        text: `Just completed ${workout.name} on MOOV!\n${streakText}\n${APP_URL}`,
      });
    } catch (_) {}
  }

  const latestCompletion = completed
    .filter((c) => c.workoutId === workout.id)
    .at(-1);
  const durationMs = latestCompletion?.durationMs ?? 0;

  useEffect(() => {
    playCompleteSound();
    resetWorkout();
  }, [resetWorkout]);

  const totalForWorkout = completed.filter(
    (c) => c.workoutId === workout.id,
  ).length;

  return (
    <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center px-6 safe-top safe-bottom">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-7xl mb-6"
      >
        <GiPartyPopper className="text-lime" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-offwhite text-3xl font-bold mb-2">
          Workout Complete!
        </h1>
        <p className="text-slate-400">{workout.name}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full max-w-xs bg-charcoal/60 border border-slate-700/40 rounded-2xl p-5 mb-8"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-offwhite text-xl font-bold">
              {durationMs > 0
                ? formatTime(durationMs)
                : `${calculateWorkoutMinutes(workout)}m`}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">duration</div>
          </div>
          <div>
            <div className="text-offwhite text-xl font-bold">
              {streak.currentStreak}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">day streak</div>
          </div>
          <div>
            <div className="text-offwhite text-xl font-bold">
              {totalForWorkout}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">total times</div>
          </div>
        </div>
      </motion.div>

      {/* Streak message */}
      {streak.currentStreak > 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-offwhite text-sm font-medium mb-8 text-center"
        >
          🔥 {streak.currentStreak} day streak! Keep it going!
        </motion.p>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs flex flex-col gap-3"
      >
        <Link
          href="/"
          className="bg-lime text-navy border border-lime font-semibold text-lg text-center py-4 rounded-2xl active:bg-charcoal/70"
        >
          Back to Workouts
        </Link>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="bg-slate-700 text-slate-200 font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:bg-slate-600"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5"
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
      </motion.div>
      {/* Achievement unlocked overlay */}
      <AnimatePresence>
        {pendingAchievement && (
          <motion.div
            key={pendingAchievement.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.3 }}
            className="fixed inset-0 z-50 bg-navy flex flex-col items-center justify-center px-6 safe-top safe-bottom"
          >
            <p className="text-lime text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Achievement Unlocked
            </p>

            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.45 }}
              className="text-lime mb-6 [&_svg]:w-20 [&_svg]:h-20"
            >
              {pendingAchievement.icon}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-center mb-10"
            >
              <h2 className="text-offwhite font-bold font-orbitron tracking-wider text-2xl mb-3">
                {pendingAchievement.name}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {pendingAchievement.description1}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mt-1">
                {pendingAchievement.description2}
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              whileTap={{ scale: 0.96 }}
              onClick={dismissPendingAchievement}
              className="bg-lime text-navy font-bold text-lg w-full max-w-xs py-4 rounded-2xl active:opacity-80"
            >
              {pendingAchievements.length > 1 ? "Next →" : "Claim!"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
