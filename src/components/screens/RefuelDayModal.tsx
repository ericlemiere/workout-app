"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GiGasPump } from "react-icons/gi";
import { useProgressStore } from "@/store/progressStore";

export function RefuelDayModal() {
  const refuelOffer = useProgressStore((s) => s.refuelOffer);
  const dismissed = useProgressStore((s) => s.refuelOfferDismissed);
  const refuelDaysAvailable = useProgressStore((s) => s.refuelDaysAvailable);
  const claimRefuelDay = useProgressStore((s) => s.claimRefuelDay);
  const dismissRefuelOffer = useProgressStore((s) => s.dismissRefuelOffer);

  const available = refuelDaysAvailable();
  const open = Boolean(refuelOffer) && !dismissed;

  return (
    <AnimatePresence>
      {open && refuelOffer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 safe-top safe-bottom"
          onClick={dismissRefuelOffer}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-charcoal rounded-3xl px-6 pt-8 pb-3"
          >
            <div className="text-lime flex justify-center mb-4">
              <GiGasPump size={56} />
            </div>

            <h2 className="text-offwhite text-xl font-bold mb-3 font-orbitron text-center tracking-wide">
              Refuel Day
            </h2>

            {available > 0 ? (
              <>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed text-center">
                  It looks like you missed yesterday&apos;s workout and broke
                  your {refuelOffer.streak}-day streak. Claim a refuel day to
                  keep the streak alive!
                </p>
                <p className="text-slate-500 text-xs mb-5 text-center">
                  You have {available} refuel {available === 1 ? "day" : "days"}{" "}
                  banked.
                </p>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={claimRefuelDay}
                  className="w-full bg-lime text-navy font-bold text-lg py-4 rounded-2xl active:opacity-80"
                >
                  Claim a Refuel Day
                </motion.button>
                <button
                  onClick={dismissRefuelOffer}
                  className="w-full py-2 text-slate-500 underline mt-3 text-sm"
                >
                  No thanks
                </button>
              </>
            ) : (
              <>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed text-center">
                  It looks like you missed yesterday&apos;s workout and broke
                  your {refuelOffer.streak}-day streak. Complete two workouts in
                  a single day to bank a refuel day — then you can spend it to
                  keep a streak alive.
                </p>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={dismissRefuelOffer}
                  className="w-full bg-lime text-navy font-bold text-lg py-4 rounded-2xl active:opacity-80"
                >
                  Got it
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
