"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressStore } from "@/store/progressStore";
import { createClient } from "@/lib/supabase/client";
import { SiCashapp } from "react-icons/si";
import { BiLogoVenmo } from "react-icons/bi";
import { FaUserAstronaut, FaGear, FaCircleInfo } from "react-icons/fa6";
import { PiWarning } from "react-icons/pi";

import { ModalFromBottom } from "@/components/workout/ModalFromBottom";

type ConfirmMode = "grid" | "stats" | "stats-final" | "signout" | null;

function Toggle({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50 last:border-0">
      <div>
        <p className="text-offwhite font-medium">{label}</p>
        {description && (
          <p className="text-slate-500 text-xs mt-0.5">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-colors relative ${value ? "bg-lime/70" : "bg-slate-700"}`}
      >
        <span
          className={`absolute top-px w-6.5 h-6.5 rounded-full bg-white shadow transition-transform ${value ? "-translate-x-0.5" : "-translate-x-6"}`}
        ></span>
      </button>
    </div>
  );
}

const confirmContent: Record<
  Exclude<ConfirmMode, null>,
  { title: string; body: string; label: string }
> = {
  grid: {
    title: "Reset grid?",
    body: "All checkmarks will be cleared. Your completed count and streak will be preserved.",
    label: "Yes, reset",
  },
  stats: {
    title: "Reset all stats?",
    body: "Your completed count and streaks will be reset to 0, all grid checkmarks will be cleared, and achievements will be lost.",
    label: "Yes, reset all",
  },
  "stats-final": {
    title: "Are you absolutely sure?",
    body: "This cannot be undone. Every workout, streak, cycle, and achievement will be permanently erased.",
    label: "Wipe everything",
  },
  signout: {
    title: "Sign out?",
    body: "Your progress is saved and will sync back when you sign in again.",
    label: "Sign out",
  },
};

const APP_URL = "https://moov-1.vercel.app/";

export function SettingsScreen() {
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);
  const resetGrid = useProgressStore((s) => s.resetGrid);
  const resetAllStats = useProgressStore((s) => s.resetAllStats);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accountLoaded, setAccountLoaded] = useState(false);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        setUserEmail(user?.email ?? null);
        setAccountLoaded(true);
      });
  }, []);

  async function handleShare() {
    try {
      await navigator.share({
        text: `Check out MOOV — a personal workout app.\n\n${APP_URL}`,
      });
    } catch (_) {}
  }

  async function handleConfirm() {
    if (confirmMode === "grid") {
      resetGrid();
      setConfirmMode(null);
    }
    if (confirmMode === "stats") {
      setConfirmMode("stats-final");
    }
    if (confirmMode === "stats-final") {
      resetAllStats();
      setConfirmMode(null);
    }
    if (confirmMode === "signout") {
      setConfirmMode(null);
      await createClient().auth.signOut();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <div className="px-4 pt-8 pb-6">
        <h1 className="text-offwhite text-3xl font-bold font-orbitron tracking-wider">
          Settings + More
        </h1>
      </div>

      {/* Account */}
      {accountLoaded && (
        <div className="px-4 mb-6">
          <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
            <FaUserAstronaut className="inline-block mx-2" size={20} /> Account
          </h2>
          <div className="bg-charcoal/50 rounded-2xl px-4">
            <div className="flex items-center justify-between gap-2 py-4">
              {userEmail ? (
                <>
                  <div>
                    <p className="text-offwhite font-medium">Signed in</p>
                    <p className="text-slate-500 text-xs mt-0.5">{userEmail}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConfirmMode("signout")}
                    className="w-22 text-center shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600"
                  >
                    Sign out
                  </motion.button>
                </>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-offwhite font-medium">Not signed in</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Sign in to make sure your progress is saved and synced
                      across devices.
                    </p>
                  </div>
                  <motion.a
                    whileTap={{ scale: 0.95 }}
                    href="/login"
                    className="w-22 text-center shrink-0 bg-lime/20 text-lime border border-lime/40 whitespace-nowrap text-sm font-semibold px-0 py-2 rounded-xl active:bg-lime/30"
                  >
                    Sign in
                  </motion.a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preferences */}
      <div className="px-4 mb-6">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
          <FaGear className="inline-block mx-2" size={20} /> Preferences
        </h2>
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <Toggle
            label="Sound Effects"
            value={settings.soundEnabled}
            onChange={(v) => updateSettings({ soundEnabled: v })}
            description="Countdown beeps and completion sounds"
          />
          <Toggle
            label="Voice Cues [Coming Soon]"
            value={settings.voiceCuesEnabled}
            onChange={(v) => updateSettings({ voiceCuesEnabled: v })}
            description="Audible cues for exercises"
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 mb-6">
        <h2 className="text-lime text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
          <FaCircleInfo className="inline-block mx-2" size={20} /> Info
        </h2>
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50">
            <div>
              <p className="text-offwhite font-medium">What is MOOV?</p>
              <p className="text-slate-500 text-xs mt-0.5">
                A 28-workout at-home program.
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                No equipment needed.
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAboutModal(true)}
              className="shrink-0 w-22 bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl active:bg-slate-600"
            >
              About
            </motion.button>
          </div>

          {/* Share */}
          <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50">
            <div>
              <p className="text-offwhite font-medium">Share this app</p>
              <p className="text-slate-500 text-xs mt-0.5">
                And MOOV with someone
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="w-22 shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600 flex items-center justify-center gap-1.5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share
            </motion.button>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50">
            <div>
              <p className="text-offwhite font-medium">Send MOOV a message</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Have a suggestion? Find a bug?
              </p>
              <p className="text-slate-500 text-xs mt-0.5">Please reach out.</p>
            </div>
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="mailto:hello@ericlemiere.com"
              className="w-22 shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600 flex items-center justify-center gap-1.5"
            >
              Contact
            </motion.a>
          </div>

          {/* Donate */}
          <div className="flex items-center justify-between gap-2 py-4 border-b border-lime/50">
            <div>
              <p className="text-offwhite font-medium">Support MOOV</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Every bit helps. Thank you!
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDonateModal(true)}
              className="w-22 shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600 flex items-center justify-center gap-1.5"
            >
              Donate
            </motion.button>
          </div>

          <div className="flex items-center py-4">
            <p className="text-slate-400 text-xs">
              <span className="text-slate-400 font-semibold">Add</span>{" "}
              <span className="text-white mx-0.5 drop-shadow-[1px_1px_0px_rgb(190,242,100)] font-orbitron tracking-widest">
                MOOV
              </span>{" "}
              <span className="text-slate-400 font-semibold">
                to your home screen for the best experience
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="px-4">
        <h2 className="text-electric-orange text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
          <PiWarning className="inline-block mx-2" size={20} /> Reset
        </h2>
        <div className="bg-charcoal/50 rounded-2xl px-4">
          {/* Reset Grid */}
          <div className="flex items-center justify-between gap-4 py-4 border-b border-electric-orange/50">
            <div>
              <p className="text-offwhite font-medium">Reset Grid</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Clear checkmarks and start a new cycle
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmMode("grid")}
              className="w-22 shrink-0 bg-slate-700 text-electric-orange whitespace-nowrap text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600"
            >
              Reset
            </motion.button>
          </div>

          {/* Reset All Stats */}
          <div className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-offwhite font-medium">Reset All Stats</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Reset completed count and streaks to 0, and clear all grid
                checkmarks
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmMode("stats")}
              className="w-22 shrink-0 bg-slate-700 text-electric-orange text-sm font-semibold whitespace-nowrap px-0 py-2 rounded-xl active:bg-red-500/30"
            >
              Reset
            </motion.button>
          </div>
        </div>
      </div>

      {/* About modal */}
      <ModalFromBottom
        open={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      >
        <div className="px-6 pt-8 pb-10 space-y-5">
          <h2 className="text-offwhite text-xl font-bold font-orbitron">
            About MOOV
          </h2>

          <div>
            <p className="text-lime text-xs font-bold uppercase tracking-widest mb-1.5">
              The Program
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              MOOV is a complete at-home program built around 28 guided workouts
              across four categories: lower body, upper body, core, and full
              body. Each session runs about 20–27 minutes depending on your
              level, and requires nothing but your bodyweight and an optional
              mat.
            </p>
          </div>

          <div>
            <p className="text-lime text-xs font-bold uppercase tracking-widest mb-1.5">
              Why the Moon?
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              The lunar cycle is 28 days, and a natural rhythm for building
              consistency. It's not a rigid daily schedule, but a meaningful
              movement cycle that rewards steady effort over time. The moon has
              tracked human cycles for thousands of years. MOOV just borrowed
              it.
            </p>
          </div>

          <div>
            <p className="text-lime text-xs font-bold uppercase tracking-widest mb-1.5">
              Achievements
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              As you train, you’ll unlock achievements along the way. Milestones
              such as completing your first cycle, building a streak, and
              finishing every category earn you bragging rights as you compete
              with friends. These achievements are not easy to earn, and some
              require months of consistent effort. Visit the Stats tab to see
              what you’ve unlocked and what challenges still lie ahead.
            </p>
          </div>

          <div>
            <p className="text-lime text-xs font-bold uppercase tracking-widest mb-1.5">
              Three Levels
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every workout scales across three difficulty levels. Start at
              Level 1 to build the foundation, then advance when you're ready.
              Each level adds more exercises, greater intensity, and a
              meaningfully different challenge.
            </p>
          </div>

          <p className="text-slate-600 text-xs">
            No subscriptions. No ads. No internet needed after install.
          </p>
        </div>
      </ModalFromBottom>

      {/* Donate modal */}
      <AnimatePresence>
        {showDonateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-end justify-center z-50 pb-10 px-4"
            onClick={() => setShowDonateModal(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-charcoal rounded-3xl px-4 pt-6 pb-2"
            >
              <h2 className="text-offwhite text-xl font-bold mb-1 font-orbitron">
                Support MOOV
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Help keep our rockets fueled so we can keep going to the moon!
                &nbsp;🚀
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileTap={{ scale: 0.96 }}
                  href="https://cash.app/$ericlemiere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2.5 bg-[#00D64F] text-black font-semibold active:opacity-90"
                >
                  <SiCashapp size={30} />
                  Cash App
                </motion.a>
                <motion.a
                  whileTap={{ scale: 0.96 }}
                  href="https://venmo.com/u/airclimber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2.5 bg-[#3D95CE] text-white font-semibold active:opacity-90"
                >
                  <BiLogoVenmo size={30} />
                  Venmo
                </motion.a>
              </div>
              <button
                onClick={() => setShowDonateModal(false)}
                className="w-full py-2 text-slate-500 underline mt-3 text-sm"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared confirmation modal */}
      <AnimatePresence>
        {confirmMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-end justify-center z-50 pb-10 px-4"
            onClick={() => setConfirmMode(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-charcoal rounded-3xl p-6"
            >
              <h2 className="text-offwhite text-xl font-bold mb-1">
                {confirmContent[confirmMode].title}
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {confirmContent[confirmMode].body}
              </p>
              <div
                className={`flex ${confirmContent[confirmMode].title === "Are you absolutely sure?" ? "flex-row-reverse" : "flex-row"} gap-3`}
              >
                <button
                  onClick={() => setConfirmMode(null)}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-700 text-slate-200 font-semibold active:bg-slate-600"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleConfirm}
                  className="flex-1 py-3.5 rounded-2xl bg-red-500 text-offwhite font-semibold active:bg-red-600"
                >
                  {confirmContent[confirmMode].label}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
