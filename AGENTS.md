# Travessia: agent rules

Travessia is a **fictional** Brazilian fintech: a demo site for testing Source by Webflow, custom Views and a simulated client handoff. `SPEC.md` is the brief. Read it before building anything. The rules below are copied from SPEC §5.4; if they disagree, SPEC.md wins, and fix this file.

## Project rules

1. Read `SPEC.md` before building anything (§5.5 for styling). There is no CSS framework: don't add Tailwind, Bootstrap, Sass, a UI kit or another framework's class names.
2. Colours, type, spacing, sizes, radii, shadows and motion come **only from tokens** (`var(--…)` from `src/styles/tokens.css`). No raw hex, rgb or px values outside that file. `npm run lint:css` must pass. To add or change a token, edit `src/tokens/tokens.json` and run `npm run tokens`; never edit the generated files.
3. All copy lives in `src/content/**` or `src/i18n/*.json`. Never hardcode copy in pages or components.
4. Every page and content entry exists in `pt-br` (the default) and `en`. Entries share a filename and `translationKey`. Flag missing translations; never silently fall back.
5. Files in `src/assets/generated/**` are written **only by generators**. Never hand-edit them. Every output sits next to a `recipe.json`.
6. Every image needs alt text in both languages. Decorative images use empty alt and are marked decorative.
7. Engines in `src/lib/generators/**` are framework-agnostic TypeScript, with no React or Astro imports.
8. Don't change Toolcraft's bundled components in `tools/cover-lab` unless asked.
9. JSON-LD and meta tags come from content fields, never from hand-written strings.
10. Keep `noindex` until SPEC §1.2 says otherwise, and keep the fictional-company banner on every page (SPEC D18). Forms never ask for passwords, CPF/CNPJ, bank or card details.
11. Component styles live in the component's scoped `<style>` block (or, for a React island, a CSS Module next to it) and use semantic tokens only. Layout comes from the `l-` primitives before any new layout CSS. Variants are props mapped to `data-*` attributes, not extra modifier classes (SPEC §5.5.3).
12. Every new UI component gets an entry on `/styleguide` in the same change.
13. Only use libraries listed in SPEC §5.6. To try a new one, add its row there first. Pages never import Base UI or Motion directly: they use the wrappers in `src/components/islands/` and `src/lib/motion/`.
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
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
