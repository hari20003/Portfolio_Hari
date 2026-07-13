import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

// Mouse-follow ambient lighting. Desktop pointers only; GPU-cheap single layer.
export default function Spotlight() {
  const x = useMotionValue(-800)
  const y = useMotionValue(-800)
  const sx = useSpring(x, { stiffness: 90, damping: 22 })
  const sy = useSpring(y, { stiffness: 90, damping: 22 })
  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(124,107,255,0.075), transparent 65%)`

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return undefined
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background, mixBlendMode: 'screen' }}
    />
  )
}
