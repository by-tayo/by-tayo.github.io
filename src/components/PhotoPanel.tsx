import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { site } from '../data/site'

/**
 * Circular portrait beside the tagline / bio / CTAs.
 * - iris reveal (clip-path circle)
 * - subtle cursor parallax / 3D tilt
 */
export default function PhotoPanel() {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  const [broken, setBroken] = useState(false)

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.9, clipPath: 'circle(0% at 50% 50%)' }}
      whileInView={{ opacity: 1, scale: 1, clipPath: 'circle(72% at 50% 50%)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="relative mx-auto w-full max-w-[14rem] md:mx-0"
    >
      <div className="aspect-square overflow-hidden rounded-full">
        {broken ? (
          <div className="flex h-full w-full items-center justify-center bg-[var(--fg)]/5 font-pixel text-2xl text-[var(--muted)]">
            TO
          </div>
        ) : (
          <img
            src="/tania.jpg"
            alt={site.name}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </motion.figure>
  )
}
