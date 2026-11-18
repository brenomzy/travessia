import { lang } from '../strings';

/*
 * Content dates are days ("2026-11-26"), parsed as UTC midnight. Format them in UTC, or a build
 * machine west of Greenwich shows the day before.
 */

/** "Nov 4, 2026". */
export function shortDate(date: Date) {
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** "Thursday, Nov 26, 2026". */
export function longDate(date: Date) {
  const weekday = new Intl.DateTimeFormat(lang, { weekday: 'long', timeZone: 'UTC' }).format(date);
  return `${weekday}, ${shortDate(date)}`;
}

/** "Nov 10". */
export function dayMonth(date: Date) {
  return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date);
}

/** "November 2026". */
export function monthYear(date: Date) {
  return new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
