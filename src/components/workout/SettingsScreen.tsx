"use client";

import { motion } from "framer-motion";
import { AccountSection } from "@/components/settings/AccountSection";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { ResetSection } from "@/components/settings/ResetSection";

export function SettingsScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <AccountSection />
      <SettingsSection />

       {/* Home screen tip */}
      <div className="flex flex-col py-8">
        <p className="text-slate-400 text-lg text-center">
          <span className="text-slate-400 font-semibold">Add</span>{" "}
          <span className="text-white mx-0.5 drop-shadow-[1px_1px_0px_rgb(190,242,100)] font-orbitron tracking-widest">
            MOOV
          </span>{" "}
          <span className="text-slate-400 font-semibold">
            to your home screen
          </span>
        </p>
        <p className="text-slate-400 text-lg text-center -mt-0.5">
          <span className="text-slate-400 font-semibold">
            for the best experience
          </span>
        </p>
      </div>
      {/* <ResetSection /> */}
    </motion.div>
  );
}
