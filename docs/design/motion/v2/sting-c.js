// C · From the mark. The app icon opens out of the waterline: a hairline, then the painted water, then the ss
// unfolding from the line. The camera pulls back and the window closes back into the waterline, but the water
// stays inside the lower halves of the letters, so the ss turns from a cut-out into the logo's ss. The rest of
// the word unfolds out of the line on both sides, the paint settles into flat igarapé, and the logo holds.
// (The mark never sits next to the wordmark: it becomes the word's ss.)
import { E, bez, seg, clamp, lerp, drawEl, clipY } from './engine.js';
import { LINE_TOP, LINE_BOTTOM, WEAVE_Y } from './logo-paths.js';

const arrive = bez(0.16, 1, 0.3, 1);
const between = bez(0.7, 0, 0.15, 1);
// The tile in font units: 1000 square around the ss, the waterline at 54.6% of its height (brand/rules.md).
const TILE = { x0: 1990, x1: 2990, y0: WEAVE_Y - 546, y1: WEAVE_Y + 454, r: 220 };
const START = { ax: 2490, ay: -250, s: 0.4 }, END = { ax: 1760, ay: -330, s: 0.28 };
const ORDER = { ss: 0, e: 1, i: 1, v: 2, a2: 2, a: 3, r: 4, t: 5 }; // outward from the ss
const UNFOLD = 1.55, STEP = 0.06, DUR = 0.95;

function unfold(ctx, s, ox, oy, keys, logo, k) {
  for (const [y0, y1, from, g] of [[-2e4, LINE_TOP, 600, ctx.top], [LINE_BOTTOM, 2e4, -240, ctx.bot]]) {
    g.setTransform(s, 0, 0, s, ox, oy); g.save(); clipY(g, y0, y1); g.translate(0, from * (1 - k));
    for (const key of keys) drawEl(g, logo.byKey[key]);
    g.restore();
  }
}

export default {
  duration: 5.0,
  images: ['clear-water-portrait.png'],
  frag: `
float rbox(vec2 p, vec2 c, vec2 h, float r) { vec2 q = abs(p - c) - h + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
vec3 scene(vec2 px) {
  // u_p: 0-3 tile rect px, 4 window top px, 5 window bottom px, 6 corner radius px, 7 inner zoom, 8 paint to flat,
  // 9 waterline px, 10 hairline x0, 11 hairline x1, 12 hairline alpha, 13 glint x, 14 glint alpha
  vec2 t0 = vec2(u_p[0], u_p[1]), t1 = vec2(u_p[2], u_p[3]);
  vec2 tuv = (px - t0) / (t1 - t0);
  vec2 puv = (tuv - .5) / u_p[7] + .5;
  vec3 paint = texture(u_img0, vec2(puv.x, .07 + puv.y * .75)).rgb;
  paint = mix(paint, RIO, .6 * clamp(1. - tuv.y / .72, 0., 1.));
  float wy0 = u_p[4], wy1 = u_p[5];
  float r = min(u_p[6], (wy1 - wy0) * .5);
  float sd = rbox(px, vec2((t0.x + t1.x) * .5, (wy0 + wy1) * .5), vec2((t1.x - t0.x) * .5, max((wy1 - wy0) * .5, 0.)), r);
  float win = (wy1 - wy0) > .5 ? 1. - smoothstep(-.7, .7, sd) : 0.;
  float bot = A(u_bot, px), top = A(u_top, px);
  vec3 flatPaint = texture(u_img0, vec2(puv.x, .07 + puv.y * .75)).rgb;
  vec3 fill = mix(flatPaint, IGA, u_p[8]);
  vec3 c = mix(mix(RIO, fill, bot), mix(paint, RIO, bot), win);
  c = mix(c, WHITE, top);
  float Ly = u_p[9];
  float hl = u_p[12] * step(u_p[10], px.x) * step(px.x, u_p[11]) * exp(-pow((px.y - Ly) / 1.1, 2.));
  c = mix(c, hex(0x53E4B7), clamp(hl, 0., 1.));
  float g = u_p[14] * exp(-pow((px.x - u_p[13]) / 150., 2.)) * exp(-pow((px.y - Ly) / 2.6, 2.));
  return mix(c, mix(hex(0x95F1CF), WHITE, .5), clamp(g, 0., 1.));
}`,
  draw(t, L, { logo, W, H }) {
    const k = seg(t, 1.2, 2.45, between);
    const s = Math.exp(lerp(Math.log(START.s), Math.log(END.s), k)) * (1 + 0.016 * t / 5);
    const ax = lerp(START.ax, END.ax, k), ay = lerp(START.ay, END.ay, k);
    const ox = W / 2 - ax * s, oy = H / 2 - ay * s;
    const X = (u) => ox + u * s, Y = (u) => oy + u * s;
    const Ly = Y(WEAVE_Y);

    const ctx = { top: L.top, bot: L.bot };
    unfold(ctx, s, ox, oy, ['ss'], logo, arrive(clamp((t - 0.5) / 0.9)));
    for (const [key, n] of Object.entries(ORDER)) {
      if (key === 'ss') continue;
      const keys = key === 'i' ? ['i', 'dot'] : [key];
      unfold(ctx, s, ox, oy, keys, logo, arrive(clamp((t - UNFOLD - n * STEP) / DUR)));
    }

    const open = seg(t, 0.32, 1.05, arrive);
    const close = seg(t, 1.2, 1.95, between);
    const up = (TILE.y0 - WEAVE_Y) * open * (1 - close), down = (TILE.y1 - WEAVE_Y) * open * (1 - close);
    const line = seg(t, 0.08, 0.6, arrive);
    const lineAlpha = 0.9 * (1 - seg(t, 0.5, 0.95, E.fade));
    const g = seg(t, 2.05, 2.7, bez(0.45, 0, 0.25, 1));
    return [
      X(TILE.x0), Y(TILE.y0), X(TILE.x1), Y(TILE.y1),
      Y(WEAVE_Y + up), Y(WEAVE_Y + down), TILE.r * s, 1.18 - 0.18 * seg(t, 0.3, 2.4, E.out),
      seg(t, 2.05, 2.9, E.fade),
      Ly, ...(t < 1.5 ? [X(TILE.x0), X(TILE.x0) + line * (X(TILE.x1) - X(TILE.x0))] : [X(TILE.x0), X(TILE.x1)]), lineAlpha,
      X(logo.x0 - 600 + g * (logo.x1 - logo.x0 + 1200)), Math.sin(Math.PI * g) * 0.85,
    ];
  },
};
