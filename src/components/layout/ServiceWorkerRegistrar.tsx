'use client'

import { useServiceWorker } from '@/hooks/useServiceWorker'

export function ServiceWorkerRegistrar() {
  const { updateAvailable, applyUpdate } = useServiceWorker()

  if (!updateAvailable) return null

  return (
    <div className="fixed top-0 inset-x-0 z-[60] flex justify-center px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)] pointer-events-none">
      <button
        onClick={applyUpdate}
        className="pointer-events-auto bg-lime text-navy font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg active:bg-lime-dim"
      >
        Update available — tap to refresh
      </button>
    </div>
  )
}
