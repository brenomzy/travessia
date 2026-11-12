let counter = 0;

/** A short id that is unique within one build, for SVG defs and aria wiring. */
export function uid(prefix: string) {
  counter += 1;
  return `${prefix}-${counter.toString(36)}`;
}
