interface GoogleVoice {
  name: string
  languageCodes: string[]
  ssmlGender: string
  naturalSampleRateHertz: number
}

function voiceDescription(name: string): string {
  if (name.includes('Studio')) return 'Studio'
  if (name.includes('Journey')) return 'Journey'
  if (name.includes('Neural2')) return 'Neural'
  if (name.includes('Wavenet') || name.includes('WaveNet')) return 'WaveNet'
  return 'Standard'
}

const TYPE_ORDER = ['Studio', 'Journey', 'Neural', 'WaveNet', 'Standard']

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_TTS_API_KEY
    if (!apiKey) return new Response(null, { status: 500 })

    const res = await fetch(
      `https://texttospeech.googleapis.com/v1/voices?key=${apiKey}`,
    )
    if (!res.ok) {
      const errBody = await res.text().catch(() => '')
      console.error('[/api/voices] Google TTS error', res.status, errBody)
      return new Response(null, { status: 500 })
    }

    const { voices }: { voices: GoogleVoice[] } = await res.json()

    const filtered = voices
      .filter(
        (v) =>
          v.languageCodes.some((lc) => lc === 'en-US' || lc === 'en-GB') &&
          (v.name.startsWith('en-US-') || v.name.startsWith('en-GB-')),
      )
      .map((v) => ({
        name: v.name,
        languageCode:
          v.languageCodes.find((lc) => lc === 'en-US' || lc === 'en-GB') ??
          v.languageCodes[0],
        gender: v.ssmlGender,
        description: voiceDescription(v.name),
      }))
      .sort((a, b) => {
        const langOrder = a.languageCode === 'en-US' ? 0 : 1
        const langOrderB = b.languageCode === 'en-US' ? 0 : 1
        if (langOrder !== langOrderB) return langOrder - langOrderB
        return (
          TYPE_ORDER.indexOf(a.description) -
          TYPE_ORDER.indexOf(b.description)
        )
      })

    return Response.json(filtered, {
      headers: { 'Cache-Control': 'public, max-age=86400' },
    })
  } catch (err) {
    console.error('[/api/voices] unexpected error', err)
    return new Response(null, { status: 500 })
  }
}
