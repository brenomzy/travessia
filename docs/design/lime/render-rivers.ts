/** Lime study (2026-11-21): the hero river still with lime bank lines and glow. Run: node docs/design/lime/render-rivers.ts */
import sharp from 'sharp';
import { renderRiverStill } from '../../../src/lib/generators/river/still.ts';
import { tokens } from '../../../src/tokens/tokens.ts';
const hex = (h: string): [number, number, number] => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
const r = tokens.color.river;
const base = { dark: hex(r.land), light: hex(r.light), foam: hex(r.foam), shallow: hex(r.shallow), deep: hex(r.deep), echo: hex(r.echo) };
const out = new URL('./', import.meta.url).pathname;
const V = {
  'river-now': base,
  'river-lime-echo': { ...base, echo: hex('#D2F08C') },
  'river-lime-banks': { ...base, echo: hex('#D2F08C'), light: hex('#C9E58A') },
};
for (const [name, c] of Object.entries(V)) {
  const rgb = renderRiverStill({ ...c, width: 1280, height: 720, at: 0.62, time: 40 });
  await sharp(Buffer.from(rgb), { raw: { width: 1280, height: 720, channels: 3 } }).png().toFile(out + name + '.png');
  console.log(name);
}
