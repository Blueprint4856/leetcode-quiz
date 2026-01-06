'use client'

import { Pattern } from '@/lib/types/quiz'
import { PATTERNS } from '@/lib/data/questions'
import { cn } from '@/lib/utils/cn'

interface PatternSelectorProps {
  onSelect: (pattern: Pattern) => void
  disabled?: boolean
  selectedPattern?: Pattern
}

export function PatternSelector({
  onSelect,
  disabled = false,
  selectedPattern
}: PatternSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {PATTERNS.map((pattern, index) => {
        const isSelected = selectedPattern === pattern.id

        return (
          <button
            key={pattern.id}
            onClick={() => onSelect(pattern.id as Pattern)}
            disabled={disabled}
            style={{ animationDelay: `${index * 50}ms` }}
            className={cn(
              // Base styles - mobile-first with touch-friendly sizing
              'relative min-h-[72px] p-4 rounded-2xl font-semibold transition-all duration-200',
              'focus:outline-none focus:ring-4 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transform hover:scale-105 active:scale-95',
              'shadow-md hover:shadow-xl',
              'animate-slide-up',
              // Default state with gradient border effect
              !isSelected && [
                'bg-white border-2 border-gray-200 text-gray-800',
                'hover:border-purple-300 hover:bg-gradient-to-br hover:from-white hover:to-purple-50',
                'focus:ring-purple-300'
              ],
              // Selected state with vibrant gradient
              isSelected && [
                'bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600',
                'border-2 border-purple-400 text-white shadow-2xl',
                'hover:from-purple-600 hover:via-pink-600 hover:to-purple-700',
                'focus:ring-purple-500'
              ]
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-3xl transition-transform",
                isSelected && "animate-bounce"
              )}>
                {pattern.emoji}
              </span>
              <span className="text-xs leading-tight text-center font-bold">
                {pattern.label}
              </span>
            </div>
            {isSelected && (
              <div className="absolute top-1 right-1 text-white text-sm animate-bounce-in">
                ✓
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
