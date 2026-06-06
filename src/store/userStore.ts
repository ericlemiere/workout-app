'use client'

import { create } from 'zustand'
import type { UserLevel } from '@/types'
import { getLevel, saveLevel } from '@/lib/storage'

interface UserState {
  level: UserLevel
  hydrated: boolean
  authReady: boolean
  splashDone: boolean
  hydrate: () => void
  rehydrate: () => void
  setLevel: (level: UserLevel) => void
  setAuthReady: () => void
  setSplashDone: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  level: 1,
  hydrated: false,
  authReady: false,
  splashDone: false,
  hydrate: () => {
    if (get().hydrated) return
    set({ level: getLevel(), hydrated: true })
  },
  rehydrate: () => {
    set({ level: getLevel(), hydrated: true })
  },
  setLevel: (level) => {
    saveLevel(level)
    set({ level })
  },
  setAuthReady: () => set({ authReady: true }),
  setSplashDone: () => set({ splashDone: true }),
}))
