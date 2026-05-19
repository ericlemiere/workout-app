"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IoSettingsOutline } from "react-icons/io5";
import { RiBarChartFill } from "react-icons/ri";
import { CiDumbbell } from "react-icons/ci";
import { FaDumbbell } from "react-icons/fa6";

const navItems = [
  {
    href: "/",
    label: "Workouts",
    icon: () => <FaDumbbell size={20} />,
  },
  {
    href: "/stats",
    label: "Stats",
    icon: () => <RiBarChartFill size={20} />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: () => <IoSettingsOutline size={20} />,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isWorkoutActive = pathname.startsWith("/workout/");

  if (isWorkoutActive) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal/95 backdrop-blur-xl border-t border-slate-800/50 safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-sm mx-auto px-4">
        {navItems.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 min-w-16 py-2 relative"
            >
              <span className={active ? "text-lime" : "text-slate-500"}>
                {icon()}
              </span>
              <span
                className={`text-[10px] font-medium tracking-wide ${active ? "text-lime" : "text-slate-500"}`}
              >
                {label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-0.5 bg-lime rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
