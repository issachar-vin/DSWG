# DSWG — Dune: Spice Wars Faction Strategy Compendium

Static single-page React app showcasing strategy guides for all 7 factions in the game
Dune: Spice Wars. No backend, no state library — all content is hardcoded data. Navigation
is hash-based (`/#faction-id`), no router library.

## Stack

- Vite + React 19 + TypeScript (strict), `framer-motion` for all animation, `gifuct-js` for GIF decoding
- Plain CSS (no Tailwind/CSS-in-JS): theme tokens in `src/index.css`, all component styles in `src/App.css`
- Build: `npm run build` (tsc -b && vite build). Lint: `npx eslint .`. Test: `npm test` (vitest). Dev: `npm run dev` or `make dev` (docker)

## Architecture

- `src/data/factions.ts` — single source of truth. Exports `Faction` interface, `factions: Faction[]` (7 entries), `factionById` map + `getFaction(id)` (throws on unknown id), `ROLE_LABELS`, `DIFFICULTY_LABELS`, `sigilLetter()`, and `sources` (research citations rendered in footer). **All strategy content lives here**; UI is purely presentational. Each faction: id, name, archetype, leader, color (accent hex), image (path under `public/`), difficulty (1-3), tagline, overview, strengths/weaknesses (label + hover detail), mechanics, buildOrder (opening steps incl. councilor picks), devOrder (research priority, tagged by tech tree; entries may carry an optional `patentPlan` — ordered patent picks plus per-enemy denial targets keyed by `enemyId`, rendered as an extended hover card), combos (building/system synergies), units (role, trait, beats/losesTo, optional stats), combatTips, councilors (`pick` flags recommended), gamePlan {early/mid/late bullets}, victoryPaths, matchups (per-enemy `expect`/`counter`, keyed by `enemyId`).
- `src/data/factions.test.ts` — vitest data-integrity suite: unique ids/colors, complete symmetric matchup coverage, valid patent-plan references, image files exist, non-empty content.
- `src/App.tsx` — state + navigation only. `selectedId` mirrors the URL hash (the hash is the source of truth; `hashchange` syncs state, so browser back/forward and `/#faction-id` deep links work). `pendingId` drives the CRT shut-off sequence: picking a faction plays a TV-off collapse on every other card (random 0–120ms delay each), then commits the hash after `SHUTDOWN_MS`. Renders `SpaceBackdrop`, `CockpitHud`, and either `HomeView` or `FactionDetail` inside `AnimatePresence mode="wait"`.
- `src/components/HomeView.tsx` — hero + `FactionCard` grid + sources footer.
- `src/components/CockpitHud.tsx` — fixed decorative HUD overlay (vignette, scanlines, corner brackets, readouts).
- `src/components/SpaceBackdrop.tsx` — cockpit-window space scene: `<canvas>` starfield (~480 twinkling/drifting stars, DPR-aware, static under reduced motion) plus CSS nebulae, galaxy, planets, and ship-traffic layers, each on a mouse-parallax `motion.div` fed by the springs from `App.tsx`.
- `src/components/FactionImage.tsx` — faction background art. JPEGs render as `<img>`; GIFs are decoded with `gifuct-js` and played exactly once on a `<canvas>`, freezing on the last frame (`canvas.drawImage` only yields a GIF's first frame per spec, and the assets loop infinitely, so native playback can't be used). Frames decompress just-in-time to avoid blocking load; cover-fit/center-anchor is drawn in JS; reduced motion jumps to the resting frame.
- `src/components/FactionDetail.tsx` — single-screen at-a-glance dashboard (no tabs): banner with victory badges + mechanic/strength/weakness chips, a full-width Game Plan strip directly under the banner, then a 3-column panel grid (Opening Build Order, Development Order, Combat Doctrine | Army, Build Together, Councilors | Enemy Playbook). Designed as a play aid: terse always-visible text, full detail in hover cards.
- `src/components/HoverCard.tsx` — generic hover/focus popover rendered via portal with viewport-aware fixed positioning (flips above when near the bottom). Reads the faction accent from `AccentContext` (`src/components/accent.ts`) since portals escape the CSS variable scope.
- `src/components/Icons.tsx` — inline SVG unit-role icons (melee/ranged/stealth/support/siege/elite).
- `src/types/css.d.ts` — types `--*` CSS custom properties on `React.CSSProperties`, so no casts at `style={{ '--accent': ... }}` sites.

## Key conventions

- Per-faction theming via CSS custom property: components set `style={{ '--accent': faction.color }}`; CSS derives borders/glows/badges from `var(--accent)` with `color-mix()`. Enemy rows in the playbook use `--enemy` the same way.
- Shared layout animation: faction sigil uses `layoutId={`sigil-${faction.id}`}` in both card and detail banner so it morphs on selection.
- Sigils are CSS (first letter of short name in a hexagonal `clip-path`), not images.
- Faction background art lives in `public/faction_animations/` (gifsicle-compressed: lossy 160, 128 colors, ≤1280px wide). Cards show it right-aligned with a left fade mask; the detail banner centers it with a fade on both sides (`.faction-img-wrap` / `.banner-img-wrap` in `App.css`).
- CRT animations live in `src/components/crt.ts`: `crtBoot(delay)` (power-off reversed — bright scanline expands, opens vertically, settles with the holo flicker; 0.55s) plays on grid cards and detail panels/banner as they enter; `crtOff(delay)` plays on non-picked cards during the shutdown sequence. Each `Panel` boots with a random delay in [0, 0.45s] so the dashboard is online within ~1s. Reduced motion falls back to a plain fade.
- Holographic frame skin (glow border, corner brackets via `::before`, scanline/sheen via `::after`) is shared by `.faction-card`, `.detail-banner`, and `.panel` in `App.css`. Background space animations are pure CSS except the canvas starfield; ships/comet are hidden and animations disabled under `prefers-reduced-motion`.
- `matchups[].enemyId` must reference an existing faction id — resolved via `getFaction`, and enforced by the data tests. Adding a faction means adding a matchup entry to all 7 existing factions (and 6 on the new one) plus an image in `public/faction_animations/`.

## Why these choices

- Content-as-typed-data over CMS/markdown: 7 static entries, strict typing catches content shape errors at compile time, zero runtime fetching.
- Hash navigation over a router or path URLs: two views driven by the fragment; works on any static host (the nginx image has no SPA rewrite rule) and gives back/forward + deep links for free.
- Plain CSS over Tailwind: small style surface, and `color-mix()` + custom properties handle per-faction theming cleanly.
- framer-motion over CSS-only transitions: needed `AnimatePresence` exit animations, shared-layout morphs, and stagger orchestration.

## Content updates

Game balance changes → edit only `src/data/factions.ts`. Adding a faction = appending one `Faction` object plus matchup entries on every existing faction (pick an unused accent color) — run `npm test` to verify integrity. Strategy content was researched June 2026 from TheGamer, GameSkinny, MyGamingTutorials, GameRant, the DUNE.io community stats site, Steam guides, and the Spice Wars fandom wiki — keep `sources` in sync if re-researching. Unit `stats` strings come from the community stats reference; Vernius units omit them (no published numbers).

## Workflow

- `main` is protected: branch → PR (squash merge only). Never push to main.
- Verification: `npx eslint .` + `npm test` + `npm run build` + vite preview smoke check.
