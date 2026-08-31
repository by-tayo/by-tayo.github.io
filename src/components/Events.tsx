import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { events, type EventItem } from '../data/site'
import AsciiName from './AsciiName'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Events() {
  const [open, setOpen] = useState<EventItem | null>(null)

  return (
    <section id="events" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Events</h2>
        <div aria-hidden="true" className="mx-auto w-full max-w-[15rem] sm:max-w-md md:max-w-xl">
          <AsciiName text="Events" charPx={11} />
        </div>

        <motion.ol
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]"
        >
          {events.map((ev) => (
            <li key={ev.name}>
              <button
                type="button"
                onClick={() => setOpen(ev)}
                className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-mono text-base font-bold tracking-tight text-[var(--fg)] sm:text-lg">
                      {ev.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--fg)]"
                    >
                      ↗
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {ev.org}
                    {ev.location ? ` · ${ev.location}` : ''}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-[var(--muted)] sm:text-[13px]">{ev.date}</span>
              </button>
            </li>
          ))}
        </motion.ol>
      </div>

      <AnimatePresence>{open && <EventModal event={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

function Section({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg)]">{title}</p>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[var(--muted)]">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[var(--fg)]">&ndash;</span>
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/88 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={event.name}
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--line-strong)] bg-[var(--bg)] p-6 shadow-2xl shadow-black/60 ring-1 ring-white/5 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg border border-[var(--line)] p-1.5 text-[var(--muted)] transition hover:text-[var(--fg)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="pr-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {event.org} · {event.date}
          {event.location ? ` · ${event.location}` : ''}
        </p>
        <h3 className="mt-2 font-mono text-xl font-bold tracking-tight text-[var(--fg)]">{event.name}</h3>

        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{event.description}</p>

        {event.images && event.images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            {event.images.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${event.name} — photo`}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-lg border border-[var(--line)] object-cover"
              />
            ))}
          </div>
        )}

        <Section title="Highlights" items={event.highlights} />
        <Section title="Results" items={event.results} />

        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3.5 py-1.5 font-mono text-xs text-[var(--muted)] transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
          >
            Event page <span aria-hidden="true">↗</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}
