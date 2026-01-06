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
        'rounded-2xl p-6 text-center font-semibold shadow-2xl border-4',
        'animate-bounce-in backdrop-blur-sm',
        isCorrect
          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-300'
          : 'bg-gradient-to-br from-red-400 to-pink-500 text-white border-red-300'
      )}
    >
      <div className="text-6xl mb-4 animate-bounce">{isCorrect ? '🎉' : '💭'}</div>
      <div className="text-2xl font-extrabold mb-2">
        {isCorrect ? 'Perfect!' : 'Keep Learning!'}
      </div>
      <div className="text-base opacity-90 mb-4">
        {isCorrect ? 'You got it right!' : 'Not quite, but that\'s okay!'}
      </div>
      {!isCorrect && (
        <div className="mt-4 space-y-3 bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="text-2xl">{selectedPatternEmoji}</span>
            <span>You chose: <span className="font-extrabold">{selectedPatternLabel}</span></span>
          </div>
          <div className="h-px bg-white/30" />
          <div className="flex items-center justify-center gap-2 text-base">
            <span className="text-2xl">{correctPatternEmoji}</span>
            <span>Answer: <span className="font-extrabold">{correctPatternLabel}</span></span>
          </div>
        </div>
      )}
      {isCorrect && (
        <div className="mt-3 text-sm opacity-90">
          Next question coming up! 🚀
        </div>
      )}
    </div>
  )
}
