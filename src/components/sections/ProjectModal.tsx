import { AlertTriangle, CheckCircle2, ExternalLink, Layers, ListChecks, Target } from 'lucide-react'
import { Github } from '@/components/ui/BrandIcons'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import type { Project } from '@/data/projects'

function Block({ icon: Icon, title, children }: { icon: React.ComponentType<{ size?: number | string; className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2.5 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-aurora-cyan">
        <Icon size={14} /> {title}
      </h4>
      {children}
    </div>
  )
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Modal open={!!project} onClose={onClose} labelledBy="project-modal-title">
      {project && (
        <div className="p-7 sm:p-10">
          <p className="font-mono text-xs text-muted">{project.date}</p>
          <h3 id="project-modal-title" className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="text-gradient">{project.title}</span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{project.subtitle}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {/* metrics strip */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="glass rounded-xl p-4 text-center">
                <p className="font-display text-base font-semibold text-gradient sm:text-lg">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-tight text-muted">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <Block icon={AlertTriangle} title="Problem">
              <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
            </Block>
            <Block icon={Target} title="Solution">
              <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
            </Block>
          </div>

          <div className="mt-8">
            <Block icon={ListChecks} title="Key features">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-aurora-violet" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="mt-8">
            <Block icon={Layers} title="Architecture">
              <ol className="space-y-2">
                {project.architecture.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 font-mono text-xs leading-relaxed text-muted sm:text-[13px]">
                    <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-aurora-blue/30 bg-aurora-blue/10 text-[10px] text-aurora-blue">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Block>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {project.github && (
              <ButtonLink href={project.github} target="_blank" rel="noreferrer" variant="glass" size="md">
                <Github size={15} /> View Source
              </ButtonLink>
            )}
            {project.live && (
              <ButtonLink href={project.live} target="_blank" rel="noreferrer" size="md">
                <ExternalLink size={15} /> Live Demo
              </ButtonLink>
            )}
            {!project.github && !project.live && (
              <p className="font-mono text-xs text-muted">private / client work — walkthrough available on request</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
