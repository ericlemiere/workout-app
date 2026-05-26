'use client'

import { useEffect } from 'react'
import { useProgressStore } from '@/store/progressStore'
import { useUserStore } from '@/store/userStore'

export function ProgressHydrator() {
  const hydrate = useProgressStore((s) => s.hydrate)
  const hydrateUser = useUserStore((s) => s.hydrate)
  useEffect(() => {
    hydrate()
    hydrateUser()
  }, [hydrate, hydrateUser])
  return null
}
