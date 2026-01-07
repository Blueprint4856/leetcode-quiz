'use client'

import { useState, useMemo, useEffect } from 'react'
import { Clock, Shuffle, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/data/questions'
import { PATTERNS } from '@/lib/data/questions'
import { Difficulty, Pattern } from '@/lib/types/quiz'
import { cn } from '@/lib/utils/cn'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Feedback } from '@/components/quiz/Feedback'
import { useSettings } from '@/hooks/ui/useSettings'
import { useQuizStats } from '@/hooks/ui/useQuizStats'

export function QuizInterface() {
  const router = useRouter()
  const { settings } = useSettings()
  const { recordAnswer } = useQuizStats()
  const [timedMode, setTimedMode] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedPattern, setSelectedPattern] = useState<Pattern | undefined>()
  const [showFeedback, setShowFeedback] = useState(false)

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
    setSelectedPattern(undefined)
    setShowFeedback(false)
  }

  // Reset index when filtered questions change
  useEffect(() => {
    if (currentQuestionIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentQuestionIndex(0)
    }
  }, [filteredQuestions.length, currentQuestionIndex])

  const handlePatternSelect = (patternId: string) => {
    if (showFeedback || !currentQuestion) return // Prevent multiple selections

    const pattern = patternId as Pattern
    setSelectedPattern(pattern)

    const isCorrect = pattern === currentQuestion.correctPattern

    // Update global stats
    const questionDifficulty = currentQuestion.difficulty as Difficulty
    recordAnswer(isCorrect, questionDifficulty)

    // Show feedback
    setShowFeedback(true)

    // Auto advance to next question after 2 seconds
    setTimeout(() => {
      handleNextQuestion()
    }, 2000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setCurrentQuestionIndex(0) // Loop back to start
    }
    setSelectedPattern(undefined)
    setShowFeedback(false)
  }

  const difficulties: { value: Difficulty | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]

  // If no questions available after filtering
  if (!currentQuestion || filteredQuestions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Questions Found</h3>
          <p className="text-gray-600 mb-6">
            No questions match your current filters. Try selecting different patterns in Settings or change the difficulty level.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    )
  }

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
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {PATTERNS.map((pattern) => {
            const isSelected = selectedPattern === pattern.id
            const isCorrect = currentQuestion && pattern.id === currentQuestion.correctPattern
            const showAsCorrect = showFeedback && isCorrect
            const showAsIncorrect = showFeedback && isSelected && !isCorrect

            return (
              <button
                key={pattern.id}
                onClick={() => handlePatternSelect(pattern.id)}
                disabled={showFeedback}
                className={cn(
                  'border-2 rounded-xl p-4 md:p-5 text-left transition-all group min-h-[68px] flex items-center',
                  showFeedback && 'cursor-not-allowed',
                  !showFeedback && 'hover:bg-emerald-100 hover:border-emerald-300',
                  showAsCorrect && 'bg-green-100 border-green-500',
                  showAsIncorrect && 'bg-red-100 border-red-500',
                  !showAsCorrect && !showAsIncorrect && 'bg-emerald-50 border-emerald-200'
                )}
              >
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-base md:text-lg flex-shrink-0">{pattern.emoji}</span>
                  <span className={cn(
                    'text-xs md:text-sm font-medium leading-tight',
                    showAsCorrect && 'text-green-900',
                    showAsIncorrect && 'text-red-900',
                    !showAsCorrect && !showAsIncorrect && 'text-gray-900 group-hover:text-emerald-700'
                  )}>
                    {pattern.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFeedback && selectedPattern && currentQuestion && (
          <div className="mt-6">
            <Feedback
              isCorrect={selectedPattern === currentQuestion.correctPattern}
              correctPattern={currentQuestion.correctPattern}
              selectedPattern={selectedPattern}
            />
          </div>
        )}
      </div>
    </div>
  )
}
