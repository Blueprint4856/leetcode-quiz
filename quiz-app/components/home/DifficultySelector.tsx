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

  const difficulties: { value: Difficulty; label: string; description: string; emoji: string }[] = [
    {
      value: 'easy',
      label: 'Easy',
      description: '10 beginner-friendly questions',
      emoji: '🟢'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: '10 intermediate questions',
      emoji: '🟡'
    },
    {
      value: 'hard',
      label: 'Hard',
      description: '10 advanced questions',
      emoji: '🔴'
    },
    {
      value: 'all',
      label: 'All Levels',
      description: 'Mix of 10 random questions',
      emoji: '🎯'
    }
  ]

  const handleStartQuiz = () => {
    router.push(`/quiz?difficulty=${selectedDifficulty}`)
  }

  return (
    <Card variant="elevated" className="text-center">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          🎯 LeetCode Pattern Quiz
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Master algorithm pattern recognition without writing code
        </p>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-3 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-4">Select Difficulty:</p>
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            onClick={() => setSelectedDifficulty(diff.value)}
            className={cn(
              'w-full p-4 rounded-xl border-2 transition-all text-left',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              'active:scale-98',
              selectedDifficulty === diff.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{diff.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{diff.label}</div>
                <div className="text-sm text-gray-600">{diff.description}</div>
              </div>
              {selectedDifficulty === diff.value && (
                <div className="text-primary-600 font-bold">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-3 mt-8">
        <Button size="lg" className="w-full" onClick={handleStartQuiz}>
          Start Quiz
        </Button>

        <div className="pt-4 text-sm text-gray-500">
          <p>Mobile-first • Beginner-friendly • Pattern focused</p>
        </div>
      </div>
    </Card>
  )
}
