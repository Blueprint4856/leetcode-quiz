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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-3 md:px-4 py-2 md:py-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:gap-5 flex-wrap w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-xs md:text-sm">{accuracy}%</span>
            <span className="text-gray-600 text-[10px] md:text-xs hidden xs:inline">Accuracy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-xs md:text-sm">{streak}</span>
            <span className="text-gray-600 text-[10px] md:text-xs hidden xs:inline">Streak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-xs md:text-sm">{best}</span>
            <span className="text-gray-600 text-[10px] md:text-xs hidden xs:inline">Best</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-gray-900 text-xs md:text-sm">
              {correct} / {total}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          <span className="text-xs font-medium">Details</span>
          <ChevronDown className={cn(
            "w-3.5 h-3.5 transition-transform",
            showDetails && "rotate-180"
          )} />
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && fullStats && <StatsDetails stats={fullStats} />}
    </div>
  )
}
