# Rules

> **Status:** playbook step 7 (core identity), 2026-11-20 to 2026-11-21: type, the wordmark, the mark, colour, the interface parts and the hero river are done. The graphic language (step 8) comes next.
> **What this is:** the small, strict core of the identity, in rules an agent can follow and a check can test. Values live in `src/tokens/tokens.json`; this page says how to use them.

---

## Type

**One face: Figtree.** No serif, no second display face, no condensed or wide cuts. Range comes from size, weight, tracking and leading (decided 2026-11-20; study on the Paper page "Brand · Type study").

### One setting per size

Every heading is **Figtree 500** (was 600 until 2026-11-21; lighter weight is what keeps Ramp, Mercury and Stripe calm, measured in `brand/references.md`). Each text size carries its own leading and tracking, and both tighten as size grows, so big text holds together as a block while small text stays open (the method Nubank and Wise use). Use the size's own `--leading-*` and `--tracking-*` with its `--text-*`; never mix steps.

| Token | Max size | Leading | Tracking | Used for |
|---|---|---|---|---|
| `6xl` | 88 px | 0.94 | −0.03em | Largest site display |
| `5xl` | 76 px | 0.96 | −0.028em | `h1` |
| `hero` | 60 px | 0.98 | −0.025em | Hero headlines |
| `4xl` | 56 px | 1.0 | −0.022em | `h2`, section titles |
| `3xl` | 40 px | 1.06 | −0.018em | Section titles, big figures |
| `2xl` | 28 px | 1.16 | −0.012em | Card titles |
| `xl` | 22 px | 1.36 | −0.006em | Leads, `h3` |
| `lg` | 19 px | 1.5 | 0 | Large body |
| `base` | 17 px | 1.5 | 0 | Body |
| `sm` | 15 px | 1.47 | 0 | Small body |
| `xs` | 13 px | 1.38 | +0.01em | Captions, labels |

Campaign sizes beyond the site, for billboards and deck covers: 128 px at 0.9 and −0.055em, 200 px at 0.88 and −0.06em. They become tokens when the first template needs them.

### Weights

- 500 for every heading and every button label, at every size. Size sets hierarchy, not weight.
- 400 for reading text.
- 500 for amounts, labels and captions.
- 700 only inside product UI where the app itself would use it.

### Numbers

- Amounts always use tabular figures (`font-variant-numeric: tabular-nums`) so columns line up.
- Geist Mono stays for code-like detail only (IDs, raw values), not for amounts in marketing.

### The headline device: two tones

The promise, or any two-part headline, is set in two tones (Breno, 2026-11-21: proposal B on the Paper page "Brand · Accent and UI study").

- The first half in `--color-text-base`; the second in `--color-text-second`: a solid, lighter colour, never the text colour at lower opacity. Fog (neblina-300, #A8B6BC) on rio-negro, neblina-500 (#636E75) on white and mist, rio-negro-800 on igarapé.
- `--color-text-second` is for display text only (3:1 is checked, the large-text level). It is not a highlight for amounts; those keep `--color-text-highlight`.
- On a photograph, the old waterline still works: the first half on the dark water in white, the second on the light water in rio-negro.
- Two parts at most. The split follows the sense of the line ("Paid abroad." / "Sorted at home."), never a break in the middle of a phrase.

---

## Logo

Boards: Paper page "Brand · Core identity". The masters are on the "Design system" page, board "5 · Logo"; in code, `src/components/ui/Logo.astro`. Every logo is a copy of a master, never redrawn or retyped.

### The wordmark

- Lowercase "travessia" in Figtree 600 outlines, kerned by hand. The two s are woven: each passes over the other once (the first at the top crossing, the second at the bottom).
- The whole word is cut by **the waterline**: a 38-unit channel from y −223 to −185 (Figtree's 1000-unit em), just under the e's crossbar.
- Above the waterline: rio-negro (`--color-logo-above`), or white on rio-negro (`--color-logo-above-inverse`). Below: igarapé-500 (`--color-logo-below`).

### Clear space and size

- **Clear space:** one x-height (500 units, the height of the "a") on every side. Nothing enters it, including the edge of a photo crop or a painting's foam.
- **Minimum width:** 96 px on screen, where the waterline channel is still 1 px wide (`--size-logo-nav`). 25 mm in print. Below that, use the mark.
- Common sizes: 96 px in the nav, 160 px in the footer (`--size-logo-footer`), 400 px on a deck cover.

### Colourways

| Background | Wordmark |
|---|---|
| White, tint | Two-colour: rio-negro above, igarapé below |
| Rio-negro | Two-colour: white above, igarapé below |
| Igarapé | One colour: rio-negro, both halves |
| Urucum (launches only) | One colour: rio-negro, both halves |
| Photograph | Two-colour (white above) on dark water or shadow, in the quietest area of the image; one colour where the area is light and busy |
| A painting | Two-colour (white above) in the painting's quiet dark area; never across brushstrokes or foam |

The waterline channel stays in every colourway, one-colour included.

### Never

- Recolour a half in any other colour (no urucum, no gradients), or swap the halves.
- Move, thicken or remove the waterline, or undo the weave.
- Stretch, outline, add shadows or effects, or rotate.
- Place it across a painting's brushstrokes or foam, or across a busy part of a photo.
- Set "travessia" in live text as a stand-in for the logo.
- Put the mark next to the wordmark as a lockup.

### The mark

**The woven ss on the seam** (decided by Breno, 2026-11-20). **Under review (2026-11-21):** with the seam retired from every surface, the mark is the last place the dither appears. Options on the Paper board "Logo · the mark without the dither" (Brand · Core identity): painted clear water, painted meeting, a flat split, and painted from 96 px up with the flat split below. Until one is picked, the files below stay as they are. Boards: Paper page "Brand · Core identity", "Logo · the mark, A + C" and "Icon exports".

- The ss is taken out of the wordmark at the same spacing (336 units), with the same weave and waterline. Nothing is redrawn.
- It sits on a square of the seam texture (`hseam.png`), positioned so the dither meets the solid igarapé exactly at the waterline: the top of the ss is white on the dark water and the dither, the bottom is rio-negro on the light water.
- It is used **only in this seam version**, at every size, favicon included. There is no flat or single-colour mark.
- Files in `public/`: `favicon.ico` (16, 32 and 48 px), `favicon-32.png`, `apple-touch-icon.png` (180 px), `icon-192.png` and `icon-512.png` for the web manifest (`src/pages/site.webmanifest.ts`). App icons are square; the operating system rounds the corners. The favicon tile has a 22% corner radius.
- Use it for the favicon, app icon and social avatar, and anywhere under the wordmark's 96 px minimum. Never next to the wordmark: the word already contains it.
- Because the seam is a pixel texture, the mark is always a rendered image, exported from the Paper board, never rebuilt as vector.

---

## Colour

**Rio-negro and igarapé, one accent** (Breno, 2026-11-21). Igarapé (#00C99B) replaced tapajós (#13A7B5) as the light water, picked from five palettes on the Paper page "Brand · Colour options". The same day, after measuring how Ramp, Mercury, Stripe, Wise and Nubank use their accents (`brand/references.md`, "Accent use and UI craft"), urucum left the core: one vivid accent that means "act here" is what keeps those brands calm, and two accents competed.

### What each colour means

| Colour | Primitive | Means | Where |
|---|---|---|---|
| Dark water | `rio-negro` (900 #0F1C24) | The far side: dollars, the client abroad. Also the default button | Dark sections, the hero, text, most buttons |
| Light water | `igarape` (500 #00C99B) | Home, reais arriving, and **act here** | The one main button per view, the river, progress and data marks |
| Mist | `neblina` (50 #F4F6F6 to 700) | Panels, lines and quiet text | The tint theme, secondary text, the second half of headlines |
| White | `white` | The page | Most surfaces |
| Urucum | `urucum` (600 #FF4A1C) | Campaigns only | Launch posters and loud-mode surfaces, never on the site's core UI |

- Igarapé is named after the small, clear forest streams of the Amazon. The river and the paintings are **two waters meeting** in general, not a real confluence.
- **One igarapé button per view.** Every other button is rio-negro or the tinted secondary. Inside an igarapé section (the `primary` theme) the main button turns rio-negro, so it never disappears into its background. Buttons read `--color-action-*` from their section's theme; nothing else should use the accent directly.
- Error text uses `--color-error` (urucum-700, #C93A14: 5.1:1 on white, 4.8:1 on mist). It is a functional colour, not the accent.

### Contrast rules

| Pair | Ratio | Rule |
|---|---|---|
| Rio-negro on igarapé-500 | 8.1:1 | Text on the igarapé button and on light water is rio-negro, never white (2.1:1). |
| Rio-negro on igarapé-400 | 9.2:1 | The button's hover. |
| White on rio-negro | 17.3:1 | The main button inside an igarapé section. |
| Igarapé-700 on white | 6.5:1 | The only igarapé step for text on white and mist: links, amounts. |
| Fog on rio-negro | 8.3:1 | The second half of a headline on dark. |
| Neblina-500 on white | 5.2:1 | The second half of a headline on light. |

`npm run tokens` checks every theme (text, links, chips, button text on its background and hover, the headline second line at 3:1), the error colour and the data-strong pair, and fails on anything below the level.

### Proportions

Igarapé shows in small parts: the main button, the river or a painting, progress bars, status dots, amounts arriving. Measured on 2026-11-20 before this change, light water was about 10% of a page; the target is now under 5% outside the hero.

- No full-width igarapé sections except one closing band per page at most.
- Panels are mist (`neblina-50`), not mint, so colour only shows where it means something.

### Themes

Sections switch colour with `data-theme`: `light` (white, the default), `tint` (mist, neblina-50), `primary` (igarapé-500), `dark` (rio-negro-900) and `deep` (igarapé-700). Components use semantic tokens only (`--color-text-base`, `--color-action-bg`…), never a primitive.

### Not in the palette

- **Açaí** (deep purple) is dropped: it reads as Nubank to Brazilian readers.
- **Solimões** (sand) is not added: the meeting stays dark and clear, and sand is a major Nubank surface.
- Other held names (`buriti`, `cupuacu`, `castanha`, `jenipapo`, `cacau`, `mate`, `jambu`) stay unused until a campaign needs a colour, like urucum now. A new one is added as a primitive with a `$description` and never becomes a second accent on the site.
- No gradients between the waters. The meeting is always the river or the painted meeting (D).

### Assets that carry the palette

Changing a palette value means regenerating these:
- The paintings in `src/assets/imagery/` (regenerate from the prompts in its README).
- The blog covers: `docs/design/texture-lab/gen6.mjs`, copied to `src/assets/textures/covers/`.
- The customer story textures in `src/assets/textures/stories/`, which have no generator (recoloured by a two-colour remap).
- The mark and the favicon files, exported from the Paper board "Icon exports".
- The Paper file's colour tokens (`--color-igarape-*`, `--color-urucum-*`), which the logo masters use.

---

## Interface parts

Measured against the reference brands on 2026-11-21 (`brand/references.md`); boards on the Paper page "Brand · Accent and UI study".

### Buttons

- Labels at weight 500. Corner radius 8 px (`--radius-control`).
- Two sizes: the default and `size="s"`.
- Variants: `accent` (the theme's action colour: igarapé, or rio-negro inside an igarapé section), `secondary` (a faint tint of the text colour, 6% on light and 10% white on dark, no outline), `nav` and `link`.
- No shadows on buttons. Later: an experiment with button styling inspired by Cloudflare and Nucleo Icons (playbook, open decisions).

### Edges: rings and soft shadows, no borders

- Cards, chips and panels have no borders. Their edge is a faint one-pixel ring inside a very soft shadow: `--shadow-1` at rest, `--shadow-2` on hover or for raised UI, `--shadow-3` for overlays. The ring colour comes from the theme (`--color-ring`: 8% rio-negro on light, 10% white on dark), so it sits inside the shadow rather than on top of it.
- Product art floating over the river or a painting uses `--shadow-3-on-dark` or `--shadow-3-on-color`.
- Form fields keep a real border, because their edge has to be visible at a glance and change on focus.
- Hairlines inside cards (rows in a list, the line above a total) stay.

### Radii

Three, plus the small one for tags: 8 px controls (`radius-s`, `radius-control`), 12 px cards (`radius-m`), 20 px large panels (`radius-l`), 6 px tags (`radius-xs`).

---

## The hero river

**The home hero is a river** (Breno, 2026-11-21, "for now"), replacing the half-and-half seam so the igarapé button is no longer next to a wall of igarapé. It came from six rounds in the shader lab (`docs/design/shader-lab/`, tile 8i in `river5.html`; the shader is saved as `hero-river-8i.frag`).

- One igarapé river winds down the right of the hero, behind the product UI. Inside it: water from deep to shallow, white streaks drifting downstream, a lit crest at the banks. Around it: rio-negro land with a faint glow and clean one-pixel echo lines that follow the bank outwards. The width slowly swells and narrows.
- Built as a WebGL2 shader: engine in `src/lib/generators/river`, runner in `src/lib/motion/river.ts`, component `RiverCanvas`. Colours come from `--color-river-*` tokens.
- 30 frames a second, only while on screen and the tab is visible. With reduced motion it draws one still frame. Without WebGL2 or JavaScript the hero stays plain rio-negro.
- The live shader runs from 1024 px. Below that, the home hero tells the story top to bottom on rio-negro with a band of the river still (`river-portrait.png`) under the crossing card.
- The copy and the form sit on clean dark water on the left; never put text over the river.


---

## Graphic language: imagery

> **Status:** playbook step 8, in progress (started 2026-11-21). Boards: Paper page "Brand · Graphic language". Still to come in step 8: product UI crops and grid, the chart rule and icons.

### Five kinds of imagery, each with a job

| Imagery | What it says | Use it for | Never |
|---|---|---|---|
| **The river** (shader, or its still from `src/assets/generated/river/`) | The crossing, live | The site's home hero and anything that moves | Behind body text |
| **Painted clear water** (C) | Home: things sorted, reais arrived | Most product shots: feature cards, social posts, app and launch pages about balances, Pix and tax invoices | As a full-page background behind long copy |
| **Painted meeting** (D) | The crossing itself, dollars becoming reais | Moments about conversion: the conversion feature, launches, campaign covers. At most one per page or campaign set, so it stays special | As a pattern or a repeated card background |
| **Photography** (step 6 direction) | A real place and real proof | Outdoor and campaigns, customer stories, editorial and blog covers, the About page, the yearly data report | With product UI on top |
| **Mist** (plain `neblina-50`) | Nothing; a neutral stage | Dense product explanations, docs, anything where the UI must be read in detail | Hero or campaign moments |

Paintings are oil-paint water seen from above: loose, visible brushstrokes and canvas texture, rio-negro to igarapé, white only as light and foam, no land, boats, people or text. Every new painting is made for its layout (see "Quiet zone" below). Generate them with Magnific first, then Paper; record the prompt next to the file.

### Product UI over imagery

- Only over the paintings or the river, never over photographs.
- One app window per frame, cropped by the frame edge on at least one side, so it reads as a glimpse of the product, not a screenshot.
- Up to three floating cards (notifications) may overlap the window's edge. They are the moments: Pix received, tax invoice issued, converting.
- UI over imagery uses `--shadow-3-on-dark`. The window's one igarapé button is the frame's one accent.

### Type and logo on imagery: which approach, when

All four are part of the system; the format decides.

| Approach | Use it when | How |
|---|---|---|
| **Quiet zone** | The copy sits on the image and the image is made for it: social posts, billboards, deck covers, story cards | The painting or photo is generated or chosen with a calm, dark area of at least a third of the frame. Headline, logo and at most two lines of body sit there. No overlay |
| **Copy outside the image** | There is a page around the image: site sections, landing pages, emails, the app store | Headline, logo and button on the page (light theme). The image is a framed panel, inset, radius `--radius-l`, with the product inside. The busiest painting works here |
| **Soft scrim** | Fallback: the image has no quiet zone, or a photograph needs a headline | A rio-negro gradient from 85% to 0, from the copy's side, over no more than half the frame. Never an all-over tint |
| **Frosted plate** | Not on paintings: it fights their brushwork. Only over the live river or a photograph, for a small label or caption | `rgb(15 28 36 / 0.55)`, 18 px blur, radius 16 px, a 1 px ring at 8% white. Never behind a headline |

On imagery:

- Headlines use the two-tone with Fog (`--color-text-second` on dark) for the second half; body text is #B6C4C9 and no more than two lines.
- The logo goes on the darkest, calmest area, at its clear space, in the dark-ground version; never across brushstrokes, foam or the river.
- One headline per frame.

### The seam is retired

Decided by Breno, 2026-11-21 (Paper: "5 · Seam review" on Brand · Graphic language). The dithered seam was on 13 surfaces, most of them half a frame of solid igarapé, and it was a third style next to the paintings and the river. Each surface moved to the imagery its job calls for:

| Surface | Now |
|---|---|
| Interior heroes (product, pricing, for clients, features, integrations, stories, events) | Light page, copy outside the image, a framed panel of painted clear water (C) with the product UI on it |
| Home final CTA, interior closing CTA, for-clients CTA | Painted meeting (D), full bleed; copy and form in its quiet zone. Below 1024 px the portrait painting starts under the form |
| Home hero below 1024 px | Rio-negro top to bottom, a band of the river still under the crossing card; only the amount arriving is igarapé |
| Product bento tiles | One painted clear water, cropped differently per tile, as a panel at the tile's foot; the UI sits whole on it |
| Calculator | A framed panel of painted meeting (D) behind the result card; the result on rio-negro with only the amount in the accent |
| Open account | The form card over painted clear water (C) |
| About hero | The aerial photograph of two waters |
| 404 | The river still, faded in from the copy's side |
| Exchange blog cover | Painted meeting (D) |
| Home section strip, header "seam" variant | Removed; the header variants are now light, dark and overlay |

- Don't bring the dither back as a background, band, strip or texture. The meeting of two waters is the river (in motion) or the painted meeting (in stills).
- The painting component is `src/components/ui/Painting.astro`; the files and their prompts are in `src/assets/imagery/`. A painting crop always sits inside a frame (radius `--radius-l`, or `--radius-m` inside a card) or bleeds off the section edge; never as a small floating rectangle.
- At most one painted meeting (D) per page.
- Still to move: the customer story covers (`src/assets/textures/stories/`) and the other four blog-cover patterns use halftone and dither. They get their own pass; photography is the imagery for stories and editorial.
- The seam engine, `SeamCanvas` and the seam PNGs were deleted from the site. Their scripts stay in `docs/design/texture-lab/` as history.
