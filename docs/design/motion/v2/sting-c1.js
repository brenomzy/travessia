// C1 · From the mark, refined. The window opens out of a hairline and closes back into a straight slit; the
// camera never stops (a slow pull before the move to the word); letters slide out from behind the ss as they
// open; the glint sweeps the paint into flat igarapé, left to right.
//
// Easing (second pass, read off graph.html?s=c1): nothing starts at full speed. Every move eases in over a few
// frames, then lands on a long tail. The peaks run in sequence instead of piling up: the window closes into the
// line first, the camera's move follows with a broad, low peak, and the letters open as it slows, so the camera
// and the last letters land together.
import { fromMark, cameraPath, SS_CX, WORD, bez, seg, clamp, E } from './from-mark.js';

const draw = bez(0.35, 0, 0.1, 1); // a line drawing on
const open = bez(0.3, 0, 0.05, 1); // the window opening, the ss unfolding
const shut = bez(0.55, 0, 0.3, 1); // the window closing into the line
const travel = bez(0.45, 0, 0.12, 1); // the camera's move to the word
const unfold = bez(0.2, 0, 0, 1); // letters (motion.ease.base)
const sweep = bez(0.45, 0, 0.25, 1); // the glint

export const cfg = {
  duration: 5.0,
  camera: cameraPath([
    { ax: SS_CX, ay: -250, s: 0.43 },
    { from: 0, to: 1.5, ease: E.out, ax: SS_CX, ay: -250, s: 0.4 },
    { from: 1.15, to: 2.75, ease: travel, ...WORD },
  ]),
  band: (t) => { const k = seg(t, 0.32, 1.15, open) * (1 - seg(t, 1.15, 1.75, shut)); return [k, k]; },
  ss: (t) => open(clamp((t - 0.5) / 1.05)),
  letter: (t, ring) => unfold(clamp((t - 1.62 - ring * 0.05) / 1.1)),
  spread: 0.12,
  hairline: (t) => [seg(t, 0.06, 0.72, draw), 0.9 * (1 - seg(t, 0.5, 1.0, E.fade))],
  glint: [2.05, 2.85],
  glintEase: sweep,
  zoom: (t) => 1.18 - 0.18 * seg(t, 0, 2.6, E.out),
};

export default fromMark(cfg);
