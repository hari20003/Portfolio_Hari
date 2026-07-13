import Badge from '../ui/Badge'

// Product-style visual for a project: a browser-chrome frame over a branded
// gradient + grid, with floating stack badges. Stands in for screenshots
// without pretending to be one.
export default function ProjectVisual({ project, compact = false }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-elev"
      aria-hidden="true"
    >
      {/* chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-0.5 font-mono text-[10px] text-dim">
          {project.slug}
        </span>
      </div>
      {/* canvas */}
      <div className={`grid-lines relative ${compact ? 'h-44' : 'h-64 md:h-80'}`}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 90% at 30% 20%, ${project.accent}30, transparent 60%), radial-gradient(50% 80% at 80% 90%, ${project.accent}18, transparent 60%)`,
          }}
        />
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ background: project.accent }}
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-5 md:p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
            {project.date}
          </p>
          {!compact && (
            <p className="max-w-md font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
              {project.title}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, compact ? 3 : 5).map((t, i) => (
              <span key={t} className={i % 2 === 0 ? 'float-slow' : 'float-slower'}>
                <Badge>{t}</Badge>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
