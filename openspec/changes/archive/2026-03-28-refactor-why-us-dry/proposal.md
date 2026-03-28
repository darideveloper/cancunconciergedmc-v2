# Proposal: Apply DRY in WhyUs.astro

Apply the DRY (Don't Repeat Yourself) principle to the `src/components/sections/WhyUs.astro` component and its associated data.

## Goal
To reduce duplication in the `WhyUs.astro` component by moving hardcoded links into the translation files and refactoring the template logic.

## Scope
- Modify `src/messages/en.json` and `src/messages/es.json` to include optional `href` fields for the `whyUs.slides` objects.
- Refactor `src/components/sections/WhyUs.astro` to:
    - Eliminate duplicate wrapper logic for `<a>` and `<div>`.
    - Use the keys directly from the translation object instead of a hardcoded array.
    - Centralize class names.

## Benefits
- Improved maintainability: Links are managed in one place (translations).
- Cleaner code: Reduced template logic duplication.
- Consistency: Better separation of data and representation.
