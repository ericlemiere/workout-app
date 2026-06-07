'use client'

import { create } from 'zustand'
import type { UserLevel } from '@/types'
import { getLevel, saveLevel } from '@/lib/storage'

interface UserState {
  level: UserLevel
  hydrated: boolean
  authReady: boolean
  splashDone: boolean
  showLogin: boolean
  syncError: string | null
  displayName: string
  userEmail: string | null
  hydrate: () => void
  rehydrate: () => void
  setLevel: (level: UserLevel) => void
  setAuthReady: () => void
  setSplashDone: () => void
  setShowLogin: (v: boolean) => void
  setSyncError: (msg: string | null) => void
  setDisplayName: (name: string) => void
  setUserEmail: (email: string | null) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  level: 1,
  hydrated: false,
  authReady: false,
  splashDone: false,
  showLogin: false,
  syncError: null,
  displayName: 'Guest',
  userEmail: null,
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
  setShowLogin: (v) => set({ showLogin: v }),
  setSyncError: (msg) => set({ syncError: msg }),
  setDisplayName: (name) => set({ displayName: name }),
  setUserEmail: (email) => set({ userEmail: email }),
}))
