import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean
  glowOnHover?: boolean
}

export function GlassCard({ className, strong, glowOnHover, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        'rounded-2xl transition-all duration-300',
        glowOnHover &&
          'hover:-translate-y-1 hover:border-aurora-violet/35 hover:shadow-[0_18px_50px_-18px_rgb(139_92_246/0.45)]',
        className,
      )}
      {...props}
    />
  )
}
