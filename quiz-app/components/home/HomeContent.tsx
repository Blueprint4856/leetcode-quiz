'use client'

import { StatsBar } from '@/components/shared/StatsBar'
import { QuizInterface } from '@/components/home/QuizInterface'
import { useQuizStats } from '@/hooks/ui/useQuizStats'

export function HomeContent() {
  const { stats, recordAnswer, resetStats } = useQuizStats()

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-6 md:space-y-8">
      <StatsBar
        accuracy={stats.accuracy}
        streak={stats.currentStreak}
        best={stats.bestStreak}
        correct={stats.totalCorrect}
        total={stats.totalAnswered}
        fullStats={stats}
      />
      <QuizInterface recordAnswer={recordAnswer} resetStats={resetStats} />
    </div>
  )
}
