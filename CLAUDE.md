# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional training platform (Kevin Attallah) built with **Nuxt 4** (Vue 3 + TypeScript). French-language site selling ~156 training courses across 18 categories (languages, accounting, office, graphics, etc.). Integrates Revolut for payments and Brevo (Sendinblue) for CRM/email.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run generate   # Static site generation
npm run preview    # Preview production build
```

No lint or test commands are configured.

## Architecture

### App Layer (`/app`)

- **`pages/`** — Nuxt file-based routing. Key pages: `formations/index.vue` (catalog with filters), `formations/[id].vue` (course detail), `paiement.vue` (checkout with Revolut).
- **`components/`** — Organized by concern: `animation/` (WebGL, parallax, scroll), `glass/` (glass-morphism UI), `layout/` (header, footer), `sections/` (page sections with `home/`, `about/`, brutalist variants), `ui/` (form inputs, modals, buttons).
- **`composables/`** — `useFormations()` for catalog filtering, `useLenis()` for smooth scroll, `useScrollAnimation()` for GSAP-based scroll triggers, `useCursorTracker()` for custom cursor effects, plus pixel/analytics composables (`useFBPixel`, `useGoogleAds`, `useLinkedIn`).
- **`data/`** — Static TypeScript data files serving as the content layer: `formations.ts` (~156 courses), `categories.ts` (18 categories), `blog.ts`, `testimonials.ts`.
- **`layouts/`** — `default.vue` plus `v2`, `v3`, `v4` brutalist/experimental layout variants.
- **`plugins/`** — All client-side: `gsap.client.ts` (GSAP + ScrollTrigger + Lenis), analytics pixels (`gtag`, `fb-pixel`, `linkedin-pixel`), `magnetic.client.ts`, `toast.client.ts`.
- **`middleware/`** — `redirects.global.ts` handles 301 redirects from legacy URLs (e.g., `/services` → `/formations`).

### Server Layer (`/server`)

- **`api/`** — POST-only endpoints: `create-order` (Revolut payment), `payment-received` (webhook + Brevo email notification), `submit-form` (contact form → Brevo CRM), `free-formation-lead`, `subscribe`, `kit-lancement`, `send-data-to-brevo`.
- **`utils/price-catalog.ts`** — Server-side source of truth for pricing (prevents client-side manipulation). Standard formation: €69, self-paced pack: €299.

### Key Integrations

- **Revolut Checkout** — Payment creation via API, supports sandbox mode via `REVOLUT_SANDBOX` env var. Checkout UI rendered on `paiement.vue`.
- **Brevo CRM** — Manages contacts across multiple lists (IDs: 52, 53, 55, 56) for different lead sources. Sends admin email notifications on purchases.
- **Analytics** — Google Ads, Facebook Pixel, LinkedIn Pixel — all configured via runtime config env vars.

### Styling

- SCSS with variables in `assets/scss/_variables.scss`. Color scheme: purple (#6C2BD9) + copper/orange (#C67651).
- Glass-morphism design system (`_glass.scss`, `GlassCard`, `GlassBadge`, `GlassInput` components).
- Heavy animation: GSAP ScrollTrigger, Lenis smooth scroll, Three.js WebGL backgrounds, magnetic effects, text splitting animations.

## Environment Variables

See `.env.example`. Key vars: `REVOLUT_API_KEY`, `REVOLUT_SANDBOX`, `BREVO_API_KEY`, `NUXT_PUBLIC_FB_PIXEL_ID`, `NUXT_PUBLIC_GOOGLE_ADS_ID`, `NUXT_PUBLIC_LINKEDIN_PARTNER_ID`.

Runtime config follows Nuxt convention: public vars use `NUXT_PUBLIC_` prefix, server-only vars accessed via `useRuntimeConfig()`.
