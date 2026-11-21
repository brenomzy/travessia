/**
 * The site's icons: Hugeicons, the free "stroke rounded" set (MIT, @hugeicons/core-free-icons), picked by Breno on
 * 2026-11-21 (brand/rules.md, "Icons"). One map from our names to the set's drawings, so Icon.astro and the React
 * islands draw the same thing and a swap touches this file only. Framework-agnostic: plain data, no React or Astro.
 *
 * Each drawing is a list of SVG elements on a 24 px grid, stroked in currentColor at 1.5.
 */
import {
  Alert02Icon,
  ArrowDataTransferHorizontalIcon,
  ArrowDown02Icon,
  ArrowRight02Icon,
  BankIcon,
  Calendar03Icon,
  Cancel01Icon,
  ChartHistogramIcon,
  Download01Icon,
  Globe02Icon,
  Home01Icon,
  Invoice01Icon,
  Invoice03Icon,
  Menu01Icon,
  Search01Icon,
  SentIcon,
  SquareLock02Icon,
  Tick02Icon,
  UserMultipleIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';

export type IconElement = readonly [string, Readonly<Record<string, string | number>>];
export type IconDrawing = readonly IconElement[];

export const ICONS = {
  'arrow-right': ArrowRight02Icon,
  'arrow-down': ArrowDown02Icon,
  check: Tick02Icon,
  menu: Menu01Icon,
  close: Cancel01Icon,
  alert: Alert02Icon,
  search: Search01Icon,
  download: Download01Icon,
  send: SentIcon,
  lock: SquareLock02Icon,
  globe: Globe02Icon,
  calendar: Calendar03Icon,
  // The product's own nouns, in the app's nav order.
  home: Home01Icon,
  invoice: Invoice01Icon,
  convert: ArrowDataTransferHorizontalIcon,
  'tax-invoice': Invoice03Icon,
  report: ChartHistogramIcon,
  clients: UserMultipleIcon,
  balance: Wallet01Icon,
  bank: BankIcon,
} as const satisfies Record<string, IconDrawing>;

export type IconName = keyof typeof ICONS;

/** Element attributes as SVG wants them: camelCase → kebab-case, the set's React `key` dropped. */
export function svgAttributes(attrs: IconElement[1]): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'key') continue;
    out[k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())] = v;
  }
  return out;
}
