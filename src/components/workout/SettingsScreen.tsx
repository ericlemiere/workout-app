"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";
import { MoonIconSimple, MoonIconStats } from "@/lib/moonIcon";

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
          className={`absolute -top-px w-7.5 h-7.5 rounded-full text-white shadow transition-transform ${value ? "-translate-x-1" : "-translate-x-6"}`}
        >
          <MoonIconSimple fill="white" craterColor="#05081680" />
        </span>
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

const APP_URL = "https://moov-1.vercel.app/";

export function SettingsScreen() {
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);
  const resetGrid = useProgressStore((s) => s.resetGrid);
  const resetAllStats = useProgressStore((s) => s.resetAllStats);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);

  async function handleShare() {
    try {
      await navigator.share({
        text: `Check out MOOV — a personal workout app.\n\n${APP_URL}`,
      });
    } catch (_) {}
  }

  function handleConfirm() {
    if (confirmMode === "grid") resetGrid();
    if (confirmMode === "stats") resetAllStats();
    setConfirmMode(null);
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
          Settings
        </h1>
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
            label="Voice Cues [Coming Soon]"
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
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <div className="py-4 border-b border-lime/50">
            <p className="text-slate-400 text-sm leading-relaxed">
              A complete at-home physical therapy program featuring 28 guided
              workouts designed to improve full-body strength, mobility, and
              flexibility. Each session takes about 20 minutes and requires
              nothing more than your body weight and a mat. No subscriptions, no
              ads, and no internet connection needed after the initial download.
            </p>
            <p className="text-offwhite text-xs mt-3">
              Install to home screen for the best experience.
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 py-4">
            <div>
              <p className="text-offwhite font-medium">Share</p>
              <p className="text-slate-500 text-xs mt-0.5">MOOV with someone</p>
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
                Clear checkmarks and start a new cycle
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
    </motion.div>
  );
}
