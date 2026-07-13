import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import MagneticButton from '../ui/MagneticButton'
import { profile } from '../../data/profile'

const HeroField = lazy(() => import('./HeroField'))

function RoleTicker() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text inline-block whitespace-nowrap"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const rise = (delay) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      <Suspense fallback={null}>
        <HeroField />
      </Suspense>

      <div className="container-x relative pb-24 pt-36">
        <motion.p {...rise(0.05)} className="eyebrow mb-6 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {profile.availability}
        </motion.p>

        <motion.h1
          {...rise(0.15)}
          className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-tight"
        >
          {profile.name.split(' ')[0]}
          <span className="text-dim/60"> S.</span>
          <span className="block text-[clamp(1.5rem,6.2vw,6rem)]">
            <RoleTicker />
          </span>
        </motion.h1>

        <motion.p {...rise(0.3)} className="mt-8 max-w-2xl text-lg leading-relaxed text-dim">
          {profile.tagline}
        </motion.p>

        <motion.div {...rise(0.45)} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#work"
            className="rounded-full bg-gradient-to-r from-accent to-accent2 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-shadow hover:shadow-accent/40"
          >
            View selected work <FiArrowUpRight />
          </MagneticButton>
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="rounded-full border border-white/[0.14] bg-white/[0.03] px-7 py-3.5 text-sm text-ink backdrop-blur transition-colors hover:border-white/[0.3]"
          >
            Get in touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
          aria-hidden="true"
        >
          <FiArrowDown className="animate-bounce text-dim/50" />
        </motion.div>
      </div>
    </section>
  )
}
