// Web Speech API fallback: plain text substitutions for phonetic corrections.
export const SPEECH_CORRECTIONS: [string, string][] = [
  ["Squat Hold", "Squaw Tolled"],
  // add more as needed
];

function normalizeAlternatePronunciation(text: string): string {
  return text.replace(/\balternate\b/gi, (match) =>
    match[0] === "A" ? "Altar-nate" : "altar-nate",
  );
}

export function formatForGoogle(text: string): string {
  return normalizeAlternatePronunciation(text);
}

// Apply all fallback-only pronunciation tweaks in one place.
export function formatForFallbackSpeech(text: string): string {
  const normalized = normalizeAlternatePronunciation(text);
  return SPEECH_CORRECTIONS.reduce(
    (t, [from, to]) => t.replace(from, to),
    normalized,
  );
}
