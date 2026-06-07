"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RiBarChartFill } from "react-icons/ri";
import {
  FaDumbbell,
  FaGear,
  FaCircleInfo,
  FaUserAstronaut,
} from "react-icons/fa6";
import { useUserStore } from "@/store/userStore";

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
    href: "/profile",
    label: "Profile",
    icon: () => <FaUserAstronaut size={20} />,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const displayName = useUserStore((s) => s.displayName);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isWorkoutActive = pathname.startsWith("/workout/");

  // Find active index for indicator position
  const activeIndex = navItems.findIndex(({ href }) => isActive(href));

  if (isWorkoutActive) return null;

  const isHome = pathname === "/";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal/95 backdrop-blur-xl border-t border-lime/50 safe-bottom">
      <AnimatePresence initial={false}>
        {isHome && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs text-slate-400 flex gap-1 justify-center items-center py-1.5">
              Hello,
              <span className="text-offwhite font-medium">{displayName}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-16 mx-auto max-w-xl px-4">
        <div className="grid grid-cols-5 justify-items-center items-center h-full relative">
          {/* Sliding indicator */}
          {activeIndex !== -1 && (
            <motion.div
              className="absolute top-1/2 left-0 h-13 w-16 bg-lime/10 rounded-md"
              animate={{
                left: `${((activeIndex * 2 + 1) / (navItems.length * 2)) * 100}%`,
                x: "-50%",
                y: "-50%",
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
                className="flex flex-col items-center justify-center gap-0.5 mt-1 w-14 h-14 relative z-10"
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
