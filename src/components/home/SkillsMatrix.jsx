import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'
import { skillGroups } from '../../data/skills'

export default function SkillsMatrix() {
  return (
    <section id="skills" className="scroll-mt-24 py-28 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="capabilities" title="The stack I think in." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.key}
              delay={(i % 3) * 0.07}
              className={group.featured ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <div
                className={`glass glass-hover h-full p-6 ${
                  group.featured ? 'border-accent/20 bg-accent/[0.05]' : ''
                }`}
              >
                <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold tracking-tight">
                  {group.featured && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} tone={group.featured ? 'accent' : 'default'}>
                      {item}
                    </Badge>
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
