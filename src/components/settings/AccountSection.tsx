"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa6";
import { createClient } from "@/lib/supabase/client";
import { SectionHeader } from "./SectionHeader";
import { ConfirmModal } from "./ConfirmModal";

export function AccountSection() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        setUserEmail(user?.email ?? null);
        setLoaded(true);
      });
  }, []);

  async function handleSignOut() {
    setShowConfirm(false);
    await createClient().auth.signOut();
  }

  return (
    <div className="px-4 pt-8 mb-6">
      <SectionHeader label="Account" icon={<FaUserAstronaut size={20} />} />
      <div className="bg-charcoal/50 rounded-2xl px-4">
        <div className="flex items-center justify-between gap-4 py-4">
          {!loaded ? (
            <>
              <div>
                <p className="text-slate-500 font-medium">Finding account</p>
                <p className="text-slate-500 text-xs mt-0.5">Loading...</p>
              </div>
              <div className="w-22 text-center shrink-0 bg-slate-700 text-slate-400 text-sm font-semibold px-0 py-2 rounded-xl">
                Loading
              </div>
            </>
          ) : userEmail ? (
            <>
              <div>
                <p className="text-offwhite font-medium">Signed in</p>
                <p className="text-slate-500 text-xs mt-0.5">{userEmail}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirm(true)}
                className="w-22 text-center shrink-0 bg-slate-700 text-slate-200 text-sm font-semibold px-0 py-2 rounded-xl active:bg-slate-600"
              >
                Sign out
              </motion.button>
            </>
          ) : (
            <>
              <div>
                <p className="text-offwhite font-medium">Not signed in</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  Sign in to save and sync your progress across devices.
                </p>
              </div>
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="/login"
                className="w-22 text-center shrink-0 bg-lime/20 text-lime border border-lime/40 whitespace-nowrap text-sm font-semibold px-0 py-2 rounded-xl active:bg-lime/30"
              >
                Sign in
              </motion.a>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSignOut}
        title="Sign out?"
        body="Your progress is saved and will sync back when you sign in again."
        confirmLabel="Sign out"
      />
    </div>
  );
}
