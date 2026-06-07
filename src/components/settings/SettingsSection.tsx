"use client";

import { FaGear } from "react-icons/fa6";
import { useProgressStore } from "@/store/progressStore";
import { SectionHeader } from "./SectionHeader";

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
      <div>
        {label}
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
          className={`absolute top-px w-6.5 h-6.5 rounded-full bg-white shadow transition-transform ${value ? "-translate-x-0.5" : "-translate-x-6"}`}
        />
      </button>
    </div>
  );
}

export function SettingsSection() {
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);

  return (
    <div className="px-4">
      <SectionHeader label="Settings" icon={<FaGear size={20} />} />
      <div className="bg-charcoal/50 rounded-2xl px-4">
        <Toggle
          label={<p className="text-offwhite font-medium">Sound Effects</p>}
          value={settings.soundEnabled}
          onChange={(v) => updateSettings({ soundEnabled: v })}
          description="Countdown beeps and completion sounds"
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
    </div>
  );
}
