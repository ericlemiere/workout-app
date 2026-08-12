"use client";

export interface FilterOption<T> {
  value: T;
  label: string;
}

interface Props<T> {
  label: string;
  value: T | null;
  options: FilterOption<T>[];
  onChange: (value: T | null) => void;
}

// One row of mutually exclusive chips, with an "All" chip that clears the group.
export function FilterChipGroup<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: Props<T>) {
  return (
    <div>
      <p className="text-lime text-xs font-bold uppercase tracking-widest mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        <Chip label="All" selected={value === null} onClick={() => onChange(null)} />
        {options.map((option) => (
          <Chip
            key={String(option.value)}
            label={option.label}
            selected={option.value === value}
            // Tapping the selected chip again clears it.
            onClick={() => onChange(option.value === value ? null : option.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs capitalize border transition-colors ${
        selected
          ? "bg-lime border-lime text-navy font-semibold"
          : "bg-slate-800/60 border-slate-700 text-slate-300 active:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );
}
