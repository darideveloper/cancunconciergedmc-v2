## Context

The repository already contains Privacy Policy MDX content under `src/content/legal/en/` and `src/content/legal/es/`, but the active app structure does not yet include the complete Astro Content rendering pipeline described in the analysis. There is no `src/content.config.ts`, no shared legal page component, no legal layout, no `@astrojs/mdx` integration, and no public route wiring for the bilingual Privacy Policy pages.

The site is Astro 5 with static pages, React for interactive islands, Tailwind CSS, and a custom bilingual URL pattern where English pages live at root paths and Spanish pages live below `/es/`. The existing i18n utilities live under `src/i18n/`. The existing `Layout.astro` determines language from the URL, injects SEO through `src/components/utils/SEO.astro`, renders the shared header/footer, and wraps page body content.

## Goals / Non-Goals

**Goals:**

- Render Privacy Policy `.mdx` content through Astro Content collections and the native MDX compiler.
- Publish English and Spanish Privacy Policy pages from localized MDX files using stable public URLs.
- Keep legal rendering DRY by using one page component and one legal layout for both Privacy Policy language variants.
- Validate legal frontmatter at build time.
- Fail the build when the required Privacy Policy mapping or localized MDX file is missing.
- Preserve accurate language context, SEO metadata, and editorial typography for legal pages.
- Keep public legal URLs decoupled from content file IDs so Spanish URLs can be localized.

**Non-Goals:**

- Rewriting non-legal pages into the same catch-all routing system.
- Replacing the existing global layout, header, footer, or SEO system for the rest of the site.
- Introducing a CMS or runtime legal document loader.
- Adding legal document authoring workflows beyond MDX files in the repository.

## Decisions

### Use Astro Content plus `@astrojs/mdx`

Legal documents will be modeled as an Astro Content collection loaded from `src/content/legal/**/*.{md,mdx}`. The renderer will use `render(entry)` from `astro:content` so MDX compiles through Astro's native pipeline.

Alternative considered: parse the MDX body with `marked` or a custom Markdown parser. That would not support MDX components correctly and would duplicate behavior Astro already provides.

### Add explicit legal route mappings under the i18n area

The Privacy Policy public URLs will be defined in a route map instead of inferred directly from content file names. Since the current repository uses `src/i18n/`, the preferred home is `src/i18n/routes.ts` unless implementation discovers a stronger existing convention. This keeps the public Spanish URL localized as `/es/privacidad`, while the content slug can remain stable as `privacy-policy`.

Alternative considered: generate URLs directly from content IDs. That would make public URLs depend on implementation folders and would not naturally support translated slugs.

### Generate static legal routes without rewriting the site

Privacy Policy routes can be generated through a new `src/pages/[...path].astro` catch-all that only emits the configured privacy paths, or through equivalent dedicated route files if that better fits Astro route precedence during implementation. The key requirement is that the route layer sends `pageKey: "privacy"` and `lang` to the legal renderer and does not require duplicate page components per language.

Alternative considered: migrate all pages into a shared catch-all. That is intentionally out of scope and would increase risk for unrelated pages.

### Create a shared `LegalPage.astro`

The route layer will pass `pageKey: "privacy"` and `lang` into a single legal page component. `LegalPage.astro` will translate the semantic page key to the `privacy-policy` content slug, select the matching localized collection entry, verify that `entry.data.lang` matches the route language, render it, and pass metadata into `LegalLayout.astro`.

Alternative considered: create one Astro page per Privacy Policy language. That would be simpler initially but would duplicate selection, SEO, and layout behavior between English and Spanish.

### Introduce `LegalLayout.astro` as a thin wrapper

The legal layout will reuse the existing site `Layout.astro`, then provide legal-specific header treatment and a typography-focused article container for MDX output. It should show the site logo centered at the top of every legal MDX page before the legal heading/content so both English and Spanish documents share the same branded presentation. It should accept `lang`, `title`, `description`, and `pageKey` or equivalent metadata. The layout should either extend the current SEO component to accept explicit legal metadata or inject a scoped legal SEO path while preserving existing SEO behavior for non-legal pages.

Alternative considered: place all legal styling inside `LegalPage.astro`. A dedicated layout gives legal documents a reusable presentation boundary without changing the global layout.

### Preserve language context explicitly

The legal rendering path will pass `lang` from route props through `LegalPage.astro` into `LegalLayout.astro` and then into the underlying layout/SEO path if needed. The current layout can infer language from `/es/...`, but explicit propagation avoids ambiguity for catch-all routes and future route changes.

Alternative considered: rely only on URL inference. That works for the current Spanish prefix but is brittle if legal routes are generated from a catch-all or if canonical/alternate SEO needs semantic route data.

### Add legal links to the footer

The footer should expose the Privacy Policy in both supported languages. The current footer reads link definitions from `src/data/links.ts` and localized labels/URLs from `src/messages/en.json` and `src/messages/es.json`, so the implementation should extend that existing pattern instead of hardcoding legal anchors inside `Footer.astro`. The English footer link should point to `/privacy`; the Spanish footer link should point to `/es/privacidad`.

Alternative considered: keep legal links only in SEO metadata or page body content. That would make the documents harder to discover and would not match common legal navigation expectations.

## Risks / Trade-offs

- MDX integration missing from dependencies -> Add `@astrojs/mdx` and register `mdx()` in `astro.config.mjs`.
- Route conflicts with existing static pages -> Keep legal routes limited to known legal slugs and verify with `npm run build`.
- Content folder and frontmatter language mismatch -> Add implementation checks that compare route `lang`, entry ID prefix, and `entry.data.lang`.
- Spanish mojibake in source content -> Fix the source file encoding/content text before treating render output as valid.
- SEO component assumes simple page slugs -> Either extend the existing SEO component to accept explicit legal metadata or let `LegalLayout.astro` inject legal-specific tags without breaking existing pages.
- Footer legal links can drift from route mappings -> Source footer URLs from the same route registry where practical, or verify footer translations match the configured privacy route map.

## Migration Plan

1. Add MDX support and content collection configuration.
2. Add route constants for the privacy page key and localized public paths.
3. Add legal page and layout components.
4. Add or update public Astro routes for `/privacy` and `/es/privacidad`.
5. Add footer links for privacy in both English and Spanish.
6. Ensure both English and Spanish Privacy Policy MDX files exist.
7. Run `npm run build` and inspect generated legal pages plus footer links.

Rollback is straightforward: remove the new legal routes/components/config additions and keep the MDX files as inert content.
