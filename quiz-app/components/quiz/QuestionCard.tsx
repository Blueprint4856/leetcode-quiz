'use client'

import { Question } from '@/lib/types/quiz'
import { Card } from '@/components/shared/Card'
import { cn } from '@/lib/utils/cn'

interface QuestionCardProps {
  question: Question
}

export function QuestionCard({ question }: QuestionCardProps) {
  const difficultyConfig = {
    easy: {
      gradient: 'from-green-400 to-emerald-500',
      bg: 'bg-green-50',
      text: 'text-green-700',
      emoji: '🌱'
    },
    medium: {
      gradient: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      emoji: '⚡'
    },
    hard: {
      gradient: 'from-red-400 to-pink-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      emoji: '🔥'
    },
    all: {
      gradient: 'from-purple-400 to-indigo-500',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      emoji: '🎯'
    }
  }

  const config = difficultyConfig[question.difficulty]

  return (
    <Card variant="elevated" className="w-full bg-white shadow-lg border border-gray-200 animate-slide-up">
      <div className="space-y-4 md:space-y-5">
        {/* Difficulty Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold capitalize',
              question.difficulty === 'easy' && 'bg-emerald-100 text-emerald-700',
              question.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
              question.difficulty === 'hard' && 'bg-red-100 text-red-700',
              'flex items-center gap-1.5 md:gap-2'
            )}
          >
            <span className="text-sm md:text-base">{config.emoji}</span>
            {question.difficulty}
          </span>
        </div>

        {/* Question Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
          {question.title}
        </h2>

        {/* Question Description */}
        <div className="p-4 md:p-5 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-800">
            {question.description}
          </p>
        </div>

        {/* Hints */}
        {question.hints && question.hints.length > 0 && (
          <details className="mt-4 group">
            <summary className="cursor-pointer text-base font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2 p-3 rounded-lg hover:bg-emerald-50 transition-all">
              <span className="text-xl">💡</span>
              Need a hint?
              <span className="ml-auto text-xs opacity-70 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <ul className="mt-3 space-y-3">
              {question.hints.map((hint, index) => (
                <li
                  key={index}
                  className="pl-4 py-3 rounded-lg text-sm text-gray-700 border-l-4 border-emerald-400 bg-emerald-50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="font-medium">Hint {index + 1}:</span> {hint}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </Card>
  )
}
