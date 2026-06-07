import type { ReactNode } from "react";

interface Props {
  label: string;
  description?: string | string[];
  border?: boolean;
  borderVariant?: "lime" | "orange";
  action?: ReactNode;
}

export function SettingsRow({
  label,
  description,
  border = false,
  borderVariant = "lime",
  action,
}: Props) {
  const descriptions = description
    ? Array.isArray(description)
      ? description
      : [description]
    : [];

  const borderClass = border
    ? `border-b ${borderVariant === "orange" ? "border-electric-orange/50" : "border-lime/50"}`
    : "";

  return (
    <div className={`flex items-center justify-between gap-4 py-4 ${borderClass}`}>
      <div>
        <p className="text-offwhite font-medium leading-tight mb-1">{label}</p>
        {descriptions.map((d, i) => (
          <p key={i} className="text-slate-500 text-xs mt-0.5">{d}</p>
        ))}
      </div>
      {action}
    </div>
  );
}
