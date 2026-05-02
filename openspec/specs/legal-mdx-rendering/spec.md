# legal-mdx-rendering Specification

## Purpose
Defines how the bilingual Privacy Policy MDX entries are validated, routed, rendered, wrapped with legal page metadata/layout, and exposed from the footer.
## Requirements
### Requirement: Legal content collection

The system SHALL define a legal content collection that loads legal Markdown and MDX files from `src/content/legal/` and validates required frontmatter before pages are built.

#### Scenario: Valid legal document

- **WHEN** a legal file exists at `src/content/legal/en/privacy-policy.mdx` with valid `title`, `description`, and `lang: "en"` frontmatter
- **THEN** the content collection SHALL expose it as a legal entry that can be rendered during build

#### Scenario: Invalid legal frontmatter

- **WHEN** a legal MDX file is missing required frontmatter or uses a language outside `en` and `es`
- **THEN** the build SHALL fail with a content validation error

#### Scenario: Optional updated date

- **WHEN** a legal MDX file includes an `updated_at` frontmatter value
- **THEN** the content collection SHALL accept it as an optional date value

### Requirement: Legal route registry

The system SHALL define legal public paths through a route registry keyed by semantic page key and language.

#### Scenario: Privacy route mapping

- **WHEN** the route registry is queried for the `privacy` page key
- **THEN** it SHALL provide `privacy` for English and `es/privacidad` for Spanish

### Requirement: Localized legal routes

The system SHALL publish each supported legal page at the configured English and Spanish public URLs.

#### Scenario: Privacy routes

- **WHEN** the site is built
- **THEN** the system SHALL generate `/privacy` for English privacy content and `/es/privacidad` for Spanish privacy content

#### Scenario: Route props

- **WHEN** a legal public URL is generated
- **THEN** the route SHALL pass both the semantic `pageKey` and the selected `lang` to the legal renderer

#### Scenario: Content IDs are internal

- **WHEN** legal MDX content exists under `src/content/legal/`
- **THEN** the system SHALL NOT publish public URLs directly from content entry IDs or source folder paths

### Requirement: Shared legal renderer

The system SHALL render all legal pages through one shared legal page component that receives a semantic page key and language.

#### Scenario: English privacy selection

- **WHEN** the renderer receives `pageKey: "privacy"` and `lang: "en"`
- **THEN** it SHALL select the legal content entry for `en/privacy-policy`

#### Scenario: Spanish privacy selection

- **WHEN** the renderer receives `pageKey: "privacy"` and `lang: "es"`
- **THEN** it SHALL select the legal content entry for `es/privacy-policy`

#### Scenario: Unknown legal page key

- **WHEN** the renderer receives a page key that has no configured legal content slug
- **THEN** it SHALL fail during build instead of rendering an empty page

### Requirement: Native MDX rendering

The system SHALL compile legal `.mdx` files through Astro's native MDX and content rendering pipeline.

#### Scenario: Render legal MDX body

- **WHEN** a localized legal entry is selected
- **THEN** the renderer SHALL call Astro Content rendering for the entry and mount the returned content component inside the legal layout

#### Scenario: No ad hoc Markdown parser

- **WHEN** a legal MDX page is rendered
- **THEN** the legal body SHALL NOT be rendered with `marked` or custom string-to-HTML parsing

### Requirement: Legal layout and metadata

The system SHALL wrap legal MDX content with a legal-specific layout that uses frontmatter metadata for title and description while preserving the site header, footer, and language context.

#### Scenario: Centered logo above legal content

- **WHEN** any legal MDX page renders
- **THEN** the page SHALL display the site logo centered at the top before the legal document heading and body content

#### Scenario: Legal metadata

- **WHEN** a legal MDX entry renders
- **THEN** the page SHALL use the entry frontmatter title and description for visible page heading and SEO metadata

#### Scenario: Spanish language context

- **WHEN** a Spanish legal page renders
- **THEN** the final document SHALL preserve Spanish language context for layout and metadata generation

#### Scenario: Canonical and alternate metadata

- **WHEN** a legal page renders
- **THEN** the page SHALL expose canonical and alternate language metadata that match the configured legal route registry

#### Scenario: Editorial MDX typography

- **WHEN** legal MDX content includes headings, paragraphs, lists, links, or strong text
- **THEN** the legal layout SHALL render those elements with readable editorial typography

### Requirement: Footer legal navigation

The system SHALL expose links to the Privacy Policy page from the site footer in both English and Spanish.

#### Scenario: English footer legal links

- **WHEN** the footer renders for an English page
- **THEN** it SHALL include a link labeled for Privacy Policy that points to `/privacy`

#### Scenario: Spanish footer legal links

- **WHEN** the footer renders for a Spanish page
- **THEN** it SHALL include a link labeled for Politica de Privacidad that points to `/es/privacidad`

#### Scenario: Footer links match route registry

- **WHEN** legal public paths are configured in the route registry
- **THEN** footer legal link URLs SHALL match those configured legal paths for the active language

### Requirement: Complete bilingual privacy content

The system SHALL require the configured Privacy Policy page to have both English and Spanish MDX source files.

#### Scenario: Missing localized document

- **WHEN** a configured legal page is missing its English or Spanish MDX file
- **THEN** the build SHALL fail before publishing

#### Scenario: Folder and frontmatter mismatch

- **WHEN** a legal entry is selected from an `es/` content path but its frontmatter declares `lang: "en"`
- **THEN** the renderer SHALL treat the entry as invalid for the Spanish page and fail during build
