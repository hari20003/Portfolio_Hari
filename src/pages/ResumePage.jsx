import { FiDownload } from 'react-icons/fi'
import Reveal from '../components/ui/Reveal'
import MagneticButton from '../components/ui/MagneticButton'
import { profile } from '../data/profile'

export default function ResumePage() {
  return (
    <section className="container-x pt-32">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-3">
            <span className="text-accent">&gt;</span> resume
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            The paper version.
          </h1>
        </div>
        <MagneticButton
          href={profile.resumeUrl}
          download
          className="rounded-full bg-gradient-to-r from-accent to-accent2 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25"
        >
          <FiDownload /> Download PDF
        </MagneticButton>
      </Reveal>
      <Reveal delay={0.1} className="pb-24">
        <object
          data={profile.resumeUrl}
          type="application/pdf"
          className="glass h-[80vh] w-full"
          aria-label="Resume PDF"
        >
          <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
            <p className="text-dim">Your browser can&apos;t preview PDFs inline.</p>
            <a href={profile.resumeUrl} download className="focus-ring text-accent2 underline">
              Download the resume instead
            </a>
          </div>
        </object>
      </Reveal>
    </section>
  )
}
