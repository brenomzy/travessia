import { langTag, type Locale } from '../i18n';

/*
 * Content dates are days ("2026-11-26"), parsed as UTC midnight. Format them in UTC, or a build
 * machine west of Greenwich shows the day before.
 */

/** "4 nov 2026" / "Nov 4, 2026": Portuguese loses the "de"s and the abbreviation dot, as in the designs. */
export function shortDate(locale: Locale, date: Date) {
  return new Intl.DateTimeFormat(langTag[locale], { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(date)
    .replaceAll(' de ', ' ')
    .replace('.', '');
}

/** "Quinta, 26 nov 2026" / "Thursday, Nov 26, 2026". */
export function longDate(locale: Locale, date: Date) {
  const weekday = new Intl.DateTimeFormat(langTag[locale], { weekday: 'long', timeZone: 'UTC' }).format(date);
  const day = shortDate(locale, date);
  const w = locale === 'pt-br' ? weekday.replace('-feira', '') : weekday;
  return `${w.charAt(0).toUpperCase()}${w.slice(1)}, ${day}`;
}

/** "10 nov" / "Nov 10". */
export function dayMonth(locale: Locale, date: Date) {
  return new Intl.DateTimeFormat(langTag[locale], { day: 'numeric', month: 'short', timeZone: 'UTC' })
    .format(date)
    .replace(' de ', ' ')
    .replace('.', '');
}

/** "Novembro de 2026" / "November 2026". */
export function monthYear(locale: Locale, date: Date) {
  const text = new Intl.DateTimeFormat(langTag[locale], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
  return text.charAt(0).toUpperCase() + text.slice(1);
}
