import { defineConfig } from 'astro/config'
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
        locales: {
          en: 'en',
          es: 'es',
        },
      },
    })
  ],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  }
})