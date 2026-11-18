# PROJECT BRIEF: "Riso Print Zine" News Website (with sports section)

Goal: a complete, unique, premium news website that looks hand-printed and is memorable after one visit. Never AI-generated or template-like. Responsive 320-1440px is mandatory. Mock data now, real API later.

## LOOK
- Tokens (CSS variables, light): paper #F6F1EA, surface #FFFFFF, soft surface #EFE8DD, ink #1F2421, muted text #6B716B, line #E1D9CB, sage #A8B5A0, terracotta #C9694A, butter #F2D99B, dusty blue #B9C7D3. Dark mode: background #131715, surface #1C221F, soft surface #232A26, text #EDE8DF, muted #9AA29B, line #2C3530, terracotta #DA7A5A, sage #B8C4B0; butter and dusty blue remain restrained secondary accents. Terracotta is the primary action/link accent, sage and butter support chips and tiles, and dusty blue is rare. All text/action combinations must meet WCAG AA contrast in both themes.
- Style: muted, warm and sophisticated. Everything is softly rounded: cards, tiles and images use 24–28px radii; buttons, chips, inputs and badges are pill-shaped; the header floats as a rounded bar; canvases, dropdowns, drawers and dialogs are rounded. Use 1px soft lines and layered shadows, with soft curved or wavy section dividers. Retain only very subtle paper grain and low-contrast halftone; stamps and stickers are round and soft. Duotone/halftone treatments use muted sage and terracotta. No neon, saturated primaries, hard chunky borders, offset/misregistered shadows or torn-paper edges.
- Fonts (next/font): one heavy display grotesk + one mono for captions/labels.
- Site name, categories, language and route names (default /sports) live in content/site.config.ts and content/strings.ts (default English).

## STACK
Next.js 15 App Router, TypeScript, Tailwind, Framer Motion (drag, layoutId, useScroll, useVelocity), GSAP + ScrollTrigger only where needed (pinned horizontal scroll, text fill), `lenis` smooth scroll connected to ScrollTrigger (lenis.on('scroll', ScrollTrigger.update); native on touch; off for reduced-motion; data-lenis-prevent on dropdowns, drawers and the drag canvas), next-themes, react-markdown + remark-gfm + rehype-sanitize, next/image, next/font. Yarn. No Three.js/WebGL.

## AVOID (used in earlier designs)
Cylinder/ring/coverflow carousels, Z-depth tunnel, tilted wall, stacking/shuffle cards, split-flap, page-turn, 3D envelope.

## DATA + IMAGES
- UI uses only normalized types: Article, Category, Match, Team, Player, Standing, League.
- services/* call lib/api/client.ts. NEXT_PUBLIC_USE_MOCK=true reads mocks/; otherwise NEXT_PUBLIC_API_BASE_URL through mappers (mapApiArticle, mapApiMatch, ...). Going live must mean editing only mappers/endpoints.
- Mock data uses REAL royalty-free photos (images.unsplash.com via next.config remotePatterns, mock only), exactly 20 featured articles, at least 3 articles with no image.
- Every image goes through SafeImage with a beautiful print-style fallback (paper grain, halftone pattern, logo mark, category label, same aspect ratio) for missing or broken images.

## QUALITY RULES
- Sticky/pinned stages: height calc(100svh - var(--header-h)), top: var(--header-h). Every scroll shows visible motion (no dead zones).
- Animate only transform/opacity/clip-path. Hover effects inside @media (hover: hover). focus-visible everywhere. prefers-reduced-motion respected.
- Lazy-load GSAP and the canvas with dynamic import. UTF-8 everywhere (no broken characters like â€™). No Math.random()/Date.now() in render (hydration-safe). No raw URLs as text. Titles use CSS line-clamp. Loading, empty and error states everywhere. No layout shift. 60fps on mid laptops. Touch devices must be able to scroll past the drag canvas.

## HEADER, SEARCH, THEME
Sticky header, expensive-looking logo, nav with animated underline, mobile drawer, dark/light toggle (no flash, persisted, system default).
Search toggle: debounce 300ms, AbortController, min 2 chars. Rows like YouTube suggestions: thumbnail + title with highlighted match + category + time, grouped (news, teams, players), recent searches, arrow keys/Enter/Esc, Cmd/Ctrl+K, skeleton, empty state, full-screen sheet on mobile, plus /search page.

## LOGO
Unique, relatable to news, custom SVG with a distinctive detail (a softly offset terracotta-and-sage overprint inside a rounded mark); no clip-art or gradients. <Logo variant="full | mark | stacked" />, favicon, light/dark/single color, subtle draw-in, /brand page.

## HERO (exactly 20 news): infinite drag canvas
Full viewport. 20 tiles of different sizes scattered on a large canvas, dragged with inertia in any direction (wrap-around), depth parallax between layers. Hover enlarges a tile and turns its halftone/duotone image to full color. Custom cursor (desktop only) shows "Drag" and "Open". "Today's 20" counter, Canvas/Grid view toggle, stamp badge. Click expands the tile into an article preview with a shared-element transition (layoutId) and a link to the article. Keyboard: arrows move focus between tiles, Enter opens. All 20 links server-rendered. Mobile: staggered 2-column snap strip instead of free drag. Reduced-motion: static grid.

## HOME SECTIONS
- H1 Velocity marquee: breaking-news strip whose speed and skew follow scroll velocity.
- H2 Latest news: images appear as halftone dots that resolve into the photo (SVG filter/mask) on scroll and hover.
- H3 Section headings: text scramble/decode on enter and hover; magnetic buttons.
- H4 Long reads: pinned horizontal scroll of story cards.
- H5 Today's timeline: vertical SVG line that draws as you scroll, news items popping in by time of day.
- H6 Topic explorer: sticky split screen, headline on the left, cards on the right revealing with clip-path masks.
- H7 Newsletter: a receipt printer; submitting prints a ticket strip out of a slot.
- H8 Footer: giant outlined wordmark that fills with color as you scroll, plus a rotating stamp.
- H9 Route changes: ink-wipe (clip-path circle expanding from the click point).

## ARTICLE PAGE
Markdown body via react-markdown with real clickable links (sanitized; external rel="noopener noreferrer"), bold, lists, images. Reading progress, share, related, breadcrumbs, JSON-LD NewsArticle, generateMetadata.

## SPORTS (routes /sports, /sports/matches/[id], /sports/teams/[id], /sports/players/[id]; reference https://gamescomcriterio.com/esportes if you can browse)
League tabs (3 leagues via ?league=ID, sliding indicator, horizontally scrollable on mobile, never wrapping unevenly), season line, recent results cards (crests, score, status), upcoming matches with countdown for the next one, standings table (# / team crest / P J W D L GD, top-4 and bottom-4 tinted, scrolls inside its own container on small screens), teams grid, top scorers list with growing bars, match/team/player detail pages in the same print style with loading/empty/error states. Crest fallback = generated initials badge; real logos from the API (normalized `logo` field).

## WORKING AGREEMENT (for any AI)
Read this file's relevant sections and BUILD_STATUS.md first. Do only the step you are given. Open only the files you need. After each step: update BUILD_STATUS.md (Done / In progress / Next / Decisions with file paths and env flags), run `yarn lint` and `yarn build` (both must pass), commit with a clear message, stop, report in at most 8 lines. If you are about to hit a usage limit, BUILD_STATUS.md must say exactly where you stopped and everything must be committed.
