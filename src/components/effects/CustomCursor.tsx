import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]'

/** Premium custom cursor: glow dot + trailing ring, scales on interactive hover. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-none-active')

    let x = -100, y = -100, rx = -100, ry = -100
    let hovering = false
    let pressed = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      const t = e.target as Element | null
      hovering = !!t?.closest?.(INTERACTIVE)
    }
    const onDown = () => { pressed = true }
    const onUp = () => { pressed = false }

    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      const dot = dotRef.current
      const ring = ringRef.current
      if (dot) {
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${pressed ? 0.6 : 1})`
      }
      if (ring) {
        const s = hovering ? 2.1 : pressed ? 0.8 : 1
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${s})`
        ring.style.borderColor = hovering ? 'rgb(34 211 238 / 0.9)' : 'rgb(139 92 246 / 0.6)'
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('cursor-none-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-aurora-cyan shadow-[0_0_12px_2px_rgb(34_211_238/0.8)]"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border transition-[border-color] duration-200"
      />
    </>
  )
}
