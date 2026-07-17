import { useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

/** 3D tilt-on-hover for cards. Spread the returned handlers on the element. */
export function useTilt(maxDeg = 7) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el || reduced) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * maxDeg
      const ry = (px - 0.5) * maxDeg
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1)`
      el.style.setProperty('--tilt-x', `${px * 100}%`)
      el.style.setProperty('--tilt-y', `${py * 100}%`)
    },
    [maxDeg, reduced],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    window.setTimeout(() => {
      if (el) el.style.transition = ''
    }, 500)
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
