/**
 * The only way pages and .astro components use Motion (SPEC §5.6, rule 13).
 * Components that use the data attributes render <MotionScript />, which calls initMotion() once per page.
 */
import { initCountUp } from './count-up';
import { initReveal } from './reveal';

let started = false;

export function initMotion(): void {
  if (started) return;
  started = true;
  initReveal();
  initCountUp();
}
