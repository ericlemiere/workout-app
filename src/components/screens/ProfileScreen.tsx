"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa6";
import { createClient } from "@/lib/supabase/client";
import { pushProgress } from "@/lib/sync";
import { useUserStore } from "@/store/userStore";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export function ProfileScreen() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [nameSaving, setNameSaving] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setShowLogin = useUserStore((s) => s.setShowLogin);
  const displayName = useUserStore((s) => s.displayName);
  const setDisplayName = useUserStore((s) => s.setDisplayName);
  const userEmail = useUserStore((s) => s.userEmail);
  const authReady = useUserStore((s) => s.authReady);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  function startEditing() {
    setNameInput(displayName);
    setNameError(null);
    setEditingName(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function cancelEditing() {
    setEditingName(false);
    setNameError(null);
  }

  async function saveName() {
    const trimmed = nameInput.trim().slice(0, 40);
    setNameSaving(true);
    setNameError(null);
    try {
      if (isSignedIn) {
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
          data: { display_name: trimmed || null },
        });
        if (error) throw error;
      }
      setDisplayName(trimmed || (isSignedIn ? (userEmail ?? 'Guest') : 'Guest'));
      setEditingName(false);
    } catch {
      setNameError("Couldn't save your name. Please try again.");
    } finally {
      setNameSaving(false);
    }
  }

  async function handleSignOut() {
    setShowConfirm(false);
    setShowLogin(true);
    try {
      await pushProgress();
    } catch (err) {
      console.error("[MOOV] Sync failed on sign-out:", err);
    }
    await createClient().auth.signOut();
  }

  const isSignedIn = authReady && !isOffline && !!userEmail;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen max-w-xl mx-auto pb-28 safe-top"
    >
      <div className="px-4 pt-8 mb-6">
        <SectionHeader label="Profile" icon={<FaUserAstronaut size={20} />} />

        <div className="bg-charcoal/50 rounded-2xl px-4">
          {/* Account row */}
          <div className="flex items-center justify-between gap-4 py-4 border-b border-lime/50">
            {isOffline ? (
              <>
                <div>
                  <p className="text-offwhite font-medium">
                    You appear to be offline
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {localStorage.getItem("moov_was_authed") === "1"
                      ? "Your progress is saved locally and will sync when you're back online."
                      : "Your progress is saved locally. Sign in when back online to sync it across devices."}
                  </p>
                </div>
                <div className="w-22 text-center shrink-0 bg-slate-700 text-slate-400 text-sm font-semibold px-0 py-2 rounded-xl">
                  Offline
                </div>
              </>
            ) : userEmail ? (
              <>
                <div>
                  <p className="text-offwhite font-medium">You are signed in</p>
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
                  <p className="text-offwhite font-medium">
                    You are not signed in
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Sign in to save and sync your progress across devices.
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.cookie = "moov_guest=; path=/; max-age=0";
                    setShowLogin(true);
                  }}
                  className="w-22 text-center shrink-0 bg-lime/20 text-lime border border-lime/40 whitespace-nowrap text-sm font-semibold px-0 py-2 rounded-xl active:bg-lime/30"
                >
                  Sign in
                </motion.button>
              </>
            )}
          </div>
          {/* Name row */}
          <div className="py-4">
            {editingName ? (
              <div className="space-y-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveName();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  maxLength={40}
                  placeholder="Your name"
                  className="w-full bg-slate-800 text-offwhite placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-lime/50"
                />
                {nameError && (
                  <p className="text-red-400 text-xs">{nameError}</p>
                )}
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={saveName}
                    disabled={nameSaving}
                    className="flex-1 py-2 rounded-xl bg-lime text-navy text-sm font-semibold disabled:opacity-50"
                  >
                    {nameSaving ? "Saving…" : "Save"}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={cancelEditing}
                    className="flex-1 py-2 rounded-xl bg-slate-700 text-slate-200 text-sm font-semibold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-offwhite font-medium">Profile name</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {displayName}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={startEditing}
                  className="shrink-0 w-22 bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl active:bg-slate-600"
                >
                  Edit
                </motion.button>
              </div>
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
    </motion.div>
  );
}
