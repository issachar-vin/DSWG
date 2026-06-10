# DSWG — Dune: Spice Wars Faction Strategy Compendium

Static single-page React app showcasing strategy guides for all 7 factions in the game
Dune: Spice Wars. No backend, no routing, no state library — all content is hardcoded data.

## Stack

- Vite + React 19 + TypeScript (strict), `framer-motion` for all animation
- Plain CSS (no Tailwind/CSS-in-JS): theme tokens in `src/index.css`, all component styles in `src/App.css`
- Build: `npm run build` (tsc -b && vite build). Lint: `npx eslint .`. Dev: `npm run dev` or `make dev` (docker)

## Architecture

- `src/data/factions.ts` — single source of truth. Exports `Faction` interface, `factions: Faction[]` (7 entries), `ROLE_LABELS`, and `sources` (research citations rendered in footer). **All strategy content lives here**; UI is purely presentational. Each faction: id, name, archetype, leader, color (accent hex), difficulty (1-3), tagline, overview, strengths/weaknesses (label + hover detail), mechanics, buildOrder (opening steps incl. councilor picks), devOrder (research priority, tagged by tech tree), combos (building/system synergies), units (role, trait, beats/losesTo, optional stats), combatTips, councilors (`pick` flags recommended), gamePlan {early/mid/late bullets}, victoryPaths, matchups (per-enemy `expect`/`counter`, keyed by `enemyId`).
- `src/App.tsx` — `selectedId: string | null` state toggles between the card grid (hero + `FactionCard` grid + sources footer) and `FactionDetail`. Wrapped in `AnimatePresence mode="wait"`.
- `src/components/FactionDetail.tsx` — single-screen at-a-glance dashboard (no tabs): banner with victory badges + mechanic/strength/weakness chips, then a 3-column panel grid (Opening Build Order, Development Order, Combat Doctrine | Army, Build Together, Councilors | Enemy Playbook) and a full-width Game Plan strip. Designed as a play aid: terse always-visible text, full detail in hover cards.
- `src/components/HoverCard.tsx` — generic hover/focus popover rendered via portal with viewport-aware fixed positioning (flips above when near the bottom). Reads the faction accent from `AccentContext` (`src/components/accent.ts`) since portals escape the CSS variable scope.
- `src/components/Icons.tsx` — inline SVG unit-role icons (melee/ranged/stealth/support/siege/elite).

## Key conventions

- Per-faction theming via CSS custom property: components set `style={{ '--accent': faction.color }}`; CSS derives borders/glows/badges from `var(--accent)` with `color-mix()`. Enemy rows in the playbook use `--enemy` the same way.
- Shared layout animation: faction sigil uses `layoutId={`sigil-${faction.id}`}` in both card and detail banner so it morphs on selection.
- Sigils are CSS (first letter of short name in a hexagonal `clip-path`), not images. No image assets in the app.
- Panel entrances use shared `listVariants`/`itemVariants` stagger pattern defined in `FactionDetail.tsx`.
- Background dune drift animation is pure CSS (`.dunes-backdrop::after`), disabled under `prefers-reduced-motion`.
- `matchups[].enemyId` must reference an existing faction id — `FactionDetail` resolves it against `factions` for the enemy sigil/color. Adding a faction means adding a matchup entry to all 7 existing factions (and 6 on the new one).

## Why these choices

- Content-as-typed-data over CMS/markdown: 7 static entries, strict typing catches content shape errors at compile time, zero runtime fetching.
- No router: two views driven by one nullable state value; a router would add weight for nothing.
- Plain CSS over Tailwind: small style surface, and `color-mix()` + custom properties handle per-faction theming cleanly.
- framer-motion over CSS-only transitions: needed `AnimatePresence` exit animations, shared-layout morphs, and stagger orchestration.

## Content updates

Game balance changes → edit only `src/data/factions.ts`. Adding a faction = appending one `Faction` object plus matchup entries on every existing faction (pick an unused accent color). Strategy content was researched June 2026 from TheGamer, GameSkinny, MyGamingTutorials, GameRant, the DUNE.io community stats site, Steam guides, and the Spice Wars fandom wiki — keep `sources` in sync if re-researching. Unit `stats` strings come from the community stats reference; Vernius units omit them (no published numbers).

## Workflow

- `main` is protected: branch → PR (squash merge only). Never push to main.
- No tests exist; verification is `npx eslint .` + `npm run build` + vite preview smoke check.
