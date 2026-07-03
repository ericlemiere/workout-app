"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophoneAlt } from "react-icons/fa";

import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { useWorkoutSpeech } from "@/hooks/useWorkoutSpeech";
import { createClient } from "@/lib/supabase/client";
// import { clearTtsCache } from "@/lib/ttsCache";
import { MUSIC_TRACKS } from "@/lib/musicTracks";
import { MIN_MUSIC_VOLUME, MAX_MUSIC_VOLUME } from "@/lib/audioSettings";
import { previewSfxPack, ensureAudioContextResumed } from "@/lib/audio";
import { SFX_PACK_LIST } from "@/lib/sfxPacks";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface TTSVoice {
  name: string;
  languageCode: string;
  gender: string;
  displayName?: string;
}

const VOICE_PREVIEW_TEXT = "Your celestial body awaits.";

const VOICES: TTSVoice[] = [
  // en-US — Chirp3-HD
  {
    name: "en-US-Chirp3-HD-Achernar",
    languageCode: "en-US",
    gender: "FEMALE",
    displayName: "Cally",
  },
  {
    name: "en-US-Chirp3-HD-Achird",
    languageCode: "en-US",
    gender: "MALE",
    displayName: "Tobias",
  },
  {
    name: "en-US-Chirp3-HD-Algenib",
    languageCode: "en-US",
    gender: "MALE",
    displayName: "Adama",
  },
  {
    name: "en-US-Chirp3-HD-Autonoe",
    languageCode: "en-US",
    gender: "FEMALE",
    displayName: "Boomer",
  },
  {
    name: "en-US-Chirp3-HD-Callirrhoe",
    languageCode: "en-US",
    gender: "FEMALE",
    displayName: "Kara",
  },
  {
    name: "en-US-Chirp3-HD-Gacrux",
    languageCode: "en-US",
    gender: "FEMALE",
    displayName: "Helena",
  },
  {
    name: "en-US-Chirp3-HD-Sadachbia",
    languageCode: "en-US",
    gender: "MALE",
    displayName: "Simon",
  },
  {
    name: "en-US-Chirp3-HD-Zephyr",
    languageCode: "en-US",
    gender: "FEMALE",
    displayName: "Roslin",
  },

  // en-GB — Chirp3-HD
  {
    name: "en-GB-Chirp3-HD-Achernar",
    languageCode: "en-GB",
    gender: "FEMALE",
    displayName: "Dualla",
  },
  {
    name: "en-GB-Chirp3-HD-Achird",
    languageCode: "en-GB",
    gender: "MALE",
    displayName: "Gaius",
  },
  {
    name: "en-GB-Chirp3-HD-Algenib",
    languageCode: "en-GB",
    gender: "MALE",
    displayName: "Zarek",
  },
  {
    name: "en-GB-Chirp3-HD-Algieba",
    languageCode: "en-GB",
    gender: "MALE",
    displayName: "Cavil",
  },
  {
    name: "en-GB-Chirp3-HD-Alnilam",
    languageCode: "en-GB",
    gender: "MALE",
    displayName: "Felix",
  },
  {
    name: "en-GB-Chirp3-HD-Aoede",
    languageCode: "en-GB",
    gender: "FEMALE",
    displayName: "Tory",
  },
  {
    name: "en-GB-Chirp3-HD-Autonoe",
    languageCode: "en-GB",
    gender: "FEMALE",
    displayName: "Ellen",
  },

  // en-AU — Chirp3-HD
  {
    name: "en-AU-Chirp3-HD-Achernar",
    languageCode: "en-AU",
    gender: "FEMALE",
    displayName: "D'Anna",
  },
  {
    name: "en-AU-Chirp3-HD-Enceladus",
    languageCode: "en-AU",
    gender: "MALE",
    displayName: "Saul",
  },
  {
    name: "en-AU-Chirp3-HD-Gacrux",
    languageCode: "en-AU",
    gender: "FEMALE",
    displayName: "Caprica",
  },
];

function formatVoiceLabel(name: string): string {
  const parts = name.split("-");
  return parts.length >= 4 ? parts.slice(2).join(" ") : name;
}

function getVoiceLabel(name: string): string {
  const voice = VOICES.find((v) => v.name === name);
  return voice?.displayName ?? formatVoiceLabel(name);
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

function PreviewButton({
  isPreviewing,
  onClick,
  disabled,
  label,
}: {
  isPreviewing: boolean;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isPreviewing ? "bg-lime text-navy" : "bg-slate-700 text-slate-300 active:bg-slate-600 disabled:opacity-40"}`}
      aria-label={label}
    >
      {isPreviewing ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <rect x="5" y="5" width="14" height="14" rx="1" />
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
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const PREVIEW_DURATION_MS = 10_000;
const SFX_PREVIEW_MS = 500;

export function AudioSelectors({
  title = "Audio Selectors",
}: {
  title?: string;
}) {
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

  // Sound FX preview state
  const [sfxOpen, setSfxOpen] = useState(false);
  const [previewingSfx, setPreviewingSfx] = useState<string | null>(null);
  const sfxPreviewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Voice selection state
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  // const [cacheCleared, setCacheCleared] = useState(false);
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

  // async function handleClearCache() {
  //   await clearTtsCache();
  //   setCacheCleared(true);
  //   setTimeout(() => setCacheCleared(false), 2000);
  // }

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

  async function handleSfxPreview(id: string) {
    if (sfxPreviewTimeoutRef.current)
      clearTimeout(sfxPreviewTimeoutRef.current);
    await ensureAudioContextResumed();
    previewSfxPack(id);
    setPreviewingSfx(id);
    sfxPreviewTimeoutRef.current = setTimeout(
      () => setPreviewingSfx(null),
      SFX_PREVIEW_MS,
    );
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
    audio.volume = settings.musicVolume;
    audioRef.current = audio;
    audio.play().catch(() => {
      audioRef.current = null;
      setPreviewingId(null);
    });
    setPreviewingId(id);
    previewTimeoutRef.current = setTimeout(stopPreview, PREVIEW_DURATION_MS);
  }

  useEffect(() => {
    return () => {
      stopPreview();
      if (sfxPreviewTimeoutRef.current)
        clearTimeout(sfxPreviewTimeoutRef.current);
    };
  }, []);

  const volumePercent = Math.round(
    ((settings.musicVolume - MIN_MUSIC_VOLUME) /
      (MAX_MUSIC_VOLUME - MIN_MUSIC_VOLUME)) *
      100,
  );

  return (
    <>
      <SectionHeader label={title} icon={<FaMicrophoneAlt size={20} />} />
      <div className="bg-charcoal/50 rounded-2xl px-4">
        {/* Sound FX selector */}
        <div
          className={`border-b border-lime/50 ${!settings.soundEnabled ? "pointer-events-none" : ""}`}
        >
          <button
            onClick={() => setSfxOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-2 py-4"
          >
            <div
              className={`text-left flex gap-1 transition-opacity ${!settings.soundEnabled ? "opacity-40" : ""}`}
            >
              <p className="text-offwhite text-md font-bold">Sound FX:</p>
              <p className="text-offwhite text-md">
                {SFX_PACK_LIST.find((p) => p.id === settings.sfxPack)?.name ??
                  "Classic"}
              </p>
            </div>
            <ChevronIcon open={sfxOpen} />
          </button>
          <AnimatePresence initial={false}>
            {sfxOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pb-4 space-y-2">
                  {SFX_PACK_LIST.map((pack) => {
                    const isSelected = settings.sfxPack === pack.id;
                    const isPreviewing = previewingSfx === pack.id;
                    return (
                      <div
                        key={pack.id}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isSelected ? "bg-lime/10 border border-lime/40" : "bg-slate-800/50 border border-transparent"}`}
                      >
                        <button
                          className="flex items-center gap-3 flex-1 text-left"
                          onClick={() => updateSettings({ sfxPack: pack.id })}
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
                            {pack.name}
                          </p>
                        </button>
                        <PreviewButton
                          isPreviewing={isPreviewing}
                          onClick={() => handleSfxPreview(pack.id)}
                          label="Preview sound"
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                {getVoiceLabel(voiceName)}
              </p>
            </div>
            <ChevronIcon open={voiceOpen} />
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
                                {voice.displayName ??
                                  formatVoiceLabel(voice.name)}
                              </p>
                              <GenderBadge gender={voice.gender} />
                            </button>
                            <PreviewButton
                              isPreviewing={isPreviewing}
                              onClick={() => handleVoicePreview(voice.name)}
                              disabled={
                                previewingVoice !== null &&
                                previewingVoice !== voice.name
                              }
                              label="Preview voice"
                            />
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
        <div>
          {!isOnline && !trackCached && settings.musicEnabled && (
            <p className="text-xs text-amber-400 pt-4">
              This track hasn't been played yet and isn't available offline.
            </p>
          )}
          <button
            onClick={() => setMusicOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-2 py-4"
          >
            <div className="text-left flex gap-1">
              <p className="text-offwhite text-md font-bold">Music: </p>
              <p className="text-offwhite text-md">
                {MUSIC_TRACKS.find((t) => t.id === settings.musicTrack)?.name ??
                  "None"}
              </p>
            </div>
            <ChevronIcon open={musicOpen} />
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
                        <PreviewButton
                          isPreviewing={isPreviewing}
                          onClick={() => togglePreview(track.id, track.src)}
                          label={isPreviewing ? "Stop preview" : "Preview"}
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Music volume — always visible, independent of the Workout Music toggle */}
        <div className="py-4 border-t border-lime/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-offwhite text-md font-bold">Music Volume</p>
            <span className="text-slate-500 text-xs tabular-nums">
              {volumePercent}%
            </span>
          </div>
          <input
            type="range"
            min={MIN_MUSIC_VOLUME}
            max={MAX_MUSIC_VOLUME}
            step={0.01}
            value={settings.musicVolume}
            onChange={(e) => {
              const vol = parseFloat(e.target.value);
              updateSettings({ musicVolume: vol });
              if (audioRef.current) audioRef.current.volume = vol;
            }}
            className="w-full accent-lime"
            aria-label="Music volume"
          />
        </div>

        {/*
        <button
          onClick={handleClearCache}
          className="w-full text-left text-xs text-slate-500 py-4 border-t border-lime/20 active:text-slate-300 transition-colors"
        >
          {cacheCleared ? "Voice cache cleared ✓" : "Clear voice cache"}
        </button>
        */}
      </div>
    </>
  );
}
