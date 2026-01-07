import { useState, useEffect, useCallback } from 'react'
import { Difficulty } from '@/lib/types/quiz'

export interface DifficultyStats {
  answered: number
  correct: number
  accuracy: number
}

export interface QuizStats {
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  currentStreak: number
  bestStreak: number
  byDifficulty: {
    easy: DifficultyStats
    medium: DifficultyStats
    hard: DifficultyStats
  }
  recentSessions: Array<{
    date: string
    score: number
    total: number
    difficulty: Difficulty
  }>
}

const STATS_KEY = 'leettrac_quiz_stats'

const defaultDifficultyStats: DifficultyStats = {
  answered: 0,
  correct: 0,
  accuracy: 0,
}

const defaultStats: QuizStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  accuracy: 0,
  currentStreak: 0,
  bestStreak: 0,
  byDifficulty: {
    easy: { ...defaultDifficultyStats },
    medium: { ...defaultDifficultyStats },
    hard: { ...defaultDifficultyStats },
  },
  recentSessions: [],
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
          // Migrate old stats to new structure
          const migratedStats = {
            ...defaultStats,
            ...parsed,
            byDifficulty: parsed.byDifficulty || defaultStats.byDifficulty,
            recentSessions: parsed.recentSessions || [],
          }
          setStats(migratedStats)
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
  const recordAnswer = useCallback((isCorrect: boolean, difficulty?: Difficulty) => {
    setStats((prev) => {
      const newTotalAnswered = prev.totalAnswered + 1
      const newTotalCorrect = prev.totalCorrect + (isCorrect ? 1 : 0)
      const newAccuracy = Math.round((newTotalCorrect / newTotalAnswered) * 100)

      const newCurrentStreak = isCorrect ? prev.currentStreak + 1 : 0
      const newBestStreak = Math.max(prev.bestStreak, newCurrentStreak)

      // Update difficulty-specific stats
      const newByDifficulty = { ...prev.byDifficulty }
      if (difficulty && difficulty !== 'all' && newByDifficulty[difficulty]) {
        const diffStats = newByDifficulty[difficulty]
        const newAnswered = diffStats.answered + 1
        const newCorrect = diffStats.correct + (isCorrect ? 1 : 0)
        newByDifficulty[difficulty] = {
          answered: newAnswered,
          correct: newCorrect,
          accuracy: Math.round((newCorrect / newAnswered) * 100),
        }
      }

      return {
        totalAnswered: newTotalAnswered,
        totalCorrect: newTotalCorrect,
        accuracy: newAccuracy,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        byDifficulty: newByDifficulty,
        recentSessions: prev.recentSessions,
      }
    })
  }, [])

  // Record a completed quiz session
  const recordSession = useCallback((score: number, total: number, difficulty: Difficulty) => {
    setStats((prev) => {
      const newSession = {
        date: new Date().toISOString(),
        score,
        total,
        difficulty,
      }

      // Keep only the last 10 sessions
      const newSessions = [newSession, ...prev.recentSessions].slice(0, 10)

      return {
        ...prev,
        recentSessions: newSessions,
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
    recordSession,
    resetStats,
  }
}
