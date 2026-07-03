import { useProgressStore } from '@/store/progressStore'
import { SFX_PACKS, DEFAULT_SFX_PACK, type ToneSpec } from './sfxPacks'

let audioCtx: AudioContext | null = null

export function getAudioContext(): AudioContext | null {
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

function playSpec(spec: ToneSpec): void {
  playTone(spec.freq, spec.dur, spec.vol, spec.type, spec.delayMs)
}

function getActivePack() {
  const id = useProgressStore.getState().settings.sfxPack
  return SFX_PACKS[id] ?? SFX_PACKS[DEFAULT_SFX_PACK]
}

export function playCountdownBeep(countValue: number): void {
  playSpec(getActivePack().countdown)
}

export function playGoBeep(): void {
  getActivePack().go.forEach(playSpec)
}

export function playCompleteSound(): void {
  getActivePack().complete.forEach(playSpec)
}

export function previewSfxPack(id: string): void {
  const pack = SFX_PACKS[id] ?? SFX_PACKS[DEFAULT_SFX_PACK]
  pack.go.forEach(playSpec)
}
