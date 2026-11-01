import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { site } from '../data/site'

const FIELD =
  'w-full rounded-lg border border-[var(--line)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--fg)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--fg)]'

/** Contact form island: composes a mailto: link from the fields (no backend). */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const subject = form.subject.trim() || `Portfolio message from ${form.name || 'someone'}`
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input required aria-label="Name" placeholder="Name" value={form.name} onChange={set('name')} className={FIELD} />
      <input
        required
        type="email"
        aria-label="Email"
        placeholder="Email"
        value={form.email}
        onChange={set('email')}
        className={FIELD}
      />
      <input aria-label="Subject" placeholder="Subject" value={form.subject} onChange={set('subject')} className={FIELD} />
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
  )
}
