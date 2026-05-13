'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Workout } from '@/types'
import { ExerciseImage } from '@/components/ui/ExercisePlaceholder'

interface Props {
  workout: Workout
  completedCount?: number
}

const tagColors: Record<string, string> = {
  'lower body': 'text-cat-lower bg-cat-lower/10',
  'upper body': 'text-cat-upper bg-cat-upper/10',
  core:         'text-cat-core bg-cat-core/10',
  'full body':  'text-cat-full bg-cat-full/10',
}

export function WorkoutCard({ workout, completedCount = 0 }: Props) {
  const totalExercises = workout.warmups.length + workout.exercises.length + workout.cooldowns.length

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <Link href={`/workout/${workout.id}`} className="block">
        <div className="bg-charcoal/60 border border-slate-700/50 rounded-2xl overflow-hidden active:bg-charcoal">
          <div className="relative h-40">
            <ExerciseImage
              src={workout.coverImage ?? ''}
              alt={workout.name}
              className="w-full h-full"
              category="exercise"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
            {completedCount > 0 && (
              <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                <span className="text-offwhite text-xs font-semibold">✓ Done {completedCount}×</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-offwhite font-semibold text-lg leading-snug">{workout.name}</h3>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize shrink-0 ${tagColors[workout.tags[0]] ?? 'text-slate-400 bg-slate-400/10'}`}
              >
                {workout.tags[0] ?? ''}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">
              {workout.description}
            </p>

            <div className="flex items-center gap-3 text-slate-500 text-xs">
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                ~{workout.estimatedDuration}m
              </span>
              <span>·</span>
              <span>{totalExercises} moves</span>
              <span>·</span>
              <span>{workout.tags.slice(1).join(', ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
