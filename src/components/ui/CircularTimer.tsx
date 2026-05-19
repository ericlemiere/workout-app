"use client";

import { motion } from "framer-motion";

interface Props {
  progress: number; // 0 to 1
  remainingMs: number;
  size?: number;
  strokeWidth?: number;
  isRest?: boolean;
}

export function CircularTimer({
  progress,
  remainingMs,
  size = 200,
  strokeWidth = 6,
  isRest = false,
}: Props) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = isNaN(progress) || !isFinite(progress) ? 0 : progress;
  const offset = circumference * (1 - Math.min(1, Math.max(0, safeProgress)));
  const totalSeconds = Math.ceil(remainingMs / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timeStr =
    mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `${secs}`;
  const isUrgent = remainingMs <= 4000 && remainingMs > 0;

  const trackColor = isRest ? "rgba(52,211,153,0.12)" : "rgba(183,230,59,0.12)";
  const progressColor = isRest ? "#39ff14" : isUrgent ? "#ff8a1f" : "#B7E63B";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
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
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-bold font-orbitron tracking-widest tabular-nums leading-none text-4xl text-white`}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}
