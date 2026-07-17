import { Suspense, lazy, useState, useEffect } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Download, Mail, Sparkles } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/BrandIcons'
import { profile } from '@/data/profile'
import { TypingText } from '@/components/ui/TypingText'
import { Magnetic } from '@/components/ui/MagneticButton'
import { ButtonLink } from '@/components/ui/Button'
import { useTilt } from '@/hooks/useTilt'
import { scrollToId, hasHardwareWebGL } from '@/lib/utils'
import { CssParticles } from '@/components/effects/CssParticles'

const ParticleField = lazy(() => import('@/components/effects/ParticleField'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

function AvatarCard() {
  const { ref, onMouseMove, onMouseLeave } = useTilt(9)
  return (
    <div className="relative" style={{ perspective: 900 }}>
      {/* animated gradient halo */}
      <div aria-hidden className="absolute -inset-6 rounded-[2.2rem] bg-[conic-gradient(from_0deg,rgb(99_102_241/0.4),rgb(59_130_246/0.25),rgb(103_232_249/0.35),rgb(99_102_241/0.4))] opacity-45 blur-2xl animate-spin-slow will-change-transform" />
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="gradient-border glass-strong relative w-[clamp(14rem,62vw,18rem)] overflow-hidden rounded-[1.8rem] p-3 will-change-transform"
        data-cursor
      >
        <div className="overflow-hidden rounded-[1.35rem]">
          {/* premium image reveal: scale settles as the mask holds the frame */}
          <motion.img
            src="/hari.jpg"
            alt="Portrait of Hariharasudan S"
            width={288}
            height={288}
            className="aspect-square w-full object-cover will-change-transform"
            loading="eager"
            initial={{ scale: 1.22, filter: 'blur(6px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex items-center justify-between px-2 pb-1 pt-3">
          <div>
            <p className="font-display text-sm font-semibold">{profile.shortName}</p>
            <p className="font-mono text-[10px] text-muted">{profile.location}</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            open to work
          </span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const [particleMode, setParticleMode] = useState<'none' | 'webgl' | 'css'>('none')

  // scroll-exit choreography: content drifts up + fades as you leave the hero
  const { scrollY } = useScroll()
  const exitY = useTransform(scrollY, [0, 640], [0, reduced ? 0 : -90])
  const exitOpacity = useTransform(scrollY, [0, 480], [1, reduced ? 1 : 0.05])
  const avatarY = useTransform(scrollY, [0, 640], [0, reduced ? 0 : 60])

  useEffect(() => {
    if (reduced) return
    const t = window.setTimeout(() => {
      setParticleMode(hasHardwareWebGL() ? 'webgl' : 'css')
    }, 600)
    return () => window.clearTimeout(t)
  }, [reduced])

  return (
    <section id="hero" aria-label="Introduction" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {particleMode === 'webgl' && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}
      {particleMode === 'css' && <CssParticles />}

      <div className="section-shell relative grid items-center gap-[clamp(2.5rem,6vw,4rem)] pb-[clamp(4rem,8vw,6rem)] lg:grid-cols-[1.25fr_auto]">
        <motion.div variants={container} initial="hidden" animate="show" style={{ y: exitY, opacity: exitOpacity }}>
          <motion.p variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--card)/0.04)] px-4 py-1.5 font-mono text-[11px] tracking-wide text-muted">
            <Sparkles size={12} className="text-aurora-blue" /> {profile.availability}
          </motion.p>

          <motion.h1 variants={item} className="font-display text-display font-semibold">
            Hi, I&apos;m <span className="text-gradient">{profile.shortName}</span> —<br />
            I engineer <span className="text-gradient">intelligence</span>.
          </motion.h1>

          <motion.p variants={item} className="mt-5 h-8 font-mono text-base text-aurora-cyan sm:text-lg" aria-live="off">
            <TypingText phrases={profile.roles} />
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-fluid-lead text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
            <Magnetic className="w-full xs:w-auto">
              <ButtonLink href={profile.resumeUrl} download size="lg" className="w-full xs:w-auto" data-cursor>
                <Download size={16} /> Download Resume
              </ButtonLink>
            </Magnetic>
            <Magnetic className="w-full xs:w-auto">
              <ButtonLink href="#contact" variant="glass" size="lg" className="w-full xs:w-auto" onClick={(e) => { e.preventDefault(); scrollToId('contact') }} data-cursor>
                <Mail size={16} /> Contact
              </ButtonLink>
            </Magnetic>
            <div className="mt-1 flex items-center gap-2 xs:ml-1 xs:mt-0">
              <Magnetic strength={0.45}>
                <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="glass flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:border-aurora-cyan/50 hover:text-aurora-cyan">
                  <Github size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.45}>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="glass flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:border-aurora-blue/50 hover:text-aurora-blue">
                  <Linkedin size={18} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: avatarY }}
          className="mx-auto lg:mx-0"
        >
          <AvatarCard />
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={() => scrollToId('about')}
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-muted transition-colors hover:text-aurora-cyan"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">scroll</span>
        <motion.span animate={reduced ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={15} />
        </motion.span>
      </motion.button>
    </section>
  )
}
