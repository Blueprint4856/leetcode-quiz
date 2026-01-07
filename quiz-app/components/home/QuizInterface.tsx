'use client'

import { useState, useMemo, useEffect } from 'react'
import { Clock, Shuffle, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/data/questions'
import { PATTERNS } from '@/lib/data/questions'
import { Difficulty } from '@/lib/types/quiz'
import { cn } from '@/lib/utils/cn'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { useSettings } from '@/hooks/ui/useSettings'

export function QuizInterface() {
  const router = useRouter()
  const { settings } = useSettings()
  const [timedMode, setTimedMode] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Get filtered questions based on difficulty and selected patterns
  const filteredQuestions = useMemo(() => {
    let filtered = QUESTIONS

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty)
    }

    // Filter by selected patterns
    if (settings.selectedPatterns.length > 0) {
      filtered = filtered.filter((q) => settings.selectedPatterns.includes(q.correctPattern))
    }

    return filtered
  }, [selectedDifficulty, settings.selectedPatterns])

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length)
    setCurrentQuestionIndex(randomIndex)
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setSelectedDifficulty('all')
    setTimedMode(false)
  }

  // Reset index when filtered questions change
  useEffect(() => {
    if (currentQuestionIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentQuestionIndex(0)
    }
  }, [filteredQuestions.length, currentQuestionIndex])

  const handlePatternSelect = (patternId: string) => {
    // Navigate to results page or show feedback
    console.log('Selected pattern:', patternId)
  }

  const difficulties: { value: Difficulty | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="space-y-4">
        {/* First Row: Timed + Difficulty Pills */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Timed Toggle */}
          <button
            onClick={() => setTimedMode(!timedMode)}
            className={cn(
              'flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 transition-all min-h-[44px]',
              timedMode
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
            )}
          >
            <Clock className="w-4 h-4" />
            <span className="font-medium text-sm">Timed</span>
          </button>

          {/* Difficulty Pills */}
          <div className="flex gap-2 flex-1 overflow-x-auto">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => {
                  setSelectedDifficulty(diff.value)
                  setCurrentQuestionIndex(0)
                }}
                className={cn(
                  'px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap min-h-[44px]',
                  selectedDifficulty === diff.value
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                )}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Shuffle + Reset */}
        <div className="flex gap-3">
          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            className="flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 transition-all flex-1 min-h-[44px]"
          >
            <Shuffle className="w-4 h-4" />
            <span className="font-medium text-sm">Shuffle</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 transition-all flex-1 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-medium text-sm">Reset</span>
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-gray-600 font-medium">
            Question #{currentQuestionIndex + 1}
          </span>
        </div>
        <QuestionCard question={currentQuestion} />
      </div>

      {/* Pattern Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {PATTERNS.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => handlePatternSelect(pattern.id)}
            className="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 hover:border-emerald-300 rounded-xl p-4 md:p-5 text-left transition-all group min-h-[68px] flex items-center"
          >
            <div className="flex items-center gap-2.5 w-full">
              <span className="text-base md:text-lg flex-shrink-0">{pattern.emoji}</span>
              <span className="text-xs md:text-sm font-medium text-gray-900 group-hover:text-emerald-700 leading-tight">
                {pattern.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
