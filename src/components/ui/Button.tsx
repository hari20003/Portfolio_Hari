import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-aurora-indigo to-aurora-electric text-white shadow-[0_1px_0_0_rgb(255_255_255/0.15)_inset,0_8px_28px_-10px_rgb(99_102_241/0.55)] hover:shadow-[0_1px_0_0_rgb(255_255_255/0.2)_inset,0_10px_36px_-8px_rgb(96_165_250/0.6)] hover:brightness-110',
        glass:
          'glass text-[rgb(var(--fg))] hover:border-aurora-indigo/35 hover:shadow-[0_10px_30px_-14px_rgb(99_102_241/0.4)]',
        ghost: 'text-muted hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--line)/0.06)]',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
ButtonLink.displayName = 'ButtonLink'
