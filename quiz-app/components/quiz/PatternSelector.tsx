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
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {PATTERNS.map((pattern) => {
        const isSelected = selectedPattern === pattern.id

        return (
          <button
            key={pattern.id}
            onClick={() => onSelect(pattern.id as Pattern)}
            disabled={disabled}
            className={cn(
              // Base styles - mobile-first with touch-friendly sizing
              'min-h-[56px] p-4 rounded-xl font-medium transition-all',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'active:scale-95',
              // Default state
              'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50',
              // Selected state
              isSelected && 'bg-primary-600 border-primary-600 text-white hover:bg-primary-700 hover:border-primary-700'
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">{pattern.emoji}</span>
              <span className="text-xs leading-tight text-center">
                {pattern.label}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
