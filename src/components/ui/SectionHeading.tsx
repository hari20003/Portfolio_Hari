import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  sub?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export function SectionHeading({ eyebrow, title, sub }: SectionHeadingProps) {
  const words = title.split(' ')
  return (
    <div className="mb-12 sm:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-aurora-blue"
      >
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="h-px w-8 origin-left bg-gradient-to-r from-aurora-indigo to-transparent"
        />
        {eyebrow}
      </motion.p>

      {/* masked word-by-word rise */}
      <h2 className="max-w-3xl font-display text-h2 font-semibold">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '108%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.07, ease: EASE }}
            >
              {word}
              {i < words.length - 1 && ' '}
            </motion.span>
          </span>
        ))}
      </h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-5 max-w-2xl text-fluid-lead text-muted"
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}
