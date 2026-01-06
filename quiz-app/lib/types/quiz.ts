export type Difficulty = 'easy' | 'medium' | 'hard' | 'all'

export type Pattern =
  | 'arrays_and_hashing'
  | 'two_pointers'
  | 'sliding_window'
  | 'stack'
  | 'binary_search'
  | 'linked_list'
  | 'trees'
  | 'graphs'
  | 'backtracking'
  | 'dynamic_programming'
  | 'greedy'
  | 'heap_priority_queue'

export interface Question {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  correctPattern: Pattern
  hints?: string[]
}

export interface QuizSession {
  id: string
  difficulty: Difficulty
  questions: Question[]
  currentQuestionIndex: number
  answers: Answer[]
  startTime: number
  endTime?: number
}

export interface Answer {
  questionId: string
  selectedPattern: Pattern
  isCorrect: boolean
  timeSpent: number
}

export interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  totalTime: number
  difficulty: Difficulty
  date: string
}
