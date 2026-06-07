"use client";

import { motion } from "framer-motion";
import { InfoSection } from "@/components/settings/InfoSection";

export function InfoScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <InfoSection />
    </motion.div>
  );
}
