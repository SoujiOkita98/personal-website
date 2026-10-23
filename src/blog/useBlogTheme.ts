import { useEffect, useState } from 'react'

export type BlogThemePreference = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'blog-color-theme'

function readPreference(): BlogThemePreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Reading remains available when browser storage is restricted.
  }
  return 'system'
}

export function useBlogTheme() {
  const [preference, setPreference] = useState<BlogThemePreference>(readPreference)
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) setPreference(readPreference())
    }
    media.addEventListener('change', handleSystemChange)
    window.addEventListener('storage', handleStorageChange)
    return () => {
      media.removeEventListener('change', handleSystemChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      // The current tab can still switch themes without persistent storage.
    }
  }, [preference])

  const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference
  return { preference, setPreference, theme }
}
