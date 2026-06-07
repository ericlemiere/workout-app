"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa6";
import { createClient } from "@/lib/supabase/client";
import { pushProgress } from "@/lib/sync";
import { useUserStore } from "@/store/userStore";
import { SectionHeader } from "./SectionHeader";
import { ConfirmModal } from "./ConfirmModal";

export function AccountSection() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const setShowLogin = useUserStore(s => s.setShowLogin);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
      setLoaded(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUserEmail(session?.user?.email ?? null);
        setLoaded(true);
      }
      if (event === 'SIGNED_OUT') {
        setUserEmail(null);
        setLoaded(true);
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function handleSignOut() {
    setShowConfirm(false);
    setShowLogin(true);
    try {
      await pushProgress();
    } catch (err) {
      console.error('[MOOV] Sync failed on sign-out:', err);
    }
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
                <p className="account_section_title text-slate-500 font-medium">Finding account</p>
                <p className="account_section_subtitle text-slate-500 text-xs mt-0.5">Loading...</p>
              </div>
              <div className="w-22 text-center shrink-0 bg-slate-700 text-slate-400 text-sm font-semibold px-0 py-2 rounded-xl">
                Loading
              </div>
            </>
          ) : isOffline ? (
            <>
              <div>
                <p className="account_section_title text-offwhite font-medium">You appear to be offline</p>
                <p className="account_section_subtitle text-slate-500 text-xs mt-0.5">
                  {localStorage.getItem('moov_was_authed') === '1'
                    ? 'Your progress is saved locally and will sync when you\'re back online.'
                    : 'Your progress is saved locally. Sign in when back online to sync it across devices.'}
                </p>
              </div>
              <div className="w-22 text-center shrink-0 bg-slate-700 text-slate-400 text-sm font-semibold px-0 py-2 rounded-xl">
                Offline
              </div>
            </>
          ) : userEmail ? (
            <>
              <div>
                <p className="account_section_title text-offwhite font-medium">You are signed in</p>
                <p className="account_section_subtitle text-slate-500 text-xs mt-0.5">{userEmail}</p>
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
                <p className="account_section_title text-offwhite font-medium">You are not signed in</p>
                <p className="account_section_subtitle text-slate-500 text-xs mt-0.5">
                  Sign in to save and sync your progress across devices.
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.cookie = 'moov_guest=; path=/; max-age=0'
                  setShowLogin(true)
                }}
                className="w-22 text-center shrink-0 bg-lime/20 text-lime border border-lime/40 whitespace-nowrap text-sm font-semibold px-0 py-2 rounded-xl active:bg-lime/30"
              >
                Sign in
              </motion.button>
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
