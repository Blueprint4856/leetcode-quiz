import { useState, useEffect, useCallback } from 'react'
import { Pattern } from '@/lib/types/quiz'

export type Language = 'pseudocode' | 'javascript' | 'python' | 'cpp' | 'react_typescript'

export interface Settings {
  selectedPatterns: Pattern[]
  selectedLanguages: Language[]
}

const SETTINGS_KEY = 'leettrac_settings'

const ALL_PATTERNS: Pattern[] = [
  'arrays_and_hashing',
  'two_pointers',
  'sliding_window',
  'stack',
  'binary_search',
  'linked_list',
  'trees',
  'graphs',
  'backtracking',
  'dynamic_programming',
  'greedy',
  'heap_priority_queue',
]

const ALL_LANGUAGES: Language[] = [
  'pseudocode',
  'javascript',
  'python',
  'cpp',
  'react_typescript',
]

const defaultSettings: Settings = {
  selectedPatterns: [...ALL_PATTERNS], // All patterns enabled by default
  selectedLanguages: ['pseudocode'], // Pseudocode enabled by default
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(SETTINGS_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setSettings({
            selectedPatterns: parsed.selectedPatterns || defaultSettings.selectedPatterns,
            selectedLanguages: parsed.selectedLanguages || defaultSettings.selectedLanguages,
          })
        }
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
      } catch (error) {
        console.error('Error saving settings:', error)
      }
    }
  }, [settings])

  // Toggle a pattern on/off
  const togglePattern = useCallback((pattern: Pattern) => {
    setSettings((prev) => {
      const isSelected = prev.selectedPatterns.includes(pattern)

      if (isSelected) {
        // Don't allow deselecting if it's the last one
        if (prev.selectedPatterns.length === 1) {
          return prev
        }
        return {
          ...prev,
          selectedPatterns: prev.selectedPatterns.filter((p) => p !== pattern),
        }
      } else {
        return {
          ...prev,
          selectedPatterns: [...prev.selectedPatterns, pattern],
        }
      }
    })
  }, [])

  // Toggle a language on/off
  const toggleLanguage = useCallback((language: Language) => {
    setSettings((prev) => {
      const isSelected = prev.selectedLanguages.includes(language)

      if (isSelected) {
        // Don't allow deselecting if it's the last one
        if (prev.selectedLanguages.length === 1) {
          return prev
        }
        return {
          ...prev,
          selectedLanguages: prev.selectedLanguages.filter((l) => l !== language),
        }
      } else {
        return {
          ...prev,
          selectedLanguages: [...prev.selectedLanguages, language],
        }
      }
    })
  }, [])

  // Select all patterns
  const selectAllPatterns = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      selectedPatterns: [...ALL_PATTERNS],
    }))
  }, [])

  // Deselect all patterns (except one)
  const deselectAllPatterns = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      selectedPatterns: [ALL_PATTERNS[0]], // Keep at least one
    }))
  }, [])

  // Select all languages
  const selectAllLanguages = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      selectedLanguages: [...ALL_LANGUAGES],
    }))
  }, [])

  // Deselect all languages (except one)
  const deselectAllLanguages = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      selectedLanguages: [ALL_LANGUAGES[0]], // Keep at least one
    }))
  }, [])

  // Reset to defaults
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
  }, [])

  return {
    settings,
    togglePattern,
    toggleLanguage,
    selectAllPatterns,
    deselectAllPatterns,
    selectAllLanguages,
    deselectAllLanguages,
    resetSettings,
    allPatterns: ALL_PATTERNS,
    allLanguages: ALL_LANGUAGES,
  }
}
