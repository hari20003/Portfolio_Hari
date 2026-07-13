import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-screen flex-col items-center justify-center text-center">
      <p className="glass px-6 py-4 font-mono text-sm text-dim">
        <span className="text-accent3">error</span>: prompt not found <span className="text-dim/50">· 404</span>
      </p>
      <h1 className="mt-8 font-display text-5xl font-semibold tracking-tight md:text-7xl">
        Lost in <span className="gradient-text">latent space</span>.
      </h1>
      <p className="mt-4 max-w-md text-dim">
        This route doesn&apos;t exist — but the interesting stuff is one hop away.
      </p>
      <Link
        to="/"
        className="focus-ring mt-10 rounded-full bg-gradient-to-r from-accent to-accent2 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/25"
      >
        Back to home
      </Link>
    </section>
  )
}
