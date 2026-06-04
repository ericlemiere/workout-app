"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Step = "idle" | "sending" | "sent" | "error";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const router = useRouter();

  const supabase = createClient();
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "/auth/callback";

  async function handleGoogle() {
    setGoogleBusy(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStep("sending");
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setErrorMsg(error.message);
      setStep("error");
    } else {
      setStep("sent");
    }
  }

  function handleContinueAsGuest() {
    document.cookie = "moov_guest=1; path=/; max-age=31536000; SameSite=Lax";
    router.replace("/");
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto bg-navy flex flex-col safe-top safe-bottom">
      {/* Logo and Tagline at Top */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full mx-auto pt-2"
      >
        <div className="mb-0">
          <Image
            src="/moov-logo-transparent.png"
            alt="MOOV Logo"
            width={850}
            height={289}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="mb-0">
          <p className="text-slate-300 text-center text-md font-orbitron">
            Your own personal workout cycle
          </p>
        </div>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="flex-1 flex justify-center w-full max-w-sm mx-auto px-6 py-16"
      >
        <div className="w-full">
          {/* Google */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogle}
            disabled={googleBusy}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3.5 rounded-2xl active:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          >
            <GoogleIcon />
            {googleBusy ? "Redirecting…" : "Continue with Google"}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-xs uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Magic link */}
          {step === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal/60 rounded-2xl p-5 text-center"
            >
              <div className="text-2xl mb-2">📬</div>
              <p className="text-offwhite font-semibold mb-1">
                Check your email
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                We sent a magic link to{" "}
                <span className="text-lime">{email}</span>. Tap it to sign in.
              </p>
              <button
                onClick={() => {
                  setStep("idle");
                  setEmail("");
                }}
                className="mt-4 text-slate-500 text-xs underline"
              >
                Use a different email
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal/60 text-offwhite placeholder-slate-500 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-lime/60 transition-colors"
                autoComplete="email"
                inputMode="email"
              />
              {step === "error" && (
                <p className="text-red-400 text-xs px-1">{errorMsg}</p>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={step === "sending" || !email.trim()}
                className="w-full bg-lime/20 text-lime border border-lime/40 font-semibold py-3.5 rounded-2xl active:bg-lime/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {step === "sending" ? "Sending…" : "Send magic link"}
              </motion.button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-xs uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Guest option */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowGuestWarning(true)}
              className="text-slate-500 text-sm flex items-center gap-1.5 active:text-slate-400"
            >
              Continue without signing in
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-3.5 h-3.5"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Guest warning modal */}
      <AnimatePresence>
        {showGuestWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-end justify-center z-50 pb-10 px-4"
            onClick={() => setShowGuestWarning(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-charcoal rounded-3xl p-6"
            >
              <h2 className="text-offwhite text-xl font-bold mb-2">
                Data saved locally only
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Your stats, achievements, and progress will be stored on this
                device only. If you clear your browser data, reinstall the app,
                or switch devices, your progress will be permanently lost.
                <br />
                <br />
                You can always sign in later to enable cloud backup.
              </p>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleContinueAsGuest}
                  className="w-full py-3.5 rounded-2xl bg-slate-700 text-slate-200 font-semibold active:bg-slate-600"
                >
                  Continue anyway
                </motion.button>
                <button
                  onClick={() => setShowGuestWarning(false)}
                  className="w-full py-3.5 rounded-2xl bg-lime/20 text-lime border border-lime/40 font-semibold active:bg-lime/30"
                >
                  Sign in instead
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
