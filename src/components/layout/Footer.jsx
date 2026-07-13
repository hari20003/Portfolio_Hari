import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <p className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {profile.name} · Chennai
        </p>
        <div className="flex items-center gap-2">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="focus-ring rounded-lg p-2 text-dim transition-colors hover:text-ink"
          >
            <FiGithub size={18} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="focus-ring rounded-lg p-2 text-dim transition-colors hover:text-ink"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="focus-ring rounded-lg p-2 text-dim transition-colors hover:text-ink"
          >
            <FiMail size={18} />
          </a>
        </div>
        <p className="font-mono text-xs text-dim/60">react · vite · gsap · lenis</p>
      </div>
    </footer>
  )
}
