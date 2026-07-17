import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { profile } from '@/data/profile'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Counter } from '@/components/ui/Counter'
import { TextReveal } from '@/components/ui/TextReveal'

export function About() {
  return (
    <section id="about" aria-label="About" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading eyebrow="01 · about" title="Signal over noise." />

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* editorial statement */}
          <p className="font-display text-xl font-medium leading-[1.55] tracking-[-0.01em] sm:text-2xl">
            <TextReveal text={profile.summary} />
          </p>

          {/* currently card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard strong className="relative overflow-hidden p-7">
              <div aria-hidden className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-aurora-indigo/10 blur-3xl" />
              <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-aurora-blue">
                <Sparkles size={12} /> currently
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Building an Agentic AI–powered LMS assistant at <span className="text-[rgb(var(--fg))]">SteamCube AI</span> —
                LLM orchestration on Azure AI Foundry, RAG retrieval, and MCP-compatible integrations.
              </p>
              <p className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
                <MapPin size={12} className="text-aurora-cyan" /> {profile.location} · {profile.availability.toLowerCase()}
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* full-width stat band */}
      <div className="stat-band mt-20">
        <div className="section-shell grid grid-cols-2 divide-[rgb(var(--line)/0.07)] sm:grid-cols-5 sm:divide-x">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="px-2 py-8 text-center sm:py-10"
            >
              <p className="font-display text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mx-auto mt-2 max-w-[9rem] text-xs leading-snug text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
