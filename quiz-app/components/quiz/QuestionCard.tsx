'use client'

import { Question } from '@/lib/types/quiz'
import { Card } from '@/components/shared/Card'
import { cn } from '@/lib/utils/cn'

interface QuestionCardProps {
  question: Question
}

export function QuestionCard({ question }: QuestionCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
    all: 'bg-gray-100 text-gray-800'
  }

  return (
    <Card variant="elevated" className="w-full">
      <div className="space-y-4">
        {/* Difficulty Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-sm font-semibold capitalize',
              difficultyColors[question.difficulty]
            )}
          >
            {question.difficulty}
          </span>
        </div>

        {/* Question Title */}
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          {question.title}
        </h2>

        {/* Question Description */}
        <p className="text-lg leading-relaxed text-gray-700">
          {question.description}
        </p>

        {/* Hints (if available) */}
        {question.hints && question.hints.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-primary-600 hover:text-primary-700">
              Need a hint? 💡
            </summary>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              {question.hints.map((hint, index) => (
                <li key={index} className="pl-4 border-l-2 border-primary-200">
                  {hint}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </Card>
  )
}
