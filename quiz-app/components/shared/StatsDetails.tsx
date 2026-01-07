'use client'

import { QuizStats } from '@/hooks/ui/useQuizStats'
import { PATTERNS } from '@/lib/data/questions'
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

      {/* Pattern Performance */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-3">Performance by Pattern</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {PATTERNS.map((pattern) => {
            const patternStats = stats.byPattern[pattern.id as keyof typeof stats.byPattern]
            const hasData = patternStats && patternStats.answered > 0
            const accuracy = hasData ? patternStats.accuracy : 0

            return (
              <div
                key={pattern.id}
                className={cn(
                  "bg-white rounded-lg p-3 border-2 transition-all",
                  hasData ? "border-gray-200" : "border-gray-100 opacity-50"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{pattern.emoji}</span>
                  <span className="text-xs font-semibold text-gray-700 truncate flex-1">
                    {pattern.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-base font-bold",
                    hasData ? (
                      accuracy >= 70 ? "text-green-700" : accuracy >= 50 ? "text-yellow-700" : "text-red-700"
                    ) : "text-gray-400"
                  )}>
                    {hasData ? `${patternStats.correct}/${patternStats.answered}` : '0/0'}
                  </span>
                  <span className={cn(
                    "text-sm font-bold px-2 py-0.5 rounded",
                    hasData ? (
                      accuracy >= 70 ? "bg-green-100 text-green-700" : accuracy >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                    ) : "bg-gray-100 text-gray-400"
                  )}>
                    {accuracy}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Answers */}
      {stats.recentAnswers.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Answers</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {stats.recentAnswers.map((answer, index) => {
              const selectedPatternInfo = PATTERNS.find(p => p.id === answer.selectedPattern)
              const correctPatternInfo = PATTERNS.find(p => p.id === answer.correctPattern)

              return (
                <div
                  key={index}
                  className={cn(
                    "bg-white rounded-lg p-3 border-2",
                    answer.isCorrect ? "border-green-200" : "border-red-200"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">
                          {answer.isCorrect ? '✅' : '❌'}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 truncate">
                          {answer.questionTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {!answer.isCorrect && (
                          <>
                            <span className="text-xs text-gray-600">
                              Your answer: {selectedPatternInfo?.emoji} {selectedPatternInfo?.label}
                            </span>
                            <span className="text-xs text-gray-400">→</span>
                          </>
                        )}
                        <span className="text-xs font-medium text-emerald-700">
                          {correctPatternInfo?.emoji} {correctPatternInfo?.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-semibold capitalize',
                        getDifficultyColor(answer.difficulty)
                      )}>
                        {answer.difficulty}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {formatDate(answer.date)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

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
