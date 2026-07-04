import { NextRequest } from "next/server";
import { formatForGoogle } from "@/lib/ttsCorrections";

let lastQuotaLogAt = 0;
let lastInvalidArgLogAt = 0;

export async function POST(request: NextRequest) {
  try {
    const { text, voiceName } = await request.json();
    if (!text || !voiceName) return new Response(null, { status: 400 });
    const normalizedText = formatForGoogle(text);

    const apiKey = process.env.GOOGLE_TTS_API_KEY;
    if (!apiKey) return new Response(null, { status: 500 });

    const languageCode = voiceName.split("-").slice(0, 2).join("-");

    const res = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text: normalizedText },
          voice: { languageCode, name: voiceName },
          audioConfig: { audioEncoding: "MP3" },
        }),
      },
    );

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      if (res.status === 400) {
        const now = Date.now();
        if (now - lastInvalidArgLogAt > 30_000) {
          lastInvalidArgLogAt = now;
          console.warn("[/api/speak] Google TTS invalid argument", errBody);
        }
        return new Response(null, { status: 400 });
      }

      if (res.status === 429) {
        const now = Date.now();
        // Avoid flooding logs when quota is exhausted and many cues are queued.
        if (now - lastQuotaLogAt > 30_000) {
          lastQuotaLogAt = now;
          console.warn("[/api/speak] Google TTS quota exhausted", errBody);
        }
        return new Response(null, { status: 429 });
      }

      console.error("[/api/speak] Google TTS error", res.status, errBody);
      return new Response(null, { status: 500 });
    }

    const { audioContent } = await res.json();
    const binary = Buffer.from(audioContent, "base64");

    return new Response(binary, {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
}
