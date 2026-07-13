import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink, FiImage } from 'react-icons/fi'
import Reveal from '../components/ui/Reveal'
import Badge from '../components/ui/Badge'
import { projects, getProject } from '../data/projects'

function Block({ label, children }) {
  return (
    <Reveal className="mb-12">
      <p className="eyebrow mb-4">
        <span className="text-accent">&gt;</span> {label}
      </p>
      {children}
    </Reveal>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (project) document.title = `${project.title} — Hariharasudan S`
    return () => {
      document.title = 'Hariharasudan S — Full-Stack AI Engineer'
    }
  }, [project])

  if (!project) return <Navigate to="/404" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="relative pt-32">
      <div className="aurora" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <Link
            to="/#work"
            className="focus-ring inline-flex items-center gap-2 font-mono text-xs text-dim transition-colors hover:text-ink"
          >
            <FiArrowLeft /> all work
          </Link>
          <p className="mt-8 font-mono text-xs text-dim">{project.date}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-dim">{project.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr,300px]">
          {/* body */}
          <div className="max-w-3xl">
            <Block label="overview">
              <p className="text-lg leading-relaxed text-dim">{project.overview}</p>
            </Block>

            <Block label="problem">
              <p className="leading-relaxed text-dim">{project.problem}</p>
            </Block>

            <Block label="solution">
              <p className="leading-relaxed text-dim">{project.solution}</p>
            </Block>

            <Block label="features">
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent2" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            <Block label="architecture">
              <div className="glass divide-y divide-white/[0.06] overflow-hidden">
                {project.architecture.map(([name, desc]) => (
                  <div key={name} className="grid gap-1 p-4 md:grid-cols-[180px,1fr] md:gap-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent2">
                      {name}
                    </span>
                    <span className="text-sm text-dim">{desc}</span>
                  </div>
                ))}
              </div>
            </Block>

            <Block label="challenges">
              <ul className="space-y-4">
                {project.challenges.map((c) => (
                  <li key={c} className="glass p-5 text-sm leading-relaxed text-dim">
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block label="outcome">
              <p className="border-l-2 border-accent pl-5 text-lg leading-relaxed text-ink">
                {project.outcome}
              </p>
            </Block>

            <Block label="screenshots">
              <div className="glass flex aspect-video items-center justify-center">
                <p className="flex items-center gap-2 font-mono text-xs text-dim">
                  <FiImage /> screenshots coming soon
                </p>
              </div>
            </Block>
          </div>

          {/* meta rail */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass space-y-6 p-6">
              <div>
                <p className="eyebrow mb-3">my role</p>
                <p className="text-sm leading-relaxed text-dim">{project.role}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2 border-t border-white/[0.08] pt-5">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent2"
                  >
                    <FiGithub /> Source on GitHub
                  </a>
                ) : (
                  <p className="flex items-center gap-2 font-mono text-xs text-dim">
                    <FiGithub /> {project.codeNote || 'Private repository'}
                  </p>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent2"
                  >
                    <FiExternalLink /> Live demo
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* next project */}
        <Reveal className="py-24">
          <Link
            to={`/work/${next.slug}`}
            className="glass glass-hover focus-ring group flex items-center justify-between p-8 md:p-10"
          >
            <div>
              <p className="eyebrow mb-2">next case study</p>
              <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {next.title}
              </p>
            </div>
            <FiArrowRight className="shrink-0 text-2xl text-dim transition-transform duration-300 group-hover:translate-x-2 group-hover:text-ink" />
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
