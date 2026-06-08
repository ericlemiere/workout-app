// Google TTS: SSML substitutions — [word, how to say it].
export const GOOGLE_CORRECTIONS: [string, string][] = [
  ["alternate", "all-ter-nate"],
  // add more as needed
];

export function formatForGoogle(text: string): string {
  let result = text;
  let changed = false;
  for (const [word, alias] of GOOGLE_CORRECTIONS) {
    const re = new RegExp(`\\b${word}\\b`, "gi");
    const replaced = result.replace(re, `<sub alias="${alias}">${word}</sub>`);
    if (replaced !== result) {
      changed = true;
      result = replaced;
    }
  }
  return changed ? `<speak>${result}</speak>` : text;
}
