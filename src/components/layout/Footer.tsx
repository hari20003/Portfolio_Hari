import { useEffect, useState } from 'react'
import { Eye, Heart, Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/BrandIcons'
import { profile } from '@/data/profile'

/** Device-local visitor counter (no backend — counts visits on this device). */
function useLocalVisits() {
  const [visits, setVisits] = useState<number | null>(null)
  useEffect(() => {
    try {
      const key = 'hari-portfolio-visits'
      const n = Number(localStorage.getItem(key) ?? '0') + 1
      localStorage.setItem(key, String(n))
      setVisits(n)
    } catch {
      setVisits(null)
    }
  }, [])
  return visits
}

export function Footer() {
  const visits = useLocalVisits()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-28 border-t border-[rgb(var(--line)/0.07)] py-10">
      <div className="section-shell flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-medium">
            <span className="text-gradient">hari</span>
            <span className="text-muted">.ai</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
            © {year} Hariharasudan S · built with <Heart size={11} className="text-aurora-violet" aria-label="love" /> + LLMs
          </p>
        </div>
        <div className="flex items-center gap-4">
          {visits !== null && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted" title="Visits from this device">
              <Eye size={12} /> {visits.toLocaleString()} visits
            </span>
          )}
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="cursor-pointer text-muted transition-colors hover:text-aurora-cyan">
            <Github size={17} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="cursor-pointer text-muted transition-colors hover:text-aurora-blue">
            <Linkedin size={17} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="cursor-pointer text-muted transition-colors hover:text-aurora-violet">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  )
}
