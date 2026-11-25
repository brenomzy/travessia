# Motion and sound

> Playbook step 11, done (2026-11-24 to 2026-11-25). The logo sting (C1) and the product UI demo are decided; sound was skipped. Timing values are tokens in `src/tokens/tokens.json` (`motion.*`); the helpers are in `src/lib/motion/`; the river is `src/lib/generators/river`. Tests: `docs/design/motion/`.

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

**Decided: C1 · From the mark** (Breno, 2026-11-24). File: `docs/design/motion/v2/sting-C1.mp4` (1920 × 1080, 60 fps, 5.0 s); source `sting-c1.js` with `from-mark.js`. The story: the app icon opens out of a hairline on the waterline, the ss unfolds inside it, and the icon closes back into the waterline while its water stays in the lower halves of the letters, so the mark becomes the word's ss. The rest of the word opens outward from it, a glint along the waterline sets the paint into flat igarapé, and the logo holds.

How it's used:

- Opens and closes films, campaign videos and social videos, and opens presentations. At the end of a film it runs as is and holds on the last frame.
- On rio-negro only. Never over a photograph, painting or the river.
- Not on the website or in the product: the site keeps its still logo, and the app never plays it.
- With reduced motion, or where video can't play, show the last frame: the logo.
- Don't retime, recolour or cut it. Shorter edits start later (from the hold) rather than speeding it up.
- D (surfacing), E (the river), C2 and C3 stay as tests, not alternatives.

### Round 3 (2026-11-24): three versions of C

Breno: C "looks amazing"; he asked for variations, even more polished. All three share one build (`docs/design/motion/v2/from-mark.js`) and these refinements over round 2's C:

- The window onto the water is one shape from start to end: a capsule on the hairline that grows into the icon and shrinks back into the line. Its corners are always round: circular while it's a capsule, easing into the icon's continuous (superellipse) corner as it opens. (An earlier version cut the rounded tile with two straight edges, so the corners went square mid-move and the rounded ones popped in at the end; Breno found it clashed with the radius, 2026-11-24.)
- The camera never stops: a slow pull back while the icon forms, then the move to the word.
- Letters slide out from behind the ss as they open (12% of their distance to it), not only up and down out of the line.
- The glint changes the paint: wherever it has passed, the painted water inside the letters is flat igarapé, so the paint settles left to right.
- The water inside the letters is pulled 15–22% towards igarapé, so no dark patches of the painting show in the far letters.
- A faint igarapé light spills from the open window onto the dark around it, falling off in a round shape, and goes when the window closes.

| Sting | What's different | Length |
|---|---|---|
| **C1 · Refined** | Round 2's C with the refinements above. | 5.0 s |
| **C2 · Through the painting** | Starts inside the icon: the hairline crosses the whole frame, the frame opens into painted water and the ss unfolds out of the line at full size. One continuous pull back shows it's the icon and carries on to the word. | 5.2 s |
| **C3 · Water into the word** | The dark water drains down to the waterline first and the white halves of the word open out of it with nothing below. Then the igarapé water closes up into the ss and runs out along the waterline into the lower halves of the other letters, both ways, before the glint sets it flat. | 5.4 s |

**C1 is the direction** (Breno, 2026-11-24), with an easing pass on top. `docs/design/motion/v2/graph.html?s=c1` plots the on-screen speed of every moving part, like an After Effects speed graph. The first version had three faults: every move started at full speed on its first frame (the hairline, the window, the ss and each letter snapped instead of moving); the window closing, the camera's peak and all five letter rings hit top speed together between 1.6 and 1.8 s; and the camera's move to the word was a narrow spike of about 0.3 s. The fix:

| Move | Curve | When |
|---|---|---|
| Hairline drawing on | `cubic-bezier(0.35, 0, 0.1, 1)` | 0.06–0.72 s |
| Window opening, ss unfolding | `cubic-bezier(0.3, 0, 0.05, 1)` | 0.32–1.15 s, 0.5–1.55 s |
| Window closing into the line | `cubic-bezier(0.55, 0, 0.3, 1)` | 1.15–1.75 s |
| Camera to the word | `cubic-bezier(0.45, 0, 0.12, 1)` | 1.15–2.75 s |
| Letters opening, 50 ms apart by ring | `motion.ease.base` (0.2, 0, 0, 1) | from 1.67 s, 1.1 s each |
| Glint | `cubic-bezier(0.45, 0, 0.25, 1)` | 2.05–2.85 s |

Every move now eases in over a few frames and lands on a long tail, and peak speeds roughly halved (camera 765 → 475 px/s, letters about 1,600 → 760 px/s). The peaks run in order: the window closes (1.4 s), the camera moves (1.6 s), the letters open as it slows (1.8–2.0 s), the glint runs (2.3 s), and the camera and the last letters land together. A short beat where only the ss sits on the waterline, between the window closing and the letters opening, falls out of this.

Note on C2: the painting is a 960 px file, so at the opening zoom (about 2.4×) the brushwork is soft. An upscaled copy of `clear-water-portrait.png` would sharpen it.

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

Not chosen; C1 (round 3) is the sting.

### Round 1 (2026-11-24)

Three 4-second tests on rio-negro (`docs/design/motion/sting.html`, `sting-A.mp4`, `sting-B.mp4`, `sting-C.mp4`, 1280 × 720): A · Waterline, B · The crossing (a dot crosses and lands as the dot of the i), C · Mark first (the icon settles, the wordmark slides out beside it). Superseded by round 2: their motion used plain eases and no motion blur, and C ended on a mark-and-wordmark lockup, which the rules don't allow.

## The river in motion

The seam animation this step originally asked for is done: the seam was retired in step 8 and the river (`src/lib/generators/river`, shader lab tile 8i) is the brand's moving signature. Its rules:

- Only behind the home hero and in campaign film or social video. Not behind body text or product UI.
- 30 frames a second, only while on screen and while the tab is visible; time only advances while it runs.
- Reduced motion or no WebGL2: one still frame (or plain rio-negro).

## Product UI in demos

**Decided: the Balance demo** (Breno, 2026-11-25). File: `docs/design/motion/ui-demo/ui-demo.mp4`, 12.9 s at 1920 × 1080, 60 fps. It is the pattern for every product demo: new demos follow the rules below and change only the screen and the task. Source: `docs/design/motion/ui-demo/` (React on the Stageshow kit in `.agents/skills/stageshow/kit`, with the site's tokens, Figtree, icons and wordmark).

What it shows: the site's Balance screen (the app window from `FeatureTabs`) on painted clear water, playing the canonical crossing from `brand/proof.md`.

| Time | Beat |
|---|---|
| 0–0.9 s | The Balance screen as it was on Thu Nov 12 before 9:11 am: US$ 4,212.40 |
| 0.9 s | Halden & Co. pays invoice #0042: the row drops into Recent activity, the dollar balance rolls to US$ 6,212.40 |
| 2.4 s | "Tax invoice no. 318 issued" arrives over the sidebar |
| 3.5 s | The cursor comes in and presses Convert (4.7 s); the sheet opens under it with the quote (US$ 2,000.00, fee − US$ 12.00, R$ 5.45, you receive R$ 10,834.60) |
| 6.9 s | After a second of reading time the cursor presses the igarapé button: Converting (a dark arc turning), then Converted (8.0 s) with a dark tick: no green disc on the igarapé button |
| 8.8 s | The sheet closes, the balance rolls back to US$ 4,212.40, the cursor leaves the frame |
| 9.5 s | "Pix received" arrives and the Pix row drops in: the last frame is the state the site's Balance tab shows |

The rules:

- **Order follows the ledger, not the pitch.** The tax invoice comes before the conversion (it's issued 1 min 48 s after payment; the conversion is Ana's choice, later). The earlier draft order (paid → converted → Pix → tax invoice) was wrong.
- One window, one task, three to five beats. Numbers come from the product ledger and roll with `duration.count`, last digit first; a balance only changes when something on screen caused it.
- The cursor appears only for the step a person takes (Convert, then confirm), aims off the label, and leaves the frame when done. Nothing else is pointed at.
- Floats (tax invoice, Pix) straddle the window's left edge over the sidebar, a third outside, stacked 16 px apart: chrome, never content. They enter with `spring.notification` and don't leave.
- The sheet opens at the app's own speed (about 0.25 s). Only storytelling waits are slow: about a second of reading time on the quote, about 3 s on the result.
- **It plays once and holds.** A loop would have to take the payment back out of the balance; for a repeat, cut back to the start. With reduced motion, the last frame.
- The window keeps the 108 px gutter on every edge the frame shows and runs off the bottom; the activity list runs on past the foot with placeholder rows.
- A confirm button's progress is one dark mark: an arc turning while it works, drawing into a tick when done. Never a coloured disc on the igarapé button (Breno's one change, 2026-11-25).
- Sheets open attached to the button that opened them, their edges on the structure underneath (here, exactly the euro and pound cards); no number is cut mid-figure.

Where it's used: product films, launch and feature videos, decks, and social posts cut from it. Not yet decided: a vertical cut for social, and whether the site's hero plays a demo.

## Sound

**Skipped** (Breno, 2026-11-25). Travessia has no sonic mark: the sting and the demos carry no brand sound, and the product and the site make no sound (payments arriving on the phone use the system's own haptics). Revisit only if a film or campaign needs one.

