'use client'

import { create } from 'zustand'
import type { CompletedWorkout, StreakData, AppSettings, UserLevel } from '@/types'
import {
  addCompletedWorkout,
  getCompletedWorkouts,
  getStreakData,
  updateStreakData,
  getSettings,
  saveSettings,
  getCycleStartedAt,
  saveCycleStartedAt,
  clearAllProgress,
  getLunarCycles,
  saveLunarCycles,
  getTotalCycles,
  saveTotalCycles,
  getCycleCompleteAcknowledged,
  saveCycleCompleteAcknowledged,
  getEarnedAchievements,
  saveEarnedAchievements,
  getLevelCycles,
  saveLevelCycles,
  getLevelLunarCycles,
  saveLevelLunarCycles,
} from '@/lib/storage'
import { evaluateAchievements } from '@/lib/achievements'
import { pushProgress } from '@/lib/sync'
import { useUserStore } from '@/store/userStore'

interface ProgressState {
  completed: CompletedWorkout[]
  streak: StreakData
  settings: AppSettings
  cycleStartedAt: string | null
  lunarCycles: number
  totalCycles: number
  levelCycles: Record<UserLevel, number>
  levelLunarCycles: Record<2 | 3, number>
  cycleCompleteAcknowledged: boolean
  earnedAchievements: Set<string>
  pendingAchievements: string[]
  hydrated: boolean

  hydrate: () => void
  rehydrate: () => void
  recordCompletion: (workoutId: string, durationMs: number, level?: UserLevel) => void
  updateSettings: (partial: Partial<AppSettings>) => void
  resetGrid: () => void
  resetAllStats: () => void
  completeCycle: (earnedLunarCycle: boolean, level: UserLevel) => void
  acknowledgeCycleComplete: () => void
  dismissPendingAchievement: () => void
}

function checkAndAward(
  state: Pick<ProgressState, 'completed' | 'streak' | 'lunarCycles' | 'totalCycles' | 'levelCycles' | 'levelLunarCycles' | 'earnedAchievements' | 'pendingAchievements'>
): { earnedAchievements: Set<string>; pendingAchievements: string[] } | null {
  const nowEarned = evaluateAchievements({
    completed: state.completed,
    streak: state.streak,
    lunarCycles: state.lunarCycles,
    totalCycles: state.totalCycles,
    levelCycles: state.levelCycles,
    levelLunarCycles: state.levelLunarCycles,
  })
  const newIds = [...nowEarned].filter(id => !state.earnedAchievements.has(id))
  if (newIds.length === 0) return null
  const updated = new Set([...state.earnedAchievements, ...newIds])
  saveEarnedAchievements(updated)
  return {
    earnedAchievements: updated,
    pendingAchievements: [...state.pendingAchievements, ...newIds],
  }
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completed: [],
  streak: { currentStreak: 0, longestStreak: 0, lastCompletedDate: null },
  settings: {
    soundEnabled: true,
    hapticsEnabled: false,
    voiceCuesEnabled: false,
  },
  cycleStartedAt: null,
  lunarCycles: 0,
  totalCycles: 0,
  levelCycles: { 1: 0, 2: 0, 3: 0 },
  levelLunarCycles: { 2: 0, 3: 0 },
  cycleCompleteAcknowledged: false,
  earnedAchievements: new Set(),
  pendingAchievements: [],
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return
    const totalCycles = getTotalCycles()
    const levelCycles = getLevelCycles()
    // Migration: credit all pre-existing cycles to Level 1
    if (totalCycles > 0 && levelCycles[1] === 0 && levelCycles[2] === 0 && levelCycles[3] === 0) {
      levelCycles[1] = totalCycles
      saveLevelCycles(levelCycles)
    }
    set({
      completed: getCompletedWorkouts(),
      streak: getStreakData(),
      settings: getSettings(),
      cycleStartedAt: getCycleStartedAt(),
      lunarCycles: getLunarCycles(),
      totalCycles,
      levelCycles,
      levelLunarCycles: getLevelLunarCycles(),
      cycleCompleteAcknowledged: getCycleCompleteAcknowledged(),
      earnedAchievements: getEarnedAchievements(),
      hydrated: true,
    })
  },

  rehydrate: () => {
    const totalCycles = getTotalCycles()
    const levelCycles = getLevelCycles()
    set({
      completed: getCompletedWorkouts(),
      streak: getStreakData(),
      settings: getSettings(),
      cycleStartedAt: getCycleStartedAt(),
      lunarCycles: getLunarCycles(),
      totalCycles,
      levelCycles,
      levelLunarCycles: getLevelLunarCycles(),
      cycleCompleteAcknowledged: getCycleCompleteAcknowledged(),
      earnedAchievements: getEarnedAchievements(),
      hydrated: true,
    })
  },

  recordCompletion: (workoutId, durationMs, level = 1) => {
    const now = new Date()
    const entry: CompletedWorkout = {
      workoutId,
      completedAt: now.toISOString(),
      durationMs,
      level,
    }
    addCompletedWorkout(entry)
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const updatedStreak = updateStreakData(today)

    set(s => {
      const next = {
        ...s,
        completed: [...s.completed, entry],
        streak: updatedStreak,
      }
      const award = checkAndAward(next)
      return award ? { ...next, ...award } : next
    })
    pushProgress().catch((err) => {
      console.error('[MOOV] Sync failed after workout completion:', err)
      useUserStore.getState().setSyncError('Sync failed. Your workout is saved on this device.')
    })
  },

  updateSettings: (partial) => {
    const updated = { ...get().settings, ...partial }
    saveSettings(updated)
    set({ settings: updated })
  },

  resetGrid: () => {
    const ts = new Date().toISOString()
    saveCycleStartedAt(ts)
    saveCycleCompleteAcknowledged(false)
    set({ cycleStartedAt: ts, cycleCompleteAcknowledged: false })
  },

  resetAllStats: () => {
    clearAllProgress()
    set({
      completed: [],
      streak: { currentStreak: 0, longestStreak: 0, lastCompletedDate: null },
      cycleStartedAt: null,
      cycleCompleteAcknowledged: false,
      lunarCycles: 0,
      totalCycles: 0,
      levelCycles: { 1: 0, 2: 0, 3: 0 },
      levelLunarCycles: { 2: 0, 3: 0 },
      earnedAchievements: new Set(),
      pendingAchievements: [],
    })
  },

  completeCycle: (earnedLunarCycle, level) => {
    const s = get()
    const nextLunar = earnedLunarCycle ? s.lunarCycles + 1 : s.lunarCycles
    const nextTotal = s.totalCycles + 1
    const nextLevelCycles: Record<UserLevel, number> = {
      ...s.levelCycles,
      [level]: s.levelCycles[level] + 1,
    }
    const nextLevelLunarCycles: Record<2 | 3, number> = { ...s.levelLunarCycles }
    if (earnedLunarCycle && (level === 2 || level === 3)) {
      nextLevelLunarCycles[level] = s.levelLunarCycles[level] + 1
    }

    if (earnedLunarCycle) saveLunarCycles(nextLunar)
    saveTotalCycles(nextTotal)
    saveLevelCycles(nextLevelCycles)
    saveLevelLunarCycles(nextLevelLunarCycles)

    const ts = new Date().toISOString()
    saveCycleStartedAt(ts)
    saveCycleCompleteAcknowledged(false)

    const next = {
      ...s,
      lunarCycles: nextLunar,
      totalCycles: nextTotal,
      levelCycles: nextLevelCycles,
      levelLunarCycles: nextLevelLunarCycles,
      cycleStartedAt: ts,
      cycleCompleteAcknowledged: false,
    }
    const award = checkAndAward(next)
    set(award ? { ...next, ...award } : next)
    pushProgress().catch((err) => {
      console.error('[MOOV] Sync failed after cycle completion:', err)
      useUserStore.getState().setSyncError('Sync failed. Your progress is saved on this device.')
    })
  },

  acknowledgeCycleComplete: () => {
    saveCycleCompleteAcknowledged(true)
    set({ cycleCompleteAcknowledged: true })
  },

  dismissPendingAchievement: () => {
    set(s => ({ pendingAchievements: s.pendingAchievements.slice(1) }))
  },
}))
