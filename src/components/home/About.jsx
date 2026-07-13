import Reveal from '../ui/Reveal'
import { profile } from '../../data/profile'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-28 md:py-36">
      <div className="container-x grid items-center gap-12 md:grid-cols-[auto,1fr]">
        <Reveal>
          <div className="relative mx-auto w-56 md:w-64">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/40 to-accent2/40 opacity-40 blur-2xl"
            />
            <img
              src="/hari.jpg"
              alt={`Portrait of ${profile.name}`}
              width="256"
              height="256"
              loading="lazy"
              className="relative aspect-square w-full rounded-3xl border border-white/[0.1] object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow mb-4">
              <span className="text-accent">&gt;</span> about
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-lg leading-relaxed text-dim">
              <span className="text-ink">{profile.summary.split('.')[0]}.</span>
              {profile.summary.slice(profile.summary.indexOf('.') + 1)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
