'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useWorkoutStore } from '@/store/workoutStore'
import { useProgressStore } from '@/store/progressStore'
import { playCountdownBeep, playGoBeep, playRestBeep, playCompleteSound, ensureAudioContextResumed } from '@/lib/audio'
import { getRemainingMs } from '@/lib/timer'

export function useWorkoutTimer(onComplete?: () => void) {
  const next = useWorkoutStore((s) => s.next)
  const finishGetReady = useWorkoutStore((s) => s.finishGetReady)
  const isPaused = useWorkoutStore((s) => s.isPaused)
  const section = useWorkoutStore((s) => s.section)
  const isResting = useWorkoutStore((s) => s.isResting)
  const isGetReady = useWorkoutStore((s) => s.isGetReady)
  const timer = useWorkoutStore((s) => s.timer)
  const workoutStartTs = useWorkoutStore((s) => s.workoutStartTs)
  const soundEnabled = useProgressStore((s) => s.settings.soundEnabled)
  const autoAdvance = useProgressStore((s) => s.settings.autoAdvance)

  const [remainingMs, setRemainingMs] = useState(() => getRemainingMs(timer))
  const lastBeepRef = useRef<number>(-1)
  const hasCompletedRef = useRef(false)

  // Reset completion guard when timer resets
  useEffect(() => {
    hasCompletedRef.current = false
    lastBeepRef.current = -1
    setRemainingMs(getRemainingMs(timer))
  }, [timer.startTs, timer.duration])

  useEffect(() => {
    if (isPaused || section === 'complete' || section === 'intro') return

    const interval = setInterval(() => {
      const ms = getRemainingMs(timer)
      setRemainingMs(ms)

      if (soundEnabled && !isPaused) {
        const secs = Math.ceil(ms / 1000)
        if (secs <= 3 && secs >= 1 && secs !== lastBeepRef.current) {
          lastBeepRef.current = secs
          playCountdownBeep(secs)
        }
      }

      if (ms <= 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true
        if (isGetReady) {
          if (soundEnabled) playGoBeep()
          finishGetReady()
        } else {
          if (soundEnabled) {
            if (isResting) playGoBeep()
            else playGoBeep()
          }
          if (autoAdvance) next()
        }
        onComplete?.()
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isPaused, section, timer, soundEnabled, autoAdvance, isResting, next, onComplete])

  const totalWorkoutElapsed = workoutStartTs ? Date.now() - workoutStartTs : 0

  return { remainingMs, totalWorkoutElapsed }
}

export function useVibration() {
  const vibrationEnabled = useProgressStore((s) => s.settings.vibrationEnabled)

  return useCallback(
    (pattern: number | number[] = 50) => {
      if (!vibrationEnabled) return
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern)
      }
    },
    [vibrationEnabled],
  )
}
