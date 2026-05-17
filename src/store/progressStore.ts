'use client'

import { create } from 'zustand'
import type { CompletedWorkout, StreakData, AppSettings } from '@/types'
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
  getCycleCompleteAcknowledged,
  saveCycleCompleteAcknowledged,
} from '@/lib/storage'

interface ProgressState {
  completed: CompletedWorkout[]
  streak: StreakData
  settings: AppSettings
  cycleStartedAt: string | null
  lunarCycles: number
  cycleCompleteAcknowledged: boolean
  hydrated: boolean

  hydrate: () => void
  recordCompletion: (workoutId: string, durationMs: number) => void
  updateSettings: (partial: Partial<AppSettings>) => void
  resetGrid: () => void
  resetAllStats: () => void
  completeCycle: (earnedLunarCycle: boolean) => void
  acknowledgeCycleComplete: () => void
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completed: [],
  streak: { currentStreak: 0, longestStreak: 0, lastCompletedDate: null },
  settings: {
    soundEnabled: true,
    voiceCuesEnabled: false,
    autoAdvance: true,
    defaultRestDuration: 15,
  },
  cycleStartedAt: null,
  lunarCycles: 0,
  cycleCompleteAcknowledged: false,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return
    set({
      completed: getCompletedWorkouts(),
      streak: getStreakData(),
      settings: getSettings(),
      cycleStartedAt: getCycleStartedAt(),
      lunarCycles: getLunarCycles(),
      cycleCompleteAcknowledged: getCycleCompleteAcknowledged(),
      hydrated: true,
    })
  },

  recordCompletion: (workoutId, durationMs) => {
    const now = new Date()
    const entry: CompletedWorkout = {
      workoutId,
      completedAt: now.toISOString(),
      durationMs,
    }
    addCompletedWorkout(entry)
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const updatedStreak = updateStreakData(today)
    set((s) => ({
      completed: [...s.completed, entry],
      streak: updatedStreak,
    }))
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
    })
  },

  completeCycle: (earnedLunarCycle) => {
    const current = get().lunarCycles
    const next = earnedLunarCycle ? current + 1 : current
    if (earnedLunarCycle) saveLunarCycles(next)
    // Reset the grid for the new cycle
    const ts = new Date().toISOString()
    saveCycleStartedAt(ts)
    saveCycleCompleteAcknowledged(false)
    set({ lunarCycles: next, cycleStartedAt: ts, cycleCompleteAcknowledged: false })
  },

  acknowledgeCycleComplete: () => {
    saveCycleCompleteAcknowledged(true)
    set({ cycleCompleteAcknowledged: true })
  },
}))
