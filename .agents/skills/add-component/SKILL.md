---
name: add-component
description: Add or change a UI component, product UI piece or React island in Travessia. Covers where the file goes, typed Props, scoped styles with semantic tokens, variants as data attributes, Base UI islands, the /styleguide entry and the checks to run.
---

# Add a component

Read `SPEC.md` §5.5 first if you haven't in this session. There is no CSS framework; don't add one.

## 1. Check what exists

- Look in `src/components/ui/`, `src/components/product/`, `src/components/sections/` and `src/components/islands/`, and on `/styleguide`. Extend an existing component with a prop before adding a new one.
- Check the layout primitives in `src/styles/layout.css` (`l-stack`, `l-cluster`, `l-grid`, `l-switcher`, `l-sidebar`, `l-cover`, `l-frame`, `l-container`). Use them before writing layout CSS.

## 2. Pick the folder

| Folder | For |
|---|---|
| `src/components/ui/` | Small reusable pieces: Button, Icon, Logo, form fields |
| `src/components/product/` | Pictures of the Travessia app: cards, phone, vignettes. All strings come in as props. |
| `src/components/sections/` | Full-width page sections (see the `build-section` skill) |
| `src/components/islands/` | Interactive React components built on Base UI. Only when native HTML can't do it. |
| `src/components/shell/` | Header, footer, banner, skip link. Rarely changes. |

## 3. Write the `.astro` component

- Start the frontmatter with a one-line `/** … */` comment saying what it is and, if it comes from Paper, which board.
- Type every prop in `interface Props`. Copy always arrives as a prop; never write words in the component (rule 3). Text belongs in `src/content/**` or `src/i18n/*.json`, in both `pt-br` and `en`.
- One class on the root. Plain class names (`.card`, `.title`, `.meta`): Astro scopes them, so no BEM.
- **Variants are props mapped to `data-*` attributes:** `<Button variant="secondary" size="s">` renders `data-variant="secondary" data-size="s"`, and CSS targets `[data-variant='secondary']`. No modifier classes.
- If a component renders more than once per page and needs ids (SVG masks, `aria-labelledby`), use `uid()` from `src/lib/ids.ts`.
- Images: Astro `<Image>`, with alt text from content in both languages. Decorative images get `alt=""`.

## 4. Style it

- Styles go in the component's scoped `<style>` block.
- **Semantic tokens only:** `--color-text-base`, `--color-bg-raised`, `--color-border-base`, `--space-m`, `--text-lg` with `--leading-lg`, `--radius-m`, `--shadow-2`, `--duration-fast`. Easings by job: `--ease-hover` for hover and press, `--ease-fade` for opacity, `--ease-base` for other state changes, `--spring-crit` for things that slide into place. Never palette primitives (`--agua-500`, `--noite-900`) or raw hex, rgb or px. If no semantic token fits, add one with the `add-token` skill.
- Colours come from the section theme. A component never sets its own `data-theme` unless it is a deliberately different surface (like the hero's tapajós side).
- Responsive: intrinsic layout first, then container queries (every `Section` is an inline-size container). Media queries are only for the nav and page shell.
- Specificity trap: scoped styles add an attribute selector. For broad child rules use `:where()`, e.g. `.copy > :where(*)`, so a child's own rules still win.
- Hover, focus and simple transitions are CSS. For scroll reveals use the attributes in "Motion" below, not new JS.
- Stylelint rejects raw values for colour, font-size, gap, margin, padding, radius and shadow, and also rejects `color-mix()`. Use `calc()` with a token if you must, e.g. `calc(var(--size-hairline) * -1)`.

## 5. Islands (React + Base UI)

- Only Base UI parts listed in SPEC §5.6.1. Pages never import Base UI or Motion directly.
- `Name.tsx` with a `Name.module.css` beside it. Wrap every rule in the module in `@layer components { … }`. Tokens only.
- Style Base UI states through its attributes: `[data-selected]`, `[data-open]`, `[data-highlighted]`, `[data-starting-style]`, `[data-ending-style]`.
- Props mirror the `.astro` version and carry all copy. Server-render whatever you can (`keepMounted` for tabs) so content is in the HTML.
- Hydrate as late as possible: `client:visible`, or `client:media` when it only matters at some widths. Write down the JS cost from `npm run build` in `docs/journal.md`.

## 6. Motion

- Add `data-reveal` (one block) or `data-reveal-stagger` (each child of a list) and render `<MotionScript />` from `src/components/ui/MotionScript.astro` in the same component. `data-count-up` counts a stat up.
- Nothing else. The helpers in `src/lib/motion/` handle reduced motion and no-JS.

## 7. Add it to `/styleguide` (rule 12)

- Every new component gets an entry in `src/pages/styleguide.astro` in the same change, with its variants.
- Section labels live in `styleguide.sections` in `src/i18n/pt-br.json` and `en.json`.

## 8. Check

```bash
npm run check
npm run lint:css
npm run build
```

All three must pass. Then look at it on `/styleguide` and on the page that uses it at 375 px and 1440 px, with no horizontal scroll.
