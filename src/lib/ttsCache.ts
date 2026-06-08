import { get, set, del, entries, createStore } from 'idb-keyval'

interface CacheEntry {
  blob: Blob
  addedAt: number
}

const MAX_ENTRIES = 500

let _store: ReturnType<typeof createStore> | null = null

function getIdbStore() {
  if (typeof window === 'undefined') return null
  if (!_store) _store = createStore('moov-tts', 'audio-cache')
  return _store
}

const cacheKey = (text: string, voice: string) => `${voice}:${text}`

export async function getFromCache(text: string, voice: string): Promise<Blob | null> {
  const store = getIdbStore()
  if (!store) return null
  try {
    const entry = await get<CacheEntry>(cacheKey(text, voice), store)
    return entry?.blob ?? null
  } catch {
    return null
  }
}

export async function saveToCache(text: string, voice: string, blob: Blob): Promise<void> {
  const store = getIdbStore()
  if (!store) return
  try {
    await set(cacheKey(text, voice), { blob, addedAt: Date.now() } as CacheEntry, store)

    const all = await entries<string, CacheEntry>(store)
    if (all.length > MAX_ENTRIES) {
      all.sort((a, b) => a[1].addedAt - b[1].addedAt)
      await Promise.all(
        all.slice(0, all.length - MAX_ENTRIES).map(([k]) => del(k, store)),
      )
    }
  } catch {
    // fail silently
  }
}

export async function clearTtsCache(): Promise<void> {
  const store = getIdbStore()
  if (!store) return
  try {
    const all = await entries(store)
    await Promise.all(all.map(([k]) => del(k, store)))
  } catch {}
}
