import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CommandMenu from './components/layout/CommandMenu'
import Preloader from './components/layout/Preloader'
import Spotlight from './components/layout/Spotlight'
import ScrollBackdrop from './components/layout/ScrollBackdrop'
import BackToTop from './components/layout/BackToTop'
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
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-elev focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollBackdrop />
      <Spotlight />
      <ScrollManager />
      <Navbar />
      <CommandMenu />
      <BackToTop />
      <main id="main">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center font-mono text-sm text-dim">
              loading…
            </div>
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work/:slug" element={<CaseStudy />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  )
}
