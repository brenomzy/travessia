# Imagery

The brand's paintings and photographs (brand/rules.md, "Graphic language: imagery"). They were generated in Paper (Nano Banana) during playbook steps 6 and 8, art-directed there, and exported at 2× from the Paper frames named below. They are design assets, not generator output, so they live here and not in `src/assets/generated/`. Components use the paintings through `src/components/ui/Painting.astro`.

| File | Paper frame | Used in |
|---|---|---|
| `clear-water-wide.png` | Brand · Graphic language → "0b · Art-directed paintings" → "C2 · clear water, quiet left" | Interior heroes, feature bento tiles |
| `clear-water-portrait.png` | same board → "C2 · clear water, portrait" | Open account (behind the form card) |
| `meeting-wide.png` | same board → "D2 · meeting, quiet left" | Home final CTA, interior closing CTA, for-clients CTA, calculator, Exchange blog cover |
| `meeting-portrait.png` | same board → "D2 · meeting, portrait" | Final and closing CTAs below 1024 px |
| `photo-two-waters.jpg` | Brand · Photography → "3 · Batch 2", take 11b (3168 × 1344, Nano Banana 2.1 at 2k via Magnific); replaced the step 6 aerial, whose meeting line had muddy brown water | About hero |

## Prompts

Each painting was made in two passes: a first image, then a "repaint" pass on it to make the quiet area (the wide ones) or generated in portrait with the quiet area asked for directly.

**Clear water (C), first pass:** Loose impressionist oil painting, view from directly above into clear tropical river water. Deep blue-black water in the corners and edges, glowing green-turquoise water in the middle (close to #00C99B), soft white light ripples and a few white foam strokes. Visible thick brushstrokes and canvas texture, calm and luminous, like a background painting behind an app window. No horizon, no sky, no land, no boats, no people, no text.

**Clear water, wide (C2):** Repaint this same oil painting of clear river water from above, same brushwork and palette, but recompose it: the left third and the top-left corner become a calm, dark, almost flat blue-black area with only a few soft low-contrast strokes, quiet enough for white headline text. The glowing green-turquoise water and white ripples gather on the right half and the bottom. Fewer white marks overall. No text, no objects.

**Clear water, portrait (C2):** Loose impressionist oil painting, view from directly above into clear tropical river water, portrait format. The top third is a calm, dark blue-black area with only faint soft strokes, quiet enough for white headline text. Below it the water brightens into glowing green-turquoise (close to #00C99B) with soft white light ripples and a few foam strokes, thick visible brushstrokes and canvas texture. No horizon, no land, no boats, no people, no text.

**Meeting (D), first pass:** Loose expressive oil painting seen from above: two rivers meeting. Dark blue-black water (close to #0F1C24) on the left meets clear glowing green-turquoise water (close to #00C99B) on the right, a soft winding seam of white foam and pale mint strokes where they touch. Thick visible brushstrokes, canvas texture, rich but calm, a background painting behind an app window. No land, no boats, no people, no text.

**Meeting, wide (D2):** Repaint this same oil painting of two waters meeting, same brushwork and palette, but recompose it: the dark blue-black water fills the left 60% and is calm, smooth and low contrast with long gentle strokes, quiet enough for white headline text in the top-left. The meeting line of white foam runs in a soft curve down the right third, with the glowing green-turquoise water beyond it. No text, no objects.

**Meeting, portrait (D2):** Loose expressive oil painting seen from above, portrait format: two rivers meeting. The top half is calm dark blue-black water (close to #0F1C24) with long gentle low-contrast strokes, quiet enough for white headline text. A soft winding seam of white foam crosses the lower half diagonally, with glowing clear green-turquoise water (close to #00C99B) beyond it. Thick brushstrokes, canvas texture. No land, no boats, no people, no text.

**Photograph, two waters (batch 2, 11b):** Aerial photograph straight down where a wide dark blue-black river meets a clear green-teal river, a soft natural line between the two waters running across the frame, one small wooden boat crossing that line, dense forest along the outer edges. Documentary photograph, overcast soft daylight, natural slightly muted colour, deep blue-black shadows, both waters clean and clear, fine film grain. Calm, uncluttered composition with one subject and a quiet dark area across the left of the frame, at least a third of the image. No sky. No people except tiny distant figures, no text, no logos, no brown or muddy water. (The recipe for new photos is in `brand/imagery.md`.)
