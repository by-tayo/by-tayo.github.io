import { motion } from 'framer-motion'
import { projects } from '../data/site'
import AsciiName from './AsciiName'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Works() {
  return (
    <section id="works" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Selected works</h2>
        <div aria-hidden="true" className="mx-auto w-full max-w-[17rem] sm:max-w-md md:max-w-xl">
          <AsciiName text="Works" charPx={11} />
        </div>

        <ol className="mt-12 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
          {projects.map((project, i) => (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 4) * 0.05 }}
              className="py-9 sm:py-10"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-mono text-lg font-bold tracking-tight text-[var(--fg)] sm:text-xl">
                  {project.title}
                </h3>
                <span className="shrink-0 pt-1 font-mono text-sm text-[var(--muted)]">
                  /{String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-4 max-w-3xl font-mono text-[13px] leading-relaxed text-[var(--muted)] sm:text-sm">
                {project.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--line)] px-3.5 py-1.5 font-mono text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 font-mono text-xs text-[var(--muted)] transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
