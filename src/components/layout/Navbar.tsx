import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Download, Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { useTheme } from '@/hooks/useTheme'
import { scrollToId, cn } from '@/lib/utils'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'ai', label: 'AI' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy: query sections fresh each frame (they mount lazily, so an
  // observer attached at mount would miss them). rAF-throttled to stay 60fps.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let current = ''
      for (const l of LINKS) {
        const el = document.getElementById(l.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) {
          current = l.id
          break
        }
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[70]"
    >
      <div
        className={cn(
          'mx-auto flex h-16 max-w-6xl items-center justify-between px-5 transition-all duration-500 sm:px-8',
          scrolled && 'glass mt-3 max-w-5xl rounded-2xl shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)]',
        )}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer font-display text-lg font-semibold tracking-tight"
          aria-label="Back to top"
        >
          <span className="text-gradient">hari</span>
          <span className="text-muted">.ai</span>
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              aria-current={active === l.id ? 'true' : undefined}
              className={cn(
                'relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 hover:text-[rgb(var(--fg))]',
                active === l.id ? 'text-[rgb(var(--fg))]' : 'text-muted',
              )}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-[rgb(var(--line)/0.08)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette (Ctrl+K)"
            className="hidden cursor-pointer items-center gap-2 rounded-full border border-[rgb(var(--line)/0.12)] px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-aurora-violet/40 hover:text-[rgb(var(--fg))] sm:flex"
          >
            <Command size={12} /> Ctrl K
          </button>
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[rgb(var(--line)/0.12)] text-muted transition-all hover:rotate-12 hover:border-aurora-cyan/40 hover:text-aurora-cyan"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-blue px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_20px_-6px_rgb(139_92_246/0.7)] transition-all hover:shadow-[0_0_30px_-4px_rgb(59_130_246/0.8)] md:flex"
          >
            <Download size={14} /> Resume
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[rgb(var(--line)/0.12)] text-muted md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm text-muted transition-colors hover:bg-[rgb(var(--line)/0.07)] hover:text-[rgb(var(--fg))]"
              >
                {l.label}
              </button>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="mt-1 cursor-pointer rounded-xl bg-gradient-to-r from-aurora-violet to-aurora-blue px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
