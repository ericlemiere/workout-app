"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RiBarChartFill } from "react-icons/ri";
import { TbGridDots } from "react-icons/tb";
import {
  FaDumbbell,
  FaGear,
  FaCircleInfo,
  FaUserAstronaut,
} from "react-icons/fa6";

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
    href: "/info",
    label: "Info",
    icon: () => <FaCircleInfo size={20} />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: () => <FaGear size={20} />,
  },
  {
    href: "/user",
    label: "User",
    icon: () => <FaUserAstronaut size={20} />,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isWorkoutActive = pathname.startsWith("/workout/");

  // Find active index for indicator position
  const activeIndex = navItems.findIndex(({ href }) => isActive(href));

  if (isWorkoutActive) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal/95 backdrop-blur-xl border-t border-slate-800/50 safe-bottom">
      <div className="h-16 mx-auto max-w-xl px-4">
        <div className="flex items-center justify-between h-full relative">
          {/* Sliding indicator */}
          {activeIndex !== -1 && (
            <motion.div
              className="absolute -top-px h-0.5 w-12 bg-lime rounded-full left-0"
              animate={{
                left: `calc(${((activeIndex * 2 + 1) / (navItems.length * 2)) * 100}% - 1.5rem)`,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}

          {navItems.map(({ href, label, icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-0.5 min-w-16 py-2 relative z-10"
              >
                <span className={active ? "text-lime" : "text-slate-500"}>
                  {icon()}
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wide ${active ? "text-lime" : "text-slate-500"}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
