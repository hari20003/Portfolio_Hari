import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'

const STATS = [
  { value: 8, suffix: '+', label: 'months of professional AI engineering' },
  { value: 500, suffix: '+', label: 'concurrent users served in production' },
  { value: 6, suffix: '', label: 'systems shipped end-to-end' },
  { value: 9.8, suffix: '', decimals: 1, label: 'MCA CGPA' },
]

function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return undefined
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref} className="gradient-text font-display text-4xl font-semibold tracking-tight md:text-5xl">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-x grid grid-cols-2 gap-5 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.07}>
            <div className="glass glass-hover flex h-full flex-col gap-2 p-6">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="text-sm leading-snug text-dim">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
