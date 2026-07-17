import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import { experiences } from '@/data/experience'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // GSAP: draw the timeline spine as you scroll through it
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: wrapRef.current, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
        },
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" aria-label="Work experience" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="02 · experience"
          title="Where I've shipped."
          sub="Three AI engineering roles, each one closer to the metal of production LLM systems."
        />

        <div ref={wrapRef} className="relative pl-8 sm:pl-12">
          {/* timeline spine */}
          <div aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-[rgb(var(--line)/0.1)] sm:left-[11px]" />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-aurora-violet via-aurora-blue to-aurora-cyan sm:left-[11px]"
            style={{ transform: 'scaleY(0)' }}
          />

          <ol className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* node */}
                <span aria-hidden className="absolute -left-8 top-7 flex h-4 w-4 items-center justify-center sm:-left-12 sm:h-6 sm:w-6">
                  <span className={`absolute h-3.5 w-3.5 rounded-full ${exp.current ? 'animate-ping bg-aurora-cyan/50' : ''}`} />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-aurora-violet to-aurora-cyan shadow-[0_0_12px_2px_rgb(139_92_246/0.6)]" />
                </span>

                <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-aurora-violet/35 hover:shadow-[0_22px_60px_-20px_rgb(139_92_246/0.5)] sm:p-8">
                  {/* animated top border on hover */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-aurora-violet via-aurora-blue to-aurora-cyan transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      {exp.company}
                      {exp.current && (
                        <span className="ml-3 align-middle rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-300">
                          current
                        </span>
                      )}
                    </h3>
                    <p className="font-mono text-xs text-aurora-cyan">{exp.period}</p>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                    <span className="font-medium text-[rgb(var(--fg))]">{exp.role}</span>
                    <span aria-hidden>·</span> {exp.type}
                    <span className="flex items-center gap-1"><MapPin size={11} aria-hidden /> {exp.location}</span>
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-blue" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
