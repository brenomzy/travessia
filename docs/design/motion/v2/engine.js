// Sting engine: the wordmark as separate letters, three 2D mask layers and a WebGL2 compositor with
// sub-frame motion blur (a 180° shutter by default), blended in linear light and dithered on output.
// A sting module exports { duration, frag, images?, draw(t, L, env) } (see sting-*.js).
import { WORD, S, S1_X, S2_X, WEAVE_Y } from './logo-paths.js';

export const W = 1920, H = 1080;

// ---------- Timing ----------
export function bez(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t, sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 10; i++) { const e = sx(t) - x, d = dx(t); if (Math.abs(e) < 1e-6 || !d) break; t -= e / d; }
    if (Math.abs(sx(t) - x) > 1e-4) { let lo = 0, hi = 1; t = x; for (let i = 0; i < 30; i++) { if (sx(t) < x) lo = t; else hi = t; t = (lo + hi) / 2; } }
    return sy(t);
  };
}
export const E = {
  // From src/tokens/tokens.json (motion.ease.*)
  base: bez(0.2, 0, 0, 1), out: bez(0.215, 0.61, 0.355, 1), in: bez(0.4, 0, 1, 1), inout: bez(0.65, 0, 0.35, 1),
  expo: bez(0.19, 1, 0.22, 1), fade: bez(0, 0, 0.58, 1),
  linear: (t) => t,
};
/** Critically damped spring, normalised so it lands on 1 at t = 1. k sets how early it settles. */
export const crit = (k = 7) => (t) => { const n = 1 - (1 + k) * Math.exp(-k); return Math.min(1, (1 - (1 + k * t) * Math.exp(-k * t)) / n); };
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const seg = (t, a, b, e = E.linear) => e(clamp((t - a) / (b - a)));

// ---------- The wordmark ----------
function points(d) {
  const tk = d.match(/[A-Za-z]|-?\d*\.?\d+/g); const pts = []; let cmd = 'M', i = 0, x = 0, y = 0;
  while (i < tk.length) {
    if (/[A-Za-z]/.test(tk[i])) { cmd = tk[i++]; if (cmd === 'Z') continue; }
    if (cmd === 'M' || cmd === 'L') { x = +tk[i++]; y = +tk[i++]; pts.push([x, y]); if (cmd === 'M') cmd = 'L'; }
    else if (cmd === 'H') { x = +tk[i++]; pts.push([x, y]); }
    else if (cmd === 'V') { y = +tk[i++]; pts.push([x, y]); }
    else if (cmd === 'Q') { pts.push([+tk[i], +tk[i + 1]]); x = +tk[i + 2]; y = +tk[i + 3]; i += 4; pts.push([x, y]); }
    else throw new Error('path command ' + cmd);
  }
  return pts;
}
const bboxOf = (pts) => pts.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [1e9, 1e9, -1e9, -1e9]);

function ssSprite(res) {
  const x0 = S1_X + 0, y0 = -560, w = S2_X + 480 - x0, h = 620;
  const make = () => { const c = new OffscreenCanvas(Math.ceil(w * res), Math.ceil(h * res)); const g = c.getContext('2d'); g.setTransform(res, 0, 0, res, -x0 * res, -y0 * res); return [c, g]; };
  const s = new Path2D(S);
  const one = (x, cutX, cutAbove) => {
    const [c, g] = make();
    g.save(); g.translate(x, 0); g.fill(s); g.restore();
    g.globalCompositeOperation = 'destination-out';
    g.save(); g.beginPath(); if (cutAbove) g.rect(-1e4, -1e4, 2e4, 1e4 + WEAVE_Y); else g.rect(-1e4, WEAVE_Y, 2e4, 1e4); g.clip();
    g.translate(cutX, 0); g.lineWidth = 60; g.lineJoin = 'round'; g.fill(s); g.stroke(s); g.restore();
    return c;
  };
  const a = one(S1_X, S2_X, false), b = one(S2_X, S1_X, true);
  const [c, g] = make(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(a, 0, 0); g.drawImage(b, 0, 0);
  return { canvas: c, x0, y0, w, h };
}

/** Elements left to right: t r a v e ss i dot a2. Coordinates are font units (y up is negative). */
export function buildLogo() {
  const subs = WORD.match(/M[^M]*/g).map((d) => ({ d, b: bboxOf(points(d)) }));
  const centres = { t: 190, r: 540, a: 918, v: 1379, e: 1855, i: 2963, a2: 3284 };
  const groups = {};
  for (const sp of subs) {
    const cx = (sp.b[0] + sp.b[2]) / 2;
    let key = Object.keys(centres).reduce((k, n) => (Math.abs(centres[n] - cx) < Math.abs(centres[k] - cx) ? n : k), 't');
    if (key === 'i' && sp.b[3] < -580) key = 'dot';
    (groups[key] ||= []).push(sp);
  }
  const el = (key) => {
    const g = groups[key]; const p = new Path2D(g.map((s) => s.d).join(''));
    const b = g.reduce((a, s) => [Math.min(a[0], s.b[0]), Math.min(a[1], s.b[1]), Math.max(a[2], s.b[2]), Math.max(a[3], s.b[3])], [1e9, 1e9, -1e9, -1e9]);
    return { key, path: p, x0: b[0], y0: b[1], x1: b[2], y1: b[3], cx: (b[0] + b[2]) / 2, cy: (b[1] + b[3]) / 2 };
  };
  const sprite = ssSprite(1.2);
  const ss = { key: 'ss', sprite, x0: S1_X + 34, x1: S2_X + 439, y0: -512, y1: 12, cx: (S1_X + 34 + S2_X + 439) / 2, cy: -250 };
  const order = ['t', 'r', 'a', 'v', 'e', 'ss', 'i', 'dot', 'a2'];
  const els = order.map((k) => (k === 'ss' ? ss : el(k)));
  return { els, byKey: Object.fromEntries(els.map((e) => [e.key, e])), x0: 16, x1: 3504 };
}

/** Fills one element in the current transform (font units). */
export function drawEl(ctx, e) {
  if (e.sprite) { const s = e.sprite; ctx.drawImage(s.canvas, s.x0, s.y0, s.w, s.h); }
  else ctx.fill(e.path);
}
/** Clip to a band of y (font units) in the current transform. */
export function clipY(ctx, y0, y1) { ctx.beginPath(); ctx.rect(-2e4, y0, 4e4, y1 - y0); ctx.clip(); }

// ---------- Compositor ----------
const HEAD = `#version 300 es
precision highp float;
uniform vec2 u_res; uniform float u_t, u_w;
uniform sampler2D u_top, u_bot, u_fx, u_img0, u_img1;
uniform float u_p[24];
out vec4 o;
vec3 hex(int h) { return vec3(float((h >> 16) & 255), float((h >> 8) & 255), float(h & 255)) / 255.; }
#define RIO hex(0x0F1C24)
#define IGA hex(0x00C99B)
#define WHITE vec3(1.)
float A(sampler2D s, vec2 px) { return texture(s, px / u_res).a; }
vec4 T(sampler2D s, vec2 px) { return texture(s, px / u_res); }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z); vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0; vec4 s1 = floor(b1) * 2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0); m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
float fbm3(vec3 p) { float s = 0., a = .5; for (int i = 0; i < 3; i++) { s += a * snoise(p); p = p * 2.02 + 17.1; a *= .5; } return s; }
`;
const MAIN = `
void main() {
  vec2 px = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec3 c = clamp(scene(px), 0., 1.);
  o = vec4(pow(c, vec3(2.2)) * u_w, 1.);
}`;
const OUT_V = `#version 300 es
in vec2 a; void main() { gl_Position = vec4(a, 0., 1.); }`;
const OUT_F = `#version 300 es
precision highp float;
uniform sampler2D u_acc; uniform vec2 u_res; uniform float u_seed; out vec4 o;
float hash(vec2 p) { p = fract(p * vec2(443.897, 441.423) + u_seed); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
void main() {
  vec3 c = texture(u_acc, gl_FragCoord.xy / u_res).rgb;
  c = pow(max(c, 0.), vec3(1. / 2.2));
  c += (hash(gl_FragCoord.xy) + hash(gl_FragCoord.xy + 7.13) - 1.) / 255.;
  o = vec4(c, 1.);
}`;

function program(gl, vs, fs) {
  const p = gl.createProgram();
  for (const [type, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) + '\n' + src.split('\n').map((l, i) => i + 1 + ' ' + l).join('\n'));
    gl.attachShader(p, s);
  }
  gl.bindAttribLocation(p, 0, 'a'); gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}
const loadImage = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

export async function mount(sting, canvas) {
  canvas.width = W; canvas.height = H;
  const gl = canvas.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true });
  gl.getExtension('EXT_color_buffer_float');
  const layer = () => { const c = new OffscreenCanvas(W, H); return [c, c.getContext('2d')]; };
  const [cTop, top] = layer(), [cBot, bot] = layer(), [cFx, fx] = layer();
  const scene = program(gl, OUT_V, HEAD + sting.frag + MAIN);
  const out = program(gl, OUT_V, OUT_F);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const tex = (unit, src, repeat) => {
    const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, src ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    const wrap = repeat ? gl.MIRRORED_REPEAT : gl.CLAMP_TO_EDGE;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
    if (src) { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src); gl.generateMipmap(gl.TEXTURE_2D); }
    return t;
  };
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  const tTop = tex(0), tBot = tex(1), tFx = tex(2);
  const imgs = await Promise.all((sting.images || []).map(loadImage));
  imgs.forEach((im, k) => tex(3 + k, im, true));
  const accTex = gl.createTexture(); gl.activeTexture(gl.TEXTURE7); gl.bindTexture(gl.TEXTURE_2D, accTex);
  gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, W, H);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  const fbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, accTex, 0);

  gl.useProgram(scene);
  const U = (n) => gl.getUniformLocation(scene, n);
  gl.uniform2f(U('u_res'), W, H);
  [['u_top', 0], ['u_bot', 1], ['u_fx', 2], ['u_img0', 3], ['u_img1', 4]].forEach(([n, k]) => gl.uniform1i(U(n), k));
  const uT = U('u_t'), uW = U('u_w'), uP = U('u_p');
  gl.useProgram(out);
  gl.uniform1i(gl.getUniformLocation(out, 'u_acc'), 7);
  gl.uniform2f(gl.getUniformLocation(out, 'u_res'), W, H);
  const uSeed = gl.getUniformLocation(out, 'u_seed');
  const env = { logo: buildLogo(), W, H, imgs };
  if (sting.init) sting.init(env);

  const upload = (unit, t, c) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c); };
  function sub(t, w) {
    for (const g of [top, bot, fx]) { g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); g.fillStyle = '#fff'; g.strokeStyle = '#fff'; g.imageSmoothingQuality = 'high'; }
    const p = sting.draw(t, { top, bot, fx }, env) || [];
    upload(0, tTop, cTop); upload(1, tBot, cBot); upload(2, tFx, cFx);
    gl.useProgram(scene); gl.uniform1f(uT, t); gl.uniform1f(uW, w);
    const arr = new Float32Array(24); arr.set(p.slice(0, 24)); gl.uniform1fv(uP, arr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  let seed = 0;
  /** Renders the frame at time t: n sub-frames spread over the shutter (fraction of a frame at fps). */
  function frame(t, n = 1, fps = 60, shutter = 0.5) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo); gl.viewport(0, 0, W, H);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    for (let k = 0; k < n; k++) sub(Math.max(0, t + ((k + 0.5) / n - 0.5) * shutter / fps), 1 / n);
    gl.disable(gl.BLEND);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.useProgram(out); gl.uniform1f(uSeed, (seed++ % 64) * 0.137);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  return { frame, duration: sting.duration };
}
