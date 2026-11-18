# Build Status

## Done

- Step 1 — foundation complete.
- Next.js 15.5.29 App Router scaffold with TypeScript, Tailwind, Yarn, fonts, theme and motion providers (`app/`, `components/providers/`, `package.json`).
- Paper/ink tokens, grain, halftone, misregistration and reduced-motion utilities (`app/globals.css`).
- Responsive header, debounced keyboard search, drawer, theme toggle and footer (`components/header/`, `components/footer.tsx`).
- Logo variants, favicon and brand page (`components/logo.tsx`, `public/favicon.svg`, `app/brand/page.tsx`).
- Normalized types, API client, mappers, services and mock data with 20 featured articles / 3 without images (`types/`, `lib/api/`, `services/`, `mocks/`).
- Shared SafeImage, MarkdownContent, Button and Skeleton components (`components/`).
- Minimal proof home and search pages (`app/page.tsx`, `app/search/page.tsx`).
- Validation passed: `yarn lint` and `yarn build`.

## In progress

- None.

## Next

- Await the next explicitly assigned build step.

## Decisions

- Package manager: Yarn 1.22.22.
- Framework: patched Next.js 15.5.29.
- Environment: `.env` sets `NEXT_PUBLIC_USE_MOCK=true`; set it to `false` and provide `NEXT_PUBLIC_API_BASE_URL` for live endpoints.
- Unsplash remote images are mock-only and allowed through `next.config.ts`; all rendering goes through `components/safe-image.tsx`.
- Lenis is disabled for coarse pointers and reduced motion; desktop Lenis updates GSAP ScrollTrigger.
