'use client'

import { create } from 'zustand'
import type { UserLevel } from '@/types'
import { getLevel, saveLevel } from '@/lib/storage'

interface UserState {
  level: UserLevel
  hydrated: boolean
  hydrate: () => void
  setLevel: (level: UserLevel) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  level: 1,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return
    set({ level: getLevel(), hydrated: true })
  },
  setLevel: (level) => {
    saveLevel(level)
    set({ level })
  },
}))
