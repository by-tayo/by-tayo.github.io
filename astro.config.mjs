// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://by-tayo.vercel.app',
  integrations: [
    // Interactive pieces (ASCII name, theme toggle, cursor, music player, events modal, contact form) are React islands.
    react(),
    // Ready for writeups / research pages: drop .mdx files in src/pages or a content collection.
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
