# Travessia: agent rules

Travessia is a **fictional** Brazilian fintech, and the public example for a brand system: context, approved examples, templates, skills and checks that produce on-brand work on request. The site is English-only.

- **Main brief:** `docs/brand-system-brief.md`. Read it before building anything; it wins any disagreement.
- **Website spec:** `SPEC.md` (stack, CSS system, components, routes, content).

The rules below are copied from SPEC §5.4. If they disagree, SPEC.md wins; fix this file.

## Project rules

1. Read `docs/brand-system-brief.md` and `SPEC.md` before building anything (SPEC §5.5 for styling). There is no CSS framework: don't add Tailwind, Bootstrap, Sass, a UI kit or another framework's class names.
2. Colours, type, spacing, sizes, radii, shadows and motion come **only from tokens** (`var(--…)` from `src/styles/tokens.css`). No raw hex, rgb or px values outside that file. `npm run lint:css` must pass. To add or change a token, edit `src/tokens/tokens.json` and run `npm run tokens`; never edit the generated files.
3. All copy lives in `src/content/**` or `src/strings/strings.json`. Never hardcode copy in pages or components.
4. The site is English-only. Don't add other languages or locale plumbing unless the brief changes.
5. Files in `src/assets/generated/**` are written **only by generators**. Never hand-edit them. Every output sits next to a `recipe.json`.
6. Every image needs alt text. Decorative images use empty alt and are marked decorative.
7. Engines in `src/lib/generators/**` and `src/lib/brand/**` are framework-agnostic TypeScript, with no React or Astro imports.
8. The brand engine in `src/lib/brand/` knows nothing about Travessia: no names, colours, copy or facts. Brand-specific material lives in `brand/` (brief §5.1).
9. JSON-LD and meta tags come from content fields, never from hand-written strings.
10. Keep `noindex` and the fictional-company banner on every page (D7, D18). Forms never ask for passwords, CPF/CNPJ, bank or card details.
11. Component styles live in the component's scoped `<style>` block (or, for a React island, a CSS Module next to it) and use semantic tokens only. Layout comes from the `l-` primitives before any new layout CSS. Variants are props mapped to `data-*` attributes, not extra modifier classes (§5.5.3).
12. Every new UI component gets an entry on `/styleguide` in the same change.
13. Only use libraries listed in §5.6. To try a new one, add its row there first. Pages never import Base UI or Motion directly: they use the wrappers in `src/components/islands/` and `src/lib/motion/`.
14. CSS first for hover, focus and simple transitions. Use Motion only for sequencing, scroll-linked effects, springs and exit animations. Every animation respects `prefers-reduced-motion`.

## Before you finish a change

Run `npm run check`, `npm run lint:css` and `npm run build`. All three must pass.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Astro documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles](https://docs.astro.build/en/guides/styling/) (no Tailwind in this project)
