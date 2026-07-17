import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, education, certifications } from '@/data/profile'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { skillStacks } from '@/data/skills'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { scrollToId } from '@/lib/utils'

interface Line {
  type: 'in' | 'out'
  text: string
}

const HELP = [
  'available commands:',
  '  about       who is hari?',
  '  skills      the full stack',
  '  projects    shipped systems',
  '  experience  work history',
  '  education   degrees + scores',
  '  certs       certifications',
  '  resume      download the pdf',
  '  contact     reach out',
  '  whoami      identity check',
  '  clear       wipe the screen',
]

function runCommand(cmd: string): string[] {
  switch (cmd) {
    case 'help':
      return HELP
    case 'about':
      return [profile.summary]
    case 'skills':
      return skillStacks.map((s) => `${s.label.padEnd(18)} ${s.skills.slice(0, 5).join(', ')}…`)
    case 'projects':
      return projects.map((p) => `▸ ${p.title} — ${p.subtitle}`)
    case 'experience':
      return experiences.map((e) => `▸ ${e.company} · ${e.role} (${e.period})`)
    case 'education':
      return education.map((e) => `▸ ${e.degree} — ${e.school} (${e.score})`)
    case 'certs':
      return certifications.map((c) => `▸ ${c}`)
    case 'resume':
      window.open(profile.resumeUrl, '_blank')
      return ['opening resume.pdf …']
    case 'contact':
      scrollToId('contact')
      return [`email: ${profile.email}`, `github: ${profile.socials.github}`, 'scrolling to contact form…']
    case 'whoami':
      return ['guest@hari.ai — recruiter privileges: granted ✔']
    case 'sudo':
    case 'sudo su':
      return ['nice try. root access requires a job offer.']
    case 'ls':
      return ['about/  skills/  projects/  experience/  contact/  resume.pdf']
    case '':
      return []
    default:
      return [`command not found: ${cmd} — try "help"`]
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'out', text: 'hari.ai terminal v2.0 — type "help" to explore' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const submit = () => {
    const cmd = input.trim().toLowerCase()
    if (cmd === 'clear') {
      setLines([])
      setInput('')
      return
    }
    const out = runCommand(cmd)
    setLines((prev) => [...prev, { type: 'in', text: input }, ...out.map((text) => ({ type: 'out' as const, text }))])
    if (cmd) setHistory((h) => [cmd, ...h])
    setHistIdx(-1)
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      if (history[next]) {
        setHistIdx(next)
        setInput(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      setHistIdx(next)
      setInput(next >= 0 ? history[next] : '')
    }
  }

  return (
    <section id="terminal" aria-label="Interactive terminal" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="08 · terminal"
          title="Prefer the command line?"
          sub="Everything on this page, greppable. Type help."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong gradient-border mx-auto max-w-3xl overflow-hidden rounded-2xl"
          onClick={() => inputRef.current?.focus()}
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-[rgb(var(--line)/0.08)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
            <p className="ml-3 font-mono text-xs text-muted">guest@hari.ai — zsh</p>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed">
            {lines.map((line, i) =>
              line.type === 'in' ? (
                <p key={i} className="mt-2">
                  <span className="text-aurora-cyan">❯</span> <span>{line.text}</span>
                </p>
              ) : (
                <p key={i} className="whitespace-pre-wrap text-muted">{line.text}</p>
              ),
            )}
            <p className="mt-2 flex items-center">
              <span className="text-aurora-cyan">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="ml-2 w-full bg-transparent outline-none placeholder:text-[rgb(var(--muted)/0.5)]"
                placeholder='try "projects"'
                aria-label="Terminal input"
                spellCheck={false}
                autoComplete="off"
              />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
