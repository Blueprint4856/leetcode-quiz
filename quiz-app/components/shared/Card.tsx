import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

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
        'rounded-lg p-3 md:p-4',
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
