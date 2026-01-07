'use client'

import { Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 md:w-6 md:h-6 text-emerald-600"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-emerald-600 truncate">LeetTrac</h1>
            <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
              🎯 Infinite practice • Master algorithmic thinking
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" aria-label="Settings">
          <Settings className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
        </button>
      </div>
    </header>
  )
}
