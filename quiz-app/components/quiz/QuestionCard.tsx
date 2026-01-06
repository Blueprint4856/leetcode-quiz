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
    <Card variant="elevated" className="w-full backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20 animate-slide-up">
      <div className="space-y-5">
        {/* Difficulty Badge with Gradient */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'px-4 py-2 rounded-full text-sm font-bold capitalize shadow-lg',
              'bg-gradient-to-r',
              config.gradient,
              'text-white flex items-center gap-2'
            )}
          >
            <span className="text-base">{config.emoji}</span>
            {question.difficulty}
          </span>
        </div>

        {/* Question Title with better styling */}
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          {question.title}
        </h2>

        {/* Question Description with background */}
        <div className={cn('p-4 rounded-xl', config.bg)}>
          <p className="text-lg leading-relaxed text-gray-800 font-medium">
            {question.description}
          </p>
        </div>

        {/* Hints with improved styling */}
        {question.hints && question.hints.length > 0 && (
          <details className="mt-4 group">
            <summary className={cn(
              'cursor-pointer text-base font-bold hover:text-primary-700',
              'flex items-center gap-2 p-3 rounded-lg hover:bg-primary-50 transition-all',
              config.text
            )}>
              <span className="text-xl">💡</span>
              Need a hint?
              <span className="ml-auto text-xs opacity-70 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <ul className="mt-3 space-y-3">
              {question.hints.map((hint, index) => (
                <li
                  key={index}
                  className={cn(
                    'pl-4 py-2 rounded-lg text-sm text-gray-700',
                    'border-l-4 bg-gradient-to-r',
                    config.gradient.replace('to-', 'via-'),
                    'border-l-transparent bg-clip-padding animate-slide-up'
                  )}
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
