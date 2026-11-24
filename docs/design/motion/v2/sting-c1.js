// C1 · From the mark, refined. The window opens out of a hairline and closes back into a straight slit; the
// camera never stops (a slow pull before the move to the word); letters slide out from behind the ss as they
// open; the glint sweeps the paint into flat igarapé, left to right.
import { fromMark, cameraPath, TILE, SS_CX, WORD, arrive, between, seg, clamp, E } from './from-mark.js';

export default fromMark({
  duration: 5.0,
  camera: cameraPath([
    { ax: SS_CX, ay: -250, s: 0.43 },
    { from: 0, to: 1.4, ease: E.out, ax: SS_CX, ay: -250, s: 0.4 },
    { from: 1.2, to: 2.45, ease: between, ...WORD },
  ]),
  band: (t) => { const k = seg(t, 0.3, 1.0, arrive) * (1 - seg(t, 1.2, 1.95, between)); return [k, k]; },
  ss: (t) => arrive(clamp((t - 0.5) / 0.9)),
  letter: (t, ring) => arrive(clamp((t - 1.55 - ring * 0.055) / 0.95)),
  spread: 0.12,
  hairline: (t) => [seg(t, 0.08, 0.6, arrive), 0.9 * (1 - seg(t, 0.45, 0.9, E.fade))],
  glint: [2.0, 2.75],
  zoom: (t) => 1.18 - 0.18 * seg(t, 0, 2.4, E.out),
});
