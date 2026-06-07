"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleInfo } from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";
import { BiLogoVenmo } from "react-icons/bi";
import { ModalFromBottom } from "@/components/ui/ModalFromBottom";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SettingsRow } from "@/components/ui/SettingsRow";
import { HomeScreenTip } from "@/components/ui/HomeScreenTip";

const APP_URL = "https://moov-1.vercel.app/";

export function InfoScreen() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  async function handleShare() {
    try {
      await navigator.share({
        text: `Check out MOOV — a personal workout app.\n\n${APP_URL}`,
      });
    } catch (_) {}
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <div className="px-4 pt-8 mb-6">
        <SectionHeader label="Info" icon={<FaCircleInfo size={20} />} />
        <div className="bg-charcoal/50 rounded-2xl px-4">
          <SettingsRow
            label="What is MOOV?"
            description={[
              "A 28-workout at-home program.",
              "No equipment needed.",
            ]}
            border
            action={
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAboutModal(true)}
                className="shrink-0 w-22 bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl active:bg-slate-600"
              >
                About
              </motion.button>
            }
          />

          <SettingsRow
            label="Share this app"
            description="And MOOV with someone"
            border
            action={
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
            }
          />

          <SettingsRow
            label="Send MOOV a message"
            description={["Have a suggestion? Find a bug?", "Please reach out."]}
            border
            action={
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="mailto:hello@ericlemiere.com"
                className="w-22 shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600 flex items-center justify-center"
              >
                Contact
              </motion.a>
            }
          />

          <SettingsRow
            label="Support MOOV"
            description="Every bit helps. Thank you!"
            border={false}
            action={
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDonateModal(true)}
                className="w-22 shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600 flex items-center justify-center"
              >
                Donate
              </motion.button>
            }
          />
        </div>

        <HomeScreenTip />

        {/* About modal */}
        <ModalFromBottom
          open={showAboutModal}
          onClose={() => setShowAboutModal(false)}
        >
          <div className="px-6 pt-8 pb-10 space-y-5">
            <h2 className="text-offwhite text-xl font-bold font-orbitron drop-shadow-[1px_1px_0px_rgb(190,242,100)] tracking-widest">
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
                As you train, you'll unlock achievements along the way. Milestones
                such as completing your first cycle, building a streak, and
                finishing every category earn you bragging rights. These
                achievements are not easy to earn — some require months of
                consistent effort. Visit the Stats tab to see what you've unlocked
                and what challenges still lie ahead.
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
      </div>
    </motion.div>
  );
}
