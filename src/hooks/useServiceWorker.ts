"use client";

import { useEffect, useRef, useState } from "react";

export function useServiceWorker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // Dev safety: remove existing SW + caches so localhost always reflects
      // source edits immediately.
      navigator.serviceWorker
        ?.getRegistrations()
        .then((registrations) => {
          for (const registration of registrations) {
            void registration.unregister();
          }
        })
        .catch(() => {});

      window.caches
        ?.keys()
        .then((keys) =>
          Promise.all(keys.map((key) => window.caches.delete(key))),
        )
        .catch(() => {});

      return;
    }

    if (!("serviceWorker" in navigator)) return;

    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });

    // register() checks for a new sw.js right away — this covers a fresh
    // page load (e.g. iOS fully evicted the app in the background).
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        registrationRef.current = registration;

        // A previous visit already found an update and left it waiting.
        if (registration.waiting && navigator.serviceWorker.controller) {
          setUpdateAvailable(true);
          return;
        }

        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            // An existing controller means this is a genuine update, not
            // the very first install for a new visitor.
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setUpdateAvailable(true);
            }
          });
        });
      })
      .catch(() => {
        /* silent fail in dev */
      });

    // Also check whenever the app regains focus (e.g. iOS just suspended it
    // rather than evicting it, so no fresh page load happened). This is safe
    // to do unconditionally — update() only checks for a new sw.js and, if
    // found, lets it install in the "waiting" state via the listener above.
    // It never reloads the page itself, so it can't interrupt a workout —
    // only the explicit tap on the banner does that.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        registrationRef.current?.update().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  function applyUpdate() {
    registrationRef.current?.waiting?.postMessage({ type: "SKIP_WAITING" });
  }

  return { updateAvailable, applyUpdate };
}
