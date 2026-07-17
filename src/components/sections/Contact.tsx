import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Mail, MapPin, Phone, Send, FileText } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/BrandIcons'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/MagneticButton'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  // mailto-based form: opens the visitor's mail client with the message pre-filled
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const from = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`Portfolio contact — ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" aria-label="Contact" className="section-pad relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="09 · contact"
          title="Let's build something intelligent."
          sub="Open to AI engineering roles and interesting problems. Response time: fast."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <GlassCard strong className="relative overflow-hidden p-8">
            <div aria-hidden className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-aurora-cyan/10 blur-3xl" />
            <h3 className="font-display text-xl font-semibold">Direct channels</h3>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-aurora-violet" aria-hidden />
                <a href={`mailto:${profile.email}`} className="cursor-pointer break-all text-muted transition-colors hover:text-[rgb(var(--fg))]">
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="ml-auto flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[rgb(var(--line)/0.12)] text-muted transition-colors hover:text-aurora-cyan"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone size={16} className="text-aurora-blue" aria-hidden /> {profile.phone}
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin size={16} className="text-aurora-cyan" aria-hidden /> {profile.location}
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <ButtonLink href={profile.socials.github} target="_blank" rel="noreferrer" variant="glass" size="sm">
                  <Github size={14} /> GitHub
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href={profile.socials.linkedin} target="_blank" rel="noreferrer" variant="glass" size="sm">
                  <Linkedin size={14} /> LinkedIn
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href={profile.resumeUrl} target="_blank" variant="glass" size="sm">
                  <FileText size={14} /> Resume preview
                </ButtonLink>
              </Magnetic>
            </div>
          </GlassCard>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-8">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs text-muted">
                      name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      className="h-11 w-full rounded-xl border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--card)/0.04)] px-4 text-sm outline-none transition-colors focus:border-aurora-violet/50"
                      placeholder="Ada Lovelace"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs text-muted">
                      email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="h-11 w-full rounded-xl border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--card)/0.04)] px-4 text-sm outline-none transition-colors focus:border-aurora-violet/50"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs text-muted">
                    message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[rgb(var(--line)/0.12)] bg-[rgb(var(--card)/0.04)] p-4 text-sm outline-none transition-colors focus:border-aurora-violet/50"
                    placeholder="We're hiring AI engineers and…"
                  />
                </div>
                <Magnetic className="block">
                  <Button type="submit" size="lg" className="w-full">
                    <Send size={15} /> Send message
                  </Button>
                </Magnetic>
                <p className="text-center font-mono text-[10px] text-muted">opens your mail client — no data leaves this page</p>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
