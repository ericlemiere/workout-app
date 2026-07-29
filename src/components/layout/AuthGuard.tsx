"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { syncOnLogin, pushProgress } from "@/lib/sync";
import { clearAllProgress } from "@/lib/storage";
import { useProgressStore } from "@/store/progressStore";
import { useUserStore } from "@/store/userStore";
import { ProgressHydrator } from "./ProgressHydrator";
import { BottomNav } from "./BottomNav";
import { LoginScreen } from "@/components/auth/LoginScreen";

const WAS_AUTHED_KEY = "moov_was_authed";
const USER_ID_KEY = "moov_user_id";
const MEMBER_SINCE_KEY = "moov_member_since";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const rehydrate = useProgressStore((s) => s.rehydrate);
  const rehydrateUser = useUserStore((s) => s.rehydrate);
  const setAuthReady = useUserStore((s) => s.setAuthReady);
  const showLogin = useUserStore((s) => s.showLogin);
  const setShowLogin = useUserStore((s) => s.setShowLogin);
  const syncError = useUserStore((s) => s.syncError);
  const setSyncError = useUserStore((s) => s.setSyncError);
  const setDisplayName = useUserStore((s) => s.setDisplayName);
  const setUserEmail = useUserStore((s) => s.setUserEmail);
  const setMemberSince = useUserStore((s) => s.setMemberSince);
  const setVoiceName = useUserStore((s) => s.setVoiceName);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED"
      ) {
        if (session?.user) {
          // Merge local data only when the same user is continuing a session (app
          // reopened, token refresh, multi-device sync). On a fresh sign-in after
          // sign-out the user_id key is gone, so mergeLocal=false and remote wins.
          const storedUserId = localStorage.getItem(USER_ID_KEY);
          const mergeGuest = localStorage.getItem("moov_merge_guest") === "1";
          localStorage.removeItem("moov_merge_guest");
          const mergeLocal = storedUserId === session.user.id || mergeGuest;
          localStorage.setItem(USER_ID_KEY, session.user.id);
          localStorage.setItem(WAS_AUTHED_KEY, "1");
          if (session.user.created_at) {
            localStorage.setItem(MEMBER_SINCE_KEY, session.user.created_at);
          }
          document.cookie = "moov_guest=; path=/; max-age=0";
          setDisplayName(
            (
              session.user.user_metadata?.display_name ??
              session.user.email ??
              "Guest"
            ).slice(0, 40),
          );
          setUserEmail(session.user.email ?? null);
          setMemberSince(
            session.user.created_at ?? localStorage.getItem(MEMBER_SINCE_KEY),
          );
          if (session.user.user_metadata?.tts_voice) {
            setVoiceName(session.user.user_metadata.tts_voice);
          }
          rehydrate();
          rehydrateUser();
          setAuthed(true);
          setIsOffline(false);
          setShowLogin(false);
          syncOnLogin(mergeLocal)
            .then(() => {
              rehydrate();
              rehydrateUser();
            })
            .catch((err) => {
              console.error("[MOOV] Sync on login failed:", err);
              setSyncError(
                "Couldn't load your latest progress from the server.",
              );
            });
        } else {
          const isGuest = document.cookie.includes("moov_guest=1");
          if (isGuest) {
            rehydrate();
            rehydrateUser();
            setAuthed(true);
          } else if (
            !navigator.onLine &&
            localStorage.getItem(WAS_AUTHED_KEY) === "1"
          ) {
            rehydrate();
            rehydrateUser();
            setAuthed(true);
            setIsOffline(true);
            setMemberSince(localStorage.getItem(MEMBER_SINCE_KEY));
          } else {
            setAuthed(false);
            setShowLogin(true);
            setMemberSince(null);
          }
        }
        setLoading(false);
        setAuthReady();
      }
      if (event === "SIGNED_OUT") {
        localStorage.removeItem(WAS_AUTHED_KEY);
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(MEMBER_SINCE_KEY);
        setDisplayName("Guest");
        setUserEmail(null);
        setMemberSince(null);
        clearAllProgress();
        rehydrate();
        rehydrateUser();
        setAuthed(false);
        setShowLogin(true);
      }
    });

    function handleOnline() {
      setIsOffline(false);
      pushProgress().catch((err) => {
        console.error("[MOOV] Sync failed after coming back online:", err);
        setSyncError("Sync failed. Your progress is saved on this device.");
      });
    }
    function handleOffline() {
      setIsOffline(true);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!syncError) return;
    const t = setTimeout(() => setSyncError(null), 6000);
    return () => clearTimeout(t);
  }, [syncError]);

  const handleContinueAsGuest = () => {
    clearAllProgress();
    rehydrate();
    rehydrateUser();
    setAuthed(true);
    setShowLogin(false);
  };

  if (loading) return null;

  return (
    <>
      {authed && <ProgressHydrator />}
      {children}
      {authed && !showLogin && <BottomNav />}
      {isOffline && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="bg-slate-800 border border-slate-600 text-slate-400 text-xs font-medium px-3 py-1 rounded-full">
            Offline
          </span>
        </div>
      )}
      {showLogin && <LoginScreen onContinueAsGuest={handleContinueAsGuest} />}
      {syncError && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-60 w-full max-w-sm px-4">
          <div className="bg-slate-900 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-2xl flex items-start gap-3 shadow-xl">
            <span className="flex-1 leading-snug">{syncError}</span>
            <button
              onClick={() => setSyncError(null)}
              className="text-slate-500 hover:text-slate-300 shrink-0 mt-0.5"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
