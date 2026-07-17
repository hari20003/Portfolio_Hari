import { memo, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Global animated background: aurora gradient blobs, soft grid,
 * noise texture, and a mouse-follow spotlight. Fixed, behind everything.
 */
function BackgroundInner() {
  const spotRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // slow scroll parallax — each blob layer drifts at a different rate
  const { scrollY } = useScroll()
  const drift1 = useTransform(scrollY, [0, 4000], [0, reduced ? 0 : -260])
  const drift2 = useTransform(scrollY, [0, 4000], [0, reduced ? 0 : 180])
  const drift3 = useTransform(scrollY, [0, 4000], [0, reduced ? 0 : -140])

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 3
    let cx = tx
    let cy = ty

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      if (spotRef.current) {
        // compositor-only: move a pre-painted gradient layer, never repaint it
        spotRef.current.style.transform = `translate3d(${cx - 560}px, ${cy - 560}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div aria-hidden className="noise fixed inset-0 -z-10 overflow-hidden">
      {/* deep navy base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgb(var(--glow-blue)/0.07),transparent)]" />

      {/* aurora blobs — pre-blurred radial gradients (cheap); outer wrapper = scroll parallax, inner = idle drift */}
      <motion.div style={{ y: drift1 }} className="absolute -left-[15%] top-[-10%] will-change-transform">
        <div
          className="animate-aurora-slow h-[55vmax] w-[55vmax] rounded-full will-change-transform"
          style={{ background: 'radial-gradient(circle, rgb(139 92 246 / 0.11) 0%, rgb(139 92 246 / 0.045) 42%, transparent 68%)' }}
        />
      </motion.div>
      <motion.div style={{ y: drift2 }} className="absolute right-[-18%] top-[15%] will-change-transform">
        <div
          className="animate-aurora-slower h-[48vmax] w-[48vmax] rounded-full will-change-transform"
          style={{ background: 'radial-gradient(circle, rgb(37 99 235 / 0.10) 0%, rgb(37 99 235 / 0.04) 42%, transparent 68%)' }}
        />
      </motion.div>
      <motion.div style={{ y: drift3 }} className="absolute bottom-[-22%] left-[20%] will-change-transform">
        <div
          className="animate-aurora-slow h-[50vmax] w-[50vmax] rounded-full will-change-transform"
          style={{ background: 'radial-gradient(circle, rgb(34 211 238 / 0.07) 0%, rgb(34 211 238 / 0.03) 42%, transparent 68%)' }}
        />
      </motion.div>

      {/* soft grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--line) / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.035) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)',
        }}
      />

      {/* mouse spotlight — fixed-size pre-painted layer moved via transform */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 h-[1120px] w-[1120px] will-change-transform"
        style={{
          background: 'radial-gradient(560px circle at center, rgb(var(--glow-violet) / 0.09), transparent 65%)',
          transform: 'translate3d(-9999px, -9999px, 0)',
        }}
      />
    </div>
  )
}

export const Background = memo(BackgroundInner)
