'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuestions } from '@/hooks/queries/useQuestions'
import { useTimer } from '@/hooks/ui/useTimer'
import { useLocalStorage } from '@/hooks/ui/useLocalStorage'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { PatternSelector } from '@/components/quiz/PatternSelector'
import { Timer } from '@/components/quiz/Timer'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { Feedback } from '@/components/quiz/Feedback'
import { Button } from '@/components/shared/Button'
import { Card } from '@/components/shared/Card'
import { Pattern, Difficulty, Answer } from '@/lib/types/quiz'

export default function QuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const difficulty = (searchParams.get('difficulty') as Difficulty) || 'all'

  // Fetch questions
  const { data: questions, isLoading, error } = useQuestions({ difficulty, limit: 10 })

  // Quiz state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedPattern, setSelectedPattern] = useState<Pattern | undefined>()
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Timer
  const { seconds, start, pause, reset } = useTimer(false)

  // Start timer when questions load
  useEffect(() => {
    if (questions && questions.length > 0) {
      start()
    }
  }, [questions, start])

  // Handle pattern selection
  const handlePatternSelect = (pattern: Pattern) => {
    if (showFeedback) return // Prevent selection when showing feedback

    setSelectedPattern(pattern)
    const currentQuestion = questions?.[currentIndex]
    if (!currentQuestion) return

    const isCorrect = pattern === currentQuestion.correctPattern

    // Record answer
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedPattern: pattern,
      isCorrect,
      timeSpent: seconds
    }

    setAnswers(prev => [...prev, answer])
    setShowFeedback(true)

    // Auto advance after 2 seconds
    setTimeout(() => {
      handleNext()
    }, 2000)
  }

  // Handle next question
  const handleNext = () => {
    if (!questions) return

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1)
      setSelectedPattern(undefined)
      setShowFeedback(false)
    } else {
      // Quiz completed
      pause()
      setQuizCompleted(true)
    }
  }

  // Calculate score
  const score = answers.filter(a => a.isCorrect).length
  const totalQuestions = questions?.length || 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 flex items-center justify-center">
        <Card variant="elevated" className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-lg text-gray-700">Loading questions...</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 flex items-center justify-center">
        <Card variant="elevated" className="text-center">
          <p className="text-lg text-red-600 mb-4">Failed to load questions</p>
          <Button onClick={() => router.push('/')}>Go Back</Button>
        </Card>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 flex items-center justify-center">
        <Card variant="elevated" className="text-center">
          <p className="text-lg text-gray-700 mb-4">No questions available</p>
          <Button onClick={() => router.push('/')}>Go Back</Button>
        </Card>
      </div>
    )
  }

  // Quiz completed screen
  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Card variant="elevated" className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quiz Complete! 🎉
            </h1>

            <div className="my-8">
              <div className="text-6xl font-bold text-primary-600 mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-xl text-gray-600">
                {percentage}% Correct
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Total Time</div>
              <div className="text-2xl font-semibold text-gray-900">
                {Math.floor(seconds / 60)}m {seconds % 60}s
              </div>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => router.push('/quiz?difficulty=' + difficulty)}
              >
                Try Again
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => router.push('/')}
              >
                Back to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 pb-8">
      <div className="max-w-2xl mx-auto pt-4">
        {/* Header with timer and progress */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                  router.push('/')
                }
              }}
            >
              ← Quit
            </Button>
            <Timer seconds={seconds} />
          </div>

          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        </div>

        {/* Question Card */}
        <div className="mb-6">
          <QuestionCard question={currentQuestion} />
        </div>

        {/* Instruction */}
        <div className="mb-4 text-center">
          <p className="text-lg font-medium text-gray-700">
            Which pattern would you use?
          </p>
        </div>

        {/* Pattern Selector */}
        <div className="mb-6">
          <PatternSelector
            onSelect={handlePatternSelect}
            disabled={showFeedback}
            selectedPattern={selectedPattern}
          />
        </div>

        {/* Feedback */}
        {showFeedback && selectedPattern && (
          <div className="mb-6">
            <Feedback
              isCorrect={selectedPattern === currentQuestion.correctPattern}
              correctPattern={currentQuestion.correctPattern}
              selectedPattern={selectedPattern}
            />
          </div>
        )}

        {/* Score indicator */}
        <div className="text-center text-sm text-gray-600">
          Current Score: {score}/{answers.length}
        </div>
      </div>
    </div>
  )
}
