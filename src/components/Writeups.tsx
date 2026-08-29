import { motion } from 'framer-motion'
import { site } from '../data/site'
import AsciiName from './AsciiName'
import { DocsIcon, MediumIcon, SubstackIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1] as const

const channels = [
  {
    Icon: DocsIcon,
    label: 'Mintlify',
    desc: 'Full-depth labs, CTFs, custom tooling, and POCs',
    href: site.socials.mintlify,
  },
  { Icon: MediumIcon, label: 'Medium', desc: 'Productivity notes', href: site.socials.medium },
  {
    Icon: SubstackIcon,
    label: 'Substack',
    desc: 'Theory and workflow diagrams',
    href: site.socials.substack,
  },
]

export default function Writeups() {
  return (
    <section id="writeups" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Writeups</h2>
        <div aria-hidden="true" className="mx-auto w-full max-w-sm sm:max-w-2xl md:max-w-3xl">
          <AsciiName text="Writeups" charPx={11} />
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]"
        >
          {channels.map(({ Icon, label, desc, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-6 sm:gap-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[var(--line)] text-[var(--fg)]">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-mono text-base font-bold tracking-tight text-[var(--fg)] sm:text-lg">
                      {label}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--fg)]"
                    >
                      ↗
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">{desc}</p>
                </div>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
