'use client'

import { formatTime } from '@/lib/utils/formatTime'

interface TimerProps {
  seconds: number
}

export function Timer({ seconds }: TimerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl border-2 border-white/20 backdrop-blur-sm flex items-center gap-2 animate-pulse-glow">
      <span className="text-xl">⏱️</span>
      <span className="text-lg tracking-wide">{formatTime(seconds)}</span>
    </div>
  )
}
