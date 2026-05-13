"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";

type ConfirmMode = "grid" | "stats" | null;

function Toggle({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50 last:border-0">
      <div>
        <p className="text-offwhite font-medium">{label}</p>
        {description && (
          <p className="text-slate-500 text-xs mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-colors relative ${value ? "bg-lime/70" : "bg-slate-700"}`}
      >
        <span
          className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${value ? "translate-x-0" : "-translate-x-6"}`}
        />
      </button>
    </div>
  );
}

const confirmContent: Record<
  Exclude<ConfirmMode, null>,
  { title: string; body: string; label: string }
> = {
  grid: {
    title: "Reset grid?",
    body: "All checkmarks will be cleared. Your completed count and streak will be preserved.",
    label: "Yes, reset",
  },
  stats: {
    title: "Reset all stats?",
    body: "Your completed count and streaks will be reset to 0, and grid checkmarks will all be cleared.",
    label: "Yes, reset all",
  },
};

export function SettingsScreen() {
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);
  const resetGrid = useProgressStore((s) => s.resetGrid);
  const resetAllStats = useProgressStore((s) => s.resetAllStats);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);

  function handleConfirm() {
    if (confirmMode === "grid") resetGrid();
    if (confirmMode === "stats") resetAllStats();
    setConfirmMode(null);
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto pb-28 safe-top">
      <div className="px-4 pt-14 pb-6">
        <h1 className="text-offwhite text-3xl font-bold">Settings</h1>
      </div>

      {/* Preferences */}
      <div className="px-4 mb-6">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3">
          Preferences
        </h2>
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <Toggle
            label="Sound Effects"
            value={settings.soundEnabled}
            onChange={(v) => updateSettings({ soundEnabled: v })}
            description="Countdown beeps and completion sounds"
          />
          <Toggle
            label="Voice Cues"
            value={settings.voiceCuesEnabled}
            onChange={(v) => updateSettings({ voiceCuesEnabled: v })}
            description="Audible cues for exercises"
          />
          <Toggle
            label="Auto Advance"
            value={settings.autoAdvance}
            onChange={(v) => updateSettings({ autoAdvance: v })}
            description="Automatically move to next exercise when timer ends"
          />
        </div>
      </div>

      {/* About */}
      <div className="px-4 mb-6">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3">
          About
        </h2>
        <div className="bg-charcoal/50 rounded-2xl px-4 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            A personal workout companion with 28 workouts, each ~20 minutes. No
            subscriptions, no ads, no internet required after first load.
          </p>
          <p className="text-offwhite text-xs mt-3">
            Install to home screen for the best experience.
          </p>
        </div>
      </div>

      {/* Reset */}
      <div className="px-4">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3">
          Reset
        </h2>
        <div className="bg-charcoal/50 rounded-2xl px-4">
          {/* Reset Grid */}
          <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50">
            <div>
              <p className="text-offwhite font-medium">Reset Grid</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Clear checkmarks and start a new round
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmMode("grid")}
              className="bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl active:bg-slate-600"
            >
              Reset
            </motion.button>
          </div>

          {/* Reset All Stats */}
          <div className="flex items-center justify-between gap-2 py-4">
            <div>
              <p className="text-offwhite font-medium">Reset All Stats</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Reset completed count and streaks to 0, and clear all grid
                checkmarks
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmMode("stats")}
              className="bg-slate-700 text-slate-200  text-sm font-semibold px-4 py-2 rounded-xl active:bg-red-500/30"
            >
              Reset
            </motion.button>
          </div>
        </div>
      </div>

      {/* Shared confirmation modal */}
      <AnimatePresence>
        {confirmMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-end justify-center z-50 pb-10 px-4"
            onClick={() => setConfirmMode(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-charcoal rounded-3xl p-6"
            >
              <h2 className="text-offwhite text-xl font-bold mb-1">
                {confirmContent[confirmMode].title}
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {confirmContent[confirmMode].body}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmMode(null)}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-700 text-slate-200 font-semibold active:bg-slate-600"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleConfirm}
                  className="flex-1 py-3.5 rounded-2xl bg-red-500 text-offwhite font-semibold active:bg-red-600"
                >
                  {confirmContent[confirmMode].label}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
