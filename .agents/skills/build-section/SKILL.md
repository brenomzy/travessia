---
name: build-section
description: Build or change a page section in Travessia from a Paper design. Covers reading Paper values, the Section wrapper and themes, composing with layout primitives and existing components, content in collections or i18n in both languages, responsive checks and the styleguide.
---

# Build a section

A section is a full-width band of a page, in `src/components/sections/`. Read `SPEC.md` §5.5 and §6.2 (page specs) first if you haven't in this session.

## 1. Get the design

- The Paper file "Travessia" has the designs. Pages before the divider are build-ready (Design system, Home, the three page groups, Blog covers). Pages named "Archive · …" are history: don't build from them.
- Take exact values from Paper's code and computed styles, not from screenshots. Then map every value to the nearest token. If a value has no token and appears more than once, add one with the `add-token` skill.
- Desktop boards are 1440 px wide. Where Paper has no mobile board, design the small-screen version from the same parts: stack, don't shrink.

## 2. Put the copy in content, both languages

- Page-specific copy goes in the page file, e.g. `src/content/pages/pt-br/home.json` and `src/content/pages/en/home.json`. Add the block's schema in `src/content.config.ts` first.
- Repeated things come from collections: `features`, `integrations`, `customers`, `faqs`, `plans`. Use the helpers in `src/lib/content.ts` (`getPage`, `getFeatures`, `getIntegrations`, `getStories`, `getFaqs`, `getPlans`). They filter by locale.
- Shared labels (buttons, a11y text) go in `src/i18n/pt-br.json` and `en.json`.
- Write PT-BR first, then EN. Both files share a filename and `translationKey`. If you can't translate something, say so; never fall back silently.
- Links use route keys, not paths: `path('pricing', locale)` from `src/i18n/routes.ts`.

## 3. Write the section

- Wrap it in `Section` (`src/components/sections/Section.astro`):
  - `theme`: `light`, `tint`, `primary`, `deep` or `dark`. The theme swaps every colour role, so use semantic tokens and it just works.
  - `spacing`: `default`, `after-strip` (after a `SeamStrip`) or `none`.
  - `width`: `content`, `text` or `wide`.
  - `labelledby`: the id of the section's `h2`.
- Use `SectionHeader` for the `h2` plus lead or link. One `h1` per page, in the hero.
- Lay out with the primitives first (`l-stack`, `l-grid` with `--min`, `l-switcher`, `l-sidebar`, `l-cluster`), set through custom properties: `style="--gap: var(--space-l)"`.
- Reuse what's in `src/components/ui/` and `src/components/product/`. A new piece follows the `add-component` skill.
- `Section` is an inline-size container, so inner layout changes use `@container` queries, not media queries.
- Props are typed from the content schema, e.g. `Awaited<ReturnType<typeof getPage<'home'>>>['outcomes']`.
- Scroll reveals: `data-reveal` on the header block, `data-reveal-stagger` on a card list, and `<MotionScript />`. `SectionHeader` already reveals itself.
- Structured data (FAQ, product) comes from the same content fields as the visible text (rule 9).

## 4. Add it to the page

- Page components in `src/components/pages/` take `locale` and render sections in order. The route files in `src/pages/` and `src/pages/en/` stay thin wrappers.
- Keep the fictional-company banner and `noindex`, which `BaseLayout` handles. Forms never ask for passwords, CPF/CNPJ, bank or card details, and they post nowhere.

## 5. Check

- Both languages: `/` and `/en/` (or the page's two routes).
- Widths: 375, 768, 1024, 1280 and 1440 px. No horizontal scroll. Compare 1440 with Paper.
- Keyboard: tab through every link and control; focus is visible.
- Add new components to `/styleguide`.

```bash
npm run check
npm run lint:css
npm run build
```
