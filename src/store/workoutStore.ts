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
import { GET_READY_SECS } from '@/lib/workout'

interface WorkoutState {
  workout: Workout | null
  section: WorkoutSection
  exerciseIndex: number
  isGetReady: boolean
  timer: TimerSnapshot
  workoutStartTs: number | null
  isPaused: boolean

  startWorkout: (workout: Workout) => void
  beginSession: () => void
  finishGetReady: () => void
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
  isGetReady: false,
  timer: makeTimerSnapshot(0),
  workoutStartTs: null,
  isPaused: false,

  startWorkout: (workout) => {
    set({
      workout,
      section: 'intro',
      exerciseIndex: 0,
      isGetReady: false,
      timer: makeTimerSnapshot(0),
      workoutStartTs: null,
      isPaused: false,
    })
  },

  beginSession: () => {
    const { workout } = get()
    if (!workout) return
    set({
      section: 'warmup',
      exerciseIndex: 0,
      isGetReady: true,
      timer: makeTimerSnapshot(GET_READY_SECS),
      workoutStartTs: Date.now(),
      isPaused: false,
    })
  },

  finishGetReady: () => {
    const { workout, section, exerciseIndex } = get()
    if (!workout) return
    const list = exercisesForSection(workout, section)
    const duration = list[exerciseIndex]?.duration ?? GET_READY_SECS
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
    const { workout, section, exerciseIndex } = get()
    if (!workout) return

    if (section === 'intro') {
      get().beginSession()
      return
    }

    const list = exercisesForSection(workout, section)
    const nextIdx = exerciseIndex + 1

    if (section === 'warmup') {
      if (nextIdx < list.length) {
        set({ exerciseIndex: nextIdx, isGetReady: true, timer: makeTimerSnapshot(GET_READY_SECS) })
      } else {
        set({ section: 'exercise', exerciseIndex: 0, isGetReady: true, timer: makeTimerSnapshot(GET_READY_SECS) })
      }
      return
    }

    if (section === 'exercise') {
      if (nextIdx < list.length) {
        const nextEx = list[nextIdx]
        if (nextEx.isRest) {
          // Go straight into rest — no get-ready countdown
          set({ exerciseIndex: nextIdx, isGetReady: false, timer: makeTimerSnapshot(nextEx.duration) })
        } else {
          set({ exerciseIndex: nextIdx, isGetReady: true, timer: makeTimerSnapshot(GET_READY_SECS) })
        }
      } else {
        if (workout.cooldowns.length > 0) {
          set({ section: 'cooldown', exerciseIndex: 0, isGetReady: true, timer: makeTimerSnapshot(GET_READY_SECS) })
        } else {
          set({ section: 'complete', timer: makeTimerSnapshot(0) })
        }
      }
      return
    }

    if (section === 'cooldown') {
      if (nextIdx < list.length) {
        set({ exerciseIndex: nextIdx, isGetReady: true, timer: makeTimerSnapshot(GET_READY_SECS) })
      } else {
        set({ section: 'complete', timer: makeTimerSnapshot(0) })
      }
      return
    }
  },

  prev: () => {
    const { workout, section, exerciseIndex, isGetReady } = get()
    if (!workout) return

    if (isGetReady) {
      const list = exercisesForSection(workout, section)
      if (exerciseIndex > 0) {
        const prevIdx = exerciseIndex - 1
        set({ exerciseIndex: prevIdx, isGetReady: false, timer: makeTimerSnapshot(list[prevIdx].duration) })
      } else if (section === 'warmup') {
        set({ section: 'intro', isGetReady: false, timer: makeTimerSnapshot(0) })
      } else if (section === 'exercise') {
        const lastIdx = workout.warmups.length - 1
        set({ section: 'warmup', exerciseIndex: lastIdx, isGetReady: false, timer: makeTimerSnapshot(workout.warmups[lastIdx].duration) })
      } else if (section === 'cooldown') {
        const exList = exercisesForSection(workout, 'exercise')
        const lastIdx = exList.length - 1
        set({ section: 'exercise', exerciseIndex: lastIdx, isGetReady: false, timer: makeTimerSnapshot(exList[lastIdx].duration) })
      }
      return
    }

    if (exerciseIndex > 0) {
      const list = exercisesForSection(workout, section)
      const prevIdx = exerciseIndex - 1
      set({ exerciseIndex: prevIdx, isGetReady: false, timer: makeTimerSnapshot(list[prevIdx].duration) })
    } else {
      if (section === 'exercise') {
        const lastIdx = workout.warmups.length - 1
        set({ section: 'warmup', exerciseIndex: lastIdx, isGetReady: false, timer: makeTimerSnapshot(workout.warmups[lastIdx].duration) })
      } else if (section === 'cooldown') {
        const exList = exercisesForSection(workout, 'exercise')
        const lastIdx = exList.length - 1
        set({ section: 'exercise', exerciseIndex: lastIdx, isGetReady: false, timer: makeTimerSnapshot(exList[lastIdx].duration) })
      }
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
      isGetReady: false,
      timer: makeTimerSnapshot(0),
      workoutStartTs: null,
      isPaused: false,
    })
  },

  getRemainingMs: () => getRemainingMs(get().timer),
  getProgress: () => getProgress(get().timer),

  getCurrentExercise: () => {
    const { workout, section, exerciseIndex } = get()
    if (!workout) return null
    return exercisesForSection(workout, section)[exerciseIndex] ?? null
  },

  getNextExercise: () => {
    const { workout, section, exerciseIndex } = get()
    if (!workout) return null
    const list = exercisesForSection(workout, section)
    // Return the next real (non-rest) exercise
    for (let i = exerciseIndex + 1; i < list.length; i++) {
      if (!list[i].isRest) return list[i]
    }
    if (section === 'warmup') return workout.exercises.find(e => !e.isRest) ?? null
    if (section === 'exercise') return workout.cooldowns[0] ?? null
    return null
  },

  getTotalExerciseCount: () => {
    const { workout } = get()
    if (!workout) return 0
    return (
      workout.warmups.length +
      workout.exercises.filter(e => !e.isRest).length +
      workout.cooldowns.length
    )
  },

  getOverallExerciseNumber: () => {
    const { workout, section, exerciseIndex } = get()
    if (!workout) return 0
    if (section === 'warmup') return exerciseIndex + 1
    if (section === 'exercise') {
      return workout.warmups.length +
        workout.exercises.slice(0, exerciseIndex + 1).filter(e => !e.isRest).length
    }
    if (section === 'cooldown') {
      return workout.warmups.length +
        workout.exercises.filter(e => !e.isRest).length +
        exerciseIndex + 1
    }
    return 0
  },
}))
