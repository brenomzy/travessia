# Travessia

A demo site for **Travessia**, a fictional Brazilian fintech for freelancers paid by clients abroad. It's built to test Source by Webflow: custom Views, generator tools and a simulated client handoff.

- **Brief:** [SPEC.md](SPEC.md). Read it first.
- **Agent rules:** [AGENTS.md](AGENTS.md). `CLAUDE.md` imports it.
- **Test journal:** [docs/journal.md](docs/journal.md)

## Stack

Plain Astro 7 with a hand-built CSS system (no CSS framework), React islands with Base UI, and Motion. PT-BR is the default language at `/` and EN is under `/en/`. Hosting is Webflow Cloud. The site stays `noindex` and shows a fictional-company banner on every page.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the build |
| `npm run check` | Type-check (`astro check`) |
| `npm run lint:css` | Stylelint: tokens only, no raw values (SPEC §5.5.5) |
| `npm run tokens` | Rebuilds `src/styles/tokens.css` and `src/tokens/tokens.ts` from `src/tokens/tokens.json` and checks contrast |
| `npm run format` | Prettier |

## Status

Phase 1 in progress: tokens, CSS layers, layout primitives, the page shell (banner, header with a Base UI drawer, footer), the first Home sections and `/styleguide`. Next steps are in SPEC §15.

Design source: the Paper file "Travessia". Build from the pages above the divider (Design system, Home, Pages, Blog covers); pages marked "Archive" are history. Textures in `src/assets/textures/` are the approved stills from `docs/design/texture-lab/`.
