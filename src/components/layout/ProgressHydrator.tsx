'use client'

import { useEffect } from 'react'
import { useProgressStore } from '@/store/progressStore'

export function ProgressHydrator() {
  const hydrate = useProgressStore((s) => s.hydrate)
  useEffect(() => { hydrate() }, [hydrate])
  return null
}
