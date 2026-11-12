---
name: add-token
description: Add or change a design token in Travessia (colour, theme role, type size, space, size, radius, shadow, motion). Covers editing tokens.json, the primitive vs semantic tiers, section themes, regenerating the CSS and TS, and the WCAG AA contrast check.
---

# Add or change a token

Tokens are the only source of colours, type, spacing, sizes, radii, shadows and motion (rule 2). Read `SPEC.md` §5.5.2 if you haven't in this session.

## The files

| File | Who writes it |
|---|---|
| `src/tokens/tokens.json` | You. DTCG style: `$type`, `$value`, `$description`, aliases like `{agua.500}`. |
| `src/styles/tokens.css` | `npm run tokens`. Never edit by hand. |
| `src/tokens/tokens.ts` | `npm run tokens`. Never edit by hand. Motion is also exported on its own as `motion`. |
| `scripts/build-tokens.ts` | The generator. Change it only when a new token *type* needs new output. |

Names map one to one: `color.text.muted` ↔ `--color-text-muted` ↔ `tokens.color.text.muted`. A name is a group or a token, never both, so defaults are called `base` (`color.text.base`).

## 1. Decide the tier

- **Is there already a token that means this?** Search `tokens.json` and `tokens.css` first. Reuse beats a near-duplicate.
- **Primitive** (`palette.*`): a raw colour step. Components never use these directly.
- **Semantic** (`color.*`, `themes.*`, `space.*`, `text.*`, …): what components use. Name it for its job (`color.accent.primary-hover`, `color.text.quiet`), not its look (`color.light-teal`).
- A new colour role usually needs a value **in every theme** (`light`, `tint`, `primary`, `deep`, `dark`) under `themes.<name>`, because sections swap themes with `data-theme`.

## 2. Edit `tokens.json`

- Colours alias the palette: `"$value": "{agua.300}"`. Add a palette step only when no existing step works, and note why in `$description`.
- Type sizes use `{ "min": 17, "max": 19 }` in px plus `leading`. The script writes a fluid `clamp()` between 390 px and 1440 px.
- Space can be fixed or `{ "min", "max" }` fluid, same as type.
- Durations are in ms in JSON; the TS output is in seconds for Motion.
- Easings: `cubicBezier` arrays, or `easing` strings for CSS `linear()` springs. Motion's `animate` can't read `linear()` strings, so springs are for CSS transitions.

## 3. Regenerate

```bash
npm run tokens
```

- The run fails if any text role, placeholder, chip, on-accent or banner pair drops below WCAG AA in any theme. Fix the value; don't weaken the check.
- Use the new variable in the component (`var(--color-text-quiet)`).

## 4. Show it and record it

- `/styleguide` renders the palette, themes, type, space, radii, shadows and motion from the token files. Check the new token shows up, and add a sample if it's a new kind of token.
- When `design.md` exists (SPEC §8), update its token section in the same change.
- Changing an existing value changes every page that uses it. Say which pages in the commit message.

## 5. Check

```bash
npm run check
npm run lint:css
npm run build
```
