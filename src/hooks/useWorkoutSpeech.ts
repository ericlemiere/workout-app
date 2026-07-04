"use client";

import { useRef, useState, useEffect } from "react";
import { getAudioContext, ensureAudioContextResumed } from "@/lib/audio";
import { getFromCache, saveToCache } from "@/lib/ttsCache";
import { DEFAULT_VOICE } from "@/store/userStore";
import { formatForFallbackSpeech, formatForGoogle } from "@/lib/ttsCorrections";

// Preferred Web Speech API voices for the fallback path.
const WEB_SPEECH_PREFERRED = [
  "Oliver (Enhanced)",
  "Oliver",
  "Samantha (Enhanced)",
  "Samantha",
];

const QUOTA_BACKOFF_MS = 10 * 60 * 1000;
const INVALID_ARGUMENT_BACKOFF_MS = 5 * 60 * 1000;
let cloudTtsBlockedUntil = 0;
let lastQuotaWarnAt = 0;
let lastInvalidArgumentWarnAt = 0;

async function playViaAudioContext(
  blob: Blob,
  sourceRef: React.MutableRefObject<AudioBufferSourceNode | null>,
): Promise<void> {
  const ctx = getAudioContext();
  if (!ctx) throw new Error("no AudioContext");

  await ensureAudioContextResumed();

  const ab = await blob.arrayBuffer();
  const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
    ctx.decodeAudioData(ab, resolve, reject);
  });

  return new Promise<void>((resolve) => {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    sourceRef.current = source;
    source.onended = () => {
      sourceRef.current = null;
      resolve();
    };
    source.start();
  });
}

async function speakFallback(text: string, voicePref: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1;
    u.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const lang = voicePref.split("-").slice(0, 2).join("-");

    const voice =
      voices.find((v) => WEB_SPEECH_PREFERRED.includes(v.name)) ??
      voices.find((v) => v.lang === lang) ??
      voices.find((v) => v.lang.startsWith("en-US")) ??
      voices.find((v) => v.lang.startsWith("en")) ??
      null;

    if (voice) u.voice = voice;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export function useWorkoutSpeech(voicePreference: string = DEFAULT_VOICE) {
  const queueRef = useRef<string[]>([]);
  const processingRef = useRef(false);
  const genRef = useRef(0);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const supported = typeof window !== "undefined";

  function stopAudio() {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch {}
      sourceRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function cancel() {
    genRef.current++;
    queueRef.current = [];
    processingRef.current = false;
    setIsSpeaking(false);
    stopAudio();
  }

  async function fetchBlob(text: string, voice: string): Promise<Blob> {
    if (Date.now() < cloudTtsBlockedUntil) {
      throw new Error("TTS_QUOTA_COOLDOWN");
    }
    const cloudText = formatForGoogle(text);

    const cached = await getFromCache(cloudText, voice);
    if (cached) return cached;

    const controller = new AbortController();
    abortRef.current = controller;

    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cloudText, voiceName: voice }),
      signal: controller.signal,
    });
    abortRef.current = null;

    if (!res.ok) {
      if (res.status === 400) {
        cloudTtsBlockedUntil = Date.now() + INVALID_ARGUMENT_BACKOFF_MS;

        const now = Date.now();
        if (now - lastInvalidArgumentWarnAt > 30_000) {
          lastInvalidArgumentWarnAt = now;
          console.warn(
            `[tts] Cloud TTS rejected request; using fallback speech for ${Math.round(INVALID_ARGUMENT_BACKOFF_MS / 60000)} minutes.`,
          );
        }

        throw new Error("TTS_INVALID_ARGUMENT");
      }

      if (res.status === 429) {
        cloudTtsBlockedUntil = Date.now() + QUOTA_BACKOFF_MS;

        const now = Date.now();
        // Keep the console useful while still surfacing why cloud TTS is skipped.
        if (now - lastQuotaWarnAt > 30_000) {
          lastQuotaWarnAt = now;
          console.warn(
            `[tts] Cloud quota exhausted; using fallback speech for ${Math.round(QUOTA_BACKOFF_MS / 60000)} minutes.`,
          );
        }

        throw new Error("TTS_QUOTA_EXHAUSTED");
      }

      throw new Error("TTS API failed");
    }

    const blob = await res.blob();
    await saveToCache(cloudText, voice, blob);
    return blob;
  }

  async function processQueue() {
    const myGen = genRef.current;
    if (processingRef.current || queueRef.current.length === 0) return;
    processingRef.current = true;
    setIsSpeaking(true);

    const text = queueRef.current.shift()!;
    let played = false;

    try {
      const blob = await fetchBlob(text, voicePreference);
      if (myGen !== genRef.current) return;
      await playViaAudioContext(blob, sourceRef);
      played = true;
    } catch {
      if (myGen !== genRef.current) return;
    }

    if (!played && myGen === genRef.current) {
      try {
        await speakFallback(formatForFallbackSpeech(text), voicePreference);
      } catch {}
    }

    if (myGen !== genRef.current) return;

    processingRef.current = false;
    if (queueRef.current.length > 0) {
      processQueue();
    } else {
      setIsSpeaking(false);
    }
  }

  // Must be called synchronously inside a user gesture to unlock iOS audio.
  function unlock() {
    if (!supported) return;
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
    ensureAudioContextResumed();
  }

  function speak(text: string) {
    if (!supported) return;
    queueRef.current.push(text);
    processQueue();
  }

  // Preview a specific voice outside the queue (for settings audition).
  async function preview(text: string, voiceName: string): Promise<void> {
    cancel();
    let played = false;
    try {
      const blob = await fetchBlob(text, voiceName);
      await playViaAudioContext(blob, sourceRef);
      played = true;
    } catch {
      if (!played) {
        try {
          await speakFallback(formatForFallbackSpeech(text), voiceName);
        } catch {}
      }
    }
  }

  useEffect(() => {
    return () => {
      queueRef.current = [];
      processingRef.current = false;
      stopAudio();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { unlock, speak, cancel, preview, isSpeaking };
}
