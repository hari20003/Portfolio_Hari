import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../../data/profile'

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-px origin-left bg-gradient-to-r from-accent to-accent2"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'border-b border-white/[0.06] bg-base/70 backdrop-blur-xl' : ''
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="focus-ring font-mono text-sm tracking-tight text-ink">
            <span className="text-accent">~/</span>hari
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="navlink focus-ring rounded-lg px-3 py-2 text-sm text-dim transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <span className="mx-2 hidden font-mono text-[11px] text-dim/60 lg:inline">⌘K</span>
            <Link
              to="/resume"
              className="focus-ring ml-1 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm text-ink transition-colors hover:border-accent/50 hover:bg-accent/10"
            >
              Resume
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg text-dim md:hidden"
          >
            <span className="space-y-1.5">
              <span className={`block h-px w-5 bg-current transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block h-px w-5 bg-current transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>

        {open && (
          <div className="border-t border-white/[0.06] bg-base/95 backdrop-blur-xl md:hidden">
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-lg px-3 py-3 text-dim hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={profile.resumeUrl}
                className="focus-ring rounded-lg px-3 py-3 text-accent"
                download
              >
                Download resume ↓
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
