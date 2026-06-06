"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";

function getMoonPath(n: number): string {
  const cx = 50,
    cy = 50,
    r = 40;
  if (n === 0) return "";
  const top = `${cx} ${cy - r}`;
  const bot = `${cx} ${cy + r}`;
  if (n === 14)
    return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  const rx = parseFloat(Math.abs(r * Math.cos((Math.PI * n) / 14)).toFixed(2));
  if (n < 14) {
    const ts = n <= 7 ? 0 : 1;
    return `M ${top} A ${r} ${r} 0 0 1 ${bot} A ${rx} ${r} 0 0 ${ts} ${top} Z`;
  }
  const ts = 28 - n <= 7 ? 1 : 0;
  return `M ${top} A ${r} ${r} 0 0 0 ${bot} A ${rx} ${r} 0 0 ${ts} ${top} Z`;
}

const CRATERS = [
  { cx: 44, cy: 68, rx: 7, ry: 6.5 },
  { cx: 68, cy: 30, rx: 4.5, ry: 4 },
  { cx: 62, cy: 50, rx: 2.5, ry: 2.5 },
  { cx: 28, cy: 52, rx: 4, ry: 3.5 },
  { cx: 35, cy: 32, rx: 2.2, ry: 2 },
  { cx: 72, cy: 60, rx: 5, ry: 4.5 },
  { cx: 50, cy: 26, rx: 1.5, ry: 1.5 },
  { cx: 38, cy: 78, rx: 3, ry: 2.8 },
  { cx: 25, cy: 40, rx: 1.8, ry: 1.6 },
];

function SplashMoon({ phase }: { phase: number }) {
  const path = getMoonPath(phase - 1);
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      <defs>
        <clipPath id="sm-clip">
          <circle cx="50" cy="50" r="40" />
        </clipPath>
        <radialGradient id="sm-grad" cx="40%" cy="36%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0.55" />
        </radialGradient>

        <filter id="sm-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <g clipPath="url(#sm-clip)">
        <circle cx="50" cy="50" r="40" fill="rgba(10,12,28,0.75)" />
        {path && <path d={path} fill="url(#sm-grad)" filter="url(#sm-noise)" />}
        <g opacity="0.55">
          {CRATERS.map((c, i) => (
            <ellipse
              key={i}
              cx={c.cx}
              cy={c.cy}
              rx={c.rx}
              ry={c.ry}
              fill="rgba(0,0,0,0.5)"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          ))}
        </g>
      </g>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="white"
        strokeOpacity={0.35}
        strokeWidth={2}
        filter="url(#sm-glow)"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="white"
        strokeOpacity={0.18}
        strokeWidth={1}
      />
    </svg>
  );
}

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(1);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const authReady = useUserStore(s => s.authReady);
  const setSplashDone = useUserStore(s => s.setSplashDone);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPhase((p) => (p === 28 ? 1 : p + 1));
    }, 80);

    // Show CTA once SW is ready (ensures assets are cached before entering the app)
    if ("serviceWorker" in navigator) {
      const slowTimer = setTimeout(() => setSlowConnection(true), 4000);
      navigator.serviceWorker.ready.then(() => {
        clearTimeout(slowTimer);
        setSlowConnection(false);
        setReady(true);
      });
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimeout(slowTimer);
      };
    } else {
      setReady(true);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, []);

  const dismiss = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSplashDone();
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <AnimatePresence onExitComplete={() => setVisible(false)}>
      {!dismissed && (
        <>
          <motion.div
            key="splash"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-100 bg-navy flex flex-col safe-top safe-bottom"
          >
            {/* Header — matches WorkoutLibrary: w-full max-w-xl mx-auto py-2 */}
            <div className="w-full max-w-xl mx-auto py-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full overflow-hidden relative"
              >
                <Image
                  src="/moov-logo-transparent.png"
                  alt="MOOV Logo"
                  width={850}
                  height={289}
                  className="w-full h-auto"
                  loading="eager"
                />
              </motion.div>
              <h1 className="sr-only">MOOV Exercise App</h1>
            </div>
            {/* Moon — flex-1 so it always fills the same space regardless of CTA */}
            <div className="w-full flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-56 h-56 drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]"
              >
                <SplashMoon phase={phase} />
              </motion.div>
            </div>

            {/* CTA — fixed height so moon never shifts when content appears */}
            <div className="h-65 w-full shrink-0 pb-10 px-8 text-center flex flex-col items-center justify-end">
              <AnimatePresence mode="wait">
                {ready && authReady ? (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="flex flex-col items-center gap-7"
                  >
                    <h1 className="flex flex-col items-center gap-4">
                      <p className="text-slate-300 text-xl font-orbitron tracking-wider leading-relaxed drop-shadow-[1px_1px_0px_rgb(190,242,100)]">
                        A personal workout plan that follows the lunar cycle.
                      </p>
                      <p className="text-slate-300 text-base leading-relaxed w-60 max-w-xs drop-shadow-[1px_1px_0px_rgb(190,242,100)]">
                        Your celestial body awaits.
                      </p>
                    </h1>
                    <button
                      onClick={dismiss}
                      className="bg-lime text-navy font-bold text-lg py-4 px-12 rounded-2xl active:opacity-80 font-orbitron tracking-wider"
                    >
                      LETS MOOV
                    </button>
                  </motion.div>
                ) : slowConnection ? (
                  <motion.div
                    key="slow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="text-slate-300 text-sm font-medium">
                      Downloading for offline use…
                    </p>
                    <p className="text-slate-500 text-xs">
                      Slow connection detected. Almost there.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
