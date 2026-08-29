import { motion } from 'framer-motion'
import { experience } from '../data/site'
import AsciiName from './AsciiName'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Experience</h2>
        <div aria-hidden="true" className="mx-auto w-full max-w-xl sm:max-w-3xl md:max-w-4xl">
          <AsciiName text="Experience" charPx={11} />
        </div>

        <ol className="mt-14 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.title}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
              className="flex items-center gap-4 py-6 sm:gap-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--line)] font-mono text-[10px] font-bold tracking-tight text-[var(--fg)]">
                {job.short}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-mono text-base font-bold tracking-tight text-[var(--fg)] sm:text-lg">
                    {job.company}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-[var(--muted)] sm:text-[13px]">
                    {job.end ? `${job.start} – ${job.end}` : 'Incoming'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">{job.title}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
