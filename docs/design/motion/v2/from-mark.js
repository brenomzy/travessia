// "From the mark": the shared build behind C1, C2 and C3. The app icon (painted water, the ss on its waterline)
// becomes the word's ss: the window onto the water closes back into the waterline while the water stays inside
// the lower halves of the letters, the rest of the word opens out of the line, and a glint along the waterline
// turns the paint into flat igarapé. Each variation passes its own camera, window and fill timings.
import { E, bez, seg, clamp, lerp, drawEl, clipY } from './engine.js';
import { LINE_TOP, LINE_BOTTOM, WEAVE_Y } from './logo-paths.js';

export { E, bez, seg, clamp, lerp };
export const arrive = bez(0.16, 1, 0.3, 1);
export const between = bez(0.7, 0, 0.15, 1);
// The tile in font units: 1000 square around the ss, the waterline at 54.6% of its height (brand/rules.md).
export const TILE = { x0: 1990, x1: 2990, y0: WEAVE_Y - 546, y1: WEAVE_Y + 454, r: 220 };
export const SS_CX = 2490;
export const WORD = { ax: 1760, ay: -330, s: 0.28 };
// Outward from the ss, both sides at once.
const RING = { e: 1, i: 1, v: 2, a2: 2, a: 3, r: 4, t: 5 };

const FRAG = `
float rbox(vec2 p, vec2 c, vec2 h, float r) { vec2 q = abs(p - c) - h + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
vec3 scene(vec2 px) {
  vec2 t0 = vec2(u_p[0], u_p[1]), t1 = vec2(u_p[2], u_p[3]);
  vec2 tuv = (px - t0) / (t1 - t0);
  vec2 puv = (tuv - .5) / u_p[7] + .5 + vec2(u_t * .004, 0.);
  vec3 raw = texture(u_img0, vec2(puv.x, .07 + puv.y * .75)).rgb;
  vec3 paint = mix(raw, RIO, .6 * clamp(1. - tuv.y / .72, 0., 1.));
  float sdT = rbox(px, (t0 + t1) * .5, (t1 - t0) * .5, u_p[6]);
  float inTile = 1. - smoothstep(-.7, .7, sdT);
  float band = smoothstep(u_p[4] - .7, u_p[4] + .7, px.y) * (1. - smoothstep(u_p[5] - .7, u_p[5] + .7, px.y));
  float win = inTile * band;
  float bot = A(u_bot, px), top = A(u_top, px);
  // The water inside the letters: the painting pulled towards igarapé, flat wherever the glint has passed.
  vec3 water = mix(raw, IGA, u_p[17]);
  water = mix(water, IGA, smoothstep(u_p[8] + 160., u_p[8] - 160., px.x));
  float fr = abs(px.x - u_p[15]) + 14. * snoise(vec3(px * vec2(.012, .03), u_t * 1.2));
  float filled = smoothstep(u_p[16] + 4., u_p[16] - 4., fr);
  vec3 c = RIO;
  // Light from the open window spills onto the dark around it.
  float sdW = max(sdT, max(u_p[4] - px.y, px.y - u_p[5]));
  c += mix(hex(0x0E6B52), IGA, .4) * u_p[19] * .09 * exp(-max(sdW, 0.) / (.16 * (t1.x - t0.x))) * smoothstep(0., 1., (u_p[5] - u_p[4]) / (t1.y - t0.y));
  c = mix(c, water, bot * filled);
  c = mix(c, mix(paint, RIO, bot), win);
  c = mix(c, WHITE, top);
  float Ly = u_p[9];
  float hl = u_p[12] * smoothstep(u_p[10] - 1., u_p[10] + 1., px.x) * smoothstep(u_p[11] + 1., u_p[11] - 40., px.x) * exp(-pow((px.y - Ly) / 1.1, 2.));
  c = mix(c, hex(0x53E4B7), clamp(hl, 0., 1.));
  float g = u_p[14] * exp(-pow((px.x - u_p[13]) / 170., 2.)) * exp(-pow((px.y - Ly) / 2.6, 2.));
  return mix(c, mix(hex(0x95F1CF), WHITE, .5), clamp(g, 0., 1.));
}`;

/**
 * cfg.camera(t) -> { ax, ay, s }       font-unit point at the frame's centre, and px per unit
 * cfg.band(t) -> [up, down]            how far the window reaches above / below the waterline, 0–1 of the tile
 * cfg.ss(t), cfg.letter(t, ring)       unfold progress 0–1
 * cfg.spread                           how far (as a share of the distance to the ss) letters start towards it
 * cfg.fill(t) -> half-width in units of the water inside the letters, measured from the ss (Infinity = all)
 * cfg.glint: [t0, t1], cfg.hairline(t) -> [progress 0–1, alpha], cfg.zoom(t): the painting's inner zoom
 */
export function fromMark(cfg) {
  return {
    duration: cfg.duration,
    images: ['clear-water-portrait.png'],
    frag: FRAG,
    draw(t, L, { logo, W, H }) {
      const cam = cfg.camera(t);
      const s = cam.s, ox = W / 2 - cam.ax * s, oy = H / 2 - cam.ay * s;
      const X = (u) => ox + u * s, Y = (u) => oy + u * s;
      const ss = logo.byKey.ss;

      const put = (keys, k, dx) => {
        for (const [g, y0, y1, from] of [[L.top, -2e4, LINE_TOP, 600], [L.bot, LINE_BOTTOM, 2e4, -240]]) {
          g.setTransform(s, 0, 0, s, ox, oy); g.save(); clipY(g, y0, y1);
          g.translate(dx * (1 - k), from * (1 - k));
          for (const key of keys) drawEl(g, logo.byKey[key]);
          g.restore();
        }
      };
      put(['ss'], cfg.ss(t), 0);
      for (const [key, ring] of Object.entries(RING)) {
        const el = logo.byKey[key];
        const k = cfg.letter(t, ring);
        if (k <= 0) continue;
        put(key === 'i' ? ['i', 'dot'] : [key], k, (ss.cx - el.cx) * cfg.spread);
      }

      const [up, down] = cfg.band(t);
      const [hp, ha] = cfg.hairline(t);
      const [g0, g1] = cfg.glint;
      const g = seg(t, g0, g1, cfg.glintEase || bez(0.45, 0, 0.25, 1));
      const gx = X(logo.x0 - 700 + g * (logo.x1 - logo.x0 + 1400));
      const fill = cfg.fill ? cfg.fill(t) : 1e5;
      return [
        X(TILE.x0), Y(TILE.y0), X(TILE.x1), Y(TILE.y1),
        Y(WEAVE_Y + (TILE.y0 - WEAVE_Y) * up), Y(WEAVE_Y + (TILE.y1 - WEAVE_Y) * down), TILE.r * s, cfg.zoom(t),
        g > 0 ? gx : -1e5,
        Y(WEAVE_Y), X(TILE.x0), X(TILE.x0) + hp * (X(TILE.x1) - X(TILE.x0)), ha,
        gx, Math.sin(Math.PI * g) * 0.85,
        X(SS_CX), fill * s, cfg.paintToward ?? 0.22, 0, Math.max(up, down),
      ];
    },
  };
}

/** Moves the camera between keyframes { t, ax, ay, s } with log-scale interpolation, each move with its curve. */
export function cameraPath(keys, drift = 0.016, total = 5) {
  return (t) => {
    let cur = keys[0];
    let { ax, ay } = cur, ls = Math.log(cur.s);
    for (let i = 1; i < keys.length; i++) {
      const k = keys[i], p = seg(t, k.from, k.to, k.ease);
      ax += (k.ax - keys[i - 1].ax) * p; ay += (k.ay - keys[i - 1].ay) * p; ls += (Math.log(k.s) - Math.log(keys[i - 1].s)) * p;
    }
    return { ax, ay, s: Math.exp(ls) * (1 + drift * t / total) };
  };
}
