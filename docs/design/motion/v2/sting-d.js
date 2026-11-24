// D · Surfacing. The letters rise through the waterline one after another, left to right: igarapé and
// refracted under the water, white and sharp above it. Each one sends a ripple along the surface. The ripples
// and the refraction die out to exactly zero, a glint runs along the waterline, the surface line goes, and the
// logo holds (with a slow push-in).
import { E, bez, seg, clamp, drawEl, clipY } from './engine.js';
import { LINE_TOP, LINE_BOTTOM, WEAVE_Y } from './logo-paths.js';

const arrive = bez(0.16, 1, 0.3, 1);
const S0 = 0.28; // px per font unit at the end (the word is 977 px wide)
const CX = 1760, CY = -330; // the word's optical centre in font units, placed at the frame's centre
const GROUPS = [['t'], ['r'], ['a'], ['v'], ['e'], ['ss'], ['i', 'dot'], ['a2']];
const START = 0.35, STAGGER = 0.065, RISE = 1.25, DEPTH = 760;

const rise = (t, i) => DEPTH * (1 - arrive(clamp((t - START - i * STAGGER) / RISE)));

export default {
  duration: 4.6,
  frag: `
float blurA(sampler2D s, vec2 p, float r) {
  if (r < .3) return A(s, p);
  float a = 0.;
  for (int i = 0; i < 12; i++) { float an = float(i) * 2.39996; float rr = r * sqrt((float(i) + .5) / 12.); a += A(s, p + rr * vec2(cos(an), sin(an))); }
  return a / 12.;
}
vec3 scene(vec2 px) {
  float Ly = u_p[0], water = u_p[1], amp = u_p[2];
  float d = px.y - Ly;
  vec3 c = RIO;
  c = mix(c, hex(0x0E4837), water * .38 * smoothstep(-2., 6., d) * exp(-max(d, 0.) / 220.));
  vec2 q = px + amp * smoothstep(0., 24., d) * vec2(
    snoise(vec3(px * vec2(.006, .014) + vec2(-u_t * .5, 0.), u_t * .4)),
    .6 * snoise(vec3(px * vec2(.006, .014) + vec2(9.1, -u_t * .3), u_t * .4)));
  float a = blurA(u_bot, q, water * clamp(d / 50., 0., 1.) * 5.);
  a *= mix(1., exp(-max(d - 30., 0.) / 120.), water);
  c = mix(c, IGA, a);
  // The white halves reflected on the surface, broken up by the same water.
  float rf = A(u_top, vec2(q.x, 2. * Ly - q.y + 4.)) * water * .1 * exp(-max(d, 0.) / 70.) * step(0., d);
  c = mix(c, WHITE, rf * (1. - a));
  c = mix(c, WHITE, A(u_top, px));
  float g = u_p[4] * exp(-pow((px.x - u_p[3]) / 150., 2.)) * exp(-pow(d / 2.6, 2.));
  c = mix(c, mix(hex(0x95F1CF), WHITE, .5), clamp(g, 0., 1.));
  vec4 f = T(u_fx, px);
  return mix(c, f.rgb, f.a);
}`,
  draw(t, L, { logo, W, H }) {
    const s = S0 * (1 + 0.016 * t / 4.6);
    const ox = W / 2 - CX * s, oy = H / 2 - CY * s;
    const Ly = oy + WEAVE_Y * s;

    for (const [ctx, y0, y1] of [[L.top, -2e4, LINE_TOP], [L.bot, LINE_BOTTOM, 2e4]]) {
      ctx.setTransform(s, 0, 0, s, ox, oy); ctx.save(); clipY(ctx, y0, y1);
      GROUPS.forEach((keys, i) => {
        const dy = rise(t, i);
        ctx.save(); ctx.translate(0, dy);
        for (const k of keys) drawEl(ctx, logo.byKey[k]);
        ctx.restore();
      });
      ctx.restore();
    }

    // The surface line with its ripples (screen pixels).
    const draw = seg(t, 0.05, 0.75, arrive), gone = seg(t, 2.1, 2.75, E.fade);
    if (draw > 0 && gone < 1) {
      const waves = GROUPS.map((keys, i) => {
        const e = logo.byKey[keys[0]], tc = START + i * STAGGER + 0.04;
        return { x: ox + e.cx * s, half: (e.x1 - e.x0) * s / 2, tc };
      });
      const x1 = draw * W;
      const g = L.fx; g.setTransform(1, 0, 0, 1, 0, 0);
      g.beginPath();
      for (let x = 0; x <= x1; x += 3) {
        let h = 0;
        for (const w of waves) {
          const tau = t - w.tc; if (tau <= 0) continue;
          const r = Math.max(0, Math.abs(x - w.x) - w.half), front = 700 * tau;
          if (r > front) continue;
          h += 3.2 * Math.exp(-tau / 0.42) * Math.exp(-r / 420) * Math.sin(r * 0.05 - tau * 16) * clamp((front - r) / 80);
        }
        x === 0 ? g.moveTo(x, Ly + h) : g.lineTo(x, Ly + h);
      }
      g.lineWidth = 1.5; g.strokeStyle = `rgba(83, 228, 183, ${0.55 * (1 - gone)})`; g.stroke();
      // fade the line's tip so it doesn't end in a hard cut while drawing
      if (draw < 1) { const gr = g.createLinearGradient(x1 - 240, 0, x1, 0); gr.addColorStop(0, 'rgba(15,28,36,0)'); gr.addColorStop(1, 'rgba(15,28,36,1)'); g.globalCompositeOperation = 'destination-out'; g.fillStyle = gr; g.fillRect(x1 - 240, Ly - 20, 240, 40); g.globalCompositeOperation = 'source-over'; }
    }

    const water = 1 - seg(t, 1.1, 2.15, E.fade);
    const amp = 9 * (1 - seg(t, 0.8, 2.05, bez(0.3, 0, 0.2, 1)));
    const gl = seg(t, 1.85, 2.5, bez(0.45, 0, 0.25, 1));
    const glX = ox + (logo.x0 - 500 + gl * (logo.x1 - logo.x0 + 1000)) * s;
    const glA = Math.sin(Math.PI * gl) * 0.9;
    return [Ly, water, amp, glX, glA];
  },
};
