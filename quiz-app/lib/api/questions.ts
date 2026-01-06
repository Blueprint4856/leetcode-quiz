import { Question, Difficulty } from '@/lib/types/quiz'
import { QUESTIONS } from '@/lib/data/questions'
import { shuffleArray } from '@/lib/utils/shuffleArray'

interface GetQuestionsParams {
  difficulty?: Difficulty
  limit?: number
}

export async function getQuestions(
  params: GetQuestionsParams = {}
): Promise<Question[]> {
  const { difficulty, limit = 10 } = params

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  let filtered = QUESTIONS

  // Filter by difficulty
  if (difficulty && difficulty !== 'all') {
    filtered = QUESTIONS.filter(q => q.difficulty === difficulty)
  }

  // Shuffle and limit
  const shuffled = shuffleArray(filtered)
  return shuffled.slice(0, Math.min(limit, filtered.length))
}
