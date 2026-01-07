'use client'

import { useState } from 'react'
import { Clock, Shuffle, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/lib/data/questions'
import { PATTERNS } from '@/lib/data/questions'
import { Difficulty } from '@/lib/types/quiz'
import { cn } from '@/lib/utils/cn'

export function QuizInterface() {
  const router = useRouter()
  const [timedMode, setTimedMode] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Get filtered questions based on difficulty
  const getFilteredQuestions = () => {
    if (selectedDifficulty === 'all') return QUESTIONS
    return QUESTIONS.filter((q) => q.difficulty === selectedDifficulty)
  }

  const filteredQuestions = getFilteredQuestions()
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
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Timed Toggle */}
        <button
          onClick={() => setTimedMode(!timedMode)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all',
            timedMode
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
          )}
        >
          <Clock className="w-4 h-4" />
          <span className="font-medium text-sm">Timed</span>
        </button>

        {/* Difficulty Pills */}
        <div className="flex gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => {
                setSelectedDifficulty(diff.value)
                setCurrentQuestionIndex(0)
              }}
              className={cn(
                'px-6 py-3 rounded-xl font-medium text-sm transition-all',
                selectedDifficulty === diff.value
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
              )}
            >
              {diff.label}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Shuffle Button */}
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 transition-all"
        >
          <Shuffle className="w-4 h-4" />
          <span className="font-medium text-sm">Shuffle</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 hover:border-gray-300 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="font-medium text-sm">Reset</span>
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-gray-600 font-medium">
            Question #{currentQuestionIndex + 1}
          </span>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
              currentQuestion.difficulty === 'easy' &&
                'bg-emerald-100 text-emerald-700',
              currentQuestion.difficulty === 'medium' &&
                'bg-yellow-100 text-yellow-700',
              currentQuestion.difficulty === 'hard' && 'bg-red-100 text-red-700'
            )}
          >
            {currentQuestion.difficulty}
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-lg text-gray-900 leading-relaxed">
            {currentQuestion.description}
          </p>
        </div>

        <div className="space-y-3">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span className="font-medium">Need a hint?</span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="font-medium">Check my thinking first</span>
          </button>
        </div>
      </div>

      {/* Pattern Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PATTERNS.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => handlePatternSelect(pattern.id)}
            className="bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 hover:border-emerald-300 rounded-xl p-4 text-left transition-all group"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{pattern.emoji}</span>
              <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">
                {pattern.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
