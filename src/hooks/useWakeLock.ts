'use client'

import { useEffect, useRef } from 'react'

export function useWakeLock(active: boolean) {
  const lockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    if (!active) {
      lockRef.current?.release().catch(() => {})
      lockRef.current = null
      return
    }

    async function acquire() {
      if (!('wakeLock' in navigator)) return
      try {
        lockRef.current = await navigator.wakeLock.request('screen')
      } catch {
        // Wake lock not available or denied — silent fail
      }
    }

    acquire()

    // Re-acquire when the page becomes visible again (iOS releases lock on blur)
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible' && active) {
        acquire()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      lockRef.current?.release().catch(() => {})
      lockRef.current = null
    }
  }, [active])
}
