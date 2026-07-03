// Web Speech API fallback: plain text substitutions for phonetic corrections.
export const SPEECH_CORRECTIONS: [string, string][] = [
  ["Squat Hold", "Squaw Tolled"],
  // add more as needed
];

export function formatForGoogle(text: string): string {
  return text;
}

// Apply all fallback-only pronunciation tweaks in one place.
export function formatForFallbackSpeech(text: string): string {
  return SPEECH_CORRECTIONS.reduce(
    (t, [from, to]) => t.replace(from, to),
    text,
  );
}
