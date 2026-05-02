## Why

The project already stores Privacy Policy content as localized `.mdx` files, but it does not yet have a complete Astro Content rendering flow that turns those files into public privacy policy pages. This change implements a dependable, bilingual Privacy Policy MDX pipeline so English and Spanish versions render through the same components, use stable localized URLs, receive correct SEO/typography treatment, and fail at build time when required content or mappings are incomplete.

This is needed now because the Privacy Policy should be edited as source content, not duplicated into page components or parsed manually. A single rendering flow also prevents the English and Spanish Privacy Policy pages from drifting apart structurally.

## What Changes

- Add Astro MDX support through `@astrojs/mdx` and register the integration in `astro.config.mjs`.
- Add a `legal` Astro Content collection that loads files from `src/content/legal/**/*.{md,mdx}`.
- Validate legal frontmatter with required `title`, `description`, and `lang` fields plus optional `updated_at`.
- Add or formalize a localized route map for the Privacy Policy using a semantic page key:
  - `privacy.en` -> `/privacy`
  - `privacy.es` -> `/es/privacidad`
- Add static route generation for the legal URLs and pass `pageKey` plus `lang` into the renderer.
- Add one shared `LegalPage.astro` component that maps the privacy page key to its content slug:
  - `privacy` -> `privacy-policy`
- Select the correct localized MDX entry by matching both the content folder prefix and the frontmatter language.
- Render legal `.mdx` files through Astro Content `render(entry)` instead of `marked` or custom string-to-HTML parsing.
- Add one `LegalLayout.astro` layout for all legal pages, reusing the site shell while providing a centered site logo at the top, legal page heading, description, SEO metadata, and editorial typography.
- Pass language context through the legal rendering stack so `<html lang>`, canonical/alternate metadata, and layout behavior remain accurate.
- Ensure missing page keys, missing localized MDX files, and folder/frontmatter language mismatches fail during build.
- Fix Spanish legal source encoding issues, including mojibake in accented words, so accented characters render correctly.
- Keep legal content generation source-driven: public URLs come from the route map, while MDX files remain content sources.
- Do not expose automatic URLs based on `src/content/legal` folder paths; content IDs are internal lookup keys only.
- Add bilingual footer links so users can reach the Privacy Policy from the site footer in English and Spanish.

## Capabilities

### New Capabilities

- `legal-mdx-rendering`: Defines how bilingual Privacy Policy MDX entries are discovered, validated, routed, rendered, and wrapped with legal page SEO/layout behavior.

### Modified Capabilities

- None.

## Impact

- Affected content: `src/content/legal/en/*.mdx`, `src/content/legal/es/*.mdx`.
- Affected configuration: `src/content.config.ts`, `astro.config.mjs`.
- Affected routing: a new or updated route registry under the existing i18n area, preferably `src/i18n/routes.ts`, plus legal static route generation in `src/pages/[...path].astro` or an equivalent legal route file.
- Affected rendering: `src/components/pages/legal/LegalPage.astro`, `src/layouts/LegalLayout.astro`, shared `Layout` language handling.
- Affected navigation: `src/components/sections/Footer.astro`, `src/data/links.ts`, `src/messages/en.json`, `src/messages/es.json`.
- Affected SEO: existing SEO metadata flow may need an explicit legal metadata path so legal pages can use MDX frontmatter rather than generic translation keys.
- Verification: `npm run build` should validate content collection entries, route generation, MDX compilation, missing-content failures, and legal page rendering for both languages.
