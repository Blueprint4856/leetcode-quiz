# LeetCode Pattern Recognition Quiz - Development Guide

## Project Overview

A mobile-first web application focused on training pattern recognition for LeetCode-style problems. Users learn to identify which algorithm pattern to use based on problem descriptions, without writing code.

**Target Audience**: Beginners learning algorithms and data structures
**Primary Platform**: Mobile web (with future React Native compatibility)

---

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **State Management**: TanStack Query v5
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Future**: React Native compatibility

---

## Core Principles

### 1. Mobile-First Design
- All components designed for mobile screens first (320px+)
- Touch-friendly interactions (44px minimum touch targets)
- Optimized for one-handed usage
- Progressive enhancement for larger screens

### 2. Code Reusability (React Native Ready)
- Separate business logic from UI components
- Use custom hooks for all data fetching
- Keep platform-specific code isolated
- Use cross-platform patterns

### 3. Simplicity & Accessibility
- Clear visual hierarchy
- Simple language (no jargon)
- High contrast colors
- Large, readable text

---

## Project Structure

```
leetcode-quiz/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── quiz/
│   │       └── page.tsx
│   ├── components/               # UI Components
│   │   ├── quiz/
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── PatternSelector.tsx
│   │   │   ├── Timer.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── leaderboard/
│   │   │   ├── LeaderboardList.tsx
│   │   │   └── LeaderboardEntry.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   ├── hooks/                    # Custom Hooks (Reusable)
│   │   ├── queries/
│   │   │   ├── useQuestions.ts
│   │   │   ├── useLeaderboard.ts
│   │   │   └── useQuizSession.ts
│   │   ├── mutations/
│   │   │   ├── useSubmitAnswer.ts
│   │   │   └── useSaveScore.ts
│   │   └── ui/
│   │       ├── useTimer.ts
│   │       └── useLocalStorage.ts
│   ├── lib/                      # Business Logic (Platform Agnostic)
│   │   ├── api/
│   │   │   ├── questions.ts
│   │   │   └── leaderboard.ts
│   │   ├── utils/
│   │   │   ├── formatTime.ts
│   │   │   └── shuffleArray.ts
│   │   └── types/
│   │       └── quiz.ts
│   └── config/
│       ├── queryClient.ts
│       └── constants.ts
├── public/
└── tailwind.config.ts
```

---

## Component Best Practices

### 1. Component Structure

```tsx
// components/quiz/QuestionCard.tsx
'use client'

import { Question } from '@/lib/types/quiz'

interface QuestionCardProps {
  question: Question
  onAnswer: (pattern: string) => void
  isDisabled?: boolean
}

export function QuestionCard({
  question,
  onAnswer,
  isDisabled = false
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Mobile-first, semantic HTML */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        {question.title}
      </h2>
      <p className="text-lg leading-relaxed mb-6 text-gray-700">
        {question.description}
      </p>
      {/* Content */}
    </div>
  )
}
```

### 2. Button Component (Reusable, Touch-Friendly)

```tsx
// components/shared/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles - mobile-first
          'rounded-lg font-semibold transition-all active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Minimum touch target: 44px
          'min-h-[44px] px-6',
          // Variants
          variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
          variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
          variant === 'ghost' && 'bg-transparent hover:bg-gray-100',
          // Sizes
          size === 'sm' && 'text-sm px-4',
          size === 'md' && 'text-base px-6',
          size === 'lg' && 'text-lg px-8',
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

### 3. Card Component

```tsx
// components/shared/Card.tsx
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
}

export function Card({
  className,
  variant = 'default',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        variant === 'default' && 'bg-white',
        variant === 'elevated' && 'bg-white shadow-lg',
        variant === 'outlined' && 'bg-white border-2 border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

---

## TanStack Query Best Practices

### 1. Query Hook Structure

```tsx
// hooks/queries/useQuestions.ts
import { useQuery } from '@tanstack/react-query'
import { getQuestions } from '@/lib/api/questions'
import { Question, Difficulty } from '@/lib/types/quiz'

interface UseQuestionsOptions {
  difficulty?: Difficulty
  limit?: number
  enabled?: boolean
}

export function useQuestions(options: UseQuestionsOptions = {}) {
  const { difficulty, limit = 10, enabled = true } = options

  return useQuery({
    queryKey: ['questions', { difficulty, limit }],
    queryFn: () => getQuestions({ difficulty, limit }),
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

// Usage in component:
// const { data: questions, isLoading, error } = useQuestions({ difficulty: 'easy' })
```

### 2. Mutation Hook Structure

```tsx
// hooks/mutations/useSubmitAnswer.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitAnswer } from '@/lib/api/quiz'

interface SubmitAnswerData {
  questionId: string
  selectedPattern: string
  timeSpent: number
}

export function useSubmitAnswer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: SubmitAnswerData) => submitAnswer(data),
    onSuccess: (response, variables) => {
      // Update quiz session cache
      queryClient.invalidateQueries({
        queryKey: ['quiz-session']
      })

      // Optimistically update UI if needed
      // queryClient.setQueryData(['quiz-session'], (old) => ...)
    },
    onError: (error) => {
      console.error('Failed to submit answer:', error)
      // Handle error (show toast, etc.)
    },
  })
}

// Usage:
// const submitAnswerMutation = useSubmitAnswer()
// submitAnswerMutation.mutate({ questionId, selectedPattern, timeSpent })
```

### 3. Query Client Configuration

```tsx
// config/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0, // Don't retry mutations by default
    },
  },
})
```

### 4. Provider Setup

```tsx
// app/providers.tsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/config/queryClient'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

---

## Custom Hooks (Platform Agnostic)

### 1. Timer Hook

```tsx
// hooks/ui/useTimer.ts
import { useState, useEffect, useCallback, useRef } from 'react'

export function useTimer(autoStart = false) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setIsRunning(false)
    setSeconds(0)
  }, [])

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
  }
}
```

### 2. Local Storage Hook

```tsx
// hooks/ui/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // Get from local storage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update local storage when value changes
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
```

---

## Type Definitions

```tsx
// lib/types/quiz.ts
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
```

---

## API Layer (Platform Agnostic)

```tsx
// lib/api/questions.ts
import { Question, Difficulty } from '@/lib/types/quiz'

interface GetQuestionsParams {
  difficulty?: Difficulty
  limit?: number
}

export async function getQuestions(
  params: GetQuestionsParams = {}
): Promise<Question[]> {
  const { difficulty, limit = 10 } = params

  // For now, return mock data from localStorage
  // Later: Replace with actual API call
  const questions = getMockQuestions()

  let filtered = questions
  if (difficulty && difficulty !== 'all') {
    filtered = questions.filter(q => q.difficulty === difficulty)
  }

  // Shuffle and limit
  const shuffled = filtered.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}

function getMockQuestions(): Question[] {
  // Return the existing questions array
  return [
    {
      id: '1',
      title: 'Two Sum',
      description: 'Given an array of integers, return indices of the two numbers that add up to a specific target.',
      difficulty: 'easy',
      correctPattern: 'arrays_and_hashing'
    },
    // ... more questions
  ]
}
```

---

## Tailwind Configuration

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mobile-first breakpoints
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      // Touch-friendly spacing
      spacing: {
        'touch': '44px', // Minimum touch target
      },
      // Color palette
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## React Native Compatibility Guidelines

### 1. Component Patterns

**DO:**
```tsx
// ✅ Platform-agnostic logic in hooks
export function useQuizLogic() {
  const [score, setScore] = useState(0)
  const incrementScore = () => setScore(s => s + 1)
  return { score, incrementScore }
}

// ✅ Separate UI from logic
export function QuizCard({ question, onAnswer }) {
  const { score, incrementScore } = useQuizLogic()
  return <div>...</div>
}
```

**DON'T:**
```tsx
// ❌ Mixed concerns
export function QuizCard() {
  const [score, setScore] = useState(0)
  const handleClick = () => {
    // Business logic mixed with component
    setScore(s => s + 1)
  }
  return <div onClick={handleClick}>...</div>
}
```

### 2. Styling Patterns

**DO:**
```tsx
// ✅ Use Tailwind classes (can be mapped to RN styles)
<button className="bg-blue-600 text-white py-3 px-6 rounded-lg">
  Click Me
</button>
```

**DON'T:**
```tsx
// ❌ Avoid inline styles or CSS modules
<button style={{ backgroundColor: 'blue' }}>Click Me</button>
```

### 3. Navigation

**DO:**
```tsx
// ✅ Use abstracted navigation hooks
const navigation = useNavigation()
navigation.navigate('Quiz')
```

---

## Utility Functions

```tsx
// lib/utils/formatTime.ts
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

// lib/utils/shuffleArray.ts
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// lib/utils/cn.ts (classnames utility)
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Mobile UX Best Practices

### 1. Touch Targets
- Minimum 44px height for all interactive elements
- Add padding around small icons
- Use generous spacing between buttons

### 2. Typography
```tsx
// Mobile-optimized text sizes
<h1 className="text-3xl font-bold">Title</h1>        // 30px
<h2 className="text-2xl font-semibold">Subtitle</h2> // 24px
<p className="text-lg leading-relaxed">Body text</p> // 18px
<span className="text-base">Regular text</span>      // 16px
```

### 3. Layout
```tsx
// Use safe area for mobile devices
<div className="safe-area-inset p-4 min-h-screen">
  <div className="max-w-md mx-auto">
    {/* Content constrained to readable width */}
  </div>
</div>
```

### 4. Loading States
```tsx
// Always show loading states for better UX
{isLoading ? (
  <div className="flex items-center justify-center h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
  </div>
) : (
  <QuestionCard question={question} />
)}
```

---

## Performance Optimizations

### 1. Code Splitting
```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic'

const Leaderboard = dynamic(() => import('@/components/leaderboard/LeaderboardList'), {
  loading: () => <LoadingSpinner />
})
```

### 2. Memoization
```tsx
// Memoize expensive computations
const sortedLeaderboard = useMemo(() => {
  return leaderboard.sort((a, b) => b.score - a.score)
}, [leaderboard])

// Memoize callbacks passed to children
const handleAnswer = useCallback((pattern: Pattern) => {
  submitAnswer({ questionId, pattern })
}, [questionId, submitAnswer])
```

### 3. Prefetching
```tsx
// Prefetch next question while user is answering
const { data: nextQuestion } = useQuestions({
  enabled: currentQuestionIndex < totalQuestions - 1
})
```

---

## Testing Strategy

### 1. Hook Testing
```tsx
// hooks/queries/__tests__/useQuestions.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { useQuestions } from '../useQuestions'

test('fetches questions successfully', async () => {
  const { result } = renderHook(() => useQuestions(), {
    wrapper: QueryClientProvider
  })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data).toHaveLength(10)
})
```

### 2. Component Testing
```tsx
// components/quiz/__tests__/QuestionCard.test.tsx
import { render, screen } from '@testing-library/react'
import { QuestionCard } from '../QuestionCard'

test('renders question title and description', () => {
  const question = {
    id: '1',
    title: 'Two Sum',
    description: 'Find two numbers that add up to target',
    difficulty: 'easy',
    correctPattern: 'arrays_and_hashing'
  }

  render(<QuestionCard question={question} onAnswer={jest.fn()} />)

  expect(screen.getByText('Two Sum')).toBeInTheDocument()
  expect(screen.getByText(/Find two numbers/)).toBeInTheDocument()
})
```

---

## Deployment Checklist

### Before Deploying:
- [ ] Test on real mobile devices (iOS & Android)
- [ ] Verify all touch targets are 44px+
- [ ] Check loading states work correctly
- [ ] Test offline behavior
- [ ] Verify localStorage works
- [ ] Test on slow 3G connection
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Verify all queries have proper error handling
- [ ] Test with empty states (no questions, no leaderboard)
- [ ] Verify responsive design at all breakpoints

### Environment Variables:
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

---

## Next Steps for Migration

### Converting to React Native:

1. **Install React Native dependencies**
```bash
npm install react-native nativewind
```

2. **Replace web components with RN components**
```tsx
// Web: <div>
// React Native: <View>

// Web: <button>
// React Native: <TouchableOpacity> or <Pressable>

// Web: <p>
// React Native: <Text>
```

3. **Use NativeWind for styling** (Tailwind for React Native)
```tsx
<View className="bg-blue-600 p-4 rounded-lg">
  <Text className="text-white text-lg">Hello</Text>
</View>
```

4. **Keep all hooks and API logic unchanged**
```tsx
// ✅ These work in both Web and RN
useQuestions()
useLeaderboard()
useTimer()
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Native Documentation](https://reactnative.dev/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)

---

## Summary

This architecture prioritizes:
1. **Mobile-first** - All components designed for small screens
2. **Reusability** - Hooks and logic can be used in React Native
3. **Simplicity** - Easy to understand for beginners
4. **Performance** - Optimized queries and lazy loading
5. **Type Safety** - TypeScript throughout
6. **Maintainability** - Clear structure and separation of concerns

**Key Pattern**: Separate UI (platform-specific) from Logic (platform-agnostic). All business logic lives in hooks and can be reused across web and mobile.
