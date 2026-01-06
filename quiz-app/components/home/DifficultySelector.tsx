'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { Difficulty } from '@/lib/types/quiz'
import { cn } from '@/lib/utils/cn'

export function DifficultySelector() {
  const router = useRouter()
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all')
  const [timerEnabled, setTimerEnabled] = useState(true)

  const difficulties: {
    value: Difficulty
    label: string
    description: string
    emoji: string
    gradient: string
    border: string
  }[] = [
    {
      value: 'easy',
      label: 'Easy',
      description: '10 beginner-friendly questions',
      emoji: '🌱',
      gradient: 'from-green-400 to-emerald-500',
      border: 'border-green-400'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: '10 intermediate questions',
      emoji: '⚡',
      gradient: 'from-yellow-400 to-orange-500',
      border: 'border-yellow-400'
    },
    {
      value: 'hard',
      label: 'Hard',
      description: '10 advanced questions',
      emoji: '🔥',
      gradient: 'from-red-400 to-pink-500',
      border: 'border-red-400'
    },
    {
      value: 'all',
      label: 'All Levels',
      description: 'Mix of 10 random questions',
      emoji: '🎯',
      gradient: 'from-purple-400 to-indigo-500',
      border: 'border-purple-400'
    }
  ]

  const handleStartQuiz = () => {
    router.push(`/quiz?difficulty=${selectedDifficulty}&timed=${timerEnabled}`)
  }

  const selectedDiff = difficulties.find(d => d.value === selectedDifficulty)

  return (
    <div className="animate-slide-up">
      <Card variant="elevated" className="text-center backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20">
        {/* Header */}
        <div className="mb-8 animate-bounce-in">
          <div className="text-6xl mb-4 animate-pulse-glow inline-block">🎯</div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            LeetTrac
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Master LeetCode patterns without writing a single line of code
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-3 mb-8">
          <p className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wider">Choose Your Challenge</p>
          {difficulties.map((diff, index) => {
            const isSelected = selectedDifficulty === diff.value

            return (
              <button
                key={diff.value}
                onClick={() => setSelectedDifficulty(diff.value)}
                style={{ animationDelay: `${index * 100}ms` }}
                className={cn(
                  'w-full p-5 rounded-2xl transition-all text-left group animate-slide-up',
                  'focus:outline-none focus:ring-4 focus:ring-offset-2',
                  'transform hover:scale-[1.02] active:scale-[0.98]',
                  isSelected
                    ? `bg-gradient-to-r ${diff.gradient} border-2 ${diff.border} shadow-xl`
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "text-4xl transition-transform group-hover:scale-110",
                    isSelected && "animate-bounce"
                  )}>
                    {diff.emoji}
                  </div>
                  <div className="flex-1">
                    <div className={cn(
                      "font-bold text-lg",
                      isSelected ? "text-white" : "text-gray-900"
                    )}>
                      {diff.label}
                    </div>
                    <div className={cn(
                      "text-sm",
                      isSelected ? "text-white/90" : "text-gray-600"
                    )}>
                      {diff.description}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="text-white font-bold text-2xl animate-bounce-in">
                      ✓
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Timer Toggle */}
        <div className="mb-6 flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <span className="text-2xl">⏱️</span>
          <span className="text-base font-semibold text-gray-800">Timer</span>
          <button
            onClick={() => setTimerEnabled(!timerEnabled)}
            className={cn(
              "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
              timerEnabled ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform",
                timerEnabled ? "translate-x-7" : "translate-x-1"
              )}
            />
          </button>
          <span className={cn(
            "text-sm font-medium",
            timerEnabled ? "text-purple-700" : "text-gray-500"
          )}>
            {timerEnabled ? "On" : "Off"}
          </span>
        </div>

        {/* Start Button */}
        <div className="space-y-4 mt-8">
          <Button
            size="lg"
            className={cn(
              "w-full text-lg font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all",
              "bg-gradient-to-r",
              selectedDiff?.gradient
            )}
            onClick={handleStartQuiz}
          >
            <span className="flex items-center justify-center gap-2">
              Start Quiz {selectedDiff?.emoji}
            </span>
          </Button>

          <div className="flex items-center justify-center gap-3 pt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="text-purple-500">📱</span> Mobile-first
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-purple-500">🎓</span> User-friendly
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-purple-500">🧩</span> Pattern focused
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
