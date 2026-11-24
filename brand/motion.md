# Motion and sound

> Playbook step 11, draft (started 2026-11-24). Not approved yet. Timing values are tokens in `src/tokens/tokens.json` (`motion.*`); the helpers are in `src/lib/motion/`; the river is `src/lib/generators/river`. Tests: `docs/design/motion/`.

Travessia moves the way its subject does: money crossing from one side to the other and arriving. Most of the time the interface is still. Motion marks the moments that matter: a page arriving, a state changing, a number arriving, and the river behind the hero.

## Principles

**Still by default.** Text, logos, prices and amounts don't move once they're on screen. Nothing loops except the river. No parallax, no scroll-jacking, no hover wiggles, no autoplaying carousels.

**Things move the way the money does.** When something travels, it goes from left to right (from the payer's side to the freelancer's), and amounts count up to their value and stop. A transfer arriving lands with a critically damped spring: it settles without overshoot. Amounts never use the bouncy springs.

**Speeds come from the tokens.**

| Speed | Tokens | For |
|---|---|---|
| Instant feedback | `duration.fast` 150 ms, `ease.hover` | Hover, press, focus |
| UI changes | `duration.base` 250 ms, `ease.base` | Tabs, toggles, menus, accordions |
| Arrivals | `duration.slow` 400 ms to `reveal.move` 800 ms, `spring.crit`, `ease.fade` | Sections revealing, cards entering, drawers |
| The story | `duration.story` 700 ms per beat, `duration.count` 1.2 s | The hero's crossing, a number counting up |
| The river | Continuous, 30 frames a second | Behind the home hero only |

**One thing at a time.** A screen has one moving focus. Staggers run in reading order, 80 ms apart, and cap at eight items so a long list doesn't drag. The river never runs behind a moving UI demo.

**Reduced motion gets a complete version.** With `prefers-reduced-motion`, reveals are off (content is simply there), numbers show their final value, the river draws one still frame, demos show their end state, and the sting shows its last frame. Opacity changes of 150 ms or less are allowed; movement is not.

## What moves and what never does

| Moves | Never moves |
|---|---|
| Sections and cards arriving, once, on first view | Body text after it has arrived |
| Numbers counting up to a value, once | An amount the user is reading or comparing |
| State changes: tabs, toggles, menus, drawers, the calculator result | The logo (outside the sting) |
| The river behind the home hero | Photographs and paintings (no Ken Burns, no parallax) |
| Product UI in a demo, one step at a time | Prices, fees, rates on the pricing page |
| The sting, in video and at the start of a presentation | Anything that loops, except the river |

## The logo sting

### Round 2 (2026-11-24): C rebuilt, and two river stings

Breno on round 1: C "looks ok", but the motion needs to be far more polished, and he wants stings that lean into the river and the crossing. Round 2 is built on what studio logo animation actually does, timed frame by frame from official uploads (Netflix 2019, Max 2023, Wise 2023, Nubank 2021) plus School of Motion and IBM Carbon. The rules taken from it:

- **Asymmetric curves only.** Arrivals use expo-out `cubic-bezier(0.16, 1, 0.3, 1)`; moves between two rests use `cubic-bezier(0.7, 0, 0.15, 1)`. Symmetric easing (After Effects' default Easy Ease) is what makes logo motion look amateur.
- **Letters 4 frames apart at 60 fps** (2 at 30), left to right, so the whole word lands within about half a second.
- **Real motion blur:** a 180° shutter, 12 sub-frames per frame, blended in linear light.
- **Readable by 2 s, then held for at least 2 s,** with a 1.6% push-in across the whole sting (Netflix and Wise keep moving through the hold; nothing else does).
- **Effects reach exactly zero before the hold.** Refraction, ripples and the river's light are gone; the last frame is the logo as it is, with no glow or gradient on it.
- **One accent at the lock:** a soft glint that runs along the waterline once.
- Start from near-black; never open on the logo.

The waterline is where everything starts: the letters open out of it (white halves rising, igarapé halves dropping), rise through it, or are drawn by a river that becomes it.

| Sting | What happens | Length |
|---|---|---|
| **C · From the mark** | The app icon opens out of a hairline on the waterline and the ss unfolds inside it. The camera pulls back; the window closes back into the waterline, but its painted water stays inside the lower halves of the letters, so the ss turns from a cut-out into the logo's ss. The rest of the word unfolds from the line outward on both sides, and the paint settles into flat igarapé. The mark is never shown next to the wordmark (brand/rules.md): it becomes the word's ss. | 5.0 s |
| **D · Surfacing** | A surface line draws across. The letters rise through it one after another, igarapé, blurred and refracted under the water, white and sharp above it, each sending a ripple along the surface. The water clears, a glint runs along the line, and the line goes. | 4.6 s |
| **E · The river** | The hero river flows into the frame from the left, then straightens and narrows until it is the waterline. The word opens out of it, letter by letter. A glint runs along it, the river drains out of the channel, and the logo holds. | 4.8 s |

Files: `docs/design/motion/v2/` (`index.html?s=c|d|e` plays them live on the motion-lab server; `render.mjs` renders the MP4s, 1920 × 1080 at 60 fps; `engine.js` holds the letter masks, compositor and motion blur). With reduced motion the page shows the last frame.

To pick: one sting, or a pair (for example E for films and campaign openers, D for short social cuts).

### Round 1 (2026-11-24)

Three 4-second tests on rio-negro (`docs/design/motion/sting.html`, `sting-A.mp4`, `sting-B.mp4`, `sting-C.mp4`, 1280 × 720): A · Waterline, B · The crossing (a dot crosses and lands as the dot of the i), C · Mark first (the icon settles, the wordmark slides out beside it). Superseded by round 2: their motion used plain eases and no motion blur, and C ended on a mark-and-wordmark lockup, which the rules don't allow.

## The river in motion

The seam animation this step originally asked for is done: the seam was retired in step 8 and the river (`src/lib/generators/river`, shader lab tile 8i) is the brand's moving signature. Its rules:

- Only behind the home hero and in campaign film or social video. Not behind body text or product UI.
- 30 frames a second, only while on screen and while the tab is visible; time only advances while it runs.
- Reduced motion or no WebGL2: one still frame (or plain rio-negro).

## Product UI in demos

To be tested: how the app window animates in a demo (Ramp's hero is a UI demo with a cursor and live counters). Draft rules:

- One window, one task, told in three to five beats: invoice sent → paid → converted → Pix lands → tax invoice issued.
- Numbers come from the product ledger (`brand/proof.md`) and count up with `duration.count`.
- A cursor only when a person would act (pressing Convert). The cursor moves in straight, eased lines, never wanders.
- Notifications enter with `spring.notification` from the top right and leave with `ease.in`.
- 8 to 12 seconds per loop with a 2-second hold on the last state. With reduced motion, the last state only.

## Sound

To decide. Draft position:

- **No sound in the product or on the site.** Payments arriving are visual and haptic on the phone (system haptics only).
- **A sonic mark for video only**, under the sting and at the end of films: water (a single, short, clean ripple) and one soft note, under 2 seconds, never a jingle.
