import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  labelledBy?: string
  className?: string
}

/** Accessible portal modal: Esc close, backdrop click, scroll lock, focus restore. */
export function Modal({ open, onClose, children, labelledBy, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    ;(window as any).__lenis?.stop?.()
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      ;(window as any).__lenis?.start?.()
      ;(lastFocused.current as HTMLElement | null)?.focus?.()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          style={{ background: 'rgb(3 3 6 / 0.72)', backdropFilter: 'blur(10px)' }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={{ opacity: 0, y: 32, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(6px)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'glass-strong gradient-border relative max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-3xl outline-none',
              className,
            )}
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[rgb(var(--line)/0.14)] bg-[rgb(var(--bg)/0.6)] text-muted transition-colors hover:text-[rgb(var(--fg))]"
            >
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
