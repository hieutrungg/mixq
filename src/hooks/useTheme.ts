import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'mixq.theme'
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light'
}

function getInitialTheme(): { theme: Theme; followsSystem: boolean } {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return { theme: storedTheme, followsSystem: false }
    }
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return { theme: getSystemTheme(), followsSystem: true }
}

export function useTheme() {
  const [initialTheme] = useState(getInitialTheme)
  const [theme, setTheme] = useState<Theme>(initialTheme.theme)
  const [followsSystem, setFollowsSystem] = useState(initialTheme.followsSystem)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (!followsSystem) return

    const mediaQuery = window.matchMedia(DARK_MODE_QUERY)
    const handleSystemThemeChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light')

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [followsSystem])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    setFollowsSystem(false)

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // The current session still receives the theme even if persistence fails.
    }
  }

  return { theme, toggleTheme }
}
