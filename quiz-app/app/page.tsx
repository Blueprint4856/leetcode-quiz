import { DifficultySelector } from '@/components/home/DifficultySelector'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="max-w-md mx-auto pt-20">
        <DifficultySelector />
      </div>
    </div>
  )
}
