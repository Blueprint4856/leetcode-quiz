'use client'

import { QuizStats } from '@/hooks/ui/useQuizStats'
import { cn } from '@/lib/utils/cn'

interface StatsDetailsProps {
  stats: QuizStats
}

export function StatsDetails({ stats }: StatsDetailsProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="mt-4 p-5 md:p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-6 animate-slide-up">
      {/* Difficulty Breakdown */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3">Performance by Difficulty</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Easy */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 uppercase">Easy</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">
                {stats.byDifficulty.easy.answered > 0 ? stats.byDifficulty.easy.accuracy : 0}%
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {stats.byDifficulty.easy.correct}/{stats.byDifficulty.easy.answered}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.byDifficulty.easy.answered} attempted
            </div>
          </div>

          {/* Medium */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 uppercase">Medium</span>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">
                {stats.byDifficulty.medium.answered > 0 ? stats.byDifficulty.medium.accuracy : 0}%
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {stats.byDifficulty.medium.correct}/{stats.byDifficulty.medium.answered}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.byDifficulty.medium.answered} attempted
            </div>
          </div>

          {/* Hard */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 uppercase">Hard</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">
                {stats.byDifficulty.hard.answered > 0 ? stats.byDifficulty.hard.accuracy : 0}%
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {stats.byDifficulty.hard.correct}/{stats.byDifficulty.hard.answered}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stats.byDifficulty.hard.answered} attempted
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      {stats.recentSessions.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {stats.recentSessions.map((session, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {session.score === session.total ? '🏆' : session.score / session.total >= 0.7 ? '🎉' : '📚'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {session.score}/{session.total}
                      </span>
                      <span className={cn(
                        'px-2 py-0.5 rounded text-xs font-semibold capitalize',
                        getDifficultyColor(session.difficulty)
                      )}>
                        {session.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {formatDate(session.date)}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-600">
                  {Math.round((session.score / session.total) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No data message */}
      {stats.totalAnswered === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-sm font-medium text-gray-600">
            Start taking quizzes to see detailed statistics!
          </p>
        </div>
      )}
    </div>
  )
}
