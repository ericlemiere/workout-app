"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IoSettingsOutline } from "react-icons/io5";

const navItems = [
  {
    href: "/",
    label: "Workouts",
    icon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth={active ? 2.5 : 2}
      >
        <rect x="2" y="8" width="6" height="8" rx="1" />
        <rect x="16" y="8" width="6" height="8" rx="1" />
        <path d="M8 12h8" strokeLinecap="round" />
        <path d="M6 6v12M18 6v12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (active: boolean) => (
      <IoSettingsOutline size={20} strokeWidth={active ? 2.5 : 2} />
    ),
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
                {icon(active)}
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
