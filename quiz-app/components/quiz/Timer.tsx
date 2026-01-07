'use client'

import { formatTime } from '@/lib/utils/formatTime'

interface TimerProps {
  seconds: number
}

export function Timer({ seconds }: TimerProps) {
  return (
    <div className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold shadow-sm border-2 border-gray-200 flex items-center gap-2">
      <span className="text-xl">⏱️</span>
      <span className="text-lg tracking-wide">{formatTime(seconds)}</span>
    </div>
  )
}
