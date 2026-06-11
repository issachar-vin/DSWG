# Dune: Spice Wars — Faction Strategy Compendium

Live at **[dswg.eroizzy.com](https://dswg.eroizzy.com)**

At-a-glance strategy reference for all 7 factions in Dune: Spice Wars. Holographic cockpit UI with per-faction build orders, tech priorities, councilor picks, unit breakdowns, and enemy-specific matchup guides.

## Stack

- Vite + React 19 + TypeScript (strict)
- framer-motion for animations and shared-layout morphs
- Plain CSS with custom properties for per-faction theming
- No backend, no router, no state library — all content is hardcoded typed data

## Dev

```bash
# Docker (recommended)
make dev          # docker compose up → localhost:5173

# Local
npm install
npm run dev
```

Other make targets: `lint`, `test` (runs build), `clean`.

## Content

All strategy content lives in [src/data/factions.ts](src/data/factions.ts). The UI is purely presentational — to update strategy for a balance patch, edit only that file. Researched from TheGamer, GameSkinny, MyGamingTutorials, GameRant, the DUNE.io community stats site, Steam guides, and the Spice Wars fandom wiki (June 2026).

## Contributing

`main` is protected. Branch → PR, squash merge only.

```bash
npm run build    # tsc + vite build
npx eslint .     # lint
```
