"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdWifiOff } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { SectionHeader } from "./SectionHeader";

const GROUPS = [
  {
    label: "App pages",
    urls: ["/", "/settings", "/stats", "/info", "/profile"],
  },
  {
    label: "Workout pages",
    urls: Array.from({ length: 28 }, (_, i) => `/workout/workout-${String(i + 1).padStart(2, "0")}`),
  },
  {
    label: "Active workout pages",
    urls: Array.from({ length: 28 }, (_, i) => `/workout/workout-${String(i + 1).padStart(2, "0")}/active`),
  },
];

const ALL_URLS = GROUPS.flatMap((g) => g.urls);

export function OfflineStatus() {
  const [cachedCount, setCachedCount] = useState<number | null>(null);
  const [groupCounts, setGroupCounts] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState(false);

  const checkCache = useCallback(async () => {
    if (!("caches" in window)) return;
    try {
      // Discover the active workout cache by prefix — no hardcoded version needed
      const cacheKeys = await caches.keys();
      const cacheKey = cacheKeys.find((k) => k.startsWith("workout-"));

      if (!cacheKey) {
        setCachedCount(0);
        setGroupCounts({});
        return;
      }

      const cache = await caches.open(cacheKey);
      const keys = await cache.keys();
      const cachedPaths = new Set(keys.map((r) => new URL(r.url).pathname));

      const counts: Record<string, number> = {};
      for (const group of GROUPS) {
        counts[group.label] = group.urls.filter((u) => cachedPaths.has(u)).length;
      }

      setCachedCount(ALL_URLS.filter((u) => cachedPaths.has(u)).length);
      setGroupCounts(counts);
    } catch {
      // Cache API blocked or unavailable
    }
  }, []);

  useEffect(() => {
    if (!("caches" in window) || !("serviceWorker" in navigator)) return;
    checkCache();
    const interval = setInterval(checkCache, 2000);
    return () => clearInterval(interval);
  }, [checkCache]);

  if (cachedCount === null) return null;

  const total = ALL_URLS.length;
  const isReady = cachedCount >= total;
  const pct = Math.round((cachedCount / total) * 100);

  return (
    <div className="mt-8">
      <SectionHeader label="Offline Cache" icon={<MdWifiOff size={20} />} />
      <div className="bg-charcoal/50 rounded-2xl px-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-start justify-between gap-4 py-4"
        >
          <div className="flex-1 text-left">
            {isReady ? (
              <p className="text-offwhite font-medium text-sm">
                App is ready for offline use
              </p>
            ) : (
              <>
                <p className="text-offwhite font-medium text-sm">
                  Caching for offline use&hellip; {cachedCount} / {total}
                </p>
                <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-lime rounded-full"
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {isReady && (
              <span className="text-lime text-xs font-semibold">Ready</span>
            )}
            <FaChevronDown
              size={12}
              className={`text-slate-500 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-700/50 pb-2">
                {GROUPS.map((group) => {
                  const count = groupCounts[group.label] ?? 0;
                  const done = count >= group.urls.length;
                  return (
                    <div
                      key={group.label}
                      className="flex items-center justify-between py-2.5"
                    >
                      <span className="text-slate-400 text-xs">{group.label}</span>
                      <span
                        className={`text-xs font-semibold ${done ? "text-lime" : "text-slate-400"}`}
                      >
                        {done ? "✓ Cached" : `${count} / ${group.urls.length}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
