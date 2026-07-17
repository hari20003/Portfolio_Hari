import { memo, useMemo } from 'react'

const COLORS = ['rgb(139 92 246 / 0.55)', 'rgb(59 130 246 / 0.5)', 'rgb(34 211 238 / 0.55)']

/** Lightweight CSS-only floating particles — fallback when hardware WebGL is unavailable. */
function CssParticlesInner({ count = 26 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37.3) % 100}%`,
        top: `${(i * 53.7) % 100}%`,
        size: 2 + ((i * 7) % 3),
        color: COLORS[i % COLORS.length],
        duration: 6 + ((i * 13) % 7),
        delay: -((i * 11) % 9),
      })),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-float absolute rounded-full will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export const CssParticles = memo(CssParticlesInner)
