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

Three 4-second tests on rio-negro, built from the real wordmark (`docs/design/motion/sting.html`, recordings `sting-A.mp4`, `sting-B.mp4`, `sting-C.mp4`, 1280 × 720):

- **A · Waterline.** The waterline draws across (`ease.in-out`, 0.8 s), the word rises out of it (`spring.crit`) and its igarapé half settles below.
- **B · The crossing.** An igarapé dot crosses on the waterline and the word appears behind it. The dot lifts and lands as the dot of the i, turning white. Tells the brand's story in one move: something crosses and arrives.
- **C · Mark first.** The mark on painted water settles, then the wordmark slides out beside it.

To pick: one sting. Draft recommendation: **B**. It is the only one that couldn't be any other wordmark's animation, and its end frame is the logo exactly as it is.

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
