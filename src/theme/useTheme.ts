import { useCallback, useEffect, useState } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'blog-color-theme'
const THEME_EVENT = 'site-theme-change'

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Reading remains available when browser storage is restricted.
  }
  return 'system'
}

export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference)
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) setPreferenceState(readPreference())
    }
    const handleThemeChange = (event: Event) => {
      setPreferenceState((event as CustomEvent<ThemePreference>).detail)
    }
    media.addEventListener('change', handleSystemChange)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(THEME_EVENT, handleThemeChange)
    return () => {
      media.removeEventListener('change', handleSystemChange)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(THEME_EVENT, handleThemeChange)
    }
  }, [])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The current tab can still switch themes without persistent storage.
    }
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }))
  }, [])

  const theme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111318' : '#ffffff')
  }, [theme])

  return { preference, setPreference, theme }
}
