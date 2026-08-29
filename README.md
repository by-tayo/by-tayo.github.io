# tania ortiz — portfolio

Personal portfolio site. Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

## Content

Most editable content lives in `src/data/site.ts` — name, links, résumé path,
work experience, certifications, projects, and music tracks.

Static assets go in `public/`:

- `Tania-Ortiz-Resume.pdf` — linked from the "View résumé" button
- `tania.jpg` — the portrait
- `topo.png` — the contour texture behind the hero name
- `music/*.mp3` — original tracks in the About section

## Deploy

Static output — any host works. On **Vercel**: import the repo, framework preset
**Vite**, build command `npm run build`, output directory `dist`. No extra config.
