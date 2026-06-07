import { createClient } from './supabase/client'
import type { CompletedWorkout, StreakData, AppSettings, UserLevel } from '@/types'
import {
  getCompletedWorkouts, getStreakData, getSettings, getCycleStartedAt,
  getLunarCycles, getTotalCycles, getCycleCompleteAcknowledged,
  getEarnedAchievements, getLevelCycles, getLevelLunarCycles, getLevel,
  saveCompletedWorkouts, saveStreakData, saveSettings, saveCycleStartedAt,
  saveLunarCycles, saveTotalCycles, saveCycleCompleteAcknowledged,
  saveEarnedAchievements, saveLevelCycles, saveLevelLunarCycles, saveLevel,
} from './storage'

export interface ProgressSnapshot {
  completed: CompletedWorkout[]
  streak: StreakData
  settings: AppSettings
  cycleStartedAt: string | null
  lunarCycles: number
  totalCycles: number
  levelCycles: Record<string, number>
  levelLunarCycles: Record<string, number>
  cycleCompleteAcknowledged: boolean
  earnedAchievements: string[]
  level: number
  updatedAt: string
}

function captureLocal(): ProgressSnapshot {
  return {
    completed: getCompletedWorkouts(),
    streak: getStreakData(),
    settings: getSettings(),
    cycleStartedAt: getCycleStartedAt(),
    lunarCycles: getLunarCycles(),
    totalCycles: getTotalCycles(),
    cycleCompleteAcknowledged: getCycleCompleteAcknowledged(),
    earnedAchievements: Array.from(getEarnedAchievements()),
    levelCycles: getLevelCycles(),
    levelLunarCycles: getLevelLunarCycles(),
    level: getLevel(),
    updatedAt: new Date().toISOString(),
  }
}

function applyToStorage(snap: ProgressSnapshot) {
  saveCompletedWorkouts(snap.completed)
  saveStreakData(snap.streak)
  saveSettings(snap.settings)
  saveCycleStartedAt(snap.cycleStartedAt)
  saveLunarCycles(snap.lunarCycles)
  saveTotalCycles(snap.totalCycles)
  saveCycleCompleteAcknowledged(snap.cycleCompleteAcknowledged)
  saveEarnedAchievements(new Set(snap.earnedAchievements))
  saveLevelCycles(snap.levelCycles as Record<UserLevel, number>)
  saveLevelLunarCycles(snap.levelLunarCycles as Record<2 | 3, number>)
  saveLevel(Math.min(3, Math.max(1, snap.level)) as UserLevel)
}

function merge(local: ProgressSnapshot, remote: ProgressSnapshot): ProgressSnapshot {
  // Union completed workouts by completedAt timestamp
  const map = new Map<string, CompletedWorkout>()
  ;[...local.completed, ...remote.completed].forEach(w => map.set(w.completedAt, w))
  const completed = [...map.values()].sort((a, b) => a.completedAt.localeCompare(b.completedAt))

  // Union achievements
  const earnedAchievements = [...new Set([...local.earnedAchievements, ...remote.earnedAchievements])]

  // Take the higher numeric values
  const totalCycles = Math.max(local.totalCycles, remote.totalCycles)
  const lunarCycles = Math.max(local.lunarCycles, remote.lunarCycles)
  const levelCycles = {
    1: Math.max(local.levelCycles[1] ?? 0, remote.levelCycles[1] ?? 0),
    2: Math.max(local.levelCycles[2] ?? 0, remote.levelCycles[2] ?? 0),
    3: Math.max(local.levelCycles[3] ?? 0, remote.levelCycles[3] ?? 0),
  }
  const levelLunarCycles = {
    2: Math.max(local.levelLunarCycles[2] ?? 0, remote.levelLunarCycles[2] ?? 0),
    3: Math.max(local.levelLunarCycles[3] ?? 0, remote.levelLunarCycles[3] ?? 0),
  }

  // Use the better streak
  const streak = local.streak.longestStreak >= remote.streak.longestStreak
    ? local.streak : remote.streak

  // Use the more recent cycleStartedAt
  const cycleStartedAt = [local.cycleStartedAt, remote.cycleStartedAt]
    .filter(Boolean)
    .sort()
    .at(-1) ?? null

  return {
    completed,
    streak,
    settings: local.settings,
    cycleStartedAt,
    lunarCycles,
    totalCycles,
    levelCycles,
    levelLunarCycles,
    cycleCompleteAcknowledged: local.cycleCompleteAcknowledged || remote.cycleCompleteAcknowledged,
    earnedAchievements,
    level: Math.max(local.level, remote.level),
    updatedAt: new Date().toISOString(),
  }
}

// Called on sign-in. When mergeLocal is true (same user, session continuing or app
// reopened without signing out), local data is merged with remote so offline work and
// multi-device changes are both preserved. When false (fresh sign-in after sign-out),
// remote is the source of truth — local was cleared on sign-out so no merge is needed.
export async function syncOnLogin(mergeLocal: boolean): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data } = await supabase
    .from('user_progress')
    .select('data')
    .eq('user_id', user.id)
    .single()

  if (!data?.data) return

  const remote = data.data as ProgressSnapshot

  if (mergeLocal) {
    const merged = merge(captureLocal(), remote)
    applyToStorage(merged)
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      data: merged,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
  } else {
    applyToStorage(remote)
  }
}

// Fire-and-forget push after mutations
export async function pushProgress(): Promise<void> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return

  const snapshot = captureLocal()
  await supabase.from('user_progress').upsert({
    user_id: session.user.id,
    data: snapshot,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })
}
