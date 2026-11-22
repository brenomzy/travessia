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

**The woven ss on painted water** (Breno, 2026-11-21, option A1). It replaced the woven ss on the dithered seam (2026-11-20) when the seam was retired. Boards: Paper page "Brand · Core identity", "Logo · the mark without the dither" (the options) and "Icon exports" (the files; the seam version is kept beside it as "Icon exports (seam, retired 2026-11-21)").

- The ss is taken out of the wordmark at the same spacing (336 units), with the same weave and waterline. Nothing is redrawn.
- **From 96 px up** (app icon, apple-touch icon, manifest icons, social avatar): it sits on painted clear water, portrait (`src/assets/imagery/clear-water-portrait.png`), cropped so the dark water is above the waterline and the igarapé below. A rio-negro tint fades down from the top (60% at the top, gone by 72% of the height) so the white top of the ss holds; there is no hard edge to the tint.
- **At 48 px and below** (favicons): a flat split, rio-negro above and igarapé below, cut straight at the waterline (54.6% of the height). Brushwork can't show at these sizes, and the flat split stays sharp at 16 px.
- The top half of the ss is white, the bottom rio-negro, at every size. There is no single-colour mark.
- Files in `public/`: `favicon.ico` (16, 32 and 48 px), `favicon-32.png`, `apple-touch-icon.png` (180 px), `icon-192.png` and `icon-512.png` for the web manifest (`src/pages/site.webmanifest.ts`). App icons are square; the operating system rounds the corners. The favicon tile has a 22% corner radius.
- Use it for the favicon, app icon and social avatar, and anywhere under the wordmark's 96 px minimum. Never next to the wordmark: the word already contains it.
- The mark is always a rendered image, exported from the Paper board "Icon exports", never rebuilt as vector. `favicon.ico` packs the 16, 32 and 48 px exports as PNG entries.

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
| Ciliar | `ciliar` (500 #D2F08C; 300 #DCEFA0, 800 #3E5A2A) | Campaigns only | The riverbank to igarapé's water: campaign grounds, campaign buttons, the second line of a campaign headline on rio-negro. Never on the site's core UI |

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
- **Ciliar** (Breno, 2026-11-21; Paper: Brand · Graphic language → "9 · Lime study"). Named after the *mata ciliar*, the forest that lines a river. It is kept yellower and softer than Wise's green (ΔE 7.4 from #9FE870; the lime that prompted it was only 5.1 away, too close). Rules: rio-negro text on it (13.7:1), and ciliar-800 for a headline's second line on it (6.1:1); on rio-negro it can be the second line of a campaign headline (13.7:1). A campaign button in ciliar uses the "Ring, lit" style and only appears where there is no igarapé button. Never on a full dark-green ground, which is Wise's look, and never as a chart or status colour.
- Other held names (`buriti`, `cupuacu`, `castanha`, `jenipapo`, `cacau`, `mate`, `jambu`) stay unused until a campaign needs a colour, like urucum now. A new one is added as a primitive with a `$description` and never becomes a second accent on the site.
- No gradients between the waters. The meeting is always the river or the painted meeting (D).

### Assets that carry the palette

Changing a palette value means regenerating these:
- The paintings in `src/assets/imagery/` (regenerate from the prompts in its README).
- The photographs in `src/assets/imagery/` only if the change moves rio-negro or igarapé far enough that the photos stop matching: regenerate from the recipe in `brand/imagery.md`.
- The mark and the favicon files, exported from the Paper board "Icon exports".
- The Paper file's colour tokens (`--color-igarape-*`, `--color-urucum-*`), which the logo masters use.

---

## Interface parts

Measured against the reference brands on 2026-11-21 (`brand/references.md`); boards on the Paper page "Brand · Accent and UI study".

### Buttons

**Ring, lit** (Breno, 2026-11-21; Paper: Brand · Graphic language → "8 · Buttons", row 3). It took Nucleo's light from above and kept our edge rule.

- Labels at weight 500. Corner radius 10 px (`--radius-control`, shared with inputs and chips).
- Light from above: a white gradient fading down the top 60% of the fill (`--color-button-light`, 22%; `--color-button-light-soft`, 12%, on dark solid fills). Never on secondary or link buttons.
- Edges: a 1 px highlight on the top edge, a faint ring, a very soft shadow. The section theme picks the set through `--shadow-action-accent`, `--shadow-action-secondary` and `--shadow-action-solid` (tokens `shadow.button.*`), so a button never needs a variant for its background.
- Variants: `accent` (the theme's action colour: igarapé, or rio-negro inside an igarapé section), `secondary` (white with the ring and shadow on light grounds; 10% white with an inner ring on dark), `nav` (the solid text-colour button, lit) and `link` (no fill, no shadow).
- Two sizes: the default and `size="s"`. An arrow (`arrow`) only on a button that takes you somewhere next, one per view.
- **Optical alignment.** The label is trimmed to cap height (`text-box: trim-both cap alphabetic`) so it sits in the true middle of the button; the padding adds back half the leading, so heights don't change. A trailing icon gives back its own empty margin (a sixth of its size, the blank border of the 24 px grid) from the gap and from the padding on its side, so the arrow's stroke sits as far from the edge as the first letter does. The icon overhangs the label's box, so a button with an icon is the same height as one without.
- Forms that draw their own submit button (waitlist, sign-up, the mobile menu) use the same light and `--shadow-action-accent`.

### Icons

**Hugeicons, the free "stroke rounded" set** (Breno, 2026-11-21; Paper: "7 · Icons"). MIT, from `@hugeicons/core-free-icons`; picked over Lucide, Phosphor, Tabler and Iconoir for its generous curves and soft corners, which sit well with Figtree.

- One map, `src/lib/icons`, names the icons the site uses (`home`, `invoice`, `convert`, `tax-invoice`, `report`, `clients`, `balance`, `bank`, …). Astro uses `ui/Icon.astro`, islands `islands/Icon.tsx`; nothing imports the package directly. Add a name to the map before using a new icon.
- 24 px grid, stroke 1.5, round caps and joins, `currentColor`. Never filled, never two-tone, never a second set alongside.
- Sizes: `--size-icon-s` (16 px) beside text at `--text-sm` and below and in buttons; `--size-icon-m` (22 px) for navigation and standalone controls. Larger only in illustration, never as decoration beside a headline.
- An icon takes the colour of its text. Igarapé only when the icon is itself the status (the `check-circle` done mark).
- Decorative icons are hidden from screen readers; an icon that is the only content of a control gets a `label`.

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
| Other blog covers, blog category heroes, customer story covers | Photographs (step 9): see `brand/imagery.md`, "Where the photos are used" |
| Home section strip, header "seam" variant | Removed; the header variants are now light, dark and overlay |

- Don't bring the dither back as a background, band, strip or texture. The meeting of two waters is the river (in motion) or the painted meeting (in stills).
- The painting component is `src/components/ui/Painting.astro`; the files and their prompts are in `src/assets/imagery/`. A painting crop always sits inside a frame (radius `--radius-l`, or `--radius-m` inside a card) or bleeds off the section edge; never as a small floating rectangle.
- At most one painted meeting (D) per page.
- The mark moved off the seam on the same day ("The mark" above).
- The halftone and dither story and blog covers moved to photographs on 2026-11-21 (step 9), and `src/assets/textures/` was deleted. Nothing on the site uses halftone or dither any more.
- The seam engine, `SeamCanvas` and the seam PNGs were deleted from the site. Their scripts stay in `docs/design/texture-lab/` as history.

---

## Graphic language: product UI

> Playbook step 8 (2026-11-21). Reference boards: Paper page "Brand · Graphic language", "1c · App window v3 (master)" for the parts and "4 · App v3 on paintings" for the crops. On the site the parts are live HTML in `src/components/product/` and the `FeatureTabs` island.

Travessia has no card to photograph; the product is its object, the way Ramp's card is Ramp's. Every screen shows the same account (Ana Ribeiro) on the same days, so the product reads as one real thing across the site, social and decks.

### What goes on a screen

- **Names, amounts and dates come from the product ledger** in `brand/proof.md`. New screens reuse it; a new invoice, client or date goes into the ledger first. No real company names, no lorem ipsum, no "John Doe".
- Amounts add up: amount × the example rate (`src/content/rates.json`) − the 0.6% fee where a conversion is shown. "≈ R$" notes on balances are what would arrive today, fee included. Tax invoices show the invoice at the rate, before the fee.
- Dates sit on the real 2026 calendar. Payments by transfer and Pix arrivals fall on business days; a Pix lands 1 business day after the conversion.
- Money is written `US$ 2,000.00`, `€ 1,380.00`, `£ 640.00`, `R$ 10,834.60`: symbol, a space, two decimals, tabular figures. Currency codes (`USD`, `EUR`, `GBP`, `BRL`) appear only in tags and pickers.
- The UI copy is English, sentence case, in the voice of `brand/voice.md`: "Pix received", "Tax invoice no. 318 issued", never "Transaction successful".

### The parts

| Part | What it is | Use it for |
|---|---|---|
| App window | Browser bar with the address, mist sidebar (brand, nav with line icons, balances, the user), the main area with a title, actions, up to three stat cards and one list card | The product as a whole: hero images, the home showcase, launch pages |
| Sheet | One task in a modal card: convert, send an invoice | One feature, in focus |
| Floats | Notification cards: Pix received, tax invoice issued, converting | The moments; they ride on top of a window or alone on a painting |
| Single cards | Invoice, conversion, crossing, phone (`src/components/product/`) | Heroes and tiles where one fact is the story |

### Cropping

- **One app window per frame**, cropped by the frame edge on at least one side (usually the right or the bottom), so it reads as a glimpse of a real app, not a screenshot pasted in. Show the sidebar and the first row of stats; at least 60% of the window's width stays in frame.
- **Never shrink a whole window to fit** with margin all round. If the window would render below 60% of its size, use a sheet or a single card instead.
- **Cards and sheets stay whole.** The exception is a tall card (an invoice page, a tax invoice) cut by the foot of its frame or tile; it is cut, never faded or dissolved.
- **Floats:** up to three, stacked with `--space-s` between them, overlapping the window's edge by about a third of their width. They never cover the window's primary button, the highlighted number or a headline.
- On imagery, all UI uses `--shadow-3-on-dark`; on white or mist it uses `--shadow-3`. Edges are the ring inside the shadow, never a border.

### Density

- **One idea per screen, and one accent:** the primary button, or the highlighted number, or a progress bar, never two. Status dots use `--color-accent-data`; urucum-700 only for an error.
- Up to three stat cards in a row and four rows in a list. A second list or a chart means a second screen.
- Skeleton lines may suggest that a page goes on (three at most, under the real content); they never stand in for a value the screen is about.
- Smallest UI text: 11 px rendered in images, `--text-xs` on the site. Labels and values at weight 500, metadata at 400.
- Tags and chips trim their label to cap height (`text-box: trim-both cap alphabetic`) and take their height from `--size-tag` (20 px) or `--size-tag-s` (16 px), so the text sits optically centred.

### The grid: bento tiles

The product overview is a bento on rio-negro (`FeatureBento`), Travessia's version of Ramp's grid.

- One tile per feature: title, a two-line summary, a link; the whole tile is the link.
- One column on phones; two from 720 px, where the first and last tiles span both; three from 1408 px.
- At the foot of each tile, a panel of painted clear water (radius `--radius-m` on top, cut by the tile's foot) with one part on it: a card or a cut-off invoice page. One painting, cropped differently per tile.
- Tiles are `--color-bg-raised` with `--radius-l` and `--shadow-1`. No glow, no texture, no second accent colour.

---

## Graphic language: charts

> Playbook step 8 (2026-11-21). Board: Paper page "Brand · Graphic language", "6 · Charts". On the site: `StatBand` (the comparison bars), the report columns in `FeatureBento` and `FeatureVignette`, the meter in `ProblemFix`.

Travessia's charts do two jobs: compare Travessia with the bank, or show one account over time. Every number in them comes from `brand/proof.md` (claims, the bank example, the product ledger).

### Colour follows the entity

- **Travessia is igarapé.** In the comparison, the bank is neutral: neblina-100 on light grounds, rio-negro-600 on dark. Never a second hue.
- **One account over time is all Travessia**, so its chart is igarapé tints: past months igarapé-200 (igarapé-800 on dark or over a painting), the month the story is about igarapé-700 (igarapé-500 on dark).
- Text never wears the data colour. Values, labels and the big difference use the text colours; the igarapé mark beside them carries the identity.
- Checked with the data-viz palette validator (2026-11-21): igarapé-500 against neblina-100 on white separates under colour blindness (ΔE 14.7 protan, 23.1 normal), and so does igarapé-500 against rio-negro-600 on rio-negro (ΔE 39.5). Neblina-300 against igarapé-500 does not (ΔE 4.1): don't use it for the bank. Both bar colours are under 3:1 against the ground, which is why every bar carries its value as text.

### The four forms

| Form | Use it for | Marks |
|---|---|---|
| **Comparison bars** | Travessia against a wire received at a Brazilian bank: fee, time, tax invoice, what arrives | Two horizontal bars per row on one scale from zero. 12 px thick, square at the start, `--radius-xs` at the end. The bank's bar is solid up to its best case and hatched (135°) to its worst; hatched all along when it has no fixed size. A value too small to see keeps a 12 px stub. Value at the tip; the difference set large at the end of the row, in the text colour, weight 500 |
| **Monthly columns** | One account's revenue, conversions or tax invoices over up to twelve months | Columns no wider than `--size-bar-max` (24 px), square on the baseline, `--radius-xs` on top, never faded. One label: the highlighted month's value. First and last month on the axis; no gridlines, no y-axis |
| **Meter** | One value against a limit (the MEI yearly cap) | 8 px, round at both ends. Fill igarapé-500 on an igarapé-100 track. Percentage first, then the amounts. From 80% a note with an icon; the colour doesn't change, because colour alone never carries a warning |
| **Number with trend** | When one number is the point | The number at weight 500, proportional figures. A 2 px line with no axes: past in igarapé-200, the last step and an 8 px end dot (2 px ring in the surface colour) in igarapé-700. The change as signed text against a named period |

### Never

- Cut the axis or use a log scale to make a gap look bigger. When the gap is small (what arrives: R$ 10,834.60 against R$ 10,228.56), the bars stay honest and the big number tells it.
- Name a bank or a competitor. The comparison is always with "a Brazilian bank".
- Show the bank's best case alone, or Travessia's worst. "At worst" claims compare worst with worst.
- Use pie or donut charts, 3D, gradients inside marks, a second y-axis, or more than two series in one chart.
- Animate a chart beyond growing its marks in once, from the baseline, when it scrolls into view (none with reduced motion).
