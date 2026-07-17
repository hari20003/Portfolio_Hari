import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { ThemeContext, applyTheme, initialTheme, type Theme } from '@/hooks/useTheme'
import { useLenis } from '@/hooks/useLenis'
import { Background } from '@/components/effects/Background'
import { CustomCursor } from '@/components/effects/CustomCursor'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { BackToTop } from '@/components/layout/BackToTop'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'

const Experience = lazy(() => import('@/components/sections/Experience').then((m) => ({ default: m.Experience })))
const Projects = lazy(() => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })))
const Skills = lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const AIShowcase = lazy(() => import('@/components/sections/AIShowcase').then((m) => ({ default: m.AIShowcase })))
const GitHubStats = lazy(() => import('@/components/sections/GitHubStats').then((m) => ({ default: m.GitHubStats })))
const Education = lazy(() => import('@/components/sections/Education').then((m) => ({ default: m.Education })))
const Terminal = lazy(() => import('@/components/sections/Terminal').then((m) => ({ default: m.Terminal })))
const Contact = lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })))
const ChatAssistant = lazy(() => import('@/components/features/ChatAssistant').then((m) => ({ default: m.ChatAssistant })))

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [booted, setBooted] = useState(() => sessionStorage.getItem('hari-booted') === '1')

  useLenis()

  useEffect(() => applyTheme(theme), [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  // global Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onBootDone = useCallback(() => {
    sessionStorage.setItem('hari-booted', '1')
    setBooted(true)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {!booted && <LoadingScreen onDone={onBootDone} />}
      <Background />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main>
        <Hero />
        <About />
        <Suspense fallback={<div className="py-24" aria-hidden />}>
          <Experience />
          <Projects />
          <Skills />
          <AIShowcase />
          <GitHubStats />
          <Education />
          <Terminal />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <Suspense fallback={null}>
        <ChatAssistant />
      </Suspense>
    </ThemeContext.Provider>
  )
}
