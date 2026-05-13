"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

const categoryColors: Record<string, string> = {
  "warm-up": "from-lime/60 to-white/20",
  exercise: "from-cat-lower/60 to-white/20",
  "cool-down": "from-cat-core/60 to-white/20",
  rest: "from-slate-800/80 to-white/20",
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
        <span className="text-3xl opacity-90">{icon}</span>
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
