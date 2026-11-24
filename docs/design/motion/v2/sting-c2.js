// C2 · Through the painting. The camera starts inside the icon: a hairline crosses the whole frame, the frame
// opens into painted water and the ss unfolds out of the line at full size. One continuous pull back shows it is
// the icon, then carries on to the word while the window closes into the waterline.
import { fromMark, cameraPath, SS_CX, WORD, arrive, between, bez, seg, clamp, E } from './from-mark.js';

export default fromMark({
  duration: 5.2,
  camera: cameraPath([
    { ax: SS_CX, ay: -225, s: 2.3 },
    { from: 0.25, to: 1.75, ease: bez(0.45, 0, 0.2, 1), ax: SS_CX, ay: -250, s: 0.42 },
    { from: 1.3, to: 2.55, ease: bez(0.5, 0, 0.15, 1), ...WORD },
  ]),
  band: (t) => { const k = seg(t, 0.2, 0.95, arrive) * (1 - seg(t, 1.35, 2.1, between)); return [k, k]; },
  ss: (t) => arrive(clamp((t - 0.45) / 1.1)),
  letter: (t, ring) => arrive(clamp((t - 1.7 - ring * 0.055) / 0.95)),
  spread: 0.12,
  hairline: (t) => [seg(t, 0.0, 0.55, arrive), 0.9 * (1 - seg(t, 0.4, 0.85, E.fade))],
  glint: [2.1, 2.85],
  zoom: (t) => 1.1 - 0.1 * seg(t, 0, 2.6, E.out),
});
