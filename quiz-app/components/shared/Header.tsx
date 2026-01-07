'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { SettingsModal } from './SettingsModal'

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-5 md:h-5 text-emerald-600"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-emerald-600 truncate">LeetTrac</h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block mt-0.5">
                Infinite practice • Master algorithmic thinking
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  )
}
