import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import MagneticButton from '../ui/MagneticButton'
import { profile } from '../../data/profile'

const HeroField = lazy(() => import('./HeroField'))
const EASE = [0.22, 1, 0.36, 1]

function Typewriter() {
  const reduced = useReducedMotion()
  const [text, setText] = useState(reduced ? profile.roles[0] : '')
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduced) return undefined
    const role = profile.roles[roleIndex]
    let pos = 0
    let deleting = false
    let timer
    const step = () => {
      if (!deleting) {
        pos += 1
        setText(role.slice(0, pos))
        if (pos === role.length) {
          deleting = true
          timer = setTimeout(step, 2000)
        } else {
          timer = setTimeout(step, 50 + Math.random() * 45)
        }
      } else {
        pos -= 1
        setText(role.slice(0, pos))
        if (pos === 0) {
          setRoleIndex((i) => (i + 1) % profile.roles.length)
          return
        }
        timer = setTimeout(step, 24)
      }
    }
    timer = setTimeout(step, 350)
    return () => clearTimeout(timer)
  }, [roleIndex, reduced])

  return (
    <span className="gradient-text">
      {text}
      {!reduced && <span className="caret" aria-hidden="true" />}
    </span>
  )
}

function StaggeredName({ text }) {
  return (
    <motion.span
      className="inline-block"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.045, delayChildren: 0.15 }}
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.55, ease: EASE },
            },
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

const rise = (delay) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: EASE },
})

export default function Hero() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  // scroll parallax: hero content drifts up + fades as you leave
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -130])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // portrait mouse parallax
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { stiffness: 60, damping: 18 })
  const spy = useSpring(py, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 22)
      py.set((e.clientY / window.innerHeight - 0.5) * 16)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [px, py, reduced])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      <div className="aurora" aria-hidden="true" />
      <Suspense fallback={null}>
        <HeroField />
      </Suspense>

      {/* floating portrait, desktop only */}
      <motion.div
        style={{ x: spx, y: spy }}
        className="pointer-events-none absolute right-[7%] top-1/2 hidden -translate-y-1/2 xl:block"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="float-slow relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/35 to-accent2/35 opacity-60 blur-2xl" />
          <img
            src="/hari.jpg"
            alt=""
            width="288"
            height="288"
            className="relative aspect-square w-72 rounded-[2rem] border border-white/[0.12] object-cover shadow-2xl shadow-black/50"
          />
          <div className="glass float-slower absolute -bottom-4 -left-8 px-4 py-2 font-mono text-[11px] text-dim">
            <span className="text-ok">●</span> shipping AI to production
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative pb-24 pt-36"
      >
        <motion.p {...rise(0.05)} className="eyebrow mb-6 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          {profile.availability}
        </motion.p>

        <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] tracking-tight">
          <StaggeredName text={profile.name.split(' ')[0]} />
          <span className="text-dim/60"> S.</span>
          <span className="block min-h-[1.3em] text-[clamp(1.5rem,6.2vw,6rem)]">
            <Typewriter />
          </span>
        </h1>

        <motion.p {...rise(0.5)} className="mt-8 max-w-2xl text-lg leading-relaxed text-dim">
          {profile.tagline}
        </motion.p>

        <motion.div {...rise(0.65)} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#work"
            className="rounded-full bg-gradient-to-r from-accent to-accent2 bg-[length:150%_100%] bg-left px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-[background-position,box-shadow] duration-500 hover:bg-right hover:shadow-accent/40"
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
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute -bottom-16 left-1/2 hidden -translate-x-1/2 md:block"
          aria-hidden="true"
        >
          <FiArrowDown className="animate-bounce text-dim/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
