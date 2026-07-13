import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiCommand } from 'react-icons/fi'
import { projects } from '../../data/projects'
import { profile } from '../../data/profile'

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const commands = useMemo(
    () => [
      { label: 'Go to Work', hint: 'section', run: () => navigate('/#work') },
      { label: 'Go to Experience', hint: 'section', run: () => navigate('/#experience') },
      { label: 'Go to Skills', hint: 'section', run: () => navigate('/#skills') },
      { label: 'Go to Contact', hint: 'section', run: () => navigate('/#contact') },
      { label: 'Open Resume', hint: 'page', run: () => navigate('/resume') },
      ...projects.map((p) => ({
        label: p.title,
        hint: 'case study',
        run: () => navigate(`/work/${p.slug}`),
      })),
      { label: 'Email Hari', hint: 'contact', run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'GitHub profile', hint: 'external', run: () => window.open(profile.socials.github, '_blank') },
      { label: 'LinkedIn profile', hint: 'external', run: () => window.open(profile.socials.linkedin, '_blank') },
    ],
    [navigate],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands
  }, [commands, query])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  const runCommand = (cmd) => {
    setOpen(false)
    cmd.run()
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && filtered[active]) {
      runCommand(filtered[active])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-base/70 px-4 pt-[18vh] backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass w-full max-w-lg overflow-hidden shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              <FiCommand className="text-dim" size={15} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                placeholder="Jump to…"
                className="w-full bg-transparent py-4 text-sm text-ink placeholder:text-dim/60 focus:outline-none"
              />
              <kbd className="rounded border border-white/[0.12] px-1.5 py-0.5 font-mono text-[10px] text-dim">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-xs text-dim">no matches</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runCommand(cmd)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? 'bg-white/[0.07] text-ink' : 'text-dim'
                    }`}
                  >
                    <span>{cmd.label}</span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-dim/70">
                      {cmd.hint} <FiArrowUpRight size={11} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
