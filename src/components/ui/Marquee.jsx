// Infinite horizontal marquee; content duplicated once for a seamless loop.
export default function Marquee({ items }) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="mx-6 inline-flex items-center gap-3 font-mono text-sm text-dim">
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          {item}
        </span>
      ))}
    </>
  )
  return (
    <div className="marquee overflow-hidden border-y border-white/[0.06] bg-white/[0.02] py-4">
      <div className="marquee-track flex w-max whitespace-nowrap">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  )
}
