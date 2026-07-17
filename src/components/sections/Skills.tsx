import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { skillStacks, orbitTech } from '@/data/skills'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

/** Rotating technology orbit: two counter-rotating rings + glowing core. */
function TechOrbit() {
  const reduced = useReducedMotion()
  const inner = orbitTech.slice(0, 6)
  const outer = orbitTech.slice(6)

  return (
    <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[420px] select-none lg:block">
      {/* core */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="glow-ring glass-strong flex h-24 w-24 items-center justify-center rounded-full">
          <span className="font-display text-sm font-semibold text-gradient">AI</span>
        </div>
      </div>

      {/* ring guides */}
      <div className="absolute inset-[19%] rounded-full border border-[rgb(var(--line)/0.08)]" />
      <div className="absolute inset-[2%] rounded-full border border-[rgb(var(--line)/0.06)]" />

      {/* inner ring */}
      <div className={cn('absolute inset-[19%]', !reduced && 'animate-spin-slow')}>
        {inner.map((tech, i) => {
          const angle = (i / inner.length) * 360
          return (
            <div key={tech} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg) translateY(calc(-50% - 50% * 1)) rotate(${-angle}deg)` }}>
              <div className={cn('-translate-x-1/2 -translate-y-1/2', !reduced && 'animate-spin-slow [animation-direction:reverse]')}>
                <span className="glass block whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] text-aurora-violet shadow-[0_0_18px_-6px_rgb(139_92_246/0.6)]">
                  {tech}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* outer ring */}
      <div className={cn('absolute inset-[2%]', !reduced && 'animate-spin-slower')}>
        {outer.map((tech, i) => {
          const angle = (i / outer.length) * 360
          return (
            <div key={tech} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg) translateY(calc(-50% - 50% * 1)) rotate(${-angle}deg)` }}>
              <div className={cn('-translate-x-1/2 -translate-y-1/2', !reduced && 'animate-spin-slower [animation-direction:reverse]')}>
                <span className="glass block whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] text-aurora-cyan shadow-[0_0_18px_-6px_rgb(34_211_238/0.5)]">
                  {tech}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Skills() {
  const [activeStack, setActiveStack] = useState(skillStacks[0].id)
  const current = skillStacks.find((s) => s.id === activeStack) ?? skillStacks[0]

  return (
    <section id="skills" aria-label="Skills" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 · skills"
          title="The stack in orbit."
          sub="Five layers, one system — from vector stores to the pixels users touch."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <TechOrbit />

          <div>
            {/* stack switcher */}
            <div role="tablist" aria-label="Skill stacks" className="flex flex-wrap gap-2">
              {skillStacks.map((stack) => (
                <button
                  key={stack.id}
                  role="tab"
                  aria-selected={stack.id === activeStack}
                  onClick={() => setActiveStack(stack.id)}
                  className={cn(
                    'cursor-pointer rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300',
                    stack.id === activeStack
                      ? 'border-transparent text-white shadow-[0_0_24px_-8px_rgb(139_92_246/0.7)]'
                      : 'border-[rgb(var(--line)/0.12)] text-muted hover:border-aurora-violet/40 hover:text-[rgb(var(--fg))]',
                  )}
                  style={stack.id === activeStack ? { background: `linear-gradient(120deg, ${stack.accent}cc, rgb(59 130 246 / 0.75))` } : undefined}
                >
                  {stack.label}
                </button>
              ))}
            </div>

            <GlassCard strong className="mt-6 min-h-[260px] p-7">
              <motion.ul
                key={current.id}
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                className="flex flex-wrap gap-2.5"
              >
                {current.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <span
                      className="glass block cursor-default rounded-xl px-3.5 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5"
                      style={{ boxShadow: `0 0 0 0 transparent` }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 26px -10px ${current.accent}88`)}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 0 transparent')}
                    >
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
