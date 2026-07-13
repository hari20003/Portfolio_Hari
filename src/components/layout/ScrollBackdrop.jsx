import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

// Fixed background that slowly shifts hue as you scroll — the page "evolves"
// from violet toward cyan/pink without any per-section repaints.
export default function ScrollBackdrop() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 24, restDelta: 0.001 })
  const hue = useTransform(smooth, [0, 1], [0, 55])
  const filter = useMotionTemplate`hue-rotate(${hue}deg)`

  return (
    <motion.div aria-hidden="true" className="fixed inset-0 -z-10" style={{ filter }}>
      <div
        className="absolute left-[-15vw] top-[-10vh] h-[55vh] w-[55vw] rounded-full opacity-[0.09] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #7C6BFF, transparent 65%)' }}
      />
      <div
        className="absolute bottom-[-15vh] right-[-10vw] h-[50vh] w-[50vw] rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #4CC9F0, transparent 65%)' }}
      />
    </motion.div>
  )
}
