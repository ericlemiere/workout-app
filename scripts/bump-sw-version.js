const fs = require('fs')
const path = require('path')

const version = `workout-${Date.now()}`

const content = `const CACHE = '${version}'

// All routes pre-fetched and cached at install time so the full app
// works offline without requiring the user to visit every page first.
const PRECACHE = [
  '/',
  '/settings',
  '/workout/workout-01',
  '/workout/workout-02',
  '/workout/workout-03',
  '/workout/workout-04',
  '/workout/workout-05',
  '/workout/workout-06',
  '/workout/workout-07',
  '/workout/workout-08',
  '/workout/workout-09',
  '/workout/workout-10',
  '/workout/workout-11',
  '/workout/workout-12',
  '/workout/workout-13',
  '/workout/workout-14',
  '/workout/workout-15',
  '/workout/workout-16',
  '/workout/workout-17',
  '/workout/workout-18',
  '/workout/workout-19',
  '/workout/workout-20',
  '/workout/workout-21',
  '/workout/workout-22',
  '/workout/workout-23',
  '/workout/workout-24',
  '/workout/workout-25',
  '/workout/workout-26',
  '/workout/workout-27',
  '/workout/workout-28',
  '/workout/workout-01/active',
  '/workout/workout-02/active',
  '/workout/workout-03/active',
  '/workout/workout-04/active',
  '/workout/workout-05/active',
  '/workout/workout-06/active',
  '/workout/workout-07/active',
  '/workout/workout-08/active',
  '/workout/workout-09/active',
  '/workout/workout-10/active',
  '/workout/workout-11/active',
  '/workout/workout-12/active',
  '/workout/workout-13/active',
  '/workout/workout-14/active',
  '/workout/workout-15/active',
  '/workout/workout-16/active',
  '/workout/workout-17/active',
  '/workout/workout-18/active',
  '/workout/workout-19/active',
  '/workout/workout-20/active',
  '/workout/workout-21/active',
  '/workout/workout-22/active',
  '/workout/workout-23/active',
  '/workout/workout-24/active',
  '/workout/workout-25/active',
  '/workout/workout-26/active',
  '/workout/workout-27/active',
  '/workout/workout-28/active',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  if (!e.request.url.startsWith(self.location.origin)) return

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const networkFetch = fetch(e.request).then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE).then((cache) => cache.put(e.request, clone))
        }
        return response
      })
      return cached ?? networkFetch
    })
  )
})
`

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sw.js'), content)
console.log(`SW cache version bumped to: ${version}`)
