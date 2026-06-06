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
const WAS_AUTHED_KEY = 'moov_was_authed'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const rehydrate = useProgressStore(s => s.rehydrate)
  const rehydrateUser = useUserStore(s => s.rehydrate)
  const setAuthReady = useUserStore(s => s.setAuthReady)

  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  useEffect(() => {
    const supabase = createClient()

    // onAuthStateChange is the single source of truth.
    // INITIAL_SESSION fires on every page load (with or without a session).
    // SIGNED_IN fires after a fresh OAuth/magic-link sign-in.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          localStorage.setItem(WAS_AUTHED_KEY, '1')
          document.cookie = 'moov_guest=; path=/; max-age=0'
          rehydrate()
          rehydrateUser()
          setAuthed(true)
          setIsOffline(false)
          if (isPublic) router.replace('/')
          syncOnLogin().then(() => { rehydrate(); rehydrateUser() }).catch(() => {})
        } else {
          const isGuest = document.cookie.includes('moov_guest=1')
          if (isGuest) {
            rehydrate()
            rehydrateUser()
            setAuthed(true)
          } else if (!navigator.onLine && localStorage.getItem(WAS_AUTHED_KEY) === '1') {
            // Offline but previously authenticated — keep user in the app
            rehydrate()
            rehydrateUser()
            setAuthed(true)
            setIsOffline(true)
          } else {
            setAuthed(false)
            if (!isPublic) router.replace('/login')
          }
        }
        setLoading(false)
        setAuthReady()
      }
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem(WAS_AUTHED_KEY)
        setAuthed(false)
        router.replace('/login')
      }
    })

    function handleOnline() {
      setIsOffline(false)
      pushProgress().catch(() => {})
    }
    function handleOffline() {
      setIsOffline(true)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
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
      {isOffline && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="bg-slate-800 border border-slate-600 text-slate-400 text-xs font-medium px-3 py-1 rounded-full">
            Offline
          </span>
        </div>
      )}
    </>
  )
}
