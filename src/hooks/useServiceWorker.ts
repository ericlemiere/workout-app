'use client'

import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {/* silent fail in dev */})
    }
  }, [])
}
