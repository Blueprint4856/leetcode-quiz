interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full shadow-md">
          Question {current} of {total}
        </span>
        <span className="text-base font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-3 bg-white/40 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-white/30">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
