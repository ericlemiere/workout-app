// Google TTS: SSML substitutions — [word, how to say it].
export const GOOGLE_CORRECTIONS: [string, string][] = [
  ["alternate", "all-ter-nate"],
  // add more as needed
];

// Web Speech API fallback: plain text substitutions for phonetic corrections.
export const SPEECH_CORRECTIONS: [string, string][] = [
  ["Squat Hold", "Squaw Tolled"],
  // add more as needed
];

function applyGoogleCorrections(
  text: string,
  toReplacement: (word: string, alias: string) => string,
): string {
  let result = text;
  for (const [word, alias] of GOOGLE_CORRECTIONS) {
    const re = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(re, () => toReplacement(word, alias));
  }
  return result;
}

export function formatForGoogle(text: string): string {
  const corrected = applyGoogleCorrections(
    text,
    (word, alias) => `<sub alias="${alias}">${word}</sub>`,
  );
  return corrected === text ? text : `<speak>${corrected}</speak>`;
}

// Fallback speech engines do not support SSML; use the alias text directly.
export function formatGoogleCorrectionsForSpeech(text: string): string {
  return applyGoogleCorrections(text, (_word, alias) => alias);
}

// Apply all fallback-only pronunciation tweaks in one place.
export function formatForFallbackSpeech(text: string): string {
  const speechCorrected = SPEECH_CORRECTIONS.reduce(
    (t, [from, to]) => t.replace(from, to),
    text,
  );
  return formatGoogleCorrectionsForSpeech(speechCorrected);
}
