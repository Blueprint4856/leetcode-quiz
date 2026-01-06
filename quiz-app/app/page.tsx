import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="max-w-md mx-auto pt-20">
        <Card variant="elevated" className="text-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              🎯 LeetCode Pattern Quiz
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Master algorithm pattern recognition without writing code
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <Button size="lg" className="w-full">
              Start Quiz
            </Button>

            <Button variant="secondary" size="lg" className="w-full">
              View Leaderboard
            </Button>

            <div className="pt-4 text-sm text-gray-500">
              <p>Mobile-first • Beginner-friendly • Pattern focused</p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Built with Next.js, TanStack Query & Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
