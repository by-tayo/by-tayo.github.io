import { motion } from 'framer-motion'
import { site } from '../data/site'
import ScrollCue from './ScrollCue'
import AsciiName from './AsciiName'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="hero-topo pointer-events-none absolute inset-0" />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <span className="sr-only">
          {site.name} — {site.role}
        </span>
        <AsciiName text={site.name} />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 1 }}
        className="absolute bottom-6 right-6 z-10 sm:bottom-10 sm:right-10"
      >
        <ScrollCue href="#about" />
      </motion.div>
    </section>
  )
}
