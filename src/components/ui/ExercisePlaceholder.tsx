"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

const categoryColors: Record<string, string> = {
  "warm-up": "from-amber-900/60 to-amber-800/40",
  exercise: "from-blue-900/60 to-blue-800/40",
  "cool-down": "from-emerald-900/60 to-emerald-800/40",
  rest: "from-slate-800/80 to-slate-700/60",
};

const categoryIcons: Record<string, string> = {
  "warm-up": "🔥",
  exercise: "🏋️‍♀️",
  "cool-down": "🙆",
  rest: "🧘",
};

export function ExerciseImage({
  src,
  alt,
  className = "",
  category = "exercise",
}: Props) {
  const [failed, setFailed] = useState(false);
  const gradient = categoryColors[category] ?? categoryColors.exercise;
  const icon = categoryIcons[category] ?? categoryIcons.exercise;

  if (failed || !src) {
    return (
      <div
        className={`bg-linear-to-br ${gradient} flex flex-col items-center justify-center ${className}`}
      >
        <span className="text-5xl mb-2 opacity-60">{icon}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
