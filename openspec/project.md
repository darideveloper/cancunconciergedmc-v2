# Project Context

## Purpose
Cancun Concierge DMC is a boutique Destination Management Company (DMC) based in Cancun and the Riviera Maya. The website serves as a digital storefront and booking platform for luxury hospitality services, including airport transfers, yacht rentals, incentive programs, corporate events, and bespoke travel experiences. It aims to showcase the company's 20+ years of experience and its commitment to Ritz-Carlton-level service standards.

## Tech Stack
- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation / Server-Side Rendering)
- **UI Library:** [React 19](https://react.dev/) (Used for interactive components)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Animations:** [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/), [Framer Motion](https://www.framer.com/motion/)
- **i18n:** Custom implementation using `[lang]` route parameters and JSON message files in `src/messages/`.
- **Typography:** Montserrat, Oswald, Urbanist, Adamina, Anton, Roboto (via [Fontsource](https://fontsource.org/))
- **Utilities:** [clsx](https://github.com/lukeed/clsx) for class management, [Swiper](https://swiperjs.com/) for carousels, [SweetAlert2](https://sweetalert2.github.io/) for alerts, [marked](https://marked.js.org/) for Markdown parsing.

## Project Conventions

### Code Style
- **Conditional Classes:** Always use `clsx` for conditional or complex class logic. **Never use Astro's native `class:list`**.
- **Component Authorship:** Use Astro components (`.astro`) for static sections and React components (`.tsx`) for interactive UI elements.
- **File Naming:** Use kebab-case for file names and PascalCase for React components.
- **Type Safety:** TypeScript is mandatory for all new logic and components.
- **Formatting:** Adhere to Prettier/ESLint defaults configured in the project.

### Architecture Patterns
- **Directory Structure:**
  - `src/components/sections/`: High-level page sections.
  - `src/components/ui/`: Reusable low-level components.
  - `src/components/api/`: Business logic and external API integrations (Stripe, etc.).
  - `src/messages/`: Translation JSON files (`en.json`, `es.json`).
  - `src/pages/[lang]/`: Internationalized routes.
- **i18n Pattern:** Language is determined by the `lang` route parameter. Translations are accessed via a `useTranslations(lang)` utility.

### Testing Strategy
- Currently, there is no automated testing suite (e.g., Vitest or Playwright) configured.
- **Verification:** Changes must be manually verified across different viewports and languages.
- **Future:** New features should include a plan for manual or automated verification.

### Git Workflow
- **Commit Conventions:** Follow [Conventional Commits](https://www.conventionalcommits.org/).
  - `feat`: New features
  - `fix`: Bug fixes
  - `chore`: Tooling/config updates
  - `docs`: Documentation changes
  - `style`: Formatting/styling changes (no logic change)
  - `refactor`: Code restructuring
- **Branching:** Use descriptive branch names (e.g., `feat/add-site-logo`, `fix/mobile-header`).

## Domain Context
- **DMC:** Destination Management Company. Specializes in local knowledge and logistics for travelers and groups.
- **Incentive Travel:** Corporate trips designed to reward and motivate employees.
- **Luxury Hospitality:** Focus on high-end service, anticipation of needs, and personalized attention (inspired by Ritz-Carlton Gold Standards).
- **Geography:** Focused on Cancun, Riviera Maya, and surrounding areas in the Mexican Caribbean.

## Important Constraints
- **Bilingualism:** Every piece of content MUST be available in both English and Spanish.
- **Responsive Design:** Travel bookings are frequently done on mobile; mobile-first responsiveness is critical.
- **Performance:** Image optimization (WebP/AVIF) and efficient asset loading are priorities for a visual-heavy site.

## External Dependencies
- **Stripe API:** Used for payment processing for transportation and other services.
- **Industry Affiliations:** DMC Finder, SITE (Society for Incentive Travel Excellence), Sectur (Mexico's Tourism Ministry).
