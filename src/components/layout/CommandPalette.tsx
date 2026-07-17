import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Briefcase, Cpu, Download, FolderKanban, GraduationCap, Home, Mail, Moon, Search, SquareTerminal, User } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/BrandIcons'
import { profile } from '@/data/profile'
import { useTheme } from '@/hooks/useTheme'
import { scrollToId } from '@/lib/utils'

interface Cmd {
  id: string
  label: string
  hint: string
  icon: React.ComponentType<{ size?: number | string; className?: string }>
  run: () => void
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toggle } = useTheme()

  const commands: Cmd[] = useMemo(
    () => [
      { id: 'home', label: 'Go home', hint: 'Navigate', icon: Home, run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      { id: 'about', label: 'About me', hint: 'Navigate', icon: User, run: () => scrollToId('about') },
      { id: 'experience', label: 'Experience', hint: 'Navigate', icon: Briefcase, run: () => scrollToId('experience') },
      { id: 'projects', label: 'Projects', hint: 'Navigate', icon: FolderKanban, run: () => scrollToId('projects') },
      { id: 'skills', label: 'Skills', hint: 'Navigate', icon: Cpu, run: () => scrollToId('skills') },
      { id: 'ai', label: 'AI Showcase', hint: 'Navigate', icon: Bot, run: () => scrollToId('ai') },
      { id: 'education', label: 'Education & certifications', hint: 'Navigate', icon: GraduationCap, run: () => scrollToId('education') },
      { id: 'terminal', label: 'Open terminal', hint: 'Navigate', icon: SquareTerminal, run: () => scrollToId('terminal') },
      { id: 'contact', label: 'Contact', hint: 'Navigate', icon: Mail, run: () => scrollToId('contact') },
      { id: 'resume', label: 'Download resume', hint: 'Action', icon: Download, run: () => window.open(profile.resumeUrl, '_blank') },
      { id: 'github', label: 'Open GitHub', hint: 'Link', icon: Github, run: () => window.open(profile.socials.github, '_blank') },
      { id: 'linkedin', label: 'Open LinkedIn', hint: 'Link', icon: Linkedin, run: () => window.open(profile.socials.linkedin, '_blank') },
      { id: 'theme', label: 'Toggle theme', hint: 'Action', icon: Moon, run: toggle },
    ],
    [toggle],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      window.setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const runCmd = (cmd: Cmd) => {
    onClose()
    window.setTimeout(cmd.run, 120)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && filtered[active]) {
      runCmd(filtered[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-[16vh]"
          style={{ background: 'rgb(3 3 6 / 0.6)', backdropFilter: 'blur(8px)' }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong gradient-border w-full max-w-lg overflow-hidden rounded-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-[rgb(var(--line)/0.08)] px-4">
              <Search size={16} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[rgb(var(--muted)/0.7)]"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-[rgb(var(--line)/0.14)] px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-xs text-muted">no results — try “projects”</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id} role="option" aria-selected={i === active}>
                  <button
                    onClick={() => runCmd(cmd)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? 'bg-aurora-violet/15 text-[rgb(var(--fg))]' : 'text-muted'
                    }`}
                  >
                    <cmd.icon size={15} className={i === active ? 'text-aurora-cyan' : ''} />
                    <span className="flex-1">{cmd.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--muted)/0.7)]">{cmd.hint}</span>
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
