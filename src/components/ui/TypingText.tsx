import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Cycling typewriter effect for a list of phrases. */
export function TypingText({ phrases, className }: { phrases: readonly string[]; className?: string }) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setText(phrases[0])
      return
    }
    const current = phrases[index % phrases.length]
    let delay = deleting ? 32 : 62
    if (!deleting && text === current) delay = 2100
    else if (deleting && text === '') delay = 350

    const t = window.setTimeout(() => {
      if (!deleting && text === current) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => window.clearTimeout(t)
  }, [text, deleting, index, phrases, reduced])

  return (
    <span className={className} aria-label={phrases[0]}>
      {text}
      <span aria-hidden className="animate-pulse-glow ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-aurora-cyan" />
    </span>
  )
}
