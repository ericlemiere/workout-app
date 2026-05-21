let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx || audioCtx.state === 'closed') {
    try {
      audioCtx = new AudioContext()
    } catch {
      return null
    }
  }
  return audioCtx
}

export async function ensureAudioContextResumed(): Promise<void> {
  const ctx = getAudioContext()
  if (ctx && ctx.state === 'suspended') {
    await ctx.resume()
  }
}

function playTone(
  frequency: number,
  durationSec: number,
  volume: number = 0.4,
  type: OscillatorType = 'sine',
  delayMs: number = 0,
): void {
  const ctx = getAudioContext()
  if (!ctx) return

  const startTime = ctx.currentTime + delayMs / 1000
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(frequency, startTime)
  gain.gain.setValueAtTime(volume, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec)
  osc.start(startTime)
  osc.stop(startTime + durationSec + 0.05)
}

export function playCountdownBeep(countValue: number): void {
  playTone(660, 0.12, 0.35)
}

export function playGoBeep(): void {
  playTone(880, 0.08, 0.4)
  playTone(1100, 0.15, 0.4, 'sine', 100)
}

export function playRestBeep(): void {
  playTone(880, 0.18, 0.3)
  playTone(660, 0.18, 0.3, 'sine', 220)
  playTone(440, 0.25, 0.3, 'sine', 440)
}

export function playCompleteSound(): void {
  playTone(880, 0.1, 0.4)
  playTone(1100, 0.1, 0.4, 'sine', 150)
  playTone(1320, 0.25, 0.4, 'sine', 300)
}
