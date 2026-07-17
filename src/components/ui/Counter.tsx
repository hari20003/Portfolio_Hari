import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** Animated count-up number, triggered when scrolled into view. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 55, damping: 18 })

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`
      return
    }
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
    })
  }, [spring, suffix, value, reduced])

  return <span ref={ref}>0{suffix}</span>
}
