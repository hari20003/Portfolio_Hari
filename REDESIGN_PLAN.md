# Hari Portfolio 2026 — Redesign Plan

Standalone personal project. Root: `E:\Portfolio_Hari-main`.
Content source of truth: `Hariharasudan_Resume_new.pdf` (parsed 2026-07-13).
Status: **awaiting approval — no code written yet.**

---

## 0. Audit of the current portfolio

| Aspect | Today | Verdict |
|---|---|---|
| Tooling | Create React App (react-scripts 5), React 19, Tailwind 3, framer-motion | Replace — CRA is deprecated, slow, no code-splitting ergonomics |
| Structure | ONE 500+ line `src/App.js` with data + UI mixed | Replace — no components, no routes, no data layer |
| Design | Light theme, pill/card layout, letter-stagger hero | Replace — reads as a template, not premium |
| Content | Experience (2 of 3 jobs, outdated), 6 projects w/ GitHub links, education, certs | **Keep + upgrade** from the new resume (adds SteamCube AI role, updated summary) |
| Assets | `public/hari.jpg`, `HARIHARASUDAN_Resume.pdf` (old), `srmist.jpg`, `saveetha.jpg` | Keep photo + logos; replace resume PDF with the new one |
| Bugs found | E-commerce project's "GitHub" link points to `codeeval1.netlify.app` (wrong target); LinkedIn missing entirely | Fix in rebuild |

**Migration approach:** scaffold a fresh Vite app in this folder, port assets, then delete the CRA scaffolding (`react-scripts`, `src/App.js`, etc.) in one intentional replacement commit. Git history preserves the old site.

---

## 1. Site architecture

**SPA with real routes** (React Router v7), so each project gets a shareable premium case-study URL — this is what separates a senior-feel portfolio from a scrolly one-pager.

```
/                     Home — cinematic single-scroll narrative (all core sections)
/work/:slug           Case study pages (6 projects, full template)
/resume               Embedded resume viewer + download CTA
*                     404 with personality (terminal-style "prompt not found")
```

- Home is the hero experience; case studies carry the depth.
- Hash anchors on home (`/#work`, `/#experience`, `/#contact`) for nav.
- Static deploy target: Netlify (existing account) — `_redirects` for SPA fallback.
- All content lives in `src/data/*.js` (typed-shape plain objects) — zero CMS, zero fetch; the resume maps 1:1 into these files.

## 2. Folder structure

```
E:\Portfolio_Hari-main
├─ index.html
├─ vite.config.js
├─ tailwind.config.js
├─ public/
│  ├─ hari.jpg  favicon.svg  og-cover.jpg
│  ├─ resume/Hariharasudan_Resume.pdf        (new resume)
│  └─ logos/ srmist.jpg saveetha.jpg
└─ src/
   ├─ main.jsx                app bootstrap (Lenis + Router + providers)
   ├─ App.jsx                 routes + <Suspense> shells
   ├─ styles/global.css       tokens, base, utilities
   ├─ data/                   ← SINGLE SOURCE OF TRUTH (from resume)
   │  ├─ profile.js           name, headline, summary, contact, socials
   │  ├─ experience.js        3 roles
   │  ├─ projects.js          6 case studies (full template fields)
   │  ├─ skills.js            9 categories
   │  └─ education.js         degrees + certifications
   ├─ components/
   │  ├─ layout/              Navbar, Footer, PageShell, CommandMenu
   │  ├─ ui/                  Button, MagneticButton, GlassCard, Badge, Marquee,
   │  │                       SectionHeading, GradientText, Reveal, TiltCard, Cursor
   │  ├─ home/                Hero, SignalBar, About, ExperienceTimeline,
   │  │                       WorkGrid, SkillsMatrix, EducationCerts, ContactCTA
   │  ├─ work/                CaseStudyHero, CaseStudyBody, MetaRail, NextProject
   │  └─ three/               HeroField.jsx (R3F, lazy)
   ├─ hooks/                  useLenis, useReducedMotion, useMagnetic, useInViewOnce
   ├─ lib/                    gsap-setup.js, seo.jsx (meta helper), constants.js
   └─ assets/lottie/          small accent animations (availability dot, arrows)
```

## 3. UI/UX plan (the 10-second impression)

**Narrative:** "AI engineer who ships production LLM systems" — proven, not claimed.

Home scroll order:
1. **Hero** — huge display type: `Hariharasudan S` + rotating role line ("Full-Stack AI Engineer / Agentic AI / LLM Systems"); one-line value prop pulled from summary ("I build LLM-powered systems that survive production — 500+ concurrent users, deterministic evals, zero hallucination tolerance."); two CTAs (View work / Get in touch); subtle R3F particle field behind glass.
2. **Signal bar** — thin marquee of hard proof: `8+ months prof. experience · 500+ concurrent users served · Azure AI Foundry · RAG & MCP · CGPA 9.8`.
3. **Selected work** — 3 flagship case cards (large, asymmetric, hover-tilt + glow) + 3 compact cards; each links to `/work/:slug`.
4. **Experience** — vertical timeline, sticky year rail, glass cards per role (SteamCube AI → NextWealth → Greatify AI).
5. **Skills matrix** — 9 categories as an interactive grid; AI/LLM category visually dominant (it's the differentiator).
6. **Education + certifications** — compact, confident, logos kept.
7. **Contact** — oversized "Let's build something intelligent." mailto CTA, socials, availability badge.

Case study template (every project): Overview → Problem → Solution → Features → Architecture (styled diagram block) → Tech stack → My role → Challenges → Outcome → screenshots placeholder → GitHub / Live links → next-project footer nav.

UX details: command palette (⌘K) for nav — the Raycast/Linear touch; custom cursor with hover states (desktop only); scroll progress hairline; copy-email-on-click with toast; keyboard navigable everywhere.

## 4. Design system

- **Theme:** dark-first, single theme at launch (Linear/Vercel lineage — dark reads "engineer luxury"; a light theme is a Phase-6 option, not launch scope).
- **Surfaces:** 3 elevation levels — page (`#050507`), panel (glass: `white/4` fill, `white/8` border, `backdrop-blur-xl`), raised card (`white/6` + inner glow). Glassmorphism ONLY on floating layers (nav, cards, palette) — never full sections.
- **Depth & glow:** one aurora gradient mesh fixed behind hero + section accents; soft radial glows behind headings; 1px gradient borders on hover.
- **Spacing:** 8px base, sections `py-32/40`; max-width 1200px content, full-bleed accents.
- **Radius:** 16/24 cards, 999 pills. **Borders:** always `white/8–12`, never gray-500.
- Tokens as CSS variables + Tailwind theme extension, so everything stays consistent.

## 5. Color palette

| Token | Value | Use |
|---|---|---|
| `bg` | `#050507` | page base (near-black, blue-tinted) |
| `bg-elev` | `#0B0B10` | panels |
| `text` | `#F4F4F5` | primary text |
| `text-dim` | `#9CA0AB` | secondary text |
| `accent-1` | `#7C6BFF` (violet) | primary accent, CTAs |
| `accent-2` | `#4CC9F0` (cyan) | gradient partner, links |
| `accent-3` | `#FF7AC6` (pink) | rare sparkle in aurora only |
| `aurora` | conic/mesh of accents at 12–18% opacity, blurred 120px | hero + section auras |
| `success` | `#4ADE80` | availability dot |

Signature gradient: `linear-gradient(135deg, #7C6BFF, #4CC9F0)` — used for exactly three things (hero keyword, primary CTA, active states) so it stays luxury, not carnival. Contrast: all text pairs ≥ 4.5:1.

## 6. Typography system

- **Display:** `Clash Display` (semibold) — hero + section titles; tracking-tight; sizes `clamp(2.5rem → 7rem)`.
- **Body/UI:** `Inter` (variable, self-hosted via @fontsource-variable) — 16/17px body, 1.6 line-height.
- **Mono accents:** `JetBrains Mono` — eyebrows, badges, metrics, terminal motifs (`> agentic systems`).
- Scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 96 (clamped fluid on display sizes).
- All self-hosted + `font-display: swap` + preloaded — no CDN, no layout shift.

## 7. Animation strategy

| Layer | Tool | Use |
|---|---|---|
| Scroll feel | **Lenis** | global smooth scroll, synced to GSAP ticker |
| Scroll choreography | **GSAP ScrollTrigger** | hero parallax/exit, timeline draw-in, pinned case-study meta rail, section aura shifts |
| Component motion | **Framer Motion** | reveal-on-view (blur+rise, once), hover/tap micro-interactions, route transitions (fade-through), command palette |
| Hero ambience | **R3F** | one lazy-loaded particle/points field reacting subtly to pointer; static gradient PNG fallback |
| Accents | **Lottie** | availability pulse, scroll hint arrow (tiny, <20KB each) |

Rules: nothing animates longer than 700ms except scroll-driven scenes; one easing family (`[0.22, 1, 0.36, 1]`); `prefers-reduced-motion` kills Lenis, R3F, and parallax globally (hook-gated); animations must never block LCP — hero text renders instantly, ambience hydrates after.

## 8. Component hierarchy

```
App
├─ Providers (LenisProvider, MotionConfig, SEO)
├─ Cursor (desktop, lazy)
├─ Navbar ── NavLink · MagneticButton(Resume) · CommandMenu(⌘K)
├─ Routes
│  ├─ Home
│  │  ├─ Hero ── HeroField(R3F, lazy) · GradientText · RoleTicker · CTA row
│  │  ├─ SignalBar(Marquee)
│  │  ├─ WorkGrid ── CaseCard(TiltCard→GlassCard→Badge[])
│  │  ├─ ExperienceTimeline ── TimelineItem(GlassCard)
│  │  ├─ SkillsMatrix ── SkillCategory(GlassCard→Badge[])
│  │  ├─ EducationCerts ── DegreeCard · CertList
│  │  └─ ContactCTA ── MagneticButton · SocialRow
│  ├─ CaseStudy ── CaseStudyHero · MetaRail(sticky) · CaseStudyBody(section blocks)
│  │              · ScreenshotFrame(placeholder) · NextProject
│  ├─ ResumePage ── PDF embed + download
│  └─ NotFound
└─ Footer ── SocialRow · "Built with React · Vite · GSAP" mono line
```

Shared primitives (`ui/`) are the reuse layer: `Reveal`, `GlassCard`, `Badge`, `MagneticButton`, `SectionHeading`, `GradientText`, `Marquee`, `TiltCard` — every section composes these; no one-off styling.

## 9. Page flow

```
Land → Hero (10-sec hook: name, role, proof line, CTA)
  ↓ scroll (Lenis + reveals)
Signal bar → Selected Work (hover → tilt/glow → click)
  ↓                                └→ /work/:slug case study
Experience timeline → Skills → Education → Contact CTA
                                             └→ mailto / socials / resume

⌘K anywhere → jump to any section/case study/social
Navbar: Work · Experience · Skills · Contact · [Resume ↓]
```

Case study flow: hero (title + outcome metric) → sticky meta rail (role, stack, links) alongside scrolling body → next-project card keeps the loop going.

## 10. Content map (from resume — verbatim facts, upgraded presentation)

- **Profile:** Hariharasudan S — Full-Stack AI Engineer | AI Agents & Automation | LLM Systems · Chennai · sureshhariharasudhan7@gmail.com · +91 73388 34982 · [LinkedIn](http://www.linkedin.com/in/hariharasudhan2003) · [GitHub](https://github.com/hari20003)
- **Experience:** SteamCube AI — Junior AI Engineer (06/2026–Present, Chennai) · NextWealth — Full-Stack AI Engineer Intern (08/2025–04/2026, Bengaluru) · Greatify AI — AI Engineer Intern (05/2025–06/2025, Chennai). Bullets = resume bullets, polished. (Employer names/dates/bullets only — no internal product details beyond the resume.)
- **Case studies (6):**
  1. LLM-Powered E-Commerce Product Content Evaluation *(flagship — GitHub link currently broken; needs correct URL or "private" label)*
  2. AI-Driven Image Description & Quality Assessment (LLaVA multimodal) — [repo](https://github.com/hari20003/Image-Annotations)
  3. Online Exam-Oriented Code Assessment Platform (500+ users) — [repo](https://github.com/hari20003/CodeEval_NW_Assiment) · [live](https://codeeval1.netlify.app/)
  4. Agentic AI-Powered LMS Assistant — [repo](https://github.com/hari20003/lms)
  5. Speech-Based Emotion Recognition — [repo](https://github.com/hari20003/SPEECH-BASED-EMOTION-RECOGNITION-SYSTEMEM)
  6. Amazon Product Rating Analysis *(on old site, NOT in resume — include as compact card? → decision below)* — [repo](https://github.com/hari20003/Amazon-Sales-Data-Analysis)
- **Skills (9 required categories):** Languages · AI/LLM (LLMs, GenAI, RAG, VectorDB, Prompt Eng., Multimodal, MLOps, Eval, AI Safety, Fine-tuning, NLP, CV, Transformers, HF) · Agentic AI (AI Agents, MCP, LangChain, tool orchestration) · Cloud (Azure AI Foundry, Azure OpenAI, OpenAI API) · Frontend (React, Streamlit, Tailwind) · Backend (FastAPI, Flask, Django, REST, Microservices) · Databases (PostgreSQL, MySQL, VectorDBs) · DevOps (Docker, Kubernetes, CI/CD, Git, Render, Netlify) · Tools (Tableau, Postman, Librosa, VS Code, Excel)
- **Education:** SRM IST Ramapuram — MCA 9.8 CGPA (2024–26) · Saveetha College — BCA 8.3 (2021–24)
- **Certifications:** 5 from resume (NIIT ×4, NPTEL ×1)
- Case-study Problem/Challenges/Outcome prose will be expanded from resume bullets **truthfully** — drafts shown for approval before publish.

## 11. Performance / SEO / A11y budget

- Lighthouse targets: ≥95 Perf · 100 A11y · 100 Best Practices · 100 SEO.
- Route-level code splitting (`React.lazy`); R3F + Lottie + PDF viewer lazy + below-fold; manualChunks for gsap/three/motion; initial JS budget < 160KB gz (three.js excluded from initial route).
- Self-hosted fonts (preload, swap); AVIF/WebP images with width sets; og-cover + full meta/OG/Twitter tags per route; JSON-LD `Person` schema; sitemap + robots.
- Semantic landmarks, focus-visible rings, skip-link, reduced-motion support, 4.5:1 contrast.

## 12. Feature roadmap (implementation phases — after approval)

| Phase | Scope | Done means |
|---|---|---|
| **P1 Foundation** | Vite+Tailwind+Router scaffold in-place, tokens, fonts, global.css, data files fully populated from resume, Navbar/Footer, CRA removed | site runs, content model complete, old stack deleted intentionally |
| **P2 Home core** | Hero (text-first), SignalBar, WorkGrid, ExperienceTimeline, SkillsMatrix, EducationCerts, ContactCTA — static-motion (Framer reveals only) | full home page, responsive 320→1920 |
| **P3 Case studies** | `/work/:slug` template + 6 project write-ups, ResumePage, 404 | every project has a premium page |
| **P4 Motion & wow** | Lenis, GSAP scroll scenes, R3F hero field, cursor, ⌘K palette, Lottie accents, route transitions | the 10-second impression |
| **P5 Ship** | SEO/meta/JSON-LD, image pipeline, a11y pass, Lighthouse tuning, Netlify deploy config | ≥95/100/100/100, deployed |
| P6 (later, optional) | light theme, blog/notes, GitHub-API project stats, i18n | — |

## Open decisions (answer with approval)

1. **Amazon Rating Analysis project** — not in the resume. Include as a 6th compact card, or drop (resume-strict = 5 projects)?
2. **E-commerce project link** — correct GitHub URL, or mark "code private"?
3. Dark-only at launch OK? (recommended)
