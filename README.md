# Travessia

**Travessia** is a fictional Brazilian fintech for freelancers who work in English for clients abroad. It's the public example for a brand system: the brand as context, approved examples, templates, skills and checks that produce on-brand decks, one-pagers, landing pages and campaigns on request. The idea comes from Paul Jun's essays "Brand as software".

- **Main brief:** [docs/brand-system-brief.md](docs/brand-system-brief.md). Read it first.
- **Website spec:** [SPEC.md](SPEC.md): stack, CSS system, components, routes and content.
- **Agent rules:** [AGENTS.md](AGENTS.md). `CLAUDE.md` imports it.
- **Journal:** [docs/journal.md](docs/journal.md)

## Stack

Plain Astro 7 with a hand-built CSS system (no CSS framework), React islands with Base UI, and Motion. English only. Hosted on Cloudflare Pages. The site stays `noindex` and shows a fictional-company banner on every page.

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

The website is built: every page in SPEC §6.1, the islands and `/styleguide`. The brand system is in Phase 0 (brief §8): cleanup, deploy and a fresh repo. Phase 1 consolidates the brand into `brand/`.

Design source: the Paper file "Travessia". Build from the pages above the divider (Design system, Home, Pages, Blog covers); pages marked "Archive" are history. Textures in `src/assets/textures/` are the approved stills from `docs/design/texture-lab/`.
