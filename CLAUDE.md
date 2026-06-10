# DSWG — Dune: Spice Wars Faction Strategy Compendium

Static single-page React app showcasing strategy guides for all 7 factions in the game
Dune: Spice Wars. No backend, no routing, no state library — all content is hardcoded data.

## Stack

- Vite + React 19 + TypeScript (strict), `framer-motion` for all animation
- Plain CSS (no Tailwind/CSS-in-JS): theme tokens in `src/index.css`, all component styles in `src/App.css`
- Build: `npm run build` (tsc -b && vite build). Lint: `npx eslint .`. Dev: `npm run dev` or `make dev` (docker)

## Architecture (3 source files matter)

- `src/data/factions.ts` — single source of truth. Exports `Faction` interface, `factions: Faction[]` (7 entries), and `sources` (research citations rendered in footer). **All strategy content lives here**; UI is purely presentational. Each faction: id, name, archetype, leader, color (accent hex), difficulty (1-3), tagline, overview, strengths/weaknesses, mechanics, units, combatTips, councilors, gamePlan {early/mid/late}, victoryPaths.
- `src/App.tsx` — `selectedId: string | null` state toggles between the card grid (hero + `FactionCard` grid + sources footer) and `FactionDetail`. Wrapped in `AnimatePresence mode="wait"`.
- `src/components/FactionCard.tsx` + `FactionDetail.tsx` — card grid item and tabbed detail view (tabs: Overview, Mechanics, Military, Councilors, Game Plan, Victory). Detail has local `tab` state.

## Key conventions

- Per-faction theming via CSS custom property: components set `style={{ '--accent': faction.color }}`; CSS derives borders/glows/badges from `var(--accent)` with `color-mix()`.
- Shared layout animation: faction sigil uses `layoutId={`sigil-${faction.id}`}` in both card and detail banner so it morphs on selection. Tab underline uses `layoutId="tab-underline"`.
- Sigils are CSS (first letter of short name in a hexagonal `clip-path`), not images. No image assets in the app.
- List entrances use shared `listVariants`/`itemVariants` stagger pattern defined in `FactionDetail.tsx`.
- Background dune drift animation is pure CSS (`.dunes-backdrop::after`), disabled under `prefers-reduced-motion`.

## Why these choices

- Content-as-typed-data over CMS/markdown: 7 static entries, strict typing catches content shape errors at compile time, zero runtime fetching.
- No router: two views driven by one nullable state value; a router would add weight for nothing.
- Plain CSS over Tailwind: small style surface, and `color-mix()` + custom properties handle per-faction theming cleanly.
- framer-motion over CSS-only transitions: needed `AnimatePresence` exit animations, shared-layout morphs, and stagger orchestration.

## Content updates

Game balance changes → edit only `src/data/factions.ts`. Adding a faction = appending one `Faction` object (UI scales automatically; pick an unused accent color). Strategy content was researched June 2026 from TheGamer, GameSkinny, MyGamingTutorials, and the Spice Wars fandom wiki — keep `sources` in sync if re-researching.

## Workflow

- `main` is protected: branch → PR (squash merge only). Never push to main.
- No tests exist; verification is `npx eslint .` + `npm run build` + vite preview smoke check.
