/**
 * Logo sphere layout (SPEC §6.2 Home 7, V3). Framework-agnostic: points on a Fibonacci sphere, tilted,
 * projected orthographically. Deterministic, so the server HTML and a later animated version agree.
 */
export interface SphereInput {
  id: string;
  label: string;
  weight: number;
  tone: 'plain' | 'primary' | 'inverse';
}

export interface SphereSettings {
  /** Rotation around the vertical axis, in radians. */
  spin: number;
  /** Tilt toward the viewer, in radians. */
  tilt: number;
  /** Horizontal stretch: the bento card is wider than tall. */
  aspect: number;
}

export const defaultSphere: SphereSettings = { spin: 0.6, tilt: 0.35, aspect: 1.35 };

export interface SpherePoint extends SphereInput {
  /** 0–100, percent of the box. */
  x: number;
  y: number;
  /** -1 (back) to 1 (front). */
  depth: number;
}

export function layoutSphere(items: SphereInput[], s: SphereSettings = defaultSphere): SpherePoint[] {
  const n = items.length;
  const golden = Math.PI * (3 - Math.sqrt(5));
  return items
    .map((item, i) => {
      const y0 = 1 - (2 * (i + 0.5)) / n;
      const r = Math.sqrt(1 - y0 * y0);
      const theta = golden * i + s.spin;
      const x0 = Math.cos(theta) * r;
      const z0 = Math.sin(theta) * r;
      // Tilt around the x axis.
      const y = y0 * Math.cos(s.tilt) - z0 * Math.sin(s.tilt);
      const z = y0 * Math.sin(s.tilt) + z0 * Math.cos(s.tilt);
      return {
        ...item,
        x: 50 + (x0 * 42) / Math.max(1, s.aspect / 1.35),
        y: 50 + y * 42,
        depth: z,
      };
    })
    .sort((a, b) => a.depth - b.depth);
}

/** "Livro Caixa" → "LC", "Freela" → "F". */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
