# Photography

> Playbook step 9, approved by Breno on 2026-11-21. Boards: Paper page "Brand · Photography" (references, three batches, the white and rio-negro check). Where photography sits among the brand's imagery (river, paintings, photography, mist) is in `brand/rules.md`, "Graphic language: imagery".

Photography is Travessia's proof that the crossing is real: a river, a boat, a bridge. The paintings say how it feels; the photos say where it happens: the rivers the crossing is named after. Uses: customer stories, editorial and blog covers, the About page, campaigns and outdoor, the yearly data report. Never with product UI on top.

## The direction

**One register: the river and its crossings** (Breno, 2026-11-21, after the first reference board: the object and people references felt like stock photography; the crossings, boats, rivers and trees did not). Brazilian rivers and what crosses them: aerials of water meeting water, wooden boats and ferries, bridges seen from below, docks running into still water, and the forest that lines the banks (*mata ciliar*) and stands in flooded water (*igapó*). People only far away, at the scale of the landscape. No still lifes of objects, no desks, no hands.

**Light.** Overcast, soft and even, or window light on a grey day. No golden hour, no hard sun, no flash, no HDR.

**Colour.** Natural and slightly muted. Shadows lean toward rio-negro (blue-black, never brown); greens and water lean toward igarapé. Whites stay neutral. Water is always clean and clear: dark and transparent, or green-teal; never brown, muddy or littered.

**Framing.** One subject. At least a third of the frame calm and dark enough for a headline (the quiet zone). Aerials straight down or oblique; from the bank at eye level; bridges from below. Shot for 4:5 and 16:9 crops.

**Texture.** Fine film grain, real depth of field, nothing glossy.

**Never.**
- Faces presented as customers. People appear as hands, backs, silhouettes or far away.
- Banknotes, coins, cards, bank or card logos, and anything that reads as a currency symbol.
- Readable screens: a laptop shows its back, its keyboard or a blank glow.
- Stereotypes of Brazil (beach, caipirinha, carnival, favela) or of "global work" (airport lounges, passports, world maps).
- Brown or dirty water, sunsets, tropical turquoise, stock smiles.

## The prompt recipe

One recipe for every photo, with a subject slot and a quiet-zone slot. It goes to Magnific (Nano Banana 2.1), with the cost of each batch stated first.

> [SUBJECT]. A Brazilian tropical setting: rainforest vegetation and palms along the banks; no pines, conifers or maple leaves. Documentary photograph, overcast soft daylight, natural slightly muted colour, deep blue-black shadows, any water clean and clear dark green-teal, fine film grain, real depth of field. Calm, uncluttered composition with one subject and a quiet dark area across the [SIDE] of the frame, at least a third of the image. Keep the sky low in the frame or out of it: no bright white sky. When there is more than one boat, each is different in size, shape and colour, never copies. No people except tiny distant figures, no text, no logos, no money, no brown or muddy water.

## Approved so far

Batch 1 (2026-11-21, picked by Breno): 10 of 20, one take per subject. Files in `docs/design/photography/batch-1/`; board "2 · Batch 1".

| Pick | What it is | Best use |
|---|---|---|
| 1b | Two waters meeting from above, one boat on the line, forest on both edges | The About hero (replacing the muddy aerial); the mark's story told as a photo |
| 9a | One boat's wake drawing a pale line across dark water, from above | Covers and posters: a large quiet area for a headline |
| 2a | A canoe on dark water with clouds reflected in it | Stories, social |
| 4b | An iron bridge from below in fog | Campaigns about the crossing |
| 6b | Flooded forest standing in clear dark water | Editorial, the data report |
| 7a | A river lined with forest, from the air | Ciliar campaigns |
| 10b | Two boats passing in morning mist | Stories |
| 8b | A wooden dock into mist | Editorial; the closest to a postcard cliché, use sparingly |
| 5b | Bridges over the Capibaribe, Recife | Recife stories (Ana) |
| 3b | A ferry crossing, from the far bank | Stories |

Batch 2 (2026-11-21, picked by Breno): 11a and 11b (two waters, wide; **11b is the About hero**), 12a and 12b (a footbridge over a forest creek from above), 14a and 14b (a suspension footbridge from below). Out: 13 (a maple leaf, not Brazilian) and 15 (copied boats). Files in `docs/design/photography/batch-2/`; board "3 · Batch 2".

Batch 3 (2026-11-21, a test of the tightened recipe, picked by Breno): 16a and 16b (two different boats at a forest landing, from the water), 17a (an igarapé under the canopy), 18a and 18b (a balsa crossing toward a forest landing, from the air; the open water is on the left, so mirror it for a right-hand quiet area). Out: 17b (leaves floating on the water read as litter). Five of six in, so the recipe stands. Files in `docs/design/photography/batch-3/`; board "4 · Batch 3".

What batch 1 taught the recipe: the strongest frames are aerials straight down and scenes at water level with no sky. Overcast skies came out nearly white in 3, 4, 5, 8 and 10, brightening the area meant for headlines, so the recipe now keeps the sky low or out and asks for the quiet area to be at least a third of the frame. Batch 2 fixed the skies but drifted north when no place was named (a maple leaf, conifers) and repeated identical boats, so the recipe now names a Brazilian tropical setting and asks for boats that differ. Batch 3 held both: all six takes are rainforest and palms, and every boat differs from its neighbours. Two things the recipe still doesn't control: the quiet side (18 put open water on the left when asked for the right) and a quiet top at eye level, where the canopy fills the frame (17).

## On white and on rio-negro

Checked 2026-11-21 on Paper board "5 · Picks on white and rio-negro": all 21 picks at one size on both grounds. The set holds as one register (dark water, green, grey light). Without an edge, the darkest frames (09a, 11a, 11b, 01b, 12a) dissolve into rio-negro and the misty ones (10b, 05b, 03b, 04b) lose their top edge into white.

**Rule: every photo carries the theme ring inside its edge** (`--color-ring`: 8% rio-negro on light, 10% white on dark), the same ring cards use. In code it is an outline drawn over the image (`outline: var(--size-hairline) solid var(--color-ring); outline-offset: calc(var(--size-hairline) * -1)`), or the card's `--shadow-1` when the photo sits at the top of a card. Never a border that grows the image.

## Where the photos are used

Files in `src/assets/imagery/` (sources and prompts in its README). Blog covers are mapped in `src/assets/imagery/blog-covers.ts`; story covers are set in each story's front matter.

| Where | Photo | Pick |
|---|---|---|
| About hero | `photo-two-waters.jpg` | 11b |
| Blog, Taxes (the featured cover) | `photo-dock.jpg` | 8b |
| Blog, Invoices | `photo-river-forest.jpg` | 7a |
| Blog, Guides | `photo-canoe.jpg` | 2a |
| Blog, News | `photo-ferry.jpg` | 3b |
| Blog, Exchange | the painted meeting (D), not a photo | |
| Story, Moita Filmes (spotlight) | `photo-igapo.jpg` | 6b |
| Story, Ana Ribeiro (Recife) | `photo-recife-bridges.jpg` | 5b |
| Story, Lucas Prado (Porto Alegre) | `photo-suspension-bridge.jpg` | 14b |
| Story, Renata Okabe | `photo-footbridge.jpg` | 12a |
| Story, Estúdio Caju | `photo-landing.jpg` | 16a |
| Story, Diego Ramos | `photo-wake.jpg` | 9a |
| Story, Paula Nery | `photo-igarape.jpg` | 17a |

- Blog cover titles sit on the photo's left with the soft scrim (`--color-scrim-image`, rio-negro 85% to 0 over half the frame), white text. The iron bridge (4b) was tried for Invoices and dropped: its bright fog sat behind the title.
- Blog category heroes use "copy outside the image": the category's photo as a framed panel beside the copy, from 1024 px.
- Unused picks, kept for campaigns and future stories: 1b, 4b, 10b, 11a, 12b, 14a, 16b, 18a, 18b.

## The first shot list

Ten subjects, two takes each (20 images, 1,000 credits):

| # | Subject |
|---|---|
| 1 | Aerial straight down: a dark river meeting a clear green-teal one, one small wooden boat crossing the line between them (to replace the About photo's muddy version) |
| 2 | Aerial: a small wooden canoe on dark, clear, still water, the forest edge along one side |
| 3 | A river ferry crossing a wide calm river, seen small from the far bank, overcast |
| 4 | An old iron bridge seen from below, its underside and reflection in calm clear water, light fog |
| 5 | Low bridges over the Capibaribe in Recife, calm dark water, overcast |
| 6 | A flooded forest (igapó): trees standing in dark, clear, mirror-still water |
| 7 | Oblique aerial of a winding river lined with dense forest on both banks (mata ciliar) |
| 8 | A long wooden dock running into still dark water, mist, the far bank faint |
| 9 | Aerial straight down: a single boat's wake drawing a pale line across still dark water |
| 10 | Two small boats passing each other far apart on a wide river in morning mist |

Then: pick the strongest, adjust the recipe, run a second batch until most of a batch are yeses. Check every pick on white and on rio-negro. (Done: batch 3 gave five of six; the check is above.)

---

# Illustration and 3D

> Playbook step 10, decided by Breno on 2026-11-24. Board: Paper page "Brand · Illustration and 3D" → "1 · Three options, three jobs". Test files and prompts: `docs/design/illustration/`.

**No illustration style and no 3D style.** The brand already has four kinds of imagery (the river, painted clear water, the painted meeting, photography) plus mist; a fifth style would be one more thing to keep consistent, and neither option said more than the product UI does.

The test put each option on the same three jobs: an app empty state, a three-step "how it works", and a 4:5 launch post.

- **3D renders** (an invoice sheet, a phone, an invoice folded into a paper boat; Magnific, 300 credits). The invoice and phone read as stock 3D any fintech could use, and they arrive as dark tiles that fight a white app screen. No.
- **Flat illustration** (SPEC 4.3's invoice cards, route arcs, river segments, checks and clocks, drawn in the palette). Clean and cheap to draw in code, but a drawn invoice with grey lines says less than the real one with a client, an amount and a status. No.
- **Neither.** Yes: what each job uses instead is below.

## What each job uses instead

| Job | Use | How |
|---|---|---|
| Empty states in the app | One Hugeicons icon on a disc | The icon at 28 px in igarapé-700 on an igarapé-50 disc of 56 px, then the title, one line of body and one button |
| Explainers ("how it works", feature steps) | Product UI | One card per step with real numbers from the product ledger (`brand/proof.md`), on mist or on a painting crop |
| Posts, covers, campaigns | Paintings or photographs | The quiet zone rules in `brand/rules.md`; the wordmark on calm water, never across brushstrokes or foam |

## Parked for step 13

**The paper boat.** An invoice folded into a paper boat, crossing from dark water into clear igarapé (`docs/design/illustration/3d/3a-paper-boat.jpg`, `3b-paper-boat.jpg`). It is the one image in the test no other brand could use. It goes to the launch campaign (playbook step 13) as a candidate idea, a single campaign image, not a system style: it doesn't come back as a recurring 3D object on the site or in templates.

