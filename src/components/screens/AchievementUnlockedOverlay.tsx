"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";
import { ACHIEVEMENTS } from "./Achievements";

export function AchievementUnlockedOverlay() {
  const pendingAchievements = useProgressStore((s) => s.pendingAchievements);
  const dismissPendingAchievement = useProgressStore(
    (s) => s.dismissPendingAchievement,
  );

  const achievement =
    pendingAchievements.length > 0
      ? (ACHIEVEMENTS.find((a) => a.id === pendingAchievements[0]) ?? null)
      : null;

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          key={achievement.id}
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
            {achievement.icon}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-center mb-10"
          >
            <h2 className="text-offwhite font-bold font-orbitron tracking-wider text-2xl mb-3">
              {achievement.name}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {achievement.description1}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mt-1">
              {achievement.description2}
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
            Claim!
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
