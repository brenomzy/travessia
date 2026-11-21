/**
 * CPU version of the river shader (./index.ts), for stills: the no-JS fallback, Paper boards, social images.
 * Framework-agnostic (SPEC §5.4 rule 7). Same maths as the GLSL; derivatives (fwidth) are estimated from the pixel
 * size, so lines and edges match to within a pixel rather than exactly.
 */
import type { RiverColors } from './index';

// 3D simplex noise (Ashima Arts, MIT), ported from the GLSL.
const mod289 = (x: number) => x - Math.floor(x / 289) * 289;
const permute = (x: number) => mod289((x * 34 + 1) * x);
const fract = (x: number) => x - Math.floor(x);

function snoise(vx: number, vy: number, vz: number): number {
  const F = 1 / 3, G = 1 / 6;
  const s = (vx + vy + vz) * F;
  const i = Math.floor(vx + s), j = Math.floor(vy + s), k = Math.floor(vz + s);
  const t = (i + j + k) * G;
  const x0 = vx - i + t, y0 = vy - j + t, z0 = vz - k + t;
  // Which simplex: the same order the GLSL's step() picks.
  const gx = x0 >= y0 ? 1 : 0, gy = y0 >= z0 ? 1 : 0, gz = z0 >= x0 ? 1 : 0;
  const lx = 1 - gx, ly = 1 - gy, lz = 1 - gz;
  const i1x = Math.min(gx, lz), i1y = Math.min(gy, lx), i1z = Math.min(gz, ly);
  const i2x = Math.max(gx, lz), i2y = Math.max(gy, lx), i2z = Math.max(gz, ly);
  const corners: [number, number, number, number, number, number][] = [
    [x0, y0, z0, 0, 0, 0],
    [x0 - i1x + G, y0 - i1y + G, z0 - i1z + G, i1x, i1y, i1z],
    [x0 - i2x + 2 * G, y0 - i2y + 2 * G, z0 - i2z + 2 * G, i2x, i2y, i2z],
    [x0 - 0.5, y0 - 0.5, z0 - 0.5, 1, 1, 1],
  ];
  const mi = mod289(i), mj = mod289(j), mk = mod289(k);
  let sum = 0;
  for (const [x, y, z, ox, oy, oz] of corners) {
    let m = 0.6 - (x * x + y * y + z * z);
    if (m <= 0) continue;
    const p = permute(permute(permute(mk + oz) + mj + oy) + mi + ox);
    // Gradients on an octahedron from a 7×7 grid, as in the GLSL.
    const jj = p - 49 * Math.floor(p / 49);
    const xq = Math.floor(jj / 7), yq = Math.floor(jj - 7 * xq);
    let ax = xq * (2 / 7) - 13 / 14, ay = yq * (2 / 7) - 13 / 14;
    const h = 1 - Math.abs(ax) - Math.abs(ay);
    if (h <= 0) {
      ax -= Math.floor(ax) * 2 + 1;
      ay -= Math.floor(ay) * 2 + 1;
    }
    const inv = 1 / Math.sqrt(ax * ax + ay * ay + h * h);
    m *= m;
    sum += m * m * (ax * inv * x + ay * inv * y + h * inv * z);
  }
  return 42 * sum;
}

const fbm3 = (x: number, y: number, z: number) => {
  let s = 0, a = 0.5;
  for (let i = 0; i < 3; i++) {
    s += a * snoise(x, y, z);
    x = x * 2.02 + 17.1; y = y * 2.02 + 17.1; z = z * 2.02 + 17.1;
    a *= 0.5;
  }
  return s;
};
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const mixv = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t);

export type StillOptions = RiverColors & { width: number; height: number; time?: number; at?: number };

/** Renders one frame to RGB bytes, top row first (as image files expect). */
export function renderRiverStill(o: StillOptions): Uint8Array {
  const { width: W, height: H } = o;
  const t = o.time ?? 40, at = o.at ?? 0.66, asp = W / H;
  const c = (v: number[]) => v.map((x) => x / 255);
  const DARK = c(o.dark), LIGHT = c(o.light), FOAM = c(o.foam), SHALLOW = c(o.shallow), DEEP = c(o.deep), ECHO = c(o.echo);
  const WHITE = [1, 1, 1];
  const px = 1 / H; // one pixel in height units
  const cen = (a: number) => (at + 0.13 * Math.sin(a * 4.2 + 0.6) + 0.05 * Math.sin(a * 9.1 + 2.3) + 0.015 * Math.sin(a * 17 + 1) + 0.022 * snoise(a * 2.5, 0, t * 0.02)) * asp;
  const wid = (a: number) => (0.074 + (0.026 - 0.074) * smoothstep(0, 1, a)) * (1 + 0.2 * snoise(a * 5, 3, t * 0.015));
  const out = new Uint8Array(W * H * 3);
  // The course only depends on the row: compute it once per row.
  for (let row = 0; row < H; row++) {
    const a = (H - 1 - row + 0.5) / H; // GL's y runs bottom-up
    const e = 0.002;
    const c0 = cen(a), sl = (cen(a + e) - cen(a - e)) / (2 * e);
    const w = wid(a) * (1 + 0.14 * Math.sin(t * 0.3 + a * 2));
    const norm = Math.sqrt(1 + sl * sl);
    for (let col = 0; col < W; col++) {
      const Px = ((col + 0.5) / W) * asp, Py = a;
      const dn = (Px - c0) / norm;
      const dsm = Math.abs(dn) - w;
      const d = dsm + 0.0035 * fbm3(Px * 26, Py * 26, 1);
      const s = Math.max(-1, Math.min(1, dn / w));
      const depth = 1 - s * s;
      const od = Math.max(d, 0), ods = Math.max(dsm, 0);
      let rgb: number[];
      const aa = 1.4 * px;
      const inside = 1 - smoothstep(-aa, aa, d);
      let land = DARK.map((v) => v + fbm3(Px * 3, Py * 3, 7) * 0.015);
      land = land.map((v, i) => v + LIGHT[i] * 0.1 * Math.exp(-od * 14) + DEEP[i] * 0.09 * Math.exp(-od * 4));
      const k = ods * 46 - t * 0.04;
      const fw = 46 * 1.2 * px;
      const l = Math.abs(fract(k - 0.5) - 0.5) / fw;
      const ring = (1 - smoothstep(0, 1, l)) * smoothstep(0.006, 0.012, ods) * Math.exp(-ods * 7);
      land = mixv(land, mixv(SHALLOW, ECHO, smoothstep(0, 0.18, ods)), Math.min(1, ring) * 0.6);
      if (inside > 0) {
        let water = mixv(SHALLOW, DEEP, depth * 0.75);
        const flow = a * 3 + t * 0.1;
        const l1 = Math.pow(1 - Math.abs(snoise(s * 1.6, flow, t * 0.03)), 16);
        const l2 = Math.pow(1 - Math.abs(snoise(s * 3.2, flow * 2.2 + 4, t * 0.05 + 2)), 24);
        water = mixv(water, WHITE, Math.min(1, l1 * 0.75 + l2 * 0.5));
        const crest = smoothstep(0.75, 1, Math.abs(s)) * smoothstep(-0.2, 0.6, snoise(s, a * 22 + t * 0.35, 1));
        water = mixv(water, mixv(FOAM, WHITE, 0.6), crest * 0.6);
        rgb = mixv(land, water, inside);
      } else rgb = land;
      const p = (row * W + col) * 3;
      out[p] = Math.round(Math.min(1, Math.max(0, rgb[0])) * 255);
      out[p + 1] = Math.round(Math.min(1, Math.max(0, rgb[1])) * 255);
      out[p + 2] = Math.round(Math.min(1, Math.max(0, rgb[2])) * 255);
    }
  }
  return out;
}
