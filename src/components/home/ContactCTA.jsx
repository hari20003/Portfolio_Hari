import { useState } from 'react'
import { FiGithub, FiLinkedin, FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'
import { profile } from '../../data/profile'

export default function ContactCTA() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-32 md:py-44">
      <div className="aurora" aria-hidden="true" />
      <div className="container-x relative text-center">
        <SectionHeading eyebrow="contact" title="" />
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Let&apos;s build something <span className="gradient-text">intelligent</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-dim">
            {profile.availability} — based in {profile.location}. The fastest way to reach me:
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="rounded-full bg-gradient-to-r from-accent to-accent2 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-accent/25"
            >
              {profile.email} <FiArrowUpRight />
            </MagneticButton>
            <button
              type="button"
              onClick={copyEmail}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-6 py-4 font-mono text-xs text-dim transition-colors hover:border-white/[0.3] hover:text-ink"
            >
              {copied ? <FiCheck className="text-ok" /> : <FiCopy />} {copied ? 'copied' : 'copy email'}
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex items-center justify-center gap-6">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-ink"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-ink"
            >
              <FiLinkedin /> LinkedIn
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="focus-ring inline-flex items-center gap-2 text-sm text-dim transition-colors hover:text-ink"
            >
              Resume ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
