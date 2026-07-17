import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--card)/0.05)] px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-muted',
        className,
      )}
      {...props}
    />
  )
}
