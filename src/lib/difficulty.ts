import type { Exercise, Workout, WorkoutTemplate, ExerciseSlot, UserLevel } from '@/types'
import { REST_DURATION } from '@/lib/workout'

const restExercise: Exercise = {
  id: 'rest',
  name: 'Rest',
  duration: REST_DURATION,
  image: [],
  category: 'exercise',
  target: 'full body',
  isRest: true,
}

function superset(e1: Exercise, e2: Exercise, e3?: Exercise): Exercise[] {
  const round = [{ ...e1 }, { ...e2 }, ...(e3 ? [{ ...e3 }] : []), { ...restExercise }]
  return [...round, ...round]
}

function supersetFinal(e1: Exercise, e2: Exercise, e3?: Exercise): Exercise[] {
  const round = [{ ...e1 }, { ...e2 }, ...(e3 ? [{ ...e3 }] : []), { ...restExercise }]
  return [...round, ...round.slice(0, -1)]
}

export function resolveSlot(slot: ExerciseSlot, level: UserLevel): Exercise {
  if (!Array.isArray(slot)) return slot
  for (let l = level - 1; l >= 0; l--) {
    if (slot[l]) return slot[l]!
  }
  return slot[0]!
}

export function buildWorkout(template: WorkoutTemplate, level: UserLevel): Workout {
  const { supersets, lvl2Extra, lvl3Extra, ...workoutFields } = template

  const activeSupersets = [...supersets]
  if (level >= 2) activeSupersets.push(lvl2Extra)
  if (level >= 3) activeSupersets.push(lvl3Extra)

  const exercises = activeSupersets.flatMap((s, i) => {
    const e1 = resolveSlot(s.e1, level)
    const e2 = resolveSlot(s.e2, level)
    const e3 = s.e3 ? resolveSlot(s.e3, level) : undefined
    const isFinal = i === activeSupersets.length - 1
    return isFinal ? supersetFinal(e1, e2, e3) : superset(e1, e2, e3)
  })

  return { ...workoutFields, exercises }
}
