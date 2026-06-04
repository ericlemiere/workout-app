"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PiWarning } from "react-icons/pi";
import { useProgressStore } from "@/store/progressStore";
import { SectionHeader } from "./SectionHeader";
import { SettingsRow } from "./SettingsRow";
import { ConfirmModal } from "./ConfirmModal";

type ConfirmMode = "grid" | "stats" | "stats-final" | null;

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
    body: "Your completed count and streaks will be reset to 0, all grid checkmarks will be cleared, and achievements will be lost.",
    label: "Yes, reset all",
  },
  "stats-final": {
    title: "Are you absolutely sure?",
    body: "This cannot be undone. Every workout, streak, cycle, and achievement will be permanently erased.",
    label: "Wipe everything",
  },
};

export function ResetSection() {
  const resetGrid = useProgressStore((s) => s.resetGrid);
  const resetAllStats = useProgressStore((s) => s.resetAllStats);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);

  function handleConfirm() {
    if (confirmMode === "grid") { resetGrid(); setConfirmMode(null); }
    if (confirmMode === "stats") { setConfirmMode("stats-final"); }
    if (confirmMode === "stats-final") { resetAllStats(); setConfirmMode(null); }
  }

  const resetButton = (onClick: () => void) => (
    <motion.button whileTap={{ scale: 0.95 }} onClick={onClick}
      className="w-22 shrink-0 bg-slate-700 text-electric-orange whitespace-nowrap text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600">
      Reset
    </motion.button>
  );

  return (
    <div className="px-4">
      <SectionHeader label="Reset" icon={<PiWarning size={20} />} variant="orange" />
      <div className="bg-charcoal/50 rounded-2xl px-4">
        <SettingsRow
          label="Reset Grid"
          description="Clear checkmarks and start a new cycle"
          border
          borderVariant="orange"
          action={resetButton(() => setConfirmMode("grid"))}
        />
        <SettingsRow
          label="Reset All Stats"
          description="Reset completed count and streaks to 0, and clear all grid checkmarks"
          action={resetButton(() => setConfirmMode("stats"))}
        />
      </div>

      {confirmMode && (
        <ConfirmModal
          open
          onClose={() => setConfirmMode(null)}
          onConfirm={handleConfirm}
          title={confirmContent[confirmMode].title}
          body={confirmContent[confirmMode].body}
          confirmLabel={confirmContent[confirmMode].label}
          reverse={confirmMode === "stats-final"}
        />
      )}
    </div>
  );
}
