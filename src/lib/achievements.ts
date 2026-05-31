import type { CompletedWorkout, StreakData, UserLevel } from '@/types'

// Workout category by ID: n % 4 → 1=lower, 2=upper, 3=core, 0=full body
function categoryIndex(workoutId: string): number {
  return parseInt(workoutId.replace('workout-', ''), 10) % 4
}

function totalMs(completed: CompletedWorkout[]): number {
  return completed.reduce((sum, c) => sum + c.durationMs, 0)
}

function l2Count(completed: CompletedWorkout[]): number {
  return completed.filter(c => (c.level ?? 1) >= 2).length
}

function l3Count(completed: CompletedWorkout[]): number {
  return completed.filter(c => (c.level ?? 1) >= 3).length
}

function localDate(isoString: string): string {
  const d = new Date(isoString)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function longestLevelStreak(completed: CompletedWorkout[], minLevel: UserLevel): number {
  const dayHasLevel = new Map<string, boolean>()
  for (const c of completed) {
    const date = localDate(c.completedAt)
    if ((c.level ?? 1) >= minLevel) dayHasLevel.set(date, true)
    else if (!dayHasLevel.has(date)) dayHasLevel.set(date, false)
  }
  const dates = Array.from(dayHasLevel.keys()).sort()
  let longest = 0, current = 0
  for (let i = 0; i < dates.length; i++) {
    if (!dayHasLevel.get(dates[i])) { current = 0; continue }
    if (i === 0) {
      current = 1
    } else {
      const diff = Math.round(
        (new Date(dates[i] + 'T12:00:00').getTime() - new Date(dates[i - 1] + 'T12:00:00').getTime()) / 86400000
      )
      current = diff === 1 ? current + 1 : 1
    }
    longest = Math.max(longest, current)
  }
  return longest
}

export interface AchievementCheckState {
  completed: CompletedWorkout[]
  streak: StreakData
  lunarCycles: number
  totalCycles: number
  levelCycles: Record<UserLevel, number>
  levelLunarCycles: Record<2 | 3, number>
}

type CheckFn = (s: AchievementCheckState) => boolean

export const ACHIEVEMENT_CHECKS: Record<string, CheckFn> = {
  'flag-planter':           s => new Set(s.completed.map(c => categoryIndex(c.workoutId))).size >= 4,
  'strong-start':           s => s.streak.longestStreak >= 3,
  'road-warrior':           s => s.completed.length >= 8,
  'sweat-star':             s => s.completed.length >= 16,
  'week-freak':             s => s.streak.longestStreak >= 7,
  'alien-athlete':          s => s.completed.length >= 20,
  'extraterrestrial-effort':s => s.streak.longestStreak >= 14,
  'planet-core':            s => s.completed.filter(c => categoryIndex(c.workoutId) === 3).length >= 20,
  'super-satellite':        _  => false, // manual only
  'flex-finisher':          s => s.totalCycles >= 1,
  'upward-force':           s => s.completed.length >= 40,
  'day-worker':             s => totalMs(s.completed) >= 24 * 3_600_000,
  'thats-no-moon':          s => s.streak.longestStreak >= 21,
  'saturn-ringer':          s => s.streak.longestStreak >= 30,
  'meteor-melter':          s => s.completed.length >= 60,
  'gravity-grinder':        s => s.streak.longestStreak >= 45,
  'crescent-cruncher':      s => s.lunarCycles >= 1,
  // Level 2
  'key-changer':            s => l2Count(s.completed) >= 1,
  'star-struck':            s => l2Count(s.completed) >= 10,
  'star-fighter':           s => l2Count(s.completed) >= 20,
  'ignition-intensity':     s => longestLevelStreak(s.completed, 2) >= 7,
  'orbital-upgrade':        s => s.levelCycles[2] >= 1,
  'star-spiral':            s => s.levelCycles[2] >= 2,
  'heavenly-body':          s => s.levelLunarCycles[2] >= 1,
  // Level 3
  'portal-opener':          s => l3Count(s.completed) >= 1,
  'star-spangled':          s => longestLevelStreak(s.completed, 3) >= 8,
  'star-fox':               s => longestLevelStreak(s.completed, 3) >= 21,
  'on-fire':                s => l3Count(s.completed) >= 20,
  'apex-atomizer':          s => s.levelCycles[3] >= 1,
  'ring-of-fire':           s => s.levelLunarCycles[3] >= 1,
  'fireproof':              s => s.levelCycles[3] >= 2,
  // General
  'orbit-olympian':         s => s.lunarCycles >= 2,
  'astral-aura':            s => s.lunarCycles >= 3,
  'tri-cycler':             s => s.totalCycles >= 3,
  'high-roller':            s => s.levelCycles[1] >= 1 && s.levelCycles[2] >= 1 && s.levelCycles[3] >= 1,
  'planet-pumper':          s => s.streak.longestStreak >= 60,
  '100-club':               s => s.completed.length >= 100,
  'moov-martian':           s => s.totalCycles >= 5,
  'active-astronaut':       s => s.lunarCycles >= 4,
  'ripped-robot':           s => s.totalCycles >= 6,
  'celestial-body':         s => totalMs(s.completed) >= 48 * 3_600_000,
  'fire-zone':              s => totalMs(s.completed) >= 72 * 3_600_000,
  'super-cyborg':           s => s.totalCycles >= 8,
  'world-wrecker':          s => s.completed.length >= 150,
  'gains-giant':            s => s.completed.length >= 200,
  'jupiter-juggernaut':     s => totalMs(s.completed) >= 96 * 3_600_000,
  'eclipse-elitist':        s => s.lunarCycles >= 5,
  'chrome-dome':            s => s.totalCycles >= 15,
  'summit-seeker':          s => s.streak.longestStreak >= 90,
  'the-atlas':              s => s.completed.length >= 300,
  'triple-threat':          s => s.levelCycles[3] >= 3,
  'reps-rocketeer':         s => s.streak.longestStreak >= 56,
  'mad-scientist':          s => s.levelLunarCycles[3] >= 2,
  'yoked-year':             s => s.completed.length >= 365,
  'solar-sailor':           s => s.completed.length >= 400,
  'the-calorie-cup':        s => s.completed.length >= 500,
  'exercise-explorer':      s => s.streak.longestStreak >= 365,
  'world-warrior':          s => s.lunarCycles >= 6,
  'space-shuttler':         s => s.lunarCycles >= 7,
  'lunar-legend':           s => s.lunarCycles >= 8,
}

export function evaluateAchievements(state: AchievementCheckState): Set<string> {
  const earned = new Set<string>()
  for (const [id, check] of Object.entries(ACHIEVEMENT_CHECKS)) {
    try { if (check(state)) earned.add(id) } catch { /* ignore */ }
  }
  return earned
}
