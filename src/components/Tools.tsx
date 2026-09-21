import { toolRows } from '../data/site'

/**
 * Tools conveyor belt — two rows of monospace chips scrolling in opposite
 * directions. Each row renders its list twice so the CSS translation can loop
 * seamlessly; the duplicate is hidden from screen readers. Motion pauses on
 * hover and is disabled entirely under prefers-reduced-motion (see index.css).
 */
export default function Tools() {
  return (
    <section
      id="tools"
      aria-label="Tools and technologies"
      className="border-t border-[var(--line)] py-12 sm:py-16"
    >
      <p className="px-5 text-center font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]">
        Tools I work with
      </p>

      <div className="marquee mt-8 space-y-3">
        {toolRows.map((row, rowIndex) => (
          <div key={rowIndex} className="marquee__viewport">
            <ul
              className={`marquee__track ${
                rowIndex % 2 === 1 ? 'marquee__track--reverse' : ''
              }`}
              style={{ animationDuration: `${38 + rowIndex * 9}s` }}
            >
              {row.map((tool) => (
                <li key={tool}>
                  <span className="marquee__chip">{tool}</span>
                </li>
              ))}
            </ul>

            <ul
              aria-hidden="true"
              className={`marquee__track ${
                rowIndex % 2 === 1 ? 'marquee__track--reverse' : ''
              }`}
              style={{ animationDuration: `${38 + rowIndex * 9}s` }}
            >
              {row.map((tool) => (
                <li key={`${tool}-dup`}>
                  <span className="marquee__chip">{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
