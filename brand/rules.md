# Rules

> **Status:** in progress · playbook step 7 (core identity), started 2026-11-20. Type, the wordmark and the mark are done; colour and the graphic language (step 8) follow.
> **What this is:** the small, strict core of the identity, in rules an agent can follow and a check can test. Values live in `src/tokens/tokens.json`; this page says how to use them.

---

## Type

**One face: Figtree.** No serif, no second display face, no condensed or wide cuts. Range comes from size, weight, tracking and leading (decided 2026-11-20; study on the Paper page "Brand · Type study").

### One setting per size

Every heading is **Figtree 600**. Each text size carries its own leading and tracking, and both tighten as size grows, so big text holds together as a block while small text stays open (the method Nubank and Wise use). Use the size's own `--leading-*` and `--tracking-*` with its `--text-*`; never mix steps.

| Token | Max size | Leading | Tracking | Used for |
|---|---|---|---|---|
| `6xl` | 88 px | 0.94 | −0.05em | Largest site display |
| `5xl` | 76 px | 0.96 | −0.045em | `h1` |
| `hero` | 60 px | 0.98 | −0.045em | Hero headlines |
| `4xl` | 56 px | 1.0 | −0.04em | `h2`, section titles |
| `3xl` | 40 px | 1.06 | −0.03em | Section titles, big figures |
| `2xl` | 28 px | 1.16 | −0.02em | Card titles |
| `xl` | 22 px | 1.36 | −0.01em | Leads, `h3` |
| `lg` | 19 px | 1.53 | 0 | Large body |
| `base` | 17 px | 1.53 | 0 | Body |
| `sm` | 15 px | 1.47 | 0 | Small body |
| `xs` | 13 px | 1.38 | +0.01em | Captions, labels |

Campaign sizes beyond the site, for billboards and deck covers: 128 px at 0.9 and −0.055em, 200 px at 0.88 and −0.06em. They become tokens when the first template needs them.

### Weights

- 600 for every heading, at every size. Size sets hierarchy, not weight.
- 400 for reading text.
- 500 for amounts, labels and captions.
- 700 only inside product UI where the app itself would use it.

### Numbers

- Amounts always use tabular figures (`font-variant-numeric: tabular-nums`) so columns line up.
- Geist Mono stays for code-like detail only (IDs, raw values), not for amounts in marketing.

### The headline device: the waterline

The promise, or any two-part headline, is split across dark and light water.

- On a photograph or the seam: the first half sits on the dark water in white; the second on the light water in rio-negro.
- On a flat surface: the first half in `--color-text-base`; the second in `--color-text-highlight`, which each theme resolves to the right tapajós (700 on white and tint, 300 on rio-negro). The Home hero already does this.
- Two parts at most. The split follows the sense of the line ("Paid abroad." / "Sorted at home."), never a break in the middle of a phrase.

---

## Logo

Boards: Paper page "Brand · Core identity". The masters are on the "Design system" page, board "5 · Logo"; in code, `src/components/ui/Logo.astro`. Every logo is a copy of a master, never redrawn or retyped.

### The wordmark

- Lowercase "travessia" in Figtree 600 outlines, kerned by hand. The two s are woven: each passes over the other once (the first at the top crossing, the second at the bottom).
- The whole word is cut by **the waterline**: a 38-unit channel from y −223 to −185 (Figtree's 1000-unit em), just under the e's crossbar.
- Above the waterline: rio-negro (`--color-logo-above`), or white on rio-negro (`--color-logo-above-inverse`). Below: tapajós-500 (`--color-logo-below`).

### Clear space and size

- **Clear space:** one x-height (500 units, the height of the "a") on every side. Nothing enters it, including the edge of a photo crop or a seam band.
- **Minimum width:** 96 px on screen, where the waterline channel is still 1 px wide (`--size-logo-nav`). 25 mm in print. Below that, use the mark.
- Common sizes: 96 px in the nav, 160 px in the footer (`--size-logo-footer`), 400 px on a deck cover.

### Colourways

| Background | Wordmark |
|---|---|
| White, tint | Two-colour: rio-negro above, tapajós below |
| Rio-negro | Two-colour: white above, tapajós below |
| Tapajós | One colour: rio-negro, both halves |
| Urucum (launches only) | One colour: rio-negro, both halves |
| Photograph | Two-colour (white above) on dark water or shadow, in the quietest area of the image; one colour where the area is light and busy |
| The seam texture | On one solid side only, never across the dither |

The waterline channel stays in every colourway, one-colour included.

### Never

- Recolour a half in any other colour (no urucum, no gradients), or swap the halves.
- Move, thicken or remove the waterline, or undo the weave.
- Stretch, outline, add shadows or effects, or rotate.
- Place it across the seam's dither or across a busy part of a photo.
- Set "travessia" in live text as a stand-in for the logo.
- Put the mark next to the wordmark as a lockup.

### The mark

**The woven ss on the seam** (decided by Breno, 2026-11-20). Boards: Paper page "Brand · Core identity", "Logo · the mark, A + C" and "Icon exports".

- The ss is taken out of the wordmark at the same spacing (336 units), with the same weave and waterline. Nothing is redrawn.
- It sits on a square of the seam texture (`hseam.png`), positioned so the dither meets the solid tapajós exactly at the waterline: the top of the ss is white on the dark water and the dither, the bottom is rio-negro on the light water.
- It is used **only in this seam version**, at every size, favicon included. There is no flat or single-colour mark.
- Files in `public/`: `favicon.ico` (16, 32 and 48 px), `favicon-32.png`, `apple-touch-icon.png` (180 px), `icon-192.png` and `icon-512.png` for the web manifest (`src/pages/site.webmanifest.ts`). App icons are square; the operating system rounds the corners. The favicon tile has a 22% corner radius.
- Use it for the favicon, app icon and social avatar, and anywhere under the wordmark's 96 px minimum. Never next to the wordmark: the word already contains it.
- Because the seam is a pixel texture, the mark is always a rendered image, exported from the Paper board, never rebuilt as vector.
