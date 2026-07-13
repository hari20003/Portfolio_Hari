import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import Badge from '../ui/Badge'
import ProjectVisual from '../work/ProjectVisual'
import { projects } from '../../data/projects'

function CaseCard({ project, large = false, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <TiltCard>
        <Link
          to={`/work/${project.slug}`}
          className={`glass glass-hover border-anim focus-ring relative block overflow-hidden p-7 md:p-9 ${
            large ? 'min-h-[300px]' : 'min-h-[220px]'
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.14] blur-3xl"
            style={{ background: project.accent }}
          />
          <div
            className={
              large ? 'grid h-full items-center gap-8 lg:grid-cols-[1.1fr,1fr]' : 'h-full'
            }
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <p className="mb-3 font-mono text-[11px] text-dim">{project.date}</p>
                <h3
                  className={`font-display font-semibold tracking-tight text-ink ${
                    large ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}
                >
                  {project.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
                  {project.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, large ? 5 : 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-dim transition-colors group-hover:text-ink">
                  case study <FiArrowUpRight />
                </span>
              </div>
            </div>
            {large && (
              <div className="hidden lg:block">
                <ProjectVisual project={project} compact />
              </div>
            )}
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  )
}

export default function WorkGrid() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)
  return (
    <section id="work" className="scroll-mt-24 py-28 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="selected work" title="Systems that shipped." />
        <div className="grid gap-5">
          <CaseCard project={flagships[0]} large />
          <div className="grid gap-5 md:grid-cols-2">
            {flagships.slice(1).map((p, i) => (
              <CaseCard key={p.slug} project={p} delay={i * 0.08} />
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((p, i) => (
              <CaseCard key={p.slug} project={p} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
