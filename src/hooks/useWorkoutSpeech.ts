"use client";

import { useRef, useState, useEffect } from "react";

// Maps display text to a speech-friendly pronunciation without altering what's shown on screen.
const SPEECH_CORRECTIONS: [string, string][] = [
  ["Squat Hold", "Squaw Tolled"],
  // add more as needed
];

function formatForSpeech(text: string): string {
  return SPEECH_CORRECTIONS.reduce(
    (t, [from, to]) => t.replace(from, to),
    text,
  );
}

export function useWorkoutSpeech() {
  const queueRef = useRef<string[]>([]);
  const speakingRef = useRef(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  // Must be called synchronously inside a user gesture handler to unlock iOS audio.
  function unlock() {
    if (!supported) return;
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }

  function drainQueue() {
    if (!supported) return;
    if (speakingRef.current || queueRef.current.length === 0) return;

    const text = queueRef.current.shift()!;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    u.pitch = 1;
    u.volume = 1;

    speakingRef.current = true;
    setIsSpeaking(true);

    u.onend = () => {
      speakingRef.current = false;
      setIsSpeaking(false);
      drainQueue();
    };
    u.onerror = () => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[speech] utterance error");
      }
      speakingRef.current = false;
      setIsSpeaking(false);
      drainQueue();
    };

    window.speechSynthesis.speak(u);
  }

  function speak(text: string) {
    if (!supported) return;
    queueRef.current.push(formatForSpeech(text));
    drainQueue();
  }

  function cancel() {
    if (!supported) return;
    queueRef.current = [];
    speakingRef.current = false;
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  }

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        queueRef.current = [];
        speakingRef.current = false;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { unlock, speak, cancel, isSpeaking };
}
