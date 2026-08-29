import { motion } from 'framer-motion'

/**
 * Scroll-down mouse indicator (black / white / gray).
 * - circular "SCROLL DOWN ·" label rotating around a mouse outline
 * - animated scroll wheel + chevrons
 * - hover speeds everything up and brightens the ring
 */
export default function ScrollCue({
  href = '#experience',
  className = '',
}: {
  href?: string
  className?: string
}) {
  return (
    <motion.a
      href={href}
      aria-label="Scroll to content"
      className={`scroll-cue group relative grid h-24 w-24 place-items-center text-[var(--muted)] transition-colors hover:text-[var(--fg)] ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.7 }}
      onClick={(e) => {
        e.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="cue-circle" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text className="scroll-cue__ringtext fill-current font-mono text-[10px] uppercase tracking-[0.32em]">
          <textPath href="#cue-circle" startOffset="0">
            scroll down · scroll down ·&nbsp;
          </textPath>
        </text>
      </svg>

      <span className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-current pt-1.5">
        <span className="scroll-cue__wheel block h-1.5 w-1 rounded-full bg-current" />
      </span>

      <svg
        viewBox="0 0 24 24"
        className="scroll-cue__chevrons absolute bottom-0 h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </motion.a>
  )
}
