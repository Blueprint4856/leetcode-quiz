'use client'

import { X } from 'lucide-react'
import { useSettings } from '@/hooks/ui/useSettings'
import { PATTERNS } from '@/lib/data/questions'
import { cn } from '@/lib/utils/cn'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const LANGUAGE_INFO = [
  { id: 'pseudocode', label: 'Pseudo Code', emoji: '📝' },
  { id: 'javascript', label: 'JavaScript', emoji: '🟨' },
  { id: 'python', label: 'Python', emoji: '🐍' },
  { id: 'cpp', label: 'C++', emoji: '⚙️' },
  { id: 'react_typescript', label: 'React / TypeScript', emoji: '⚛️' },
] as const

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    settings,
    togglePattern,
    toggleLanguage,
    selectAllPatterns,
    deselectAllPatterns,
    selectAllLanguages,
    deselectAllLanguages,
    resetSettings,
    allPatterns,
    allLanguages,
  } = useSettings()

  if (!isOpen) return null

  const isPatternSelected = (patternId: string) =>
    settings.selectedPatterns.includes(patternId as any)

  const isLanguageSelected = (languageId: string) =>
    settings.selectedLanguages.includes(languageId as any)

  const allPatternsSelected = settings.selectedPatterns.length === allPatterns.length
  const allLanguagesSelected = settings.selectedLanguages.length === allLanguages.length

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 md:pt-16 px-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[85vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-200 bg-emerald-50">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-600 mt-1">
              Customize your training preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-8">
          {/* Patterns Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>🎯</span>
                  Pattern Methodologies
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Select which patterns to practice ({settings.selectedPatterns.length}/12)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={allPatternsSelected ? deselectAllPatterns : selectAllPatterns}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                >
                  {allPatternsSelected ? 'Clear All' : 'Select All'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PATTERNS.map((pattern) => {
                const isSelected = isPatternSelected(pattern.id)
                const isOnlyOne = settings.selectedPatterns.length === 1 && isSelected

                return (
                  <button
                    key={pattern.id}
                    onClick={() => !isOnlyOne && togglePattern(pattern.id as any)}
                    disabled={isOnlyOne}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left',
                      isSelected
                        ? 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-white border-gray-200 hover:border-gray-300',
                      isOnlyOne && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{pattern.emoji}</span>
                      <span className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-gray-900' : 'text-gray-600'
                      )}>
                        {pattern.label}
                      </span>
                    </div>

                    {/* Toggle */}
                    <div
                      className={cn(
                        'w-10 h-6 rounded-full transition-colors flex items-center',
                        isSelected ? 'bg-emerald-500' : 'bg-gray-300'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
                          isSelected ? 'translate-x-5' : 'translate-x-1'
                        )}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Languages Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>💻</span>
                  Coding Languages
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Choose which languages to test with ({settings.selectedLanguages.length}/5)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={allLanguagesSelected ? deselectAllLanguages : selectAllLanguages}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                >
                  {allLanguagesSelected ? 'Clear All' : 'Select All'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LANGUAGE_INFO.map((language) => {
                const isSelected = isLanguageSelected(language.id)
                const isOnlyOne = settings.selectedLanguages.length === 1 && isSelected

                return (
                  <button
                    key={language.id}
                    onClick={() => !isOnlyOne && toggleLanguage(language.id as any)}
                    disabled={isOnlyOne}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left',
                      isSelected
                        ? 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                        : 'bg-white border-gray-200 hover:border-gray-300',
                      isOnlyOne && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{language.emoji}</span>
                      <span className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-gray-900' : 'text-gray-600'
                      )}>
                        {language.label}
                      </span>
                    </div>

                    {/* Toggle */}
                    <div
                      className={cn(
                        'w-10 h-6 rounded-full transition-colors flex items-center',
                        isSelected ? 'bg-blue-500' : 'bg-gray-300'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
                          isSelected ? 'translate-x-5' : 'translate-x-1'
                        )}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">Pro Tip:</p>
                <p>
                  Start with a few patterns to focus on specific topics. You must keep at least one pattern and one language selected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 md:p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
          <button
            onClick={resetSettings}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 underline"
          >
            Reset to Defaults
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
