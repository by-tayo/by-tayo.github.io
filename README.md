# My Portfolio Website

Built with [Astro](https://astro.build), React islands for the interactive pieces, and Tailwind CSS v4.
Live at [by-tayo.vercel.app](https://by-tayo.vercel.app).

## Commands

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Local dev server at `localhost:4321`              |
| `npm run build`   | Type-check (`astro check`) and build to `./dist/` |
| `npm run preview` | Preview the production build locally              |
| `npm run lint`    | Lint with oxlint                                  |

## Where things live

- `src/data/site.ts`: all content (experience, projects, events, research, tools). Edit text here.
- `src/pages/index.astro`: page order.
- `src/components/*.astro`: static sections, rendered to plain HTML at build time.
- `src/components/*.tsx`: interactive React islands (ASCII name, theme toggle, cursor, photo, music player, events modal, contact form).
- `src/styles/global.css`: theme tokens, animations, scroll reveals.
- `public/`: résumé PDF, photos, music, images.
