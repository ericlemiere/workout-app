'use client'

import { motion } from 'framer-motion'

interface Props {
  progress: number // 0 to 1
  remainingMs: number
  size?: number
  strokeWidth?: number
  isResting?: boolean
}

export function CircularTimer({
  progress,
  remainingMs,
  size = 200,
  strokeWidth = 6,
  isResting = false,
}: Props) {
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)))
  const totalSeconds = Math.ceil(remainingMs / 1000)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  const timeStr = mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}`
  const isUrgent = remainingMs <= 4000 && remainingMs > 0

  const trackColor = isResting ? 'rgba(52,211,153,0.12)' : 'rgba(183,230,59,0.12)'
  const progressColor = isResting ? '#34d399' : isUrgent ? '#f87171' : '#B7E63B'

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-bold tabular-nums leading-none"
          style={{
            fontSize: timeStr.length > 4 ? size * 0.22 : size * 0.28,
            color: isUrgent ? '#f87171' : '#F5F7FA',
          }}
        >
          {timeStr}
        </span>
        {isResting && (
          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mt-1">
            Rest
          </span>
        )}
      </div>
    </div>
  )
}
