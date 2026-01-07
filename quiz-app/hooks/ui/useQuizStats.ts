import { useState, useEffect, useCallback } from 'react'

export interface QuizStats {
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  currentStreak: number
  bestStreak: number
}

const STATS_KEY = 'leettrac_quiz_stats'

const defaultStats: QuizStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  accuracy: 0,
  currentStreak: 0,
  bestStreak: 0,
}

export function useQuizStats() {
  const [stats, setStats] = useState<QuizStats>(defaultStats)

  // Load stats from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STATS_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setStats(parsed)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }
  }, [])

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats))
      } catch (error) {
        console.error('Error saving stats:', error)
      }
    }
  }, [stats])

  // Record a new answer
  const recordAnswer = useCallback((isCorrect: boolean) => {
    setStats((prev) => {
      const newTotalAnswered = prev.totalAnswered + 1
      const newTotalCorrect = prev.totalCorrect + (isCorrect ? 1 : 0)
      const newAccuracy = Math.round((newTotalCorrect / newTotalAnswered) * 100)

      const newCurrentStreak = isCorrect ? prev.currentStreak + 1 : 0
      const newBestStreak = Math.max(prev.bestStreak, newCurrentStreak)

      return {
        totalAnswered: newTotalAnswered,
        totalCorrect: newTotalCorrect,
        accuracy: newAccuracy,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
      }
    })
  }, [])

  // Reset all stats
  const resetStats = useCallback(() => {
    setStats(defaultStats)
  }, [])

  return {
    stats,
    recordAnswer,
    resetStats,
  }
}
