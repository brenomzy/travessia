// Travessia hero river, chosen 2026-11-21 (River lab 5, tile 8i): 5j water, clean bank echoes,
// 7i's course, width breathing slowly along its length. WebGL 1 fragment shader; uniforms uRes, uTime, uDpr.
// Reference for the port into src/lib/generators/seam (WebGL 2). Shared noise and palette first, then the river.
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uDpr;
const vec3 DARK = vec3(15., 28., 36.) / 255.;
const vec3 D600 = vec3(42., 62., 72.) / 255.;
const vec3 LIGHT = vec3(0., 201., 155.) / 255.;
const vec3 L200 = vec3(149., 241., 207.) / 255.;
const vec3 L300 = vec3(83., 228., 183.) / 255.;
const vec3 DEEP = vec3(14., 107., 82.) / 255.;
const vec3 D800 = vec3(14., 72., 55.) / 255.;
const vec3 WHITE = vec3(1.);
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
float fbm(vec3 p) { float s = 0., a = .5; for (int i = 0; i < 5; i++) { s += a * snoise(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
float fbm3(vec3 p) { float s = 0., a = .5; for (int i = 0; i < 3; i++) { s += a * snoise(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float bayer4(vec2 a) { return bayer2(.5 * a) * .25 + bayer2(a); }
float grain(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
#define SHAPE 1
#define MOVE 0.000
#define BREATH 0.140
#define FLOWK 1.00

// 7i (5j water, clean echoes) on any course. a runs along the river, c across it, both in height units.
float cen(float a, float t) {
  float ph = MOVE * t; float asp = uRes.x / uRes.y;
#if SHAPE == 1
  return (.66 + .13 * sin(a * 4.2 + .6 + ph) + .05 * sin(a * 9.1 + 2.3 + ph * 1.7) + .015 * sin(a * 17. + 1.) + .022 * snoise(vec3(a * 2.5, 0., t * .02))) * asp;
#elif SHAPE == 2
  return (.5 + .07 * sin(a * 3. + .4 + ph) + .025 * sin(a * 7.3 + 1. + ph)) * asp;
#elif SHAPE == 3
  return (.3 + .5 * a + .05 * sin(a * 6. + ph) + .02 * sin(a * 13. + 1.)) * asp;
#elif SHAPE == 4
  return .24 + .07 * sin(a * 2.2 + .3 + ph) + .03 * sin(a * 5.1 + 1.2) + .015 * snoise(vec3(a * 1.5, 5., t * .03));
#elif SHAPE == 5
  return (.7 + .09 * sin(a * 12. + .5 + .4 * sin(a * 3.) + ph) + .03 * sin(a * 25. + 2.)) * asp;
#elif SHAPE == 6
  return (.7 + .17 * sin(a * 2.6 + .9 + ph) + .03 * sin(a * 7. + 1.)) * asp;
#else
  return (.6 + .5 * pow(max(a, 0.), 2.2) + .025 * sin(a * 9. + ph)) * asp;
#endif
}
float wid(float an, float t) {
  float n = snoise(vec3(an * 5., 3., t * .015));
#if SHAPE == 2
  return .05 * (1. + .15 * n);
#elif SHAPE == 3
  return mix(.07, .03, an) * (1. + .2 * n);
#elif SHAPE == 4
  return mix(.03, .062, an) * (1. + .2 * n);
#elif SHAPE == 5
  return .022 * (1. + .2 * n);
#elif SHAPE == 6
  return mix(.11, .05, an) * (1. + .15 * n);
#elif SHAPE == 7
  return mix(.075, .03, an) * (1. + .2 * n);
#else
  return mix(.074, .026, smoothstep(0., 1., an)) * (1. + .2 * n);
#endif
}
float lineAA(float k, float px) {
  float fw = max(fwidth(k), 1e-4);
  float l = abs(fract(k - .5) - .5) / fw;
  return 1. - smoothstep(px * .5 - .5, px * .5 + .5, l);
}
void main() {
  vec2 fc = gl_FragCoord.xy; vec2 uv = fc / uRes; float asp = uRes.x / uRes.y; float t = uTime;
  vec2 P = vec2(uv.x * asp, uv.y);
  float tf = t * FLOWK;
#if SHAPE == 4
  float a = asp - P.x; float c = P.y; float an = clamp(a / asp, 0., 1.);
#else
  float a = P.y; float c = P.x; float an = a;
#endif
  float e = .002;
#if SHAPE == 8
  float split = smoothstep(.4, .95, a);
  float base = (.66 + .05 * sin(a * 6. + .4 + MOVE * t) + .02 * snoise(vec3(a * 3., 0., t * .03))) * asp;
  float cA = base - .2 * asp * split, cB = base + .16 * asp * split;
  float w = .032 + .03 * (1. - split);
  float dn = abs(c - cA) < abs(c - cB) ? c - cA : c - cB;
#else
  float w = wid(an, t);
#if SHAPE == 5 || SHAPE == 7
  // Tight or steep bends: search along the river for the nearest point instead of estimating it.
  float best = 1e5, bi = 0.;
  for (int i = -12; i <= 12; i++) { float ai = a + float(i) * .02; vec2 q = vec2(c - cen(ai, t), a - ai); float dd = dot(q, q); if (dd < best) { best = dd; bi = ai; } }
  float b2 = 1e5, sg = 1.;
  for (int i = -6; i <= 6; i++) { float ai = bi + float(i) * .0035; float ci = cen(ai, t); vec2 q = vec2(c - ci, a - ai); float dd = dot(q, q); if (dd < b2) { b2 = dd; sg = sign(c - ci); } }
  float dn = sqrt(b2) * sg;
#else
  float c0 = cen(a, t); float sl = (cen(a + e, t) - cen(a - e, t)) / (2. * e);
  float dn = (c - c0) / sqrt(1. + sl * sl);
#endif
#endif
  w *= 1. + BREATH * sin(t * .3 + a * 2.);
  float dsm = abs(dn) - w;
  float d = dsm + .0035 * fbm3(vec3(P * 26., 1.));
  float s = clamp(dn / w, -1., 1.);
  float depth = 1. - s * s;
  float od = max(d, 0.), ods = max(dsm, 0.);

  // 5j water, unchanged except that it follows the river's own length (a).
  vec3 water = mix(L300, DEEP, depth * .75);
  float flow = a * 3. + tf * .1;
  float l1 = pow(1. - abs(snoise(vec3(s * 1.6, flow, tf * .03))), 16.);
  float l2 = pow(1. - abs(snoise(vec3(s * 3.2, flow * 2.2 + 4., tf * .05 + 2.))), 24.);
  water = mix(water, WHITE, clamp(l1 * .75 + l2 * .5, 0., 1.));
  float crest = smoothstep(.75, 1., abs(s)) * smoothstep(-.2, .6, snoise(vec3(s, a * 22. + tf * .35, 1.)));
  water = mix(water, mix(L200, WHITE, .6), crest * .6);

  // Clean echoes from the smooth bank.
  vec3 land = DARK + fbm3(vec3(P * 3., 7.)) * .015;
  land += LIGHT * .1 * exp(-od * 14.) + DEEP * .09 * exp(-od * 4.);
  float ring = lineAA(ods * 46. - t * .04, 1.) * smoothstep(.006, .012, ods) * exp(-ods * 7.);
  land = mix(land, mix(L300, vec3(.72, .8, .83), smoothstep(0., .18, ods)), clamp(ring, 0., 1.) * .6);

  float aa = fwidth(d) * 1.2;
  float inside = 1. - smoothstep(-aa, aa, d);
  gl_FragColor = vec4(mix(land, water, inside), 1.);
}
