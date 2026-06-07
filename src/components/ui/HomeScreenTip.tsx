"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdAddToHomeScreen } from "react-icons/md";
import { ModalFromBottom } from "@/components/ui/ModalFromBottom";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SettingsRow } from "@/components/ui/SettingsRow";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function HomeScreenTip() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true);
    setIsStandalone(standalone);

    const ios =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(ios);

    function handlePrompt(e: Event) {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setInstalled(true);
      setShowModal(false);
    }
  }

  if (isStandalone) return null;

  function renderModalContent() {
    if (installed) {
      return (
        <div className="px-6 pt-8 pb-10 text-center space-y-3">
          <p className="text-4xl">🚀</p>
          <h2 className="text-offwhite text-xl font-bold font-orbitron">You're all set</h2>
          <p className="text-slate-400 text-sm">MOOV has been added to your home screen.</p>
        </div>
      );
    }

    if (installPrompt) {
      return (
        <div className="px-6 pt-8 pb-10 space-y-5">
          <h2 className="text-offwhite text-xl font-bold font-orbitron">Add to Home Screen</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Install MOOV as an app for the best experience — faster load, full screen, and works offline.
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleInstall}
            className="w-full py-4 rounded-2xl bg-lime text-navy font-bold text-base active:bg-lime/80"
          >
            Install App
          </motion.button>
        </div>
      );
    }

    if (isIOS) {
      return (
        <div className="px-6 pt-8 pb-10 space-y-5">
          <h2 className="text-offwhite text-xl font-bold font-orbitron">Add to Home Screen</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Install MOOV for a full-screen, offline experience — no App Store required.
          </p>
          <ol className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="text-lime font-bold text-sm shrink-0 mt-0.5">1</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tap the <span className="text-offwhite font-semibold">Share</span> button{" "}
                <span className="text-slate-400">(the box with an arrow pointing up)</span> in
                Safari's toolbar at the bottom of the screen.
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lime font-bold text-sm shrink-0 mt-0.5">2</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                Scroll down and tap{" "}
                <span className="text-offwhite font-semibold">Add to Home Screen</span>.
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lime font-bold text-sm shrink-0 mt-0.5">3</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tap <span className="text-offwhite font-semibold">Add</span> in the top-right corner.
              </p>
            </li>
          </ol>
        </div>
      );
    }

    return (
      <div className="px-6 pt-8 pb-10 space-y-4">
        <h2 className="text-offwhite text-xl font-bold font-orbitron">Add to Home Screen</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          To install MOOV as an app, open this page in{" "}
          <span className="text-offwhite font-semibold">Chrome</span> or{" "}
          <span className="text-offwhite font-semibold">Safari</span> on your phone or tablet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <SectionHeader label="User Experience" icon={<MdAddToHomeScreen size={20} />} />
      <div className="bg-charcoal/50 rounded-2xl px-4">
        <SettingsRow
          label="For the best experience, add MOOV to your home screen"
          border={false}
          action={
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="w-22 shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600 flex items-center justify-center"
            >
              How?
            </motion.button>
          }
        />
      </div>

      <ModalFromBottom open={showModal} onClose={() => setShowModal(false)}>
        {renderModalContent()}
      </ModalFromBottom>
    </div>
  );
}
