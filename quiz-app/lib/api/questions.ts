import { Question, Difficulty, Pattern } from '@/lib/types/quiz'
import { QUESTIONS } from '@/lib/data/questions'
import { shuffleArray } from '@/lib/utils/shuffleArray'

interface GetQuestionsParams {
  difficulty?: Difficulty
  patterns?: Pattern[]
  limit?: number
}

export async function getQuestions(
  params: GetQuestionsParams = {}
): Promise<Question[]> {
  const { difficulty, patterns, limit = 10 } = params

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  let filtered = QUESTIONS

  // Filter by difficulty
  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty)
  }

  // Filter by patterns
  if (patterns && patterns.length > 0) {
    filtered = filtered.filter(q => patterns.includes(q.correctPattern))
  }

  // Shuffle and limit
  const shuffled = shuffleArray(filtered)
  return shuffled.slice(0, Math.min(limit, filtered.length))
}
