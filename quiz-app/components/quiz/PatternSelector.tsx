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
              'relative min-h-[72px] p-4 rounded-xl font-semibold transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transform hover:scale-105 active:scale-95',
              'animate-slide-up',
              // Default state
              !isSelected && [
                'bg-emerald-50 border-2 border-emerald-200 text-gray-800',
                'hover:border-emerald-300 hover:bg-emerald-100',
                'focus:ring-emerald-300'
              ],
              // Selected state
              isSelected && [
                'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg',
                'hover:bg-emerald-600',
                'focus:ring-emerald-500'
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
