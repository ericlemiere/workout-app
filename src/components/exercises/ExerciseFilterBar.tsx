"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaXmark } from "react-icons/fa6";
import { ExerciseFilterSheet } from "./ExerciseFilterSheet";
import {
  activeFilterCount,
  CATEGORY_LABEL,
  NO_FILTERS,
  type ExerciseFilters,
} from "@/lib/exercises";

interface Props {
  filters: ExerciseFilters;
  onChange: (filters: ExerciseFilters) => void;
  resultCount: number;
}

// The four filters don't fit across one row, so they live in a sheet and only
// the ones actually applied take up space, as dismissible chips.
function activeChips(
  filters: ExerciseFilters,
  onChange: (filters: ExerciseFilters) => void,
) {
  const chips: { key: string; label: string; clear: () => void }[] = [];

  if (filters.level !== null) {
    chips.push({
      key: "level",
      label: `Level ${filters.level}`,
      clear: () => onChange({ ...filters, level: null }),
    });
  }
  if (filters.category !== null) {
    chips.push({
      key: "category",
      label: CATEGORY_LABEL[filters.category],
      clear: () => onChange({ ...filters, category: null }),
    });
  }
  if (filters.area !== null) {
    chips.push({
      key: "area",
      label: filters.area,
      clear: () => onChange({ ...filters, area: null }),
    });
  }
  if (filters.target !== null) {
    chips.push({
      key: "target",
      label: filters.target,
      clear: () => onChange({ ...filters, target: null }),
    });
  }

  return chips;
}

export function ExerciseFilterBar({ filters, onChange, resultCount }: Props) {
  const [open, setOpen] = useState(false);
  const count = activeFilterCount(filters);
  const chips = activeChips(filters, onChange);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${
            count > 0
              ? "border-lime bg-lime/10 text-lime"
              : "border-slate-700 bg-slate-800/40 text-slate-300"
          }`}
        >
          <FaFilter size={12} />
          Filters
          {count > 0 && (
            <span className="bg-lime text-navy text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </span>
          )}
        </motion.button>

        <p className="text-slate-500 text-xs">
          {resultCount} {resultCount === 1 ? "MOOVment" : "MOOVments"}
        </p>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {chips.map(({ key, label, clear }) => (
            <button
              key={key}
              onClick={clear}
              className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-lime/10 border border-lime/50 text-lime text-xs capitalize"
            >
              {label}
              <FaXmark size={10} />
            </button>
          ))}
          {chips.length > 1 && (
            <button
              onClick={() => onChange(NO_FILTERS)}
              className="text-slate-500 text-xs underline px-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <ExerciseFilterSheet
        open={open}
        onClose={() => setOpen(false)}
        filters={filters}
        onChange={onChange}
        resultCount={resultCount}
      />
    </div>
  );
}
