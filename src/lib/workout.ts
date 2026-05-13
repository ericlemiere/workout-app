import type { Workout } from '@/types'

export const REST_DURATION = 30
export const GET_READY_SECS = 8

export function calculateWorkoutMinutes(workout: Workout): number {
  const realExerciseCount =
    workout.warmups.length +
    workout.exercises.filter((e) => !e.isRest).length +
    workout.cooldowns.length

  const totalSeconds =
    realExerciseCount * GET_READY_SECS +
    workout.warmups.reduce((a, e) => a + e.duration, 0) +
    workout.exercises.reduce((a, e) => a + e.duration, 0) +
    workout.cooldowns.reduce((a, e) => a + e.duration, 0)

  return Math.ceil(totalSeconds / 60)
}
