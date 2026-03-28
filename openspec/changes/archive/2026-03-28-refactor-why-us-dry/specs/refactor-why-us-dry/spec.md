# Spec: Refactor WhyUs.astro for DRY

Defined requirements for the refactoring of the "Why Us" section.

## ADDED Requirements

### Requirement: Centralized Data for Why Us Slides
The links and other data associated with the slides in the "Why Us" section MUST be managed within the translation files.

#### Scenario: Slides data with optional links
- **GIVEN** the translation files `src/messages/en.json` and `src/messages/es.json`.
- **WHEN** adding a slide to `whyUs.slides`.
- **THEN** an optional `href` field can be specified for the slide.
- **AND** the component SHOULD use this `href` to wrap the slide in an `<a>` tag if present.

### Requirement: DRY Template Logic in WhyUs.astro
The `WhyUs.astro` component MUST NOT duplicate classes or properties across different wrapper tags (`<a>`, `<div>`).

#### Scenario: Dynamic Wrapper Tag
- **GIVEN** a slide object from the translation.
- **WHEN** the slide has an `href` field.
- **THEN** the wrapper tag MUST be `<a>` with appropriate attributes (`target="_blank"`, `rel="noopener noreferrer"`, `href`).
- **AND** the wrapper tag SHOULD NOT have these attributes if `href` is not present.
- **AND** the classes for both tag types MUST be identical.

### Requirement: Flexible Slide Iteration
The component MUST iterate over all slides defined in the translation without relying on a hardcoded list of keys.

#### Scenario: New slide added to translation
- **GIVEN** a new slide object is added to the translation `whyUs.slides`.
- **WHEN** the "Why Us" section is rendered.
- **THEN** the new slide SHOULD be automatically included without any changes to the component code.
