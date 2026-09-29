import { motion } from 'framer-motion'
import { site } from '../data/site'
import PhotoPanel from './PhotoPanel'
import MusicPlayer from './MusicPlayer'
import { ExternalLinkIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <section id="about" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-12 md:gap-16">
        <div className="w-40 shrink-0 sm:w-48 sm:pt-1 md:w-56">
          <PhotoPanel />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="min-w-0 flex-1"
        >
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--fg)] sm:text-base">
            {site.tagline}
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
            I hold a <span className="text-[var(--fg)]">B.B.A in Cybersecurity</span> and an{' '}
            <span className="text-[var(--fg)]">A.A.S in Cyber Defense</span>, with interests in{' '}
            <span className="text-[var(--fg)]">secure software analysis</span> and{' '}
            <span className="text-[var(--fg)]">business risk</span>. I recently started{' '}
            <span className="text-[var(--fg)]">LAY/ERD</span>, where I share what I know about financial
            literacy and business risk from my B.B.A. degree and AML background.
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
            <span className="text-[var(--fg)]">Security+</span>,{' '}
            <span className="text-[var(--fg)]">CySA+</span> certified.
          </p>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
            <span className="text-[var(--fg)]">Investment Researcher</span> at The Investment Society. Probably
            making music now.
          </p>

          <MusicPlayer />

          <div className="mt-7">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--fg)] transition hover:bg-[var(--fg)]/5"
            >
              View r&eacute;sum&eacute;
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}