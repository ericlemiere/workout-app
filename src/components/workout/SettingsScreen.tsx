"use client";

import { motion } from "framer-motion";
import { AccountSection } from "@/components/settings/AccountSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { InfoSection } from "@/components/settings/InfoSection";
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
      <PreferencesSection />
      <InfoSection />
      <ResetSection />
    </motion.div>
  );
}
