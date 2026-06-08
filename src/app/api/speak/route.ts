import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, voiceName } = await request.json()
    if (!text || !voiceName) return new Response(null, { status: 400 })

    const apiKey = process.env.GOOGLE_TTS_API_KEY
    if (!apiKey) return new Response(null, { status: 500 })

    const languageCode = voiceName.split('-').slice(0, 2).join('-')

    const res = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: text.startsWith('<speak>') ? { ssml: text } : { text },
          voice: { languageCode, name: voiceName },
          audioConfig: { audioEncoding: 'MP3' },
        }),
      },
    )

    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error('[/api/speak] Google TTS error', res.status, errBody)
      return new Response(null, { status: 500 })
    }

    const { audioContent } = await res.json()
    const binary = Buffer.from(audioContent, 'base64')

    return new Response(binary, {
      status: 200,
      headers: { 'Content-Type': 'audio/mpeg' },
    })
  } catch {
    return new Response(null, { status: 500 })
  }
}
