'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { syncOnLogin, pushProgress } from '@/lib/sync'
import { useProgressStore } from '@/store/progressStore'
import { useUserStore } from '@/store/userStore'
import { ProgressHydrator } from './ProgressHydrator'
import { BottomNav } from './BottomNav'

const PUBLIC_PATHS = ['/login', '/auth/']

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const rehydrate = useProgressStore(s => s.rehydrate)
  const rehydrateUser = useUserStore(s => s.rehydrate)

  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  useEffect(() => {
    const supabase = createClient()

    // onAuthStateChange is the single source of truth.
    // INITIAL_SESSION fires on every page load (with or without a session).
    // SIGNED_IN fires after a fresh OAuth/magic-link sign-in.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (session?.user) {
          // Clear guest flag when a real session is established
          document.cookie = 'moov_guest=; path=/; max-age=0'
          rehydrate()
          rehydrateUser()
          setAuthed(true)
          if (isPublic) router.replace('/')
          syncOnLogin().then(() => { rehydrate(); rehydrateUser() }).catch(() => {})
        } else {
          const isGuest = document.cookie.includes('moov_guest=1')
          if (isGuest) {
            rehydrate()
            rehydrateUser()
            setAuthed(true)
          } else {
            setAuthed(false)
            if (!isPublic) router.replace('/login')
          }
        }
        setLoading(false)
      }
      if (event === 'SIGNED_OUT') {
        setAuthed(false)
        router.replace('/login')
      }
    })

    // Push any offline progress the moment connectivity is restored
    function handleOnline() {
      pushProgress().catch(() => {})
    }
    window.addEventListener('online', handleOnline)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  // Re-check guest cookie whenever the route changes — handles the case where
  // the user sets the cookie on /login then router.replace('/') fires before
  // onAuthStateChange has a chance to see the cookie.
  useEffect(() => {
    if (!loading && !authed && !isPublic) {
      if (document.cookie.includes('moov_guest=1')) {
        rehydrate()
        rehydrateUser()
        setAuthed(true)
      }
    }
  }, [pathname, loading])

  if (loading) return null

  if (!authed && !isPublic) return null

  return (
    <>
      {authed && <ProgressHydrator />}
      {children}
      {authed && !isPublic && <BottomNav />}
    </>
  )
}
