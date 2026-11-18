# Texture lab: the approved Paper textures

These scripts made the textures used in the Paper design: the hero and interior-hero seams, the final CTA and footer band, the section transition, the mobile hero, and the five blog covers. Each script, run as it is, reproduces the files in `reference/` byte for byte. That was checked on 2026-11-11 against the assets in the Paper file.

They are design-time references, not the production generators. The site's generators belong in `src/lib/generators/` as framework-agnostic TypeScript, with a `recipe.json` next to each output (SPEC §9). Port from these files. Don't import them.

## Regenerate

Needs Node 22 or later and has no dependencies.

```bash
node gen4.mjs /tmp/tex && node gen5.mjs /tmp/tex && node gen6.mjs /tmp/tex
```

Outputs land in `out3/` (gen4), `out5/` (gen5) and `covers/` (gen6) under the folder you pass. gen4 writes `mobile-seam.png`; the copy in `reference/` is named `mobile-seam-v2.png`.

## Where each texture is used

| File | Size | Used on | Script and code |
|---|---|---|---|
| `seam-40.png` | 2880×1800 | Home hero C, every interior hero (product, story, integration, event), 404 | gen5 `seam(…, 0.40)` |
| `seam-50.png` | 2880×1800 | Waitlist (/abrir-conta), event recording thumbnail | gen5 `seam(…, 0.5)` |
| `seam-cta.png` | 2880×1200 | Home final CTA, EN client page CTA | gen5 `seam(…, 0.5, amp 0.12)` |
| `hseam.png` | 2880×1800 | Final CTA B (above the footer on inner pages), About header strip | gen5 `render("hseam.png")` |
| `strip-tap-noite.png` | 2880×480 | Home transition from tapajós into noite | gen5 `render("strip-tap-noite.png")` |
| `mobile-seam-v2.png` | 780×3040 | Mobile hero (Explorations, Encontro v2 mobile) | gen4 `render("mobile-seam.png")` |
| `cambio-safe.png` | 1600×840 | Blog cover, Câmbio | gen6 `presets.cambio(5)` |
| `impostos-safe.png` | 1600×840 | Blog cover and category header, Impostos | gen6 `calm(presets.impostos, nevoa)(1)` |
| `faturas-safe.png` | 1600×840 | Blog cover, Faturas | gen6 `presets.faturasSafe(1)` |
| `guias-safe.png` | 1600×840 | Blog cover, Guias | gen6 `calm(presets.guias, branco)(1)` |
| `novidades-safe.png` | 1600×840 | Blog cover, Novidades header | gen6 `calm(presets.streaks, noite)(1)` |

The number after a preset is its seed. Change it and you get a new cover in the same family.

## Notes for a shader port

All the textures share one pipeline, which maps directly to a fragment shader:

1. **Noise.** 2D Perlin gradient noise (quintic fade, 8 gradients). The 512-entry permutation table is shuffled with a Park–Miller generator starting at `seed = 7`. To match the stills pixel for pixel, upload that same table as a 256×1 texture. Any good 2D noise gives the same look but not identical pixels.
2. **fbm.** 5 octaves by default; lacunarity 2, gain 0.5. Some calls pass 2 or 3 octaves.
3. **Domain warp.** `q = (fbm(p), fbm(p + (5.2, 1.3)))`, then `warp = fbm(p + k·q)` with k = 4 for the seams and 3–3.5 for hseam, the strip and mobile.
4. **Boundary.** A signed distance from the seam position plus `warp × amp`. Vertical seams use `u − at`; horizontal ones use `Y − Y0`. It's turned into coverage with `clamp(0.5 + boundary × gain + warp × 0.2)`. Gain is 9 for seams, 8 for hseam, 2.2 for the strip and 1.7 for mobile. A higher gain gives a sharper edge.
5. **Pixelation.** Samples are snapped to 6 px cells (5 px on the covers, 4 px for the calm mask). That's what makes the dots read as dither and not as blur.
6. **Ordered dither.** A 4×4 Bayer matrix, `(n + 0.5) / 16`. Coverage above the threshold gets the first colour, otherwise the second.
7. **Colours.** Two flat colours only: `#13A7B5` (tapajós 500) and `#0F1C24` (noite). Covers also use `#EAF8F8`, `#FFFFFF`, `#CDEFF0`, `#9FE0E3` and `#0B5E73`.

Seam values:

| Texture | Seam position | Warp amp | Extra |
|---|---|---|---|
| seam-40 | `at = 0.40` | `0.16` | `+ sin(v·4 + 1) × 0.012` |
| seam-50 | `at = 0.50` | `0.16` | same |
| seam-cta | `at = 0.50` | `0.12` | same |
| hseam | `Y0 = 0.47` | `0.13` | |

Ideas for motion, none of them decided yet:

- **Drift.** Add `time × small` to the warp input (`p` before the `q` lookup). The seam then drifts without its average position moving.
- **Sharpness.** Animate the gain to sharpen or soften the edge.
- **Reduced motion.** Show the reference PNG as the still frame.
- **Calm side.** The calm-side mask on the covers (`smooth(0.40, 0.62, u + fbm·0.05)` against the Bayer threshold) has to stay static. The title sits on that area.

## Other files

`gen.mjs` to `gen3.mjs` were exploration steps (marbling, caustics, the first directions) and aren't kept here. The full history is in the design session transcript, `29d5b8fc-acf5-4b97-b215-5a7080567941.jsonl`, in the personal Claude projects folder.
