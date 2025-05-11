import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint';

export default defineConfig({
  integrations: [starlight({
    title: 'Docs with Tailwind',
    customCss: [
      // Path to your Tailwind base styles:
      './src/styles/global.css',
    ],
  }), react(), showTailwindcssBreakpoint()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  }
});