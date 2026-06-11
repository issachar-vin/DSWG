# DSWG — Dune: Spice Wars Faction Strategy Compendium

Static single-page React app showcasing strategy guides for all 7 factions in the game
Dune: Spice Wars. No backend, no routing, no state library — all content is hardcoded data.

## Stack

- Vite + React 19 + TypeScript (strict), `framer-motion` for all animation
- Plain CSS (no Tailwind/CSS-in-JS): theme tokens in `src/index.css`, all component styles in `src/App.css`
- Build: `npm run build` (tsc -b && vite build). Lint: `npx eslint .`. Dev: `npm run dev` or `make dev` (docker)

## Architecture

- `src/data/factions.ts` — single source of truth. Exports `Faction` interface, `factions: Faction[]` (7 entries), `ROLE_LABELS`, and `sources` (research citations rendered in footer). **All strategy content lives here**; UI is purely presentational. Each faction: id, name, archetype, leader, color (accent hex), difficulty (1-3), tagline, overview, strengths/weaknesses (label + hover detail), mechanics, buildOrder (opening steps incl. councilor picks), devOrder (research priority, tagged by tech tree; entries may carry an optional `patentPlan` — ordered patent picks plus per-enemy denial targets keyed by `enemyId`, rendered as an extended hover card), combos (building/system synergies), units (role, trait, beats/losesTo, optional stats), combatTips, councilors (`pick` flags recommended), gamePlan {early/mid/late bullets}, victoryPaths, matchups (per-enemy `expect`/`counter`, keyed by `enemyId`).
- `src/App.tsx` — `selectedId: string | null` state toggles between the card grid (hero + `FactionCard` grid + sources footer) and `FactionDetail`. Wrapped in `AnimatePresence mode="wait"`. A second `pendingId` state drives the CRT shut-off sequence: picking a faction first plays a TV-off collapse on every other card (random 0–120ms delay each), then commits `selectedId` after `SHUTDOWN_MS`. Also renders the fixed `.cockpit` HUD overlay (vignette, scanlines, corner brackets, decorative readouts).
- `src/components/SpaceBackdrop.tsx` — cockpit-window space scene: `<canvas>` starfield (~480 twinkling/drifting stars, DPR-aware, static under reduced motion) plus CSS nebulae, galaxy, planets, and ship-traffic layers, each on a mouse-parallax `motion.div` fed by the springs from `App.tsx`.
- `src/components/FactionDetail.tsx` — single-screen at-a-glance dashboard (no tabs): banner with victory badges + mechanic/strength/weakness chips, then a 3-column panel grid (Opening Build Order, Development Order, Combat Doctrine | Army, Build Together, Councilors | Enemy Playbook) and a full-width Game Plan strip. Designed as a play aid: terse always-visible text, full detail in hover cards.
- `src/components/HoverCard.tsx` — generic hover/focus popover rendered via portal with viewport-aware fixed positioning (flips above when near the bottom). Reads the faction accent from `AccentContext` (`src/components/accent.ts`) since portals escape the CSS variable scope.
- `src/components/Icons.tsx` — inline SVG unit-role icons (melee/ranged/stealth/support/siege/elite).

## Key conventions

- Per-faction theming via CSS custom property: components set `style={{ '--accent': faction.color }}`; CSS derives borders/glows/badges from `var(--accent)` with `color-mix()`. Enemy rows in the playbook use `--enemy` the same way.
- Shared layout animation: faction sigil uses `layoutId={`sigil-${faction.id}`}` in both card and detail banner so it morphs on selection.
- Sigils are CSS (first letter of short name in a hexagonal `clip-path`), not images. No image assets in the app.
- Detail panels boot in with the `boot(delay)` flicker keyframes in `FactionDetail.tsx`; each `Panel` picks a random delay in [0, 0.6s] (duration 0.34s) so the whole dashboard is online within 1s. Reduced motion falls back to a plain fade.
- Holographic frame skin (glow border, corner brackets via `::before`, scanline/sheen via `::after`) is shared by `.faction-card`, `.detail-banner`, and `.panel` in `App.css`. Background space animations are pure CSS except the canvas starfield; ships/comet are hidden and animations disabled under `prefers-reduced-motion`.
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
