# hari.ai — Portfolio of Hariharasudan S

Ultra-modern personal portfolio for a Full-Stack AI Engineer. Dark luxury AI aesthetic — aurora gradients, glassmorphism, Three.js particles, and a local AI resume assistant.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · GSAP · Three.js / React Three Fiber · Lenis · Lucide

## Features

- Cinematic hero: typing effect, 3D-tilt avatar card, WebGL particle field (CSS fallback on software renderers), magnetic buttons
- Animated stats, GSAP scroll-drawn experience timeline, project case-study modals
- Rotating tech orbit + stack switcher, animated RAG-pipeline architecture diagram
- AI resume assistant (fully local — zero API calls), interactive terminal, Ctrl+K command palette
- Live GitHub stats, dark/light theme, custom cursor, Lenis smooth scroll
- SEO meta + JSON-LD, lazy-loaded sections, manual chunk splitting, `prefers-reduced-motion` respected

## Development

```bash
npm install
npm run dev        # http://localhost:5181
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build to dist/
```

## Structure

```
src/
├── data/          # resume-driven content (profile, experience, projects, skills, ai)
├── hooks/         # useTheme, useLenis, useMagnetic, useTilt
├── lib/           # cn(), scrollToId(), hasHardwareWebGL()
└── components/
    ├── effects/   # Background, ParticleField, CssParticles, CustomCursor, ScrollProgress
    ├── ui/        # Button, GlassCard, Modal, TypingText, Counter, TextReveal, …
    ├── layout/    # Navbar, CommandPalette, LoadingScreen, Footer, BackToTop
    ├── sections/  # Hero, About, Experience, Projects, Skills, AIShowcase, Terminal, Contact
    └── features/  # ChatAssistant
```

Content lives in `src/data/*.ts` — update those files (and `public/resume/`) when the resume changes.
