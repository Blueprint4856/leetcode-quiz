import { useQuery } from '@tanstack/react-query'
import { getQuestions } from '@/lib/api/questions'
import { Difficulty, Pattern } from '@/lib/types/quiz'

interface UseQuestionsOptions {
  difficulty?: Difficulty
  patterns?: Pattern[]
  limit?: number
  enabled?: boolean
}

export function useQuestions(options: UseQuestionsOptions = {}) {
  const { difficulty = 'all', patterns, limit = 10, enabled = true } = options

  return useQuery({
    queryKey: ['questions', { difficulty, patterns, limit }],
    queryFn: () => getQuestions({ difficulty, patterns, limit }),
    // Stale time: 5 minutes (questions don't change often)
    staleTime: 5 * 60 * 1000,
    // Cache time: 10 minutes
    gcTime: 10 * 60 * 1000,
    enabled,
    // Retry failed requests 2 times
    retry: 2,
    // Don't refetch on window focus for quiz questions
    refetchOnWindowFocus: false,
  })
}
