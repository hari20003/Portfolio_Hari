export default function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'border-white/[0.08] bg-white/[0.04] text-dim',
    accent: 'border-accent/30 bg-accent/10 text-ink',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] leading-5 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
