"use client";

import type { UserLevel } from "@/types";
import { useUserStore } from "@/store/userStore";
import { ModalFromBottom } from "@/components/ui/ModalFromBottom";
import { MdOutlineTimer } from "react-icons/md";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LEVELS: {
  level: UserLevel;
  name: string;
  time: string;
  detail: string;
}[] = [
  {
    level: 1,
    name: "Ignition",
    time: "~20 minute workouts",
    detail:
      "Foundational routines focused on mobility, stability, and beginner-friendly strength building.",
  },
  {
    level: 2,
    name: "Liftoff",
    time: "~24 minute workouts",
    detail:
      "Expanded movement combinations with longer sessions and a steady increase in intensity.",
  },
  {
    level: 3,
    name: "Orbit",
    time: "~27 minute workouts",
    detail:
      "Longer, more demanding workouts that combine strength, balance, mobility, and endurance.",
  },
];

export function LevelSelectModal({ open, onClose }: Props) {
  const level = useUserStore((s) => s.level);
  const setLevel = useUserStore((s) => s.setLevel);

  function handleSelect(l: UserLevel) {
    setLevel(l);
  }

  return (
    <ModalFromBottom open={open} onClose={onClose}>
      <div className="px-5 pt-5 pb-8">
        <h2 className="text-offwhite text-xl font-bold mb-5">Select Level</h2>

        <div className="flex flex-col gap-3">
          {LEVELS.map(({ level: l, name, time, detail }) => {
            const selected = l === level;
            return (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                className={`w-full text-left rounded-2xl border px-4 py-4 transition-colors ${
                  selected
                    ? "border-lime bg-lime/10"
                    : "border-slate-700 bg-slate-800/40 active:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex w-full justify-between items-center gap-2">
                    <span
                      className={`text-sm font-bold ml-1 ${selected ? "text-lime" : "text-offwhite"}`}
                    >
                      Level {l} · {name}
                    </span>{" "}
                    <span className="flex items-center gap-1.5">
                      {([1, 2, 3] as UserLevel[]).map((n) => (
                        <span
                          key={n}
                          className={`w-2.5 h-2.5 rounded-full ${
                            n <= l ? "bg-lime" : "bg-slate-700"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-1 gap-1.5 text-slate-300">
                  <MdOutlineTimer />
                  <p className="text-slate-300 text-xs">{time}</p>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">{detail}</p>
              </button>
            );
          })}
        </div>
      </div>
    </ModalFromBottom>
  );
}
