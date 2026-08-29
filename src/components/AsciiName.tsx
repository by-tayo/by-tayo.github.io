import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Live ASCII-art rendering of the name.
 * - the name is drawn to a supersampled offscreen canvas and reduced to a
 *   small brightness grid; each cell becomes a character by brightness
 * - a per-row sine keeps it alive; the cursor pushes characters outward
 * - rare horizontal row-slip = TV tracking glitch
 * - the whole block tilts in 3D toward the cursor
 * Purely decorative — the real name is in an sr-only node in <Hero>.
 */
const RAMP = '  ...:::--==++**oo##%%@@$$'
const MAX_COLS = 260
const SS = 4

export default function AsciiName({ text, charPx = 11 }: { text: string; charPx?: number }) {
  const CHAR_H = charPx
  const CHAR_W = charPx * 0.6
  const wrapRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const mouse = useRef({ x: -9999, y: -9999, active: false })

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 90, damping: 14 })
  const rotateY = useSpring(tiltY, { stiffness: 90, damping: 14 })

  useEffect(() => {
    const wrapEl = wrapRef.current
    const preEl = preRef.current
    if (!wrapEl || !preEl) return
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    const canvas = ctx.canvas

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cols = 0
    let rows = 0
    let grid: Float32Array | null = null
    let raf = 0
    let last = 0
    let running = true
    const rowSlip: number[] = []

    const build = () => {
      const w = wrapEl.clientWidth
      if (!w) return
      cols = Math.min(MAX_COLS, Math.max(24, Math.floor(w / CHAR_W)))

      const squish = CHAR_H / CHAR_W
      const FONT = 'Inter, system-ui, sans-serif'
      ctx.font = `900 100px ${FONT}`
      const measured = ctx.measureText(text).width * squish
      const nameW = cols * 0.9 // leave margin so the full name is always visible

      // font size driven by width; canvas height generously contains the glyphs
      const fs = (nameW * SS * 100) / measured
      rows = Math.max(10, Math.ceil((fs / SS) * 1.42))
      canvas.width = cols * SS
      canvas.height = rows * SS
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.scale(squish, 1)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `900 ${fs}px ${FONT}`
      ctx.fillStyle = 'rgba(255,255,255,0.42)'
      const yNudge = fs * 0.03
      ctx.fillText(text, 0, yNudge)
      ctx.lineWidth = Math.max(1, fs * 0.03)
      ctx.strokeStyle = '#fff'
      ctx.lineJoin = 'round'
      ctx.strokeText(text, 0, yNudge)
      ctx.restore()

      // reduce the supersampled canvas to a cols x rows brightness grid
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      grid = new Float32Array(cols * rows)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let sum = 0
          for (let yy = 0; yy < SS; yy++) {
            const row = (r * SS + yy) * canvas.width
            for (let xx = 0; xx < SS; xx++) {
              sum += data[(row + c * SS + xx) * 4]
            }
          }
          grid[r * cols + c] = sum / (SS * SS * 255)
        }
      }
      rowSlip.length = rows
      rowSlip.fill(0)
      preEl.style.fontSize = `${CHAR_H}px`
      preEl.style.lineHeight = `${CHAR_H}px`
      preEl.style.height = `${rows * CHAR_H}px`
    }

    const sample = (x: number, y: number) => {
      if (!grid) return 0
      if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) return 0
      const x0 = x | 0
      const y0 = y | 0
      const x1 = Math.min(cols - 1, x0 + 1)
      const y1 = Math.min(rows - 1, y0 + 1)
      const fx = x - x0
      const fy = y - y0
      const a = grid[y0 * cols + x0]
      const b = grid[y0 * cols + x1]
      const c2 = grid[y1 * cols + x0]
      const d = grid[y1 * cols + x1]
      return a * (1 - fx) * (1 - fy) + b * fx * (1 - fy) + c2 * (1 - fx) * fy + d * fx * fy
    }

    const render = (tms: number) => {
      if (!running) return
      if (tms - last > 28 && grid) {
        last = tms
        const t = tms / 1000
        const m = mouse.current
        const mCol = (m.x / wrapEl.clientWidth) * cols
        const mRow = (m.y / (rows * CHAR_H)) * rows
        const R = cols * 0.15

        if (!reduce && Math.random() < 0.012) {
          const start = (Math.random() * rows) | 0
          const h = 1 + ((Math.random() * 3) | 0)
          const amt = ((Math.random() - 0.5) * 7) | 0
          for (let i = start; i < Math.min(rows, start + h); i++) rowSlip[i] = amt
        }
        for (let i = 0; i < rows; i++) rowSlip[i] *= 0.82

        let out = ''
        for (let r = 0; r < rows; r++) {
          const wave = reduce ? 0 : Math.sin(r * 0.5 + t * 1.6) * 0.9
          const slip = rowSlip[r]
          for (let c = 0; c < cols; c++) {
            let sx = c + wave + slip
            let sy = r
            if (m.active) {
              const dx = c - mCol
              const dy = r - mRow
              const d = Math.hypot(dx, dy)
              if (d < R) {
                const f = (1 - d / R) ** 2 * 6
                sx += (dx / (d || 1)) * f
                sy += (dy / (d || 1)) * f
              }
            }
            const lum = sample(sx, sy)
            out += lum > 0.16 ? RAMP[Math.min(RAMP.length - 1, Math.round(lum * (RAMP.length - 1)))] : ' '
          }
          out += '\n'
        }
        preEl.textContent = out
      }
      if (!reduce) raf = requestAnimationFrame(render)
    }

    build()
    raf = requestAnimationFrame(render)

    const onMove = (e: MouseEvent) => {
      const rect = wrapEl.getBoundingClientRect()
      const pad = 90
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active:
          e.clientX > rect.left - pad &&
          e.clientX < rect.right + pad &&
          e.clientY > rect.top - pad &&
          e.clientY < rect.bottom + pad,
      }
      if (!reduce) {
        const nx = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)
        const ny = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2)
        tiltY.set(Math.max(-1, Math.min(1, nx)) * 9)
        tiltX.set(Math.max(-1, Math.min(1, ny)) * -7)
      }
    }
    window.addEventListener('mousemove', onMove)

    const ro = new ResizeObserver(build)
    ro.observe(wrapEl)
    // make sure the weight we measure is actually loaded, then rebuild
    Promise.all([
      document.fonts?.load('900 100px Inter'),
      document.fonts?.load('400 11px "JetBrains Mono"'),
    ])
      .then(build)
      .catch(() => {})

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, charPx])

  return (
    <motion.div
      ref={wrapRef}
      className="ascii-name w-full"
      aria-hidden="true"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
    >
      <pre ref={preRef} className="ascii-pre" />
    </motion.div>
  )
}
