import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const WORD = '~/hari'

// Cinematic intro shown once per session; skipped for reduced motion.
export default function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return (
      sessionStorage.getItem('hp-intro') === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    if (done) return undefined
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => {
      sessionStorage.setItem('hp-intro', '1')
      setDone(true)
    }, 1500)
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-base"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: EASE }}
          aria-hidden="true"
        >
          <div className="flex overflow-hidden font-mono text-3xl tracking-tight md:text-4xl">
            {WORD.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                className={i < 2 ? 'text-accent' : 'text-ink'}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <div className="h-px w-40 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent2"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
