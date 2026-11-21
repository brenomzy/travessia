// Hero seam treatments for the step 7 accent study (2026-11-21). Same noise, cells and Bayer dither as
// texture-lab/gen5.mjs, two colours only. Run: node hero-gen.mjs <out-dir>
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = process.argv[2] ?? ".";
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

const DARK = hex("#0F1C24"), LIGHT = hex("#00C99B");
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16);
const CELL = 6;
// Snap to 6 px cells, evaluate coverage, dither.
function dither(name, cover) {
  render(name, (u, v, x, y) => {
    const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL);
    const su = (cx * CELL + CELL / 2) / W, sv = (cy * CELL + CELL / 2) / H;
    const f = clamp(cover(su, sv));
    return f > bayer[(cy % 4) * 4 + (cx % 4)] ? LIGHT : DARK;
  });
}
const warpAt = (u, v, s = 1.6) => {
  const px = u * aspect * s, py = v * s;
  const qx = fbm(px, py), qy = fbm(px + 5.2, py + 1.3);
  return fbm(px + 3 * qx, py + 3 * qy);
};

size(2560, 1520);

// A · Glow: a pool of light water behind the product, fading into the dark. Ramp's "light", dithered.
dither("hero-glow.png", (u, v) => {
  const dx = (u - 0.7) / 0.34, dy = (v - 0.62) / 0.5;
  const d = Math.sqrt(dx * dx + dy * dy);
  return (1 - d) * 1.35 + warpAt(u, v) * 0.55;
});

// B · Horizon: the seam laid flat, low in the frame. The dark sky holds the copy; light water at the foot.
dither("hero-horizon.png", (u, v) => {
  const b = v - 0.8 + warpAt(u, v, 2.2) * 0.16;
  return 0.5 + b * 7 + warpAt(u + 3, v, 1.2) * 0.15;
});

// C · Rising: light water comes up from the bottom-right corner only, away from the copy and the button.
dither("hero-rising.png", (u, v) => {
  const dx = (u - 1.05) / 0.75, dy = (v - 1.1) / 0.75;
  const d = Math.sqrt(dx * dx + dy * dy);
  return (1 - d) * 2.2 + warpAt(u, v, 2) * 0.7;
});

// D · Mist: sparse light cells across the right half, no solid area. The meeting as texture, not a surface.
dither("hero-mist.png", (u, v) => {
  const ramp = smooth(0.35, 1.0, u) * 0.5;
  return ramp + warpAt(u, v, 2.4) * 0.6 - 0.12;
});
