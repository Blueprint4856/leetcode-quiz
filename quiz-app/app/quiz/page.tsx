'use client'

import { useState, useEffect, Suspense } from 'react'
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
import { cn } from '@/lib/utils/cn'

function QuizPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const difficulty = (searchParams.get('difficulty') as Difficulty) || 'all'
  const timedMode = searchParams.get('timed') === 'true'

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

  // Start timer when questions load (only if timed mode is enabled)
  useEffect(() => {
    if (questions && questions.length > 0 && timedMode) {
      start()
    }
  }, [questions, start, timedMode])

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
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 flex items-center justify-center">
        <Card variant="elevated" className="text-center backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20 animate-bounce-in">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6" />
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loading questions...
          </p>
          <p className="text-sm text-gray-600 mt-2">Get ready to test your pattern knowledge!</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 flex items-center justify-center">
        <Card variant="elevated" className="text-center backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20 animate-bounce-in">
          <div className="text-7xl mb-4 animate-bounce">😕</div>
          <p className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</p>
          <p className="text-base text-gray-600 mb-6">Failed to load questions. Please try again.</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-xl"
            onClick={() => router.push('/')}
          >
            Go Back Home 🏠
          </Button>
        </Card>
      </div>
    )
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 flex items-center justify-center">
        <Card variant="elevated" className="text-center backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20 animate-bounce-in">
          <div className="text-7xl mb-4 animate-bounce">📭</div>
          <p className="text-2xl font-bold text-gray-900 mb-4">No questions available</p>
          <p className="text-base text-gray-600 mb-6">We couldn't find any questions for this difficulty level.</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-xl"
            onClick={() => router.push('/')}
          >
            Go Back Home 🏠
          </Button>
        </Card>
      </div>
    )
  }

  // Quiz completed screen
  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100)
    const isPerfect = score === totalQuestions
    const isGood = percentage >= 70

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 flex items-center justify-center">
        <div className="max-w-md w-full animate-bounce-in">
          <Card variant="elevated" className="text-center backdrop-blur-sm bg-white/95 shadow-2xl border border-white/20">
            {/* Celebration Emoji */}
            <div className="text-8xl mb-6 animate-bounce">
              {isPerfect ? '🏆' : isGood ? '🎉' : '💪'}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {isPerfect ? 'Perfect Score!' : isGood ? 'Great Job!' : 'Keep Practicing!'}
            </h1>

            {/* Score Display */}
            <div className="my-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <div className="text-7xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {score}/{totalQuestions}
              </div>
              <div className="text-2xl font-bold text-gray-700">
                {percentage}% Correct
              </div>
            </div>

            {/* Stats Grid */}
            <div className={cn(
              "gap-4 mb-6",
              timedMode ? "grid grid-cols-2" : "flex justify-center"
            )}>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-sm text-gray-600 font-medium">Correct</div>
                <div className="text-2xl font-bold text-green-700">{score}</div>
              </div>
              {timedMode && (
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-sm text-gray-600 font-medium">Time</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              )}
            </div>

            {/* Motivational Message */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
              <p className="text-base font-medium text-gray-700">
                {isPerfect
                  ? '🌟 Outstanding! You\'ve mastered these patterns!'
                  : isGood
                  ? '🚀 You\'re getting the hang of it! Keep going!'
                  : '📚 Every quiz makes you better. Try again!'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-xl"
                onClick={() => router.push('/quiz?difficulty=' + difficulty)}
              >
                <span className="flex items-center justify-center gap-2">
                  Try Again 🔄
                </span>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full font-semibold border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                onClick={() => router.push('/')}
              >
                <span className="flex items-center justify-center gap-2">
                  Back to Home 🏠
                </span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 pb-8">
      <div className="max-w-2xl mx-auto pt-4">
        {/* Header with timer and progress */}
        <div className="mb-6 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/90 backdrop-blur-sm hover:bg-white font-semibold text-gray-700 shadow-lg border border-white/30"
              onClick={() => {
                if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                  router.push('/')
                }
              }}
            >
              ← Quit
            </Button>
            {timedMode && <Timer seconds={seconds} />}
          </div>

          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        </div>

        {/* Question Card */}
        <div className="mb-6">
          <QuestionCard question={currentQuestion} />
        </div>

        {/* Instruction */}
        <div className="mb-5 text-center animate-slide-up">
          <div className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30">
            <p className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎯 Which pattern would you use?
            </p>
          </div>
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
        <div className="text-center">
          <div className="inline-block px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30">
            <span className="text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Score: {score}/{answers.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-6" />
          <p className="text-2xl font-bold text-white">Loading quiz...</p>
        </div>
      </div>
    }>
      <QuizPageContent />
    </Suspense>
  )
}
