import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'
import { experience } from '../../data/experience'

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-24 py-28 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="experience" title="Where I've built." />
        <div className="relative ml-2 border-l border-white/[0.08] pl-8 md:ml-6 md:pl-12">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.06} className="relative pb-14 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 md:-left-[57px] ${
                  job.current
                    ? 'border-accent bg-accent/30 shadow-[0_0_16px_rgba(124,107,255,0.6)]'
                    : 'border-white/[0.2] bg-elev'
                }`}
              />
              <div className="glass glass-hover p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {job.company}
                    {job.current && (
                      <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-widest text-ok">
                        current
                      </span>
                    )}
                  </h3>
                  <p className="font-mono text-xs text-dim">
                    {job.period} · {job.location}
                  </p>
                </div>
                <p className="mt-1 text-sm text-accent2">{job.role}</p>
                <ul className="mt-5 space-y-3">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
