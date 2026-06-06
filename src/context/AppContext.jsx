import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ui } from '../i18n/ui.js'

const AppContext = createContext(null)

function getInitialLang() {
  if (typeof window === 'undefined') return 'en'
  return localStorage.getItem('lang') || 'en'
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem('theme') || 'light'
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleTheme = useCallback(
    () => setTheme((p) => (p === 'dark' ? 'light' : 'dark')),
    [],
  )

  // Resolve a dotted key path from the UI dictionary, falling back to English.
  const t = useCallback(
    (path) => {
      const segs = path.split('.')
      const read = (root) => segs.reduce((node, s) => node?.[s], root)
      const value = read(ui[lang])
      return value ?? read(ui.en) ?? path
    },
    [lang],
  )

  // Resolve a localized field, e.g. { en, es } -> string for current language.
  const L = useCallback(
    (value) =>
      value && typeof value === 'object' && !Array.isArray(value)
        ? (value[lang] ?? value.en)
        : value,
    [lang],
  )

  return (
    <AppContext.Provider
      value={{ lang, setLang, theme, setTheme, toggleTheme, t, L }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
