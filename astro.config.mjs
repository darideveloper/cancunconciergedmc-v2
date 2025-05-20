import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react'

import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://cancunconciergedmc.com',
  integrations: [
    react(),
    showTailwindcssBreakpoint(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es'],
      },
      robotsTxt: false,
    })
  ],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  }
})