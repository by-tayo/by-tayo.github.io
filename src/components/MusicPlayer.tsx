import { useEffect, useRef, useState } from 'react'
import { tracks } from '../data/site'

const fmt = (s: number) => {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${r.toString().padStart(2, '0')}`
}

/**
 * Minimal monochrome player for Tania's original tracks.
 * One <audio> element; picking a track loads it, the same button toggles play.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setTime(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [])

  const select = (i: number) => {
    const a = audioRef.current
    if (!a) return
    if (i === current) {
      if (a.paused) {
        void a.play()
        setPlaying(true)
      } else {
        a.pause()
        setPlaying(false)
      }
      return
    }
    setCurrent(i)
    setTime(0)
    setDuration(0)
    // load new source then play
    requestAnimationFrame(() => {
      void audioRef.current?.play()
      setPlaying(true)
    })
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current
    if (!a || !duration) return
    const r = e.currentTarget.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * duration
  }

  return (
    <figure className="mt-6 max-w-md rounded-xl border border-[var(--line)] p-4">
      <figcaption className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
        Original music
      </figcaption>

      <audio ref={audioRef} src={tracks[current].src} preload="metadata" />

      <ul className="space-y-1">
        {tracks.map((t, i) => {
          const active = i === current
          const isPlaying = active && playing
          return (
            <li key={t.src}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-label={`${isPlaying ? 'Pause' : 'Play'} ${t.title}`}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-[var(--fg)]/5"
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                    active
                      ? 'border-[var(--fg)] text-[var(--fg)]'
                      : 'border-[var(--line)] text-[var(--muted)]'
                  }`}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>

                <span className={`flex-1 text-sm ${active ? 'text-[var(--fg)]' : 'text-[var(--muted)]'}`}>
                  {t.title}
                </span>

                {active && (
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {fmt(time)} / {fmt(duration)}
                  </span>
                )}
              </button>

              {active && (
                <div
                  role="slider"
                  aria-label="Seek"
                  aria-valuenow={Math.round(time)}
                  aria-valuemax={Math.round(duration) || 0}
                  tabIndex={0}
                  onClick={seek}
                  className="mx-2 mb-1 mt-0.5 h-1 cursor-pointer rounded-full bg-[var(--line-strong)]"
                >
                  <div
                    className="h-full rounded-full bg-[var(--fg)]"
                    style={{ width: `${duration ? (time / duration) * 100 : 0}%` }}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </figure>
  )
}
