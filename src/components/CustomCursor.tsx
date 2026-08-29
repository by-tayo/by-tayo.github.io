import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor: one solid filled circle that trails the pointer.
 * - mix-blend-mode: difference → solid black on light, solid white on dark
 * - grows over interactive elements, dips on click
 * - fine pointers only; left alone for touch / reduced-motion
 */
export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 30, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 500, damping: 30, mass: 0.35 })

  const [on, setOn] = useState(false)
  const [hot, setHot] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || noMotion) return

    setOn(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      setHot(!!t?.closest('a, button, [role="switch"], input, textarea, label, summary'))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup', up)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!on) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full bg-white sm:block"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', mixBlendMode: 'difference' }}
      animate={{
        width: hot ? 40 : 15,
        height: hot ? 40 : 15,
        scale: down ? 0.7 : 1,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    />
  )
}
