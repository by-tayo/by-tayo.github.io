import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import AsciiName from './AsciiName'
import { GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from './icons'

const EASE = [0.16, 1, 0.3, 1] as const

const FIELD =
  'w-full rounded-lg border border-[var(--line)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--fg)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--fg)]'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = form.subject.trim() || `Portfolio message from ${form.name || 'someone'}`
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const primary = [
    { Icon: MailIcon, label: site.email, href: `mailto:${site.email}` as string | undefined },
    { Icon: MapPinIcon, label: site.location, href: undefined as string | undefined },
  ]
  const social = [
    { Icon: GitHubIcon, label: 'GitHub', href: site.socials.github as string | undefined },
    { Icon: LinkedInIcon, label: 'LinkedIn', href: site.socials.linkedin as string | undefined },
  ]

  const Row = ({
    Icon,
    label,
    href,
  }: {
    Icon: (p: { className?: string }) => React.ReactElement
    label: string
    href?: string
  }) => {
    const inner = (
      <>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--line)]">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-sm">{label}</span>
      </>
    )
    return (
      <li>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3 text-[var(--muted)] transition hover:text-[var(--fg)]"
          >
            {inner}
          </a>
        ) : (
          <span className="flex items-center gap-3 text-[var(--muted)]">{inner}</span>
        )}
      </li>
    )
  }

  return (
    <section id="contact" className="border-t border-[var(--line)] px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Contact</h2>
        <div aria-hidden="true" className="mx-auto w-full max-w-xs sm:max-w-xl md:max-w-2xl">
          <AsciiName text="Contact" charPx={11} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-12 md:gap-16"
        >
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-[var(--fg)]">Get in touch</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--muted)]">
              Here&rsquo;s how you can reach out directly.
            </p>

            <ul className="mt-7 space-y-3">
              {primary.map((r) => (
                <Row key={r.label} {...r} />
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {social.map((r) => (
                <Row key={r.label} {...r} />
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              required
              aria-label="Name"
              placeholder="Name"
              value={form.name}
              onChange={set('name')}
              className={FIELD}
            />
            <input
              required
              type="email"
              aria-label="Email"
              placeholder="Email"
              value={form.email}
              onChange={set('email')}
              className={FIELD}
            />
            <input
              aria-label="Subject"
              placeholder="Subject"
              value={form.subject}
              onChange={set('subject')}
              className={FIELD}
            />
            <textarea
              required
              rows={5}
              aria-label="Message"
              placeholder="Message"
              value={form.message}
              onChange={set('message')}
              className={`${FIELD} resize-y`}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition hover:opacity-85"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
