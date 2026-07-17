import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookMarked, GitFork, Star, Users } from 'lucide-react'
import { Github } from '@/components/ui/BrandIcons'
import { profile } from '@/data/profile'
import { GlassCard } from '@/components/ui/GlassCard'
import { Counter } from '@/components/ui/Counter'

interface GhStats {
  repos: number
  followers: number
  stars: number
  forks: number
}

/** Live GitHub statistics with session cache + graceful fallback. */
export function GitHubStats() {
  const [stats, setStats] = useState<GhStats | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh-stats')
    if (cached) {
      setStats(JSON.parse(cached))
      return
    }
    const user = profile.socials.githubUser
    Promise.all([
      fetch(`https://api.github.com/users/${user}`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    ])
      .then(([u, repos]: [any, any[]]) => {
        const s: GhStats = {
          repos: u.public_repos ?? repos.length,
          followers: u.followers ?? 0,
          stars: repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0),
          forks: repos.reduce((acc, r) => acc + (r.forks_count ?? 0), 0),
        }
        sessionStorage.setItem('gh-stats', JSON.stringify(s))
        setStats(s)
      })
      .catch(() => setFailed(true))
  }, [])

  const items = [
    { icon: BookMarked, label: 'Public repos', value: stats?.repos },
    { icon: Users, label: 'Followers', value: stats?.followers },
    { icon: Star, label: 'Stars earned', value: stats?.stars },
    { icon: GitFork, label: 'Forks', value: stats?.forks },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="section-shell mt-2"
    >
      <GlassCard className="flex flex-col items-center gap-6 p-7 sm:flex-row sm:justify-between">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Github size={22} className="text-aurora-violet" />
          <div>
            <p className="font-display text-sm font-semibold">@{profile.socials.githubUser}</p>
            <p className="font-mono text-[11px] text-muted">{failed ? 'github.com — live stats unavailable' : 'live from the GitHub API'}</p>
          </div>
        </a>
        <div className="grid grid-cols-4 gap-6 sm:gap-10">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <item.icon size={14} className="mx-auto mb-1.5 text-aurora-cyan" aria-hidden />
              <p className="font-display text-xl font-semibold">
                {item.value === undefined ? <span className="text-muted">—</span> : <Counter value={item.value} />}
              </p>
              <p className="mt-0.5 text-[10px] text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
