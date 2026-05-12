import type { TimerSnapshot } from '@/types'

export function getRemainingMs(snapshot: TimerSnapshot): number {
  const { startTs, pausedTs, accPauseMs, duration } = snapshot
  if (!startTs) return duration * 1000
  const now = pausedTs ?? Date.now()
  const elapsed = now - startTs - accPauseMs
  return Math.max(0, duration * 1000 - elapsed)
}

export function getProgress(snapshot: TimerSnapshot): number {
  if (!snapshot.startTs) return 0
  const elapsed = snapshot.duration * 1000 - getRemainingMs(snapshot)
  return Math.min(1, Math.max(0, elapsed / (snapshot.duration * 1000)))
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  return `${secs}`
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins === 0) return `${secs}s`
  if (secs === 0) return `${mins}m`
  return `${mins}m ${secs}s`
}

export function makeTimerSnapshot(duration: number): TimerSnapshot {
  return {
    startTs: Date.now(),
    pausedTs: null,
    accPauseMs: 0,
    duration,
  }
}

export function pauseSnapshot(snapshot: TimerSnapshot): TimerSnapshot {
  if (snapshot.pausedTs) return snapshot
  return { ...snapshot, pausedTs: Date.now() }
}

export function resumeSnapshot(snapshot: TimerSnapshot): TimerSnapshot {
  if (!snapshot.pausedTs) return snapshot
  return {
    ...snapshot,
    accPauseMs: snapshot.accPauseMs + (Date.now() - snapshot.pausedTs),
    pausedTs: null,
  }
}
