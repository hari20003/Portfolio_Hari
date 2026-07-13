import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, id }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="eyebrow mb-3" id={id}>
        <span className="text-accent">&gt;</span> {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}
