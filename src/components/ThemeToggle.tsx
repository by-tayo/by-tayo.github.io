import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitial(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark'
  }
  return 'light'
}

const RAYS = Array.from({ length: 8 }, (_, i) => i * 45)

/**
 * Light/dark switch "formed into a sun".
 * - a pill track; the knob is a sun (disc + 8 rays)
 * - ON  = light: knob slides right, rays extend, the sun spins slowly
 * - OFF = dark : knob slides left, rays retract to a bare disc
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitial)
  const isLight = theme === 'light'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage blocked — fine */
    }
  }, [theme])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="fixed right-4 top-4 z-50 flex h-9 w-16 items-center rounded-full border border-[var(--line)] bg-[var(--bg)]/70 px-1 shadow-sm backdrop-blur"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 480, damping: 30 }}
        className={`grid h-7 w-7 place-items-center rounded-full ${isLight ? 'ml-auto' : 'mr-auto'}`}
      >
        <motion.svg
          viewBox="-16 -16 32 32"
          className="h-7 w-7 overflow-visible"
          animate={{ rotate: isLight ? 360 : 0 }}
          transition={
            isLight
              ? { duration: 26, ease: 'linear', repeat: Infinity }
              : { duration: 0.5 }
          }
        >
          <circle r="5.5" className="fill-[var(--fg)]" />
          {RAYS.map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <motion.line
                x1="0"
                y1="-9"
                x2="0"
                y2="-13.5"
                className="stroke-[var(--fg)]"
                strokeWidth="2.4"
                strokeLinecap="round"
                style={{ transformOrigin: '0px -9px' }}
                animate={{ scaleY: isLight ? 1 : 0, opacity: isLight ? 1 : 0 }}
                transition={{ duration: 0.3, delay: isLight ? (deg / 360) * 0.3 : 0 }}
              />
            </g>
          ))}
        </motion.svg>
      </motion.span>
    </button>
  )
}
