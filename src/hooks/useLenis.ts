import { useEffect } from 'react'
import Lenis from 'lenis'

/** Smooth scrolling via Lenis; instance exposed on window.__lenis for scrollToId. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 })
    ;(window as any).__lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])
}
