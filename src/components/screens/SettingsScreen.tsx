"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";

import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { useWorkoutSpeech } from "@/hooks/useWorkoutSpeech";
import { createClient } from "@/lib/supabase/client";
import { clearTtsCache } from "@/lib/ttsCache";
import { MUSIC_TRACKS } from "@/lib/musicTracks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OfflineStatus } from "@/components/ui/OfflineStatus";

interface TTSVoice {
  name: string;
  languageCode: string;
  gender: string;
}

const VOICE_PREVIEW_TEXT = "Your celestial body awaits.";

const VOICES: TTSVoice[] = [
  // en-US
  { name: "en-US-Studio-O", languageCode: "en-US", gender: "FEMALE" },
  { name: "en-US-Studio-M", languageCode: "en-US", gender: "MALE" },
  // en-GB
  { name: "en-GB-Journey-D", languageCode: "en-GB", gender: "MALE" },
  { name: "en-GB-Journey-F", languageCode: "en-GB", gender: "FEMALE" },
  { name: "en-GB-Studio-B", languageCode: "en-GB", gender: "MALE" },
  { name: "en-GB-Studio-C", languageCode: "en-GB", gender: "FEMALE" },
  // en-AU
  { name: "en-AU-Journey-D", languageCode: "en-AU", gender: "MALE" },
  { name: "en-AU-Neural2-B", languageCode: "en-AU", gender: "MALE" },
];

function formatVoiceLabel(name: string): string {
  const parts = name.split("-");
  return parts.length >= 4 ? parts.slice(2).join(" ") : name;
}

function GenderBadge({ gender }: { gender: string }) {
  const label =
    gender === "MALE" ? "Male" : gender === "FEMALE" ? "Female" : "N/A";
  return (
    <span className="text-slate-500 text-xs w-4 shrink-0 text-center">
      {label}
    </span>
  );
}

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
  const voiceName = useUserStore((s) => s.voiceName);
  const setVoiceName = useUserStore((s) => s.setVoiceName);
  const userEmail = useUserStore((s) => s.userEmail);
  const { unlock, preview, cancel } = useWorkoutSpeech(voiceName);

  // Music preview state
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Voice selection state
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [trackCached, setTrackCached] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const up = () => setIsOnline(true);
    const down = () => setIsOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      setTrackCached(true);
      return;
    }
    const track = MUSIC_TRACKS.find((t) => t.id === settings.musicTrack);
    if (!track) return;
    (async () => {
      try {
        const names = await caches.keys();
        const name = names.find((n) => n.startsWith("workout-"));
        if (!name) {
          setTrackCached(false);
          return;
        }
        const cache = await caches.open(name);
        setTrackCached(!!(await cache.match(track.src)));
      } catch {
        setTrackCached(false);
      }
    })();
  }, [isOnline, settings.musicTrack]);

  async function handleClearCache() {
    await clearTtsCache();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  }

  async function handleVoiceSelect(name: string) {
    setVoiceName(name);
    if (userEmail) {
      try {
        await createClient().auth.updateUser({ data: { tts_voice: name } });
      } catch {}
    }
  }

  async function handleVoicePreview(name: string) {
    if (previewingVoice === name) {
      cancel();
      setPreviewingVoice(null);
      return;
    }
    unlock();
    setPreviewingVoice(name);
    try {
      await preview(VOICE_PREVIEW_TEXT, name);
    } catch {}
    setPreviewingVoice(null);
  }

  const groupedVoices = VOICES.reduce<Record<string, TTSVoice[]>>((acc, v) => {
    (acc[v.languageCode] ??= []).push(v);
    return acc;
  }, {});

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
            label={<p className="text-offwhite font-medium">Vocal Cues</p>}
            value={settings.voiceCuesEnabled}
            onChange={(v) => updateSettings({ voiceCuesEnabled: v })}
            description="Audible cues for exercises"
          />
          <Toggle
            label={<p className="text-offwhite font-medium">Workout Music</p>}
            value={settings.musicEnabled}
            onChange={(v) => updateSettings({ musicEnabled: v })}
            description="Play music during workouts"
          />
        </div>
      </div>
      <div className="px-4 pt-8">
        <SectionHeader label="Audio Selectors" icon={<FaMicrophoneAlt size={20} />} />
        <div className="bg-charcoal/50 rounded-2xl px-4">
          {/* Voice selector */}
          <div
            className={`border-b border-lime/50 ${!settings.voiceCuesEnabled ? "pointer-events-none" : ""}`}
          >
            <button
              onClick={() => setVoiceOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 py-4"
            >
              <div
                className={`text-left flex gap-1 transition-opacity ${!settings.voiceCuesEnabled ? "opacity-40" : ""}`}
              >
                <p className="text-offwhite text-md font-bold">Voice:</p>
                <p className="text-offwhite text-md">
                  {formatVoiceLabel(voiceName)}
                </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${voiceOpen ? "rotate-180" : ""}`}
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {voiceOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 space-y-4 pr-1">
                    {Object.entries(groupedVoices).map(([langCode, group]) => (
                      <div key={langCode}>
                        <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">
                          {langCode}
                        </p>
                        {group.map((voice) => {
                          const isSelected = voiceName === voice.name;
                          const isPreviewing = previewingVoice === voice.name;
                          return (
                            <div
                              key={voice.name}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors ${isSelected ? "bg-lime/10 border border-lime/40" : "bg-slate-800/40 border border-transparent"}`}
                            >
                              <button
                                className="flex items-center gap-3 flex-1 text-left"
                                onClick={() => handleVoiceSelect(voice.name)}
                              >
                                <span
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-lime" : "border-slate-600"}`}
                                >
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-lime" />
                                  )}
                                </span>
                                <p
                                  className={`text-sm font-medium ${isSelected ? "text-offwhite" : "text-slate-400"}`}
                                >
                                  {formatVoiceLabel(voice.name)}
                                </p>
                                <GenderBadge gender={voice.gender} />
                              </button>
                              <button
                                onClick={() => handleVoicePreview(voice.name)}
                                disabled={
                                  previewingVoice !== null &&
                                  previewingVoice !== voice.name
                                }
                                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPreviewing ? "bg-lime text-navy" : "bg-slate-700 text-slate-300 active:bg-slate-600 disabled:opacity-40"}`}
                                aria-label="Preview voice"
                              >
                                {isPreviewing ? (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-3.5 h-3.5"
                                  >
                                    <rect
                                      x="5"
                                      y="5"
                                      width="14"
                                      height="14"
                                      rx="1"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-3.5 h-3.5 translate-x-px"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Music track selector */}
          <div
            className={`${!settings.musicEnabled ? "pointer-events-none" : ""}`}
          >
            {!isOnline && !trackCached && settings.musicEnabled && (
              <p className="text-xs text-amber-400 pt-4">
                This track hasn't been played yet and isn't available offline.
              </p>
            )}
            <button
              onClick={() => setMusicOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 py-4"
            >
              <div
                className={`text-left flex gap-1 transition-opacity ${!settings.musicEnabled ? "opacity-40" : ""}`}
              >
                <p className="text-offwhite text-md font-bold">Track: </p>
                <p className="text-offwhite text-md">
                  {MUSIC_TRACKS.find((t) => t.id === settings.musicTrack)
                    ?.name ?? "None"}
                </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${musicOpen ? "rotate-180" : ""}`}
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {musicOpen && (
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
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isSelected ? "bg-lime/10 border border-lime/40" : "bg-slate-800/50 border border-transparent"}`}
                        >
                          <button
                            className="flex items-center gap-3 flex-1 text-left"
                            onClick={() =>
                              updateSettings({ musicTrack: track.id })
                            }
                          >
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-lime" : "border-slate-600"}`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-lime" />
                              )}
                            </span>
                            <p
                              className={`text-sm font-medium ${isSelected ? "text-offwhite" : "text-slate-400"}`}
                            >
                              {track.name}
                            </p>
                          </button>
                          <button
                            onClick={() => togglePreview(track.id, track.src)}
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPreviewing ? "bg-lime text-navy" : "bg-slate-700 text-slate-300 active:bg-slate-600"}`}
                            aria-label={
                              isPreviewing ? "Stop preview" : "Preview"
                            }
                          >
                            {isPreviewing ? (
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-3.5 h-3.5"
                              >
                                <rect
                                  x="5"
                                  y="5"
                                  width="14"
                                  height="14"
                                  rx="1"
                                />
                              </svg>
                            ) : (
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-3.5 h-3.5 translate-x-px"
                              >
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

          <button
            onClick={handleClearCache}
            className="w-full text-left text-xs text-slate-500 py-4 border-t border-lime/20 active:text-slate-300 transition-colors"
          >
            {cacheCleared ? "Voice cache cleared ✓" : "Clear voice cache"}
          </button>
        </div>

        <OfflineStatus />
      </div>
    </motion.div>
  );
}
