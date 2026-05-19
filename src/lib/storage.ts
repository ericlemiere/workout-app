import type { CompletedWorkout, StreakData, AppSettings } from '@/types'

const KEYS = {
  completed: 'workout_completed',
  streak: 'workout_streak',
  settings: 'workout_settings',
  cycleStartedAt: 'workout_cycle_start',
  lunarCycles: 'workout_lunar_cycles',
  totalCycles: 'workout_total_cycles',
  cycleCompleteAcknowledged: 'workout_cycle_ack',
} as const

export function getCompletedWorkouts(): CompletedWorkout[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEYS.completed) ?? '[]')
  } catch {
    return []
  }
}

export function addCompletedWorkout(entry: CompletedWorkout): void {
  const existing = getCompletedWorkouts()
  existing.push(entry)
  localStorage.setItem(KEYS.completed, JSON.stringify(existing))
}

export function getStreakData(): StreakData {
  if (typeof window === 'undefined') {
    return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null }
  }
  try {
    return JSON.parse(localStorage.getItem(KEYS.streak) ?? 'null') ?? {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
    }
  } catch {
    return { currentStreak: 0, longestStreak: 0, lastCompletedDate: null }
  }
}

export function updateStreakData(completedDate: string): StreakData {
  const streak = getStreakData()
  const today = completedDate
  const [y, m, d] = today.split('-').map(Number)
  const prev = new Date(y, m - 1, d - 1)
  const yesterday = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-${String(prev.getDate()).padStart(2, '0')}`

  let newStreak = streak.currentStreak
  if (streak.lastCompletedDate === today) {
    // Already counted today
  } else if (streak.lastCompletedDate === yesterday) {
    newStreak += 1
  } else {
    newStreak = 1
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, streak.longestStreak),
    lastCompletedDate: today,
  }

  localStorage.setItem(KEYS.streak, JSON.stringify(updated))
  return updated
}

const defaultSettings: AppSettings = {
  soundEnabled: true,
  voiceCuesEnabled: false,
  autoAdvance: true,
  defaultRestDuration: 15,
}

export function getSettings(): AppSettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    return { ...defaultSettings, ...JSON.parse(localStorage.getItem(KEYS.settings) ?? '{}') }
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(KEYS.settings, JSON.stringify(settings))
}

export function getCycleStartedAt(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(KEYS.cycleStartedAt)
}

export function saveCycleStartedAt(ts: string | null): void {
  if (ts === null) localStorage.removeItem(KEYS.cycleStartedAt)
  else localStorage.setItem(KEYS.cycleStartedAt, ts)
}

export function getLunarCycles(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(KEYS.lunarCycles) ?? '0', 10)
}

export function saveLunarCycles(count: number): void {
  localStorage.setItem(KEYS.lunarCycles, String(count))
}

export function getTotalCycles(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(KEYS.totalCycles) ?? '0', 10)
}

export function saveTotalCycles(count: number): void {
  localStorage.setItem(KEYS.totalCycles, String(count))
}

export function getCycleCompleteAcknowledged(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(KEYS.cycleCompleteAcknowledged) === 'true'
}

export function saveCycleCompleteAcknowledged(val: boolean): void {
  localStorage.setItem(KEYS.cycleCompleteAcknowledged, String(val))
}

export function clearAllProgress(): void {
  localStorage.removeItem(KEYS.completed)
  localStorage.removeItem(KEYS.streak)
  localStorage.removeItem(KEYS.cycleStartedAt)
  localStorage.removeItem(KEYS.cycleCompleteAcknowledged)
}
