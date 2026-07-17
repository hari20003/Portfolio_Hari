import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Cinematic boot screen shown once per session. */
export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let v = 0
    const t = window.setInterval(() => {
      v = Math.min(100, v + Math.random() * 22 + 8)
      setProgress(Math.floor(v))
      if (v >= 100) {
        window.clearInterval(t)
        window.setTimeout(() => {
          setGone(true)
          window.setTimeout(onDone, 550)
        }, 320)
      }
    }, 120)
    return () => window.clearInterval(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#050505]"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl font-semibold tracking-tight text-white"
          >
            <span className="text-gradient">hari</span>
            <span className="text-white/40">.ai</span>
          </motion.div>
          <div className="mt-8 h-[2px] w-52 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-aurora-violet via-aurora-blue to-aurora-cyan"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className="mt-4 font-mono text-xs text-white/35">initializing neural interface — {progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
