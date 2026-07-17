import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { education, certifications } from '@/data/profile'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Education() {
  return (
    <section id="education" aria-label="Education" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading eyebrow="06 · education" title="Foundations." />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard glowOnHover className="group relative h-full overflow-hidden p-8">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-aurora-indigo via-aurora-blue to-aurora-cyan transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4">
                  <GraduationCap size={20} className="text-aurora-blue" aria-hidden />
                  <span className="rounded-full border border-[rgb(var(--line)/0.12)] px-3 py-1 font-mono text-[10px] text-muted">{edu.period}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{edu.degree}</h3>
                <p className="mt-1.5 text-sm text-muted">{edu.school}</p>
                <p className="mt-0.5 text-xs text-muted">{edu.place}</p>
                <p className="mt-5 inline-block rounded-lg bg-aurora-indigo/10 px-3 py-1.5 font-mono text-xs text-aurora-purple">{edu.score}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* certifications */}
        <div id="certifications" className="scroll-mt-24 pt-24">
          <SectionHeading eyebrow="07 · certifications" title="Credentials that compound." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <motion.li
                key={cert}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <div className="glass group flex h-full items-start gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-aurora-indigo/30">
                  <Award size={16} className="mt-0.5 shrink-0 text-aurora-blue transition-colors group-hover:text-aurora-cyan" aria-hidden />
                  <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-[rgb(var(--fg))]">{cert}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
