'use client'

import { create } from 'zustand'
import type { Workout, WorkoutSection, Exercise, TimerSnapshot } from '@/types'
import {
  makeTimerSnapshot,
  pauseSnapshot,
  resumeSnapshot,
  getRemainingMs,
  getProgress,
} from '@/lib/timer'

const GET_READY_SECS = 8
const DEFAULT_REST = 15

interface WorkoutState {
  workout: Workout | null
  section: WorkoutSection
  exerciseIndex: number
  isResting: boolean
  isGetReady: boolean        // true during 8-second countdown before each section
  timer: TimerSnapshot
  workoutStartTs: number | null
  isPaused: boolean

  startWorkout: (workout: Workout) => void
  beginSession: () => void
  finishGetReady: () => void // called when get-ready timer hits 0
  pauseWorkout: () => void
  resumeWorkout: () => void
  next: () => void
  prev: () => void
  skip: () => void
  resetWorkout: () => void

  getRemainingMs: () => number
  getProgress: () => number
  getCurrentExercise: () => Exercise | null
  getNextExercise: () => Exercise | null
  getTotalExerciseCount: () => number
  getOverallExerciseNumber: () => number
}

function exercisesForSection(workout: Workout, section: WorkoutSection): Exercise[] {
  if (section === 'warmup') return workout.warmups
  if (section === 'exercise') return workout.exercises
  if (section === 'cooldown') return workout.cooldowns
  return []
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workout: null,
  section: 'intro',
  exerciseIndex: 0,
  isResting: false,
  isGetReady: false,
  timer: makeTimerSnapshot(0),
  workoutStartTs: null,
  isPaused: false,

  startWorkout: (workout) => {
    set({
      workout,
      section: 'intro',
      exerciseIndex: 0,
      isResting: false,
      isGetReady: false,
      timer: makeTimerSnapshot(0),
      workoutStartTs: null,
      isPaused: false,
    })
  },

  // User taps "Start" → 8-second get-ready before first warmup
  beginSession: () => {
    const { workout } = get()
    if (!workout) return
    set({
      section: 'warmup',
      exerciseIndex: 0,
      isResting: false,
      isGetReady: true,
      timer: makeTimerSnapshot(GET_READY_SECS),
      workoutStartTs: Date.now(),
      isPaused: false,
    })
  },

  // Get-ready countdown finished → start actual exercise timer
  finishGetReady: () => {
    const { workout, section, exerciseIndex } = get()
    if (!workout) return
    const list = exercisesForSection(workout, section)
    const duration = list[exerciseIndex]?.duration ?? DEFAULT_REST
    set({ isGetReady: false, timer: makeTimerSnapshot(duration) })
  },

  pauseWorkout: () => {
    const { timer, isPaused } = get()
    if (isPaused) return
    set({ timer: pauseSnapshot(timer), isPaused: true })
  },

  resumeWorkout: () => {
    const { timer, isPaused } = get()
    if (!isPaused) return
    set({ timer: resumeSnapshot(timer), isPaused: false })
  },

  next: () => {
    const { workout, section, exerciseIndex, isResting } = get()
    if (!workout) return

    if (section === 'intro') {
      get().beginSession()
      return
    }

    if (isResting) {
      const nextIdx = exerciseIndex + 1
      const list = exercisesForSection(workout, section)
      if (nextIdx >= list.length) {
        // Rest after last exercise → get-ready for cooldown
        set({
          section: 'cooldown',
          exerciseIndex: 0,
          isResting: false,
          isGetReady: true,
          timer: makeTimerSnapshot(GET_READY_SECS),
        })
      } else {
        set({
          exerciseIndex: nextIdx,
          isResting: false,
          timer: makeTimerSnapshot(list[nextIdx].duration),
        })
      }
      return
    }

    const list = exercisesForSection(workout, section)
    const current = list[exerciseIndex]

    if (section === 'warmup') {
      if (exerciseIndex < list.length - 1) {
        const nextIdx = exerciseIndex + 1
        set({ exerciseIndex: nextIdx, timer: makeTimerSnapshot(list[nextIdx].duration) })
      } else {
        // Last warmup → get-ready for exercises
        set({
          section: 'exercise',
          exerciseIndex: 0,
          isResting: false,
          isGetReady: true,
          timer: makeTimerSnapshot(GET_READY_SECS),
        })
      }
      return
    }

    if (section === 'exercise') {
      const restDur = current.restDuration !== undefined ? current.restDuration : DEFAULT_REST
      const isLastExercise = exerciseIndex >= list.length - 1

      if (!isLastExercise && restDur > 0) {
        set({ isResting: true, timer: makeTimerSnapshot(restDur) })
      } else if (!isLastExercise) {
        const nextIdx = exerciseIndex + 1
        set({ exerciseIndex: nextIdx, timer: makeTimerSnapshot(list[nextIdx].duration) })
      } else {
        // Last exercise → get-ready for cooldown (or complete)
        if (workout.cooldowns.length > 0) {
          set({
            section: 'cooldown',
            exerciseIndex: 0,
            isResting: false,
            isGetReady: true,
            timer: makeTimerSnapshot(GET_READY_SECS),
          })
        } else {
          set({ section: 'complete', timer: makeTimerSnapshot(0) })
        }
      }
      return
    }

    if (section === 'cooldown') {
      if (exerciseIndex < list.length - 1) {
        const nextIdx = exerciseIndex + 1
        set({ exerciseIndex: nextIdx, timer: makeTimerSnapshot(list[nextIdx].duration) })
      } else {
        set({ section: 'complete', timer: makeTimerSnapshot(0) })
      }
      return
    }
  },

  prev: () => {
    const { workout, section, exerciseIndex, isResting, isGetReady } = get()
    if (!workout) return

    // During get-ready, go back to the previous section's last exercise
    if (isGetReady) {
      if (section === 'warmup') {
        set({ section: 'intro', isGetReady: false, timer: makeTimerSnapshot(0) })
      } else if (section === 'exercise') {
        const lastIdx = workout.warmups.length - 1
        set({
          section: 'warmup',
          exerciseIndex: lastIdx,
          isGetReady: false,
          isResting: false,
          timer: makeTimerSnapshot(workout.warmups[lastIdx].duration),
        })
      } else if (section === 'cooldown') {
        const lastIdx = workout.exercises.length - 1
        set({
          section: 'exercise',
          exerciseIndex: lastIdx,
          isGetReady: false,
          isResting: false,
          timer: makeTimerSnapshot(workout.exercises[lastIdx].duration),
        })
      }
      return
    }

    if (isResting) {
      const list = exercisesForSection(workout, section)
      set({ isResting: false, timer: makeTimerSnapshot(list[exerciseIndex].duration) })
      return
    }

    if (section === 'warmup') {
      if (exerciseIndex > 0) {
        const prevIdx = exerciseIndex - 1
        set({ exerciseIndex: prevIdx, timer: makeTimerSnapshot(workout.warmups[prevIdx].duration) })
      }
      return
    }

    if (section === 'exercise') {
      if (exerciseIndex > 0) {
        const prevIdx = exerciseIndex - 1
        set({
          exerciseIndex: prevIdx,
          isResting: false,
          timer: makeTimerSnapshot(workout.exercises[prevIdx].duration),
        })
      } else {
        const lastIdx = workout.warmups.length - 1
        set({
          section: 'warmup',
          exerciseIndex: lastIdx,
          isResting: false,
          timer: makeTimerSnapshot(workout.warmups[lastIdx].duration),
        })
      }
      return
    }

    if (section === 'cooldown') {
      if (exerciseIndex > 0) {
        const prevIdx = exerciseIndex - 1
        set({ exerciseIndex: prevIdx, timer: makeTimerSnapshot(workout.cooldowns[prevIdx].duration) })
      } else {
        const lastIdx = workout.exercises.length - 1
        set({
          section: 'exercise',
          exerciseIndex: lastIdx,
          isResting: false,
          timer: makeTimerSnapshot(workout.exercises[lastIdx].duration),
        })
      }
      return
    }
  },

  skip: () => {
    const { isGetReady } = get()
    if (isGetReady) {
      get().finishGetReady()
    } else {
      get().next()
    }
  },

  resetWorkout: () => {
    set({
      workout: null,
      section: 'intro',
      exerciseIndex: 0,
      isResting: false,
      isGetReady: false,
      timer: makeTimerSnapshot(0),
      workoutStartTs: null,
      isPaused: false,
    })
  },

  getRemainingMs: () => getRemainingMs(get().timer),
  getProgress: () => getProgress(get().timer),

  getCurrentExercise: () => {
    const { workout, section, exerciseIndex, isResting } = get()
    if (!workout || isResting) return null
    return exercisesForSection(workout, section)[exerciseIndex] ?? null
  },

  getNextExercise: () => {
    const { workout, section, exerciseIndex, isResting } = get()
    if (!workout) return null
    if (isResting) {
      return exercisesForSection(workout, section)[exerciseIndex + 1] ?? null
    }
    const list = exercisesForSection(workout, section)
    if (exerciseIndex < list.length - 1) return list[exerciseIndex + 1]
    if (section === 'warmup') return workout.exercises[0] ?? null
    if (section === 'exercise') return workout.cooldowns[0] ?? null
    return null
  },

  getTotalExerciseCount: () => {
    const { workout } = get()
    if (!workout) return 0
    return workout.warmups.length + workout.exercises.length + workout.cooldowns.length
  },

  getOverallExerciseNumber: () => {
    const { workout, section, exerciseIndex } = get()
    if (!workout) return 0
    if (section === 'warmup') return exerciseIndex + 1
    if (section === 'exercise') return workout.warmups.length + exerciseIndex + 1
    if (section === 'cooldown')
      return workout.warmups.length + workout.exercises.length + exerciseIndex + 1
    return 0
  },
}))
