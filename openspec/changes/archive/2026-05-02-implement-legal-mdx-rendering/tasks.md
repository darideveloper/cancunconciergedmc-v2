## 1. MDX Content Setup

- [x] 1.1 Install `@astrojs/mdx` and register `mdx()` in `astro.config.mjs`.
- [x] 1.2 Create `src/content.config.ts` with a `legal` collection loaded from `src/content/legal/**/*.{md,mdx}`.
- [x] 1.3 Validate legal frontmatter fields: `title`, `description`, `lang`, and optional `updated_at`.
- [x] 1.4 Confirm all existing legal MDX files compile under the new collection schema.

## 2. Legal Routing

- [x] 2.1 Add a legal route map under the existing i18n area, preferably `src/i18n/routes.ts`, for `privacy` with English and Spanish public paths.
- [x] 2.2 Add public Astro route generation for `/privacy` and `/es/privacidad` using a catch-all route or equivalent legal route files.
- [x] 2.3 Ensure route props include both `pageKey` and `lang` for the legal renderer.
- [x] 2.4 Verify legal routes do not conflict with existing static pages.
- [x] 2.5 Verify content entry IDs and `src/content/legal` folder paths do not create unintended public URLs.

## 3. Legal Rendering Components

- [x] 3.1 Create `src/components/pages/legal/LegalPage.astro`.
- [x] 3.2 Add a `pageKey` to content slug map for `privacy`.
- [x] 3.3 Select the localized legal entry by matching both folder prefix and frontmatter `lang`.
- [x] 3.4 Render selected MDX entries with `render(entry)` from `astro:content`.
- [x] 3.5 Throw build-time errors for unknown page keys, missing localized entries, or folder/frontmatter language mismatches.

## 4. Legal Layout and SEO

- [x] 4.1 Create `src/layouts/LegalLayout.astro` that wraps legal content with the existing site layout.
- [x] 4.2 Pass language context explicitly through `LegalPage.astro`, `LegalLayout.astro`, and the underlying layout path.
- [x] 4.3 Render frontmatter `title` and `description` as the visible legal page heading and supporting text.
- [x] 4.4 Add legal-specific SEO metadata using the existing SEO system or a scoped legal metadata path.
- [x] 4.5 Add editorial typography styles for headings, paragraphs, lists, links, and strong text in legal MDX output.
- [x] 4.6 Display the site logo centered at the top of every legal MDX page before the legal heading and body content.

## 5. Content Completeness

- [x] 5.1 Confirm the English Privacy Policy MDX file exists.
- [x] 5.2 Confirm the Spanish Privacy Policy MDX file exists.
- [x] 5.3 Fix mojibake or encoding issues in Spanish legal MDX files.
- [x] 5.4 Confirm the configured privacy page has matching English and Spanish MDX files.

## 6. Footer Legal Links

- [x] 6.1 Add a footer link entry for privacy using the existing footer link data pattern.
- [x] 6.2 Add English footer label and URL for Privacy Policy.
- [x] 6.3 Add Spanish footer label and URL for Politica de Privacidad.
- [x] 6.4 Verify footer legal URLs match the configured legal route registry for each language.

## 7. Verification

- [x] 7.1 Run `npm run build`.
- [x] 7.2 Verify generated HTML exists for both privacy public URLs.
- [x] 7.3 Inspect English and Spanish legal pages for correct centered top logo, language, headings, metadata, and MDX body rendering.
- [x] 7.4 Inspect the footer in English and Spanish to confirm the privacy link is visible and points to the localized legal URL.
- [x] 7.5 Confirm no legal page uses `marked` or custom Markdown string parsing.
- [x] 7.6 Run `openspec validate implement-legal-mdx-rendering --strict` before implementation is considered ready.
