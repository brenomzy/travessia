/**
 * Renders stills of the hero river (src/lib/generators/river/still.ts) into src/assets/generated/river/,
 * each next to a recipe.json (SPEC §5.4 rule 5). Colours come from the tokens.
 * Run: node scripts/build-river-stills.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { renderRiverStill } from '../src/lib/generators/river/still.ts';
import { tokens } from '../src/tokens/tokens.ts';

const hex = (h: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
const r = tokens.color.river;
const colors = { dark: hex(r.land), light: hex(r.light), foam: hex(r.foam), shallow: hex(r.shallow), deep: hex(r.deep), echo: hex(r.echo) };

const STILLS = [
  { name: 'hero-river', width: 2880, height: 1620, at: 0.66, time: 40, use: 'Home hero still (no-JS fallback), boards, wide formats' },
  { name: 'river-portrait', width: 1080, height: 1350, at: 0.55, time: 40, use: 'Social posts (4:5) and tall cards' },
];

const dir = new URL('../src/assets/generated/river/', import.meta.url);
mkdirSync(dir, { recursive: true });
for (const s of STILLS) {
  const t0 = Date.now();
  const rgb = renderRiverStill({ ...colors, width: s.width, height: s.height, at: s.at, time: s.time });
  await sharp(Buffer.from(rgb), { raw: { width: s.width, height: s.height, channels: 3 } }).png({ compressionLevel: 9 }).toFile(new URL(`${s.name}.png`, dir).pathname);
  console.log(`river: wrote ${s.name}.png (${s.width}×${s.height}) in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}
writeFileSync(
  new URL('recipe.json', dir),
  JSON.stringify(
    { generator: 'src/lib/generators/river/still.ts', script: 'scripts/build-river-stills.ts', shader: 'shader lab tile 8i (docs/design/shader-lab/hero-river-8i.frag)', colors: 'tokens color.river', stills: STILLS },
    null,
    2,
  ) + '\n',
);
