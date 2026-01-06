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

  return (
    <div
      className={cn(
        'rounded-xl p-4 text-center font-semibold',
        'animate-in slide-in-from-bottom duration-300',
        isCorrect
          ? 'bg-green-100 text-green-800 border-2 border-green-300'
          : 'bg-red-100 text-red-800 border-2 border-red-300'
      )}
    >
      <div className="text-2xl mb-2">{isCorrect ? '✅' : '❌'}</div>
      <div className="text-lg">
        {isCorrect ? 'Correct!' : 'Not quite!'}
      </div>
      {!isCorrect && (
        <div className="mt-2 text-sm">
          <div>You selected: <span className="font-bold">{selectedPatternLabel}</span></div>
          <div>Correct answer: <span className="font-bold">{correctPatternLabel}</span></div>
        </div>
      )}
    </div>
  )
}
