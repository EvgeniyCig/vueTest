import { defineStore } from 'pinia'
import type { ThemeMode } from '../types/theme'

const STORAGE_KEY = 'theme-preference'

type ThemeState = {
  mode: ThemeMode
  mediaQuery: MediaQueryList | null
  mediaQueryHandler: ((event: MediaQueryListEvent) => void) | null
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    mode: 'system',
    mediaQuery: null,
    mediaQueryHandler: null
  }),

  getters: {
    isLight: (state): boolean => state.mode === 'light',
    isDark: (state): boolean => state.mode === 'dark',
    isSystem: (state): boolean => state.mode === 'system'
  },

  actions: {
    initTheme(): void {
      const saved = localStorage.getItem(STORAGE_KEY)
      this.mode = this.isThemeMode(saved) ? saved : 'system'
      this.applyTheme()
      this.setupSystemListener()
    },

    applyTheme(): void {
      document.documentElement.dataset.theme = this.mode
    },

    setTheme(mode: ThemeMode): void {
      this.mode = mode
      localStorage.setItem(STORAGE_KEY, mode)
      this.applyTheme()
    },

    setupSystemListener(): void {
      if (typeof window === 'undefined' || !window.matchMedia) return
      if (this.mediaQuery) return

      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      this.mediaQueryHandler = () => {
        if (this.mode === 'system') {
          this.applyTheme()
        }
      }

      if (this.mediaQuery.addEventListener) {
        this.mediaQuery.addEventListener('change', this.mediaQueryHandler)
      } else {
        this.mediaQuery.addListener(this.mediaQueryHandler)
      }
    },

    cleanupSystemListener(): void {
      if (!this.mediaQuery || !this.mediaQueryHandler) return

      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.mediaQueryHandler)
      } else {
        this.mediaQuery.removeListener(this.mediaQueryHandler)
      }

      this.mediaQuery = null
      this.mediaQueryHandler = null
    },

    isThemeMode(value: string | null): value is ThemeMode {
      return value === 'light' || value === 'dark' || value === 'system'
    }
  }
})