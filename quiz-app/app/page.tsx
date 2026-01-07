import { Header } from '@/components/shared/Header'
import { HomeContent } from '@/components/home/HomeContent'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HomeContent />
    </div>
  )
}
