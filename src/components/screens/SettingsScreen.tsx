"use client";

import { motion } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import { useProgressStore } from "@/store/progressStore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeScreenTip } from "@/components/ui/HomeScreenTip";

function Toggle({
  label,
  value,
  onChange,
  description,
}: {
  label: React.ReactNode;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50 last:border-0">
      <div className="flex-1 min-w-0">
        {label}
        {description && (
          <p className="text-slate-500 text-xs mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`shrink-0 w-12 h-7 rounded-full transition-colors relative ${value ? "bg-lime/70" : "bg-slate-700"}`}
      >
        <span
          className={`absolute top-px w-6.5 h-6.5 rounded-full bg-white shadow transition-transform ${value ? "-translate-x-0.5" : "-translate-x-6"}`}
        />
      </button>
    </div>
  );
}

export function SettingsScreen() {
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <div className="px-4 pt-8">
        <SectionHeader label="Settings" icon={<FaGear size={20} />} />
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <Toggle
            label={<p className="text-offwhite font-medium">Sound Effects</p>}
            value={settings.soundEnabled}
            onChange={(v) => updateSettings({ soundEnabled: v })}
            description="Countdown beeps and completion sounds"
          />
          <Toggle
            label={<p className="text-offwhite font-medium">Haptics</p>}
            value={settings.hapticsEnabled}
            onChange={(v) => updateSettings({ hapticsEnabled: v })}
            description="Vibration on transitions and button taps. Supported on most iPhones and Android devices."
          />
          <Toggle
            label={
              <p className="text-offwhite font-medium">
                Voice Cues
                <span className="text-slate-500">&nbsp;[Coming Soon]</span>
              </p>
            }
            value={settings.voiceCuesEnabled}
            onChange={(v) => updateSettings({ voiceCuesEnabled: v })}
            description="Audible cues for exercises"
          />
        </div>
      <HomeScreenTip />
      </div>

    </motion.div>
  );
}
