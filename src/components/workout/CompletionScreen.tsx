'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Workout } from '@/types'
import { useProgressStore } from '@/store/progressStore'
import { useWorkoutStore } from '@/store/workoutStore'
import { playCompleteSound } from '@/lib/audio'
import { formatTime } from '@/lib/timer'

interface Props {
  workout: Workout
}

export function CompletionScreen({ workout }: Props) {
  const streak = useProgressStore((s) => s.streak)
  const completed = useProgressStore((s) => s.completed)
  const resetWorkout = useWorkoutStore((s) => s.resetWorkout)

  const latestCompletion = completed.filter((c) => c.workoutId === workout.id).at(-1)
  const durationMs = latestCompletion?.durationMs ?? 0

  useEffect(() => {
    playCompleteSound()
    resetWorkout()
  }, [resetWorkout])

  const totalForWorkout = completed.filter((c) => c.workoutId === workout.id).length

  return (
    <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center px-6 safe-top safe-bottom">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-7xl mb-6"
      >
        🎉
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-offwhite text-3xl font-bold mb-2">Workout Complete!</h1>
        <p className="text-slate-400">{workout.name}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full max-w-xs bg-charcoal/60 border border-slate-700/40 rounded-2xl p-5 mb-8"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-offwhite text-xl font-bold">
              {durationMs > 0 ? formatTime(durationMs) : `~${workout.estimatedDuration}m`}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">duration</div>
          </div>
          <div>
            <div className="text-offwhite text-xl font-bold">{streak.currentStreak}</div>
            <div className="text-slate-500 text-xs mt-0.5">day streak</div>
          </div>
          <div>
            <div className="text-offwhite text-xl font-bold">{totalForWorkout}</div>
            <div className="text-slate-500 text-xs mt-0.5">total times</div>
          </div>
        </div>
      </motion.div>

      {/* Streak message */}
      {streak.currentStreak > 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-amber-400 text-sm font-medium mb-8 text-center"
        >
          🔥 {streak.currentStreak} day streak — keep it going!
        </motion.p>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs flex flex-col gap-3"
      >
        <Link
          href={`/workout/${workout.id}/active`}
          className="bg-lime text-navy font-bold text-lg text-center py-4 rounded-2xl active:bg-lime-dim"
        >
          Do It Again
        </Link>
        <Link
          href="/"
          className="bg-charcoal text-slate-200 font-semibold text-lg text-center py-4 rounded-2xl active:bg-charcoal/70"
        >
          Back to Workouts
        </Link>
      </motion.div>
    </div>
  )
}
