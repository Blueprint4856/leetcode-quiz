'use client'

import { useState } from 'react'
import { Target, Flame, Trophy, ChevronDown } from 'lucide-react'
import { StatsDetails } from './StatsDetails'
import { QuizStats } from '@/hooks/ui/useQuizStats'
import { cn } from '@/lib/utils/cn'

interface StatsBarProps {
  accuracy: number
  streak: number
  best: number
  correct: number
  total: number
  fullStats?: QuizStats
}

export function StatsBar({ accuracy, streak, best, correct, total, fullStats }: StatsBarProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 md:px-8 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-8 flex-wrap w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm md:text-base">{accuracy}%</span>
            <span className="text-gray-600 text-xs md:text-sm hidden xs:inline">Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm md:text-base">{streak}</span>
            <span className="text-gray-600 text-xs md:text-sm hidden xs:inline">Streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm md:text-base">{best}</span>
            <span className="text-gray-600 text-xs md:text-sm hidden xs:inline">Best</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm md:text-base">
              {correct} / {total}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          <span className="text-sm font-medium">Details</span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            showDetails && "rotate-180"
          )} />
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && fullStats && <StatsDetails stats={fullStats} />}
    </div>
  )
}
