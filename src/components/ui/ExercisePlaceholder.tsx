"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  isRest?: boolean;
}

const categoryColors: Record<string, string> = {
  "warm-up": "from-electric-violet/20 to-white/20",
  exercise: "from-electric-orange/20 to-white/20",
  "cool-down": "from-electric-cyan/20 to-white/20",
  rest: "from-electric-green/20 to-white/20",
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
  isRest = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  const gradient = isRest
    ? categoryColors.rest
    : (categoryColors[category] ?? categoryColors.exercise);
  const icon = isRest
    ? categoryIcons.rest
    : (categoryIcons[category] ?? categoryIcons.exercise);

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
