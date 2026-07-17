import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkle } from 'lucide-react'
import { Github } from '@/components/ui/BrandIcons'
import { projects, type Project } from '@/data/projects'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { useTilt } from '@/hooks/useTilt'
import { ProjectModal } from './ProjectModal'

const ACCENTS = {
  violet: { from: 'from-aurora-violet/25', text: 'text-aurora-violet', glow: 'rgb(139 92 246 / 0.45)' },
  blue: { from: 'from-aurora-blue/25', text: 'text-aurora-blue', glow: 'rgb(59 130 246 / 0.45)' },
  cyan: { from: 'from-aurora-cyan/25', text: 'text-aurora-cyan', glow: 'rgb(34 211 238 / 0.45)' },
} as const

function ProjectCard({ project, index, onOpen, featured }: { project: Project; index: number; onOpen: () => void; featured?: boolean }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(featured ? 3 : 5)
  const accent = ACCENTS[project.accent]

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      className={featured ? 'sm:col-span-2 lg:col-span-3' : undefined}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${project.title}`}
        data-cursor
        className={`glass group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-shadow duration-300 will-change-transform hover:shadow-[0_26px_70px_-24px_var(--card-glow)] ${featured ? 'lg:grid lg:grid-cols-[1fr_1.2fr]' : ''}`}
        style={{ '--card-glow': accent.glow } as React.CSSProperties}
      >
        {/* hover gradient border */}
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100 gradient-border" />

        {/* visual header */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${accent.from} to-transparent ${featured ? 'h-44 lg:h-full lg:min-h-[280px]' : 'h-44'}`}>
          <div aria-hidden className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgb(var(--line)/0.1) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          <p className={`absolute left-6 top-6 font-mono text-[68px] font-bold leading-none opacity-15 ${accent.text}`} aria-hidden>
            {String(index + 1).padStart(2, '0')}
          </p>
          {project.flagship && (
            <span className={`absolute right-4 top-4 flex items-center gap-1 rounded-full border border-[rgb(var(--line)/0.15)] bg-[rgb(var(--bg)/0.5)] px-2.5 py-1 font-mono text-[10px] ${accent.text}`}>
              <Sparkle size={10} /> flagship
            </span>
          )}
          <p className="absolute bottom-4 left-6 font-mono text-xs text-muted">{project.date}</p>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-gradient">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.subtitle}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.tech.length > 4 && <Badge>+{project.tech.length - 4}</Badge>}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[rgb(var(--line)/0.07)] pt-4">
            <span className={`flex items-center gap-1.5 font-mono text-xs ${accent.text}`}>
              case study <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer text-muted transition-colors hover:text-[rgb(var(--fg))]"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" aria-label="Projects" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="03 · projects"
          title="Built. Shipped. Measured."
          sub="Production AI systems — every one with schema-enforced outputs, deterministic evaluation, and a reason to exist."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} featured={i === 0} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
