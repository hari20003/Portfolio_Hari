# Hari Portfolio 2026

Personal portfolio of **Hariharasudan S** — Full-Stack AI Engineer.
Premium dark single-page experience + per-project case studies.

## Stack

- **React 19 + Vite** — SPA with route-level code splitting
- **Tailwind CSS** — design tokens in `tailwind.config.js`
- **Framer Motion** — reveals, micro-interactions, command palette
- **Lenis** — smooth scrolling
- Self-hosted fonts: Space Grotesk (display) · Inter (body) · JetBrains Mono (accents)

## Run

```bash
npm install
npm run dev      # http://localhost:5181
npm run build    # production build -> dist/
```

## Structure

- `src/data/` — **all content lives here** (profile, experience, projects,
  skills, education). The resume is the single source of truth; edit these
  files to update the site.
- `src/components/ui/` — shared primitives (Reveal, TiltCard, MagneticButton,
  Badge, Marquee, SectionHeading)
- `src/components/home/` — home page sections
- `src/pages/` — Home, CaseStudy (`/work/:slug`), ResumePage, NotFound
- `public/resume/` — downloadable resume PDF

## Deploy

Static build (`dist/`) deploys anywhere; `public/_redirects` is included for
Netlify SPA routing.

## Notes

- ⌘K / Ctrl+K opens the command palette.
- The redesign plan lives in `REDESIGN_PLAN.md`; the pre-redesign CRA site is
  preserved in git history (commit `dc8848f`).
