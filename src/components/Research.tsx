import { motion } from 'framer-motion'
import { research, researchGroups } from '../data/site'
import AsciiName from './AsciiName'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Research() {
  return (
    <section id="research" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Research</h2>
        <div aria-hidden="true" className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-2xl">
          <AsciiName text="Research" charPx={11} />
        </div>

        <p className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg)]">Research groups</p>
        <ol className="mt-4 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
          {researchGroups.map((g, i) => (
            <motion.li
              key={g.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
              className="py-6"
            >
              <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-mono text-base font-bold tracking-tight text-[var(--fg)] sm:text-lg">{g.name}</h3>
                <span className="shrink-0 font-mono text-xs text-[var(--muted)] sm:text-[13px]">{`${g.start} – ${g.end}`}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {g.org} · {g.role}
              </p>
              <ul className="mt-3 space-y-1.5">
                {g.points.map((pt) => (
                  <li key={pt} className="flex max-w-3xl gap-2 text-sm leading-relaxed text-[var(--muted)]">
                    <span className="text-[var(--fg)]">&ndash;</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>

        <p className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg)]">Undergraduate research</p>
        <ol className="mt-4 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
          {research.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
              className="py-7"
            >
              <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-mono text-base font-bold tracking-tight text-[var(--fg)] sm:text-lg">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-[var(--muted)] sm:text-[13px]">{item.date}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {item.program} · {item.format}
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--fg)]">{item.summary}</p>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg)]">Method</p>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{item.method}</p>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg)]">Findings</p>
              <ul className="mt-1.5 space-y-1.5">
                {item.findings.map((f) => (
                  <li key={f} className="flex max-w-3xl gap-2 text-sm leading-relaxed text-[var(--muted)]">
                    <span className="text-[var(--fg)]">&ndash;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[var(--line)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}