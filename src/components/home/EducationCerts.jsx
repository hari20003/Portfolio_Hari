import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { education, certifications } from '../../data/education'

export default function EducationCerts() {
  return (
    <section id="education" className="scroll-mt-24 py-28 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="foundation" title="Education & certifications." />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="grid gap-5">
            {education.map((degree, i) => (
              <Reveal key={degree.school} delay={i * 0.08}>
                <div className="glass glass-hover flex items-center gap-5 p-6">
                  <img
                    src={degree.logo}
                    alt=""
                    width="56"
                    height="56"
                    loading="lazy"
                    className="h-14 w-14 rounded-xl border border-white/[0.08] object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {degree.degree}
                    </h3>
                    <p className="mt-0.5 truncate text-sm text-dim">{degree.school}</p>
                    <p className="mt-1 font-mono text-xs text-dim">
                      {degree.period} · <span className="text-accent2">{degree.score}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <div className="glass glass-hover h-full p-6">
              <h3 className="mb-4 font-display text-base font-semibold tracking-tight">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-dim">{cert.name}</span>
                    <span className="shrink-0 font-mono text-[11px] text-accent2">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
