import { Header } from '@/components/shared/Header'
import { StatsBar } from '@/components/shared/StatsBar'
import { QuizInterface } from '@/components/home/QuizInterface'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-6 md:space-y-8">
        <StatsBar
          accuracy={0}
          streak={0}
          best={0}
          correct={0}
          total={0}
        />
        <QuizInterface />
      </div>
    </div>
  )
}
