# Tasks: Refactor WhyUs.astro for DRY

An ordered list of work items for the refactoring.

## Data Updates
1. [x] Update `src/messages/en.json` to include `href` for `dmc` and `site` slides.
2. [x] Update `src/messages/es.json` to include `href` for `dmc` and `site` slides.

## Component Refactoring
3. [x] Modify `src/components/sections/WhyUs.astro` to use keys from translations and eliminate duplicate wrapper logic.

## Validation
4. [x] Verify that the "Why Us" section renders correctly in both English and Spanish.
5. [x] Verify that the links for "DMC Finder" and "SITE" are working and open in a new tab.
6. [x] Verify that the "Sectur" card (without a link) renders as a `div` and does not have link attributes.
