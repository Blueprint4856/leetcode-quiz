import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

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
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Minimum touch target: 44px
          'min-h-[44px] px-6',
          // Variants
          variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700',
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
