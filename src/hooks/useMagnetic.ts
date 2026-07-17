import { useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Magnetic hover: the element is gently pulled toward the cursor.
 * Returns a ref + handlers to spread onto the element.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el || reduced) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength, reduced],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = 'translate(0, 0)'
    window.setTimeout(() => {
      if (el) el.style.transition = ''
    }, 450)
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
