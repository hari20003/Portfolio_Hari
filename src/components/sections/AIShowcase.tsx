import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { aiCapabilities, pipelineStages } from '@/data/ai'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

/**
 * Scroll-driven architecture diagram: on desktop the panel is sticky and
 * pipeline stages light up one-by-one as you scroll through the section.
 */
function PipelineDiagram({ activeIndex }: { activeIndex: number }) {
  const reduced = useReducedMotion()
  return (
    <GlassCard strong className="relative overflow-hidden p-6 sm:p-8">
      <div aria-hidden className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-aurora-electric/10 blur-3xl" />
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-aurora-cyan">
          Production RAG + evaluation pipeline
        </h3>
        <p className="font-mono text-[10px] text-muted" aria-hidden>
          stage {Math.min(activeIndex + 1, pipelineStages.length)} / {pipelineStages.length}
        </p>
      </div>

      <div className="flex flex-wrap items-stretch gap-y-4 overflow-x-auto pb-2" role="img" aria-label="Pipeline: ingest, embed, retrieve, agent, LLM, guardrails, ship">
        {pipelineStages.map((stage, i) => {
          const active = i <= activeIndex
          return (
            <div key={stage.id} className="flex items-center">
              <div
                className={cn(
                  'glass relative min-w-[96px] rounded-xl px-3.5 py-3 text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  active
                    ? 'gradient-border -translate-y-0.5 opacity-100 shadow-[0_10px_30px_-14px_rgb(96_165_250/0.5)]'
                    : 'translate-y-0 opacity-35',
                )}
              >
                <p className={cn('font-display text-xs font-semibold transition-colors duration-500 sm:text-sm', active && 'text-gradient')}>
                  {stage.label}
                </p>
                <p className="mt-0.5 font-mono text-[9px] text-muted sm:text-[10px]">{stage.sub}</p>
                {active && !reduced && (
                  <motion.span
                    aria-hidden
                    className="absolute -top-1 left-1/2 h-1.5 w-1.5 rounded-full bg-aurora-cyan shadow-[0_0_10px_2px_rgb(103_232_249/0.7)]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </div>
              {i < pipelineStages.length - 1 && (
                <span
                  aria-hidden
                  className={cn('mx-1.5 transition-colors duration-500 sm:mx-2.5', i < activeIndex ? 'text-aurora-blue' : 'text-[rgb(var(--muted)/0.35)]')}
                >
                  <ArrowRight size={14} />
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* progress rail */}
      <div aria-hidden className="mt-5 h-px w-full overflow-hidden rounded-full bg-[rgb(var(--line)/0.08)]">
        <div
          className="h-full bg-gradient-to-r from-aurora-indigo via-aurora-blue to-aurora-cyan transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `scaleX(${(activeIndex + 1) / pipelineStages.length})`, transformOrigin: 'left' }}
        />
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
        every output passes JSON schema validation + hallucination checks before it ships — PASS/FAIL, never “probably fine”.
      </p>
    </GlassCard>
  )
}

export function AIShowcase() {
  const stickyWrapRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduced = useReducedMotion()

  // drive stage activation from scroll progress through the tall wrapper
  const { scrollYProgress } = useScroll({ target: stickyWrapRef, offset: ['start 0.55', 'end 0.75'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(Math.max(0, Math.min(pipelineStages.length - 1, Math.floor(v * pipelineStages.length))))
  })

  return (
    <section id="ai" aria-label="AI capabilities" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="05 · ai engineering"
          title="What I do with intelligence."
          sub="The capabilities I've shipped to production — not a keyword cloud. Scroll to walk the pipeline."
        />

        {/* sticky storytelling: tall scroll runway on desktop, natural flow on mobile */}
        <div ref={stickyWrapRef} className="relative lg:h-[190vh]">
          <div className="lg:sticky lg:top-24">
            <PipelineDiagram activeIndex={reduced ? pipelineStages.length - 1 : activeIndex} />
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {aiCapabilities.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="lg:[&:nth-child(-n+2)]:col-span-2 lg:[&:nth-child(n+3)]:col-span-1 [&:nth-child(3)]:lg:col-span-1"
            >
              <GlassCard glowOnHover className="group h-full p-5">
                <cap.icon size={20} className="text-aurora-violet transition-all duration-300 group-hover:scale-110 group-hover:text-aurora-cyan" aria-hidden />
                <h3 className="mt-3 font-display text-sm font-semibold">{cap.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{cap.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <Badge key={tag} className="px-2 text-[9px]">{tag}</Badge>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
