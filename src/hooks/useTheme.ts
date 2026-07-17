import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'

export const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('light', theme === 'light')
  root.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('hari-theme', theme)
}

export function initialTheme(): Theme {
  const saved = localStorage.getItem('hari-theme')
  return saved === 'light' ? 'light' : 'dark'
}
