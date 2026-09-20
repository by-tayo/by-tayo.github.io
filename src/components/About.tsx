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
            I started in a <span className="text-[var(--fg)]">business program</span> and chose the harder
            road out of it: <span className="text-[var(--fg)]">security engineering</span>. No computer
            science degree to lean on, so I built the proof myself &mdash;{' '}
            <span className="text-[var(--fg)]">nearly three years</span> across security engineering,
            network engineering, IT infrastructure, AML investigations, and analytical roles at research and
            education institutions, plus the labs and CTFs I keep running on my own time.
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
            Day to day I work <span className="text-[var(--fg)]">detection and response</span> &mdash;
            triaging alerts in <span className="text-[var(--fg)]">Microsoft Sentinel</span>,{' '}
            <span className="text-[var(--fg)]">Defender XDR</span>, and{' '}
            <span className="text-[var(--fg)]">Splunk</span>, writing{' '}
            <span className="text-[var(--fg)]">KQL</span> to hunt what the alerts miss, and running email,
            endpoint, and malware cases through{' '}
            <span className="text-[var(--fg)]">Abnormal Security</span>,{' '}
            <span className="text-[var(--fg)]">Cisco Secure Endpoint</span>, and{' '}
            <span className="text-[var(--fg)]">Cisco Secure Malware Analytics</span>. On the engineering
            side, I&rsquo;ve benchmarked{' '}
            <span className="text-[var(--fg)]">post-quantum TLS certificates</span> against production RSA
            at enterprise scale and built the monitoring, logging, and detection tooling you&rsquo;ll find
            below.
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] sm:text-base">
            I chase the work that tests me out of my comfort zone, and I document all of it &mdash; the
            parts that worked and the parts that didn&rsquo;t.
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
