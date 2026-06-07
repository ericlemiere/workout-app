import type { ReactNode } from "react";

interface Props {
  label: string;
  icon: ReactNode;
  variant?: "lime" | "orange";
}

export function SectionHeader({ label, icon, variant = "lime" }: Props) {
  return (
    <h2
      className={`${variant === "orange" ? "text-electric-orange" : "text-lime"} text-lg font-orbitron font-bold uppercase tracking-widest mb-3 flex items-center`}
    >
      <span className="inline-block mx-2">{icon}</span>
      {label}
    </h2>
  );
}
