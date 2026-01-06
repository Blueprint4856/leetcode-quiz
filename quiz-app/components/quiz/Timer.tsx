'use client'

import { formatTime } from '@/lib/utils/formatTime'

interface TimerProps {
  seconds: number
}

export function Timer({ seconds }: TimerProps) {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2 rounded-full font-semibold shadow-md">
      {formatTime(seconds)}
    </div>
  )
}
