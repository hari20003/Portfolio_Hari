import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CommandMenu from './components/layout/CommandMenu'
import Home from './pages/Home'

const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const ResumePage = lazy(() => import('./pages/ResumePage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

export default function App() {
  useLenis()
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-elev focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <CommandMenu />
      <main id="main">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center font-mono text-sm text-dim">
              loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  )
}
