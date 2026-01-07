'use client'

import { Pattern } from '@/lib/types/quiz'
import { PATTERNS } from '@/lib/data/questions'
import { cn } from '@/lib/utils/cn'

interface FeedbackProps {
  isCorrect: boolean
  correctPattern: Pattern
  selectedPattern?: Pattern
}

export function Feedback({
  isCorrect,
  correctPattern,
  selectedPattern
}: FeedbackProps) {
  const correctPatternLabel = PATTERNS.find(p => p.id === correctPattern)?.label
  const selectedPatternLabel = selectedPattern
    ? PATTERNS.find(p => p.id === selectedPattern)?.label
    : null

  const correctPatternEmoji = PATTERNS.find(p => p.id === correctPattern)?.emoji
  const selectedPatternEmoji = selectedPattern
    ? PATTERNS.find(p => p.id === selectedPattern)?.emoji
    : null

  return (
    <div
      className={cn(
        'rounded-xl p-6 text-center font-semibold shadow-lg border-2',
        'animate-bounce-in',
        isCorrect
          ? 'bg-green-50 text-green-900 border-green-300'
          : 'bg-red-50 text-red-900 border-red-300'
      )}
    >
      <div className="text-6xl mb-4 animate-bounce">{isCorrect ? '🎉' : '💭'}</div>
      <div className="text-2xl font-extrabold mb-2">
        {isCorrect ? 'Perfect!' : 'Keep Learning!'}
      </div>
      <div className="text-base mb-4">
        {isCorrect ? 'You got it right!' : 'Not quite, but that\'s okay!'}
      </div>
      {!isCorrect && (
        <div className="mt-4 space-y-3 bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="text-2xl">{selectedPatternEmoji}</span>
            <span>You chose: <span className="font-extrabold">{selectedPatternLabel}</span></span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="text-2xl">{correctPatternEmoji}</span>
            <span>Answer: <span className="font-extrabold">{correctPatternLabel}</span></span>
          </div>
        </div>
      )}
      {isCorrect && (
        <div className="mt-3 text-sm">
          Next question coming up! 🚀
        </div>
      )}
    </div>
  )
}
