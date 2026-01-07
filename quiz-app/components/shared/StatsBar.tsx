'use client'

import { Target, Flame, Trophy, ChevronDown } from 'lucide-react'

interface StatsBarProps {
  accuracy: number
  streak: number
  best: number
  correct: number
  total: number
}

export function StatsBar({ accuracy, streak, best, correct, total }: StatsBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 md:gap-6 flex-wrap w-full sm:w-auto">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Target className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm md:text-base">{accuracy}%</span>
            <span className="text-gray-600 text-xs md:text-sm hidden xs:inline">Accuracy</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm md:text-base">{streak}</span>
            <span className="text-gray-600 text-xs md:text-sm hidden xs:inline">Streak</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Trophy className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm md:text-base">{best}</span>
            <span className="text-gray-600 text-xs md:text-sm hidden xs:inline">Best</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="font-bold text-gray-900 text-sm md:text-base">
              {correct} / {total}
            </span>
          </div>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          <span className="text-sm font-medium">Details</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
