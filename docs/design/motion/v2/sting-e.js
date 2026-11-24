// E · The river. The hero river flows into the frame from the left, then straightens and narrows until it
// is the waterline. The word opens out of it in both directions (the white halves rise out of the line, the
// igarapé halves drop out of it), letter by letter, left to right. A glint runs along the line, the river
// drains out of the channel, and the logo holds (with a slow push-in).
import { E, bez, seg, clamp, drawEl, clipY } from './engine.js';
import { LINE_TOP, LINE_BOTTOM, WEAVE_Y } from './logo-paths.js';

const arrive = bez(0.16, 1, 0.3, 1);
const between = bez(0.7, 0, 0.15, 1);
const S0 = 0.28, CX = 1760, CY = -330;
const GROUPS = [['t'], ['r'], ['a'], ['v'], ['e'], ['ss'], ['i', 'dot'], ['a2']];
const OPEN = 1.45, STAGGER = 0.065, DUR = 0.95;

export default {
  duration: 4.8,
  frag: `
float lineAA(float k, float px) { float fw = max(fwidth(k), 1e-4); float l = abs(fract(k - .5) - .5) / fw; return 1. - smoothstep(px * .5 - .5, px * .5 + .5, l); }
float course(float a, float m, float Ly, float t) {
  float k = 1. - m;
  return Ly + k * (.095 * sin(a * 3.6 + .9) + .035 * sin(a * 8.3 + 2.3) + .012 * sin(a * 17. + 1.) + .02 * snoise(vec3(a * 2.2, 0., t * .03)));
}
vec3 scene(vec2 px0) {
  float zoom = u_p[2];
  vec2 C = u_res * .5;
  vec2 px = (px0 - C) / zoom + C;
  float Hh = u_res.y, t = u_t, m = u_p[1], Ly = u_p[0] / Hh;
  vec2 P = px / Hh;
  float a = P.x, e = .002;
  float c0 = course(a, m, Ly, t);
  float sl = (course(a + e, m, Ly, t) - course(a - e, m, Ly, t)) / (2. * e);
  float wFull = .062 * (1. + .22 * snoise(vec3(a * 4., 3., t * .03)));
  float w = mix(wFull, u_p[6] / Hh, smoothstep(0., 1., m));
  float dn = (P.y - c0) / sqrt(1. + sl * sl);
  float dsm = abs(dn) - w;
  float d = dsm + (1. - m) * .003 * fbm3(vec3(P * 26., 1.));
  float s = clamp(dn / w, -1., 1.), depth = 1. - s * s;
  float od = max(d, 0.), ods = max(dsm, 0.);

  vec3 DEEP = hex(0x0E6B52), SHALLOW = hex(0x53E4B7), FOAM = hex(0x95F1CF);
  vec3 water = mix(SHALLOW, DEEP, depth * .75 * (1. - m * .6));
  float flow = a * 3. - t * .55;
  float l1 = pow(1. - abs(snoise(vec3(flow, s * 1.6, t * .05))), 16.);
  float l2 = pow(1. - abs(snoise(vec3(flow * 2.2 + 4., s * 3.2, t * .07 + 2.))), 24.);
  water = mix(water, vec3(1.), clamp(l1 * .75 + l2 * .5, 0., 1.) * (1. - m * .5));
  float crest = smoothstep(.75, 1., abs(s)) * smoothstep(-.2, .6, snoise(vec3(a * 22. - t * .9, s, 1.)));
  water = mix(water, mix(FOAM, vec3(1.), .6), crest * .6 * (1. - m));

  vec3 land = RIO + fbm3(vec3(P * 3., 7.)) * .012 * (1. - m);
  land += IGA * .1 * exp(-od * 14.) + DEEP * .09 * exp(-od * 4.);
  float freq = 46. * (1. + m * 5.);
  float ring = lineAA(ods * freq - t * .06, 1.) * smoothstep(.006, .012, ods) * exp(-ods * (7. + m * 30.));
  land = mix(land, mix(SHALLOW, hex(0x636E75), smoothstep(0., .18, ods)), clamp(ring, 0., 1.) * .6 * (1. - m));

  float aa = fwidth(d) * 1.2;
  float inside = 1. - smoothstep(-aa, aa, d);
  vec3 river = mix(land, water, inside);
  float front = u_p[3];
  float edge = px.x + .05 * Hh * snoise(vec3(P * 3., t * .4)) - abs(dn) * Hh * .6;
  float wet = smoothstep(front + .01 * Hh, front - .06 * Hh, edge);
  float lit = smoothstep(front - .05 * Hh, front - .45 * Hh, px.x);
  vec3 c = mix(RIO, mix(land, water, inside * wet), max(lit, wet * inside) * u_p[4]);

  float gx = u_p[7], gs = u_p[8];
  c = mix(c, mix(FOAM, WHITE, .5), clamp(gs * exp(-pow((px0.x - gx) / 160., 2.)) * exp(-pow((px0.y - u_p[5]) / 3.2, 2.)), 0., 1.));
  c = mix(c, IGA, A(u_bot, px0));
  c = mix(c, WHITE, A(u_top, px0));
  return c;
}`,
  draw(t, L, { logo, W, H }) {
    const zoom = 1.14 - 0.14 * seg(t, 0, 2.3, between) + 0.016 * seg(t, 0, 4.8);
    const s = S0 * zoom;
    const ox = W / 2 - CX * s, oy = H / 2 - CY * s;
    const LyWorld = H / 2 + (WEAVE_Y - CY) * S0; // the waterline before the camera
    const Ly = oy + WEAVE_Y * s;

    GROUPS.forEach((keys, i) => {
      const k = arrive(clamp((t - OPEN - i * STAGGER) / DUR));
      for (const [ctx, y0, y1, from] of [[L.top, -2e4, LINE_TOP, 600], [L.bot, LINE_BOTTOM, 2e4, -240]]) {
        ctx.setTransform(s, 0, 0, s, ox, oy); ctx.save(); clipY(ctx, y0, y1);
        ctx.translate(0, from * (1 - k));
        for (const key of keys) drawEl(ctx, logo.byKey[key]);
        ctx.restore();
      }
    });

    const m = seg(t, 0.55, 1.75, between);
    const front = (-0.05 + 1.6 * seg(t, 0.05, 1.35, bez(0.35, 0, 0.15, 1))) * W;
    const fade = 1 - seg(t, 2.35, 3.0, E.fade);
    const g = seg(t, 2.0, 2.65, bez(0.45, 0, 0.25, 1));
    const gx = ox + (logo.x0 - 600 + g * (logo.x1 - logo.x0 + 1200)) * s;
    return [LyWorld, m, zoom, front, fade, Ly, 2.2, gx, Math.sin(Math.PI * g) * 0.85 * fade];
  },
};
