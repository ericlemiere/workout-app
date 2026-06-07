"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import { useProgressStore } from "@/store/progressStore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeScreenTip } from "@/components/ui/HomeScreenTip";
import { OfflineStatus } from "@/components/ui/OfflineStatus";

const MUSIC_TRACKS = [
  { id: "track-1", name: "Space", src: "/audio/space.mp3" },
  { id: "track-2", name: "Rocket Fuel", src: "/audio/rocket-fuel.mp3" },
  { id: "track-3", name: "Nebula", src: "/audio/nebula.mp3" },
];

const PREVIEW_DURATION_MS = 10_000;

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

  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopPreview() {
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    setPreviewingId(null);
  }

  function togglePreview(id: string, src: string) {
    if (previewingId === id) {
      stopPreview();
      return;
    }
    stopPreview();
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().catch(() => {
      audioRef.current = null;
      setPreviewingId(null);
    });
    setPreviewingId(id);
    previewTimeoutRef.current = setTimeout(stopPreview, PREVIEW_DURATION_MS);
  }

  useEffect(() => stopPreview, []);

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
            label={<p className="text-offwhite font-medium">Voice Cues</p>}
            value={settings.voiceCuesEnabled}
            onChange={(v) => updateSettings({ voiceCuesEnabled: v })}
            description="Audible cues for exercises"
          />
          <div className="border-b border-lime/50 last:border-0">
            <div className="flex items-center justify-between gap-2 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-offwhite font-medium">Workout Music</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  Play music during workouts
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.musicEnabled}
                onClick={() =>
                  updateSettings({ musicEnabled: !settings.musicEnabled })
                }
                className={`shrink-0 w-12 h-7 rounded-full transition-colors relative ${settings.musicEnabled ? "bg-lime/70" : "bg-slate-700"}`}
              >
                <span
                  className={`absolute top-px w-6.5 h-6.5 rounded-full bg-white shadow transition-transform ${settings.musicEnabled ? "-translate-x-0.5" : "-translate-x-6"}`}
                />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {settings.musicEnabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 space-y-2">
                    {MUSIC_TRACKS.map((track) => {
                      const isSelected = settings.musicTrack === track.id;
                      const isPreviewing = previewingId === track.id;
                      return (
                        <div
                          key={track.id}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                            isSelected
                              ? "bg-lime/10 border border-lime/40"
                              : "bg-slate-800/50 border border-transparent"
                          }`}
                        >
                          {/* Select track */}
                          <button
                            className="flex items-center gap-3 flex-1 text-left"
                            onClick={() => updateSettings({ musicTrack: track.id })}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected ? "border-lime" : "border-slate-600"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-lime" />
                              )}
                            </span>
                            <p
                              className={`text-sm font-medium ${
                                isSelected ? "text-offwhite" : "text-slate-400"
                              }`}
                            >
                              {track.name}
                            </p>
                          </button>

                          {/* Preview button */}
                          <button
                            onClick={() => togglePreview(track.id, track.src)}
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isPreviewing
                                ? "bg-lime text-navy"
                                : "bg-slate-700 text-slate-300 active:bg-slate-600"
                            }`}
                            aria-label={isPreviewing ? "Stop preview" : "Preview"}
                          >
                            {isPreviewing ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <rect x="5" y="4" width="4" height="16" rx="1" />
                                <rect x="15" y="4" width="4" height="16" rx="1" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 translate-x-px">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <HomeScreenTip />
        <OfflineStatus />
      </div>
    </motion.div>
  );
}
