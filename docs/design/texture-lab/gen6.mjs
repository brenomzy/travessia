// Water texture studies for Travessia. Renders still frames of shader-style
// effects to PNG (and one SVG) so they can be placed in Paper.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.argv[2] ?? ".", "covers");
mkdirSync(OUT, { recursive: true });
let W = 1216, H = 760;

// ---------- PNG writer ----------
const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};
function savePNG(name, px) {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 3 + 1)] = 0;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3, o = y * (W * 3 + 1) + 1 + x * 3;
      raw[o] = px[i]; raw[o + 1] = px[i + 1]; raw[o + 2] = px[i + 2];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0)),
  ]);
  writeFileSync(join(OUT, name), png);
  console.log("wrote", name);
}
function render(name, fn) {
  const px = new Uint8ClampedArray(W * H * 3);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const [r, g, b] = fn(x / W, y / H, x, y);
    const i = (y * W + x) * 3;
    px[i] = r; px[i + 1] = g; px[i + 2] = b;
  }
  savePNG(name, px);
}

// ---------- maths ----------
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
const fract = (v) => v - Math.floor(v);

let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const perm = new Uint8Array(512);
{ const p = [...Array(256).keys()]; for (let i = 255; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } for (let i = 0; i < 512; i++) perm[i] = p[i & 255]; }
const grad = (h, x, y) => { const g = h & 7; const u = g < 4 ? x : y, v = g < 4 ? y : x; return ((g & 1) ? -u : u) + ((g & 2) ? -2 * v : 2 * v); };
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
function noise(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = perm[X] + Y, b = perm[X + 1] + Y;
  const l1 = grad(perm[a], x, y) + u * (grad(perm[b], x - 1, y) - grad(perm[a], x, y));
  const l2 = grad(perm[a + 1], x, y - 1) + u * (grad(perm[b + 1], x - 1, y - 1) - grad(perm[a + 1], x, y - 1));
  return (l1 + v * (l2 - l1)) * 0.5; // ~[-1,1]
}
const fbm = (x, y, o = 5) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * noise(x * f, y * f); f *= 2; a *= 0.5; } return s; };
const grain = (x, y) => (fract(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) - 0.5);
let aspect = W / H;
const size = (w, h) => { W = w; H = h; aspect = w / h; };

function encontroField(u, v) {
  const px = u * aspect * 1.6, py = v * 1.6;
  const mixAmt = 0.25 + 0.75 * smooth(0.0, 1.0, u); // calmer on the left, mixing to the right
  const qx = fbm(px, py * 2.5), qy = fbm(px + 5.2, py * 2.5 + 1.3);
  const rx = fbm(px + 4 * qx + 1.7, py * 2.5 + 4 * qy + 9.2), ry = fbm(px + 4 * qx + 8.3, py * 2.5 + 4 * qy + 2.8);
  const warp = fbm(px + 4 * rx, py * 2.5 + 4 * ry);
  const boundary = (v - 0.5) + warp * 1.25 * mixAmt + fbm(px * 0.6 + 20, 3) * 0.15;
  return { boundary, warp, mixAmt, rx };
}

// ---------- Tapajós palette ----------
const P = {
  branco: hex("#FFFFFF"), nevoa: hex("#EAF8F8"), a100: hex("#CDEFF0"), a200: hex("#9FE0E3"),
  a300: hex("#5FCAD0"), a400: hex("#2DB6BF"), a500: hex("#13A7B5"), a600: hex("#0E8A99"),
  a700: hex("#0B5E73"), a800: hex("#0B4456"), noite: hex("#0F1C24"),
};
const ramp = (stops, t) => { t = clamp(t) * (stops.length - 1); const i = Math.min(stops.length - 2, Math.floor(t)); return mix(stops[i], stops[i + 1], t - i); };
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16);
const TAU = Math.PI * 2;

// caustic light, 0..1
function caustic(u, v, scale = 0.62, time = 3.7, sharp = 14) {
  let px = ((u * aspect * scale * TAU) % TAU) - 250, py = ((v * scale * TAU) % TAU) - 250;
  let ix = px, iy = py, c = 1; const inten = 0.005;
  for (let n = 0; n < 5; n++) {
    const t = time * (1 - 3.5 / (n + 1));
    const nix = px + Math.cos(t - ix) + Math.sin(t + iy);
    const niy = py + Math.sin(t - iy) + Math.cos(t + ix);
    ix = nix; iy = niy;
    c += 1 / Math.hypot(px / (Math.sin(ix + t) / inten), py / (Math.cos(iy + t) / inten));
  }
  c /= 5; c = 1.17 - Math.pow(c, 1.4);
  return clamp(Math.pow(Math.abs(c), sharp) * 1.6);
}
// crisp caustic net: warped Voronoi cell edges, two layers
const h2 = (x, y, k) => fract(Math.sin(x * 127.1 + y * 311.7 + k * 74.7) * 43758.5453);
function vor(px, py, k) {
  const ix = Math.floor(px), iy = Math.floor(py);
  let f1 = 9, f2 = 9;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const cx = ix + i, cy = iy + j;
    const dx = cx + 0.15 + 0.7 * h2(cx, cy, k) - px, dy = cy + 0.15 + 0.7 * h2(cy, cx, k + 1) - py;
    const d = Math.hypot(dx, dy);
    if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) f2 = d;
  }
  return f2 - f1;
}
function causticV(u, v, scale = 5, warpAmt = 1.0) {
  // stretched along the flow (x), strongly warped so edges curve
  let px = u * aspect * scale * 0.55, py = v * scale;
  const wx = fbm(px * 0.5 + 11, py * 0.5, 4), wy = fbm(px * 0.5, py * 0.5 + 7, 4);
  px += wx * warpAmt * 1.1; py += wy * warpAmt * 1.1;
  const e1 = vor(px, py, 1), e2 = vor(px * 1.6 + 3.1, py * 1.6 + 1.7, 5);
  const l1 = Math.exp(-e1 * 22) * 0.95 + Math.exp(-e1 * 6) * 0.18;
  const l2 = Math.exp(-e2 * 30) * 0.4 + Math.exp(-e2 * 8) * 0.08;
  // sunlight comes and goes in patches
  const sun = 0.25 + 0.95 * smooth(-0.25, 0.35, fbm(u * aspect * 1.3 + 40, v * 1.6, 3));
  return clamp((Math.max(l1, l2) + l1 * l2 * 0.6) * sun);
}
const depthAt = (u, v) => smooth(0.0, 1.0, v * 0.55 + u * 0.25 + fbm(u * 1.8, v * 1.8 + 4, 3) * 0.45);

size(1600, 840);
const B = (cx, cy) => bayer[(cy % 4) * 4 + (cx % 4)];

// halftone helper: rotated screen, dot radius from value 0..1
function halftone(x, y, cell, angle, valueAt) {
  const a = angle, rx = x * Math.cos(a) - y * Math.sin(a), ry = x * Math.sin(a) + y * Math.cos(a);
  const gx = Math.floor(rx / cell) + 0.5, gy = Math.floor(ry / cell) + 0.5;
  const cxp = gx * cell * Math.cos(-a) - gy * cell * Math.sin(-a), cyp = gx * cell * Math.sin(-a) + gy * cell * Math.cos(-a);
  const val = valueAt(cxp / W, cyp / H);
  if (val <= 0.02) return 0;
  const r = Math.sqrt(val) * cell * 0.62, d = Math.hypot(rx - gx * cell, ry - gy * cell);
  return (1 - smooth(r - 0.9, r + 0.9, d)) * smooth(0.02, 0.08, val);
}

const presets = {
  // two currencies meeting: vertical seam
  cambio: (s) => (u, v, x, y) => {
    const cell = 5, cx = Math.floor(x / cell), cy = Math.floor(y / cell);
    const uu = (cx * cell) / W, vv = (cy * cell) / H, o = s * 7.31;
    const px = vv * 2.4 + o, py = uu * 3.5;
    const qx = fbm(px, py), qy = fbm(px + 5.2, py + 1.3 + o);
    const warp = fbm(px + 4 * qx, py + 4 * qy);
    const at = 0.38 + fract(s * 0.37) * 0.24;
    const f = clamp(0.5 + ((uu - at) + warp * 0.2) * 7 + warp * 0.2);
    return f > B(cx, cy) ? P.a500 : P.noite;
  },
  // tax brackets: terraced halftone depth
  impostos: (s) => (u, v, x, y) => {
    const o = s * 3.17;
    const cov = halftone(x, y, 16, Math.PI / 4, (uu, vv) => {
      const n = fbm(uu * 1.6 + o, vv * 1.6, 3) * 0.5 + uu * 0.75 + vv * 0.25 - 0.2;
      return clamp(Math.floor(clamp(n) * 6) / 5);
    });
    return mix(P.nevoa, P.a700, cov);
  },
  // invoices: dithered ledger lines
  faturas: (s) => (u, v, x, y) => {
    const cell = 5, cx = Math.floor(x / cell), cy = Math.floor(y / cell);
    const uu = (cx * cell) / W, vv = (cy * cell) / H;
    const rows = 9, row = Math.floor(vv * rows), inRow = fract(vv * rows);
    if (inRow < 0.3 || inRow > 0.78) return P.branco;
    const r = fract(Math.sin((row + 1) * 91.7 + s * 13.1) * 4375.5);
    const len = 0.35 + r * 0.55, start = 0.06 + (row % 3 === 0 ? 0 : 0.08);
    if (uu < start || uu > start + len) return P.branco;
    const t = (uu - start) / len;
    const f = clamp(1.1 - t * 1.1 + fbm(uu * 6 + s, row * 1.3, 2) * 0.3);
    return f > B(cx, cy) ? (row % 4 === 1 ? P.noite : P.a500) : P.a100;
  },
  // guides: a halftone river path across the cover
  guias: (s) => (u, v, x, y) => {
    const o = s * 2.41;
    const cov = halftone(x, y, 14, Math.PI / 6, (uu, vv) => {
      const yc = 0.5 + 0.22 * Math.sin(uu * 4.2 + o) + fbm(uu * 2 + o, 5, 3) * 0.12;
      const w = 0.12 + 0.04 * fbm(uu * 3, 9 + o, 2);
      return clamp(Math.exp(-Math.pow((vv - yc) / w, 2)) * (0.75 + 0.4 * fbm(uu * 4, vv * 4 + o, 3)) - 0.06);
    });
    return mix(P.branco, P.a700, cov);
  },
  // product news: ripples from a drop
  novidades: (s) => (u, v, x, y) => {
    const ox = 0.62 + fract(s * 0.61) * 0.2, oy = 0.45 + fract(s * 0.29) * 0.2;
    const cov = halftone(x, y, 13, 0, (uu, vv) => {
      const d = Math.hypot((uu - ox) * aspect, vv - oy);
      const ring = 0.5 + 0.5 * Math.cos(d * 26 - fbm(uu * 2, vv * 2 + s, 2) * 3);
      return clamp(ring * (1 - smooth(0.2, 1.3, d)) * 1.05);
    });
    return mix(P.noite, P.a400, cov);
  },
};



// Novidades option A: the wake behind something moving forward
presets.wake = (s) => (u, v, x, y) => {
  const ax = 0.12 + fract(s * 0.37) * 0.1, ay = 0.42 + fract(s * 0.53) * 0.16;
  const cov = halftone(x, y, 12, Math.PI / 12, (uu, vv) => {
    const dx = (uu - ax) * aspect, dy = vv - ay;
    if (dx <= 0) return 0;
    const ang = Math.atan2(Math.abs(dy), dx), spread = 0.34;
    const edge = Math.exp(-Math.pow((ang - spread) / 0.07, 2));
    const inner = ang < spread ? 0.35 * (0.5 + 0.5 * Math.sin(dx * 30 - Math.abs(dy) * 10 + fbm(uu * 3, vv * 3 + s, 2) * 3)) : 0;
    const fade = Math.exp(-dx * 0.55) * smooth(0, 0.06, dx);
    return clamp((edge + inner) * fade * 1.15);
  });
  return mix(P.noite, P.a400, cov);
};
// Novidades option B: release lines, each update a dithered streak flowing right
presets.streaks = (s) => (u, v, x, y) => {
  const cell = 5, cx = Math.floor(x / cell), cy = Math.floor(y / cell);
  const uu = (cx * cell) / W, vv = (cy * cell) / H;
  const lanes = 14, lane = Math.floor(vv * lanes), inLane = fract(vv * lanes);
  const r = fract(Math.sin((lane + 1) * 57.3 + s * 9.7) * 4375.5);
  const head = 0.35 + r * 0.6, thick = 0.25 + 0.35 * fract(r * 7.1);
  if (Math.abs(inLane - 0.5) > thick / 2) return P.noite;
  const t = clamp((uu - (head - 0.55)) / 0.55);
  const f = uu > head ? 0 : Math.pow(t, 1.6) * (0.85 + 0.3 * fbm(uu * 8, lane + s, 2));
  return f > B(cx, cy) ? (lane % 5 === 2 ? P.a200 : P.a500) : P.noite;
};



// "safe area" variants: the pattern keeps the left 45% calm so a title can sit directly on it
const safe = (fn, ground) => (s) => { const f = fn(s); return (u, v, x, y) => (u < 0.46 ? ground : f(u, v, x, y)); };
presets.faturasSafe = (s) => (u, v, x, y) => {
  const cell = 5, cx = Math.floor(x / cell), cy = Math.floor(y / cell);
  const uu = (cx * cell) / W, vv = (cy * cell) / H;
  const rows = 9, row = Math.floor(vv * rows), inRow = fract(vv * rows);
  if (inRow < 0.3 || inRow > 0.78) return P.branco;
  const r = fract(Math.sin((row + 1) * 91.7 + s * 13.1) * 4375.5);
  const len = 0.25 + r * 0.25, end = 0.96 - (row % 3 === 0 ? 0 : 0.05), start = end - len;
  if (uu < start || uu > end) return P.branco;
  const t = (end - uu) / len;
  const f = clamp(1.1 - t * 1.1 + fbm(uu * 6 + s, row * 1.3, 2) * 0.3);
  return f > B(cx, cy) ? (row % 4 === 1 ? P.noite : P.a500) : P.a100;
};



// calm-side mask: the pattern dithers out toward the left 45%
const calm = (fn, ground) => (s) => { const f = fn(s); return (u, v, x, y) => {
  const cx = Math.floor(x / 4), cy = Math.floor(y / 4);
  const keep = smooth(0.40, 0.62, u + (fbm(v * 3, s, 2)) * 0.05);
  return keep > B(cx, cy) ? f(u, v, x, y) : ground;
}; };
render("impostos-safe.png", calm(presets.impostos, P.nevoa)(1));
render("guias-safe.png", calm(presets.guias, P.branco)(1));
render("novidades-safe.png", calm(presets.streaks, P.noite)(1));
render("faturas-safe.png", presets.faturasSafe(1));
render("cambio-safe.png", presets.cambio(5));
console.log("done");
