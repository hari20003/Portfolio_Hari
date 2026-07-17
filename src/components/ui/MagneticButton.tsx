import type { ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/utils'

/** Wrapper that adds a magnetic pull toward the cursor. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(strength)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('inline-block will-change-transform', className)}
    >
      {children}
    </div>
  )
}
