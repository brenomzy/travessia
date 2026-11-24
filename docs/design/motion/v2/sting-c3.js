// C3 · Water into the word. The icon opens as in C1. Then the dark water drains down to the waterline and the
// white halves of the word open out of it; the igarapé water closes up into the ss and runs out along the
// waterline into the lower halves of the other letters, both ways. The glint settles it into flat igarapé.
import { fromMark, cameraPath, SS_CX, WORD, arrive, between, bez, seg, clamp, E } from './from-mark.js';

export default fromMark({
  duration: 5.4,
  camera: cameraPath([
    { ax: SS_CX, ay: -250, s: 0.43 },
    { from: 0, to: 1.4, ease: E.out, ax: SS_CX, ay: -250, s: 0.4 },
    { from: 1.25, to: 2.55, ease: between, ...WORD },
  ]),
  band: (t) => {
    const open = seg(t, 0.3, 1.0, arrive);
    return [open * (1 - seg(t, 1.15, 1.7, between)), open * (1 - seg(t, 1.6, 2.15, between))];
  },
  ss: (t) => arrive(clamp((t - 0.5) / 0.9)),
  letter: (t, ring) => arrive(clamp((t - 1.45 - ring * 0.05) / 0.95)),
  spread: 0.1,
  fill: (t) => 400 + 2250 * seg(t, 1.9, 2.85, bez(0.5, 0, 0.2, 1)),
  paintToward: 0.15,
  hairline: (t) => [seg(t, 0.08, 0.6, arrive), 0.9 * (1 - seg(t, 0.45, 0.9, E.fade))],
  glint: [2.6, 3.35],
  zoom: (t) => 1.18 - 0.18 * seg(t, 0, 2.6, E.out),
});
