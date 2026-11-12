import ptBR from './pt-br.json';
import en from './en.json';

export const locales = ['pt-br', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

/** BCP 47 tags for <html lang> and hreflang. */
export const langTag: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en' };

/** Short labels for the language switcher. Language codes are fine in caps (they aren't eyebrows). */
export const langCode: Record<Locale, string> = { 'pt-br': 'PT', en: 'EN' };

const strings = { 'pt-br': ptBR, en } satisfies Record<Locale, typeof ptBR>;

/** UI strings for a locale. All copy lives in src/i18n or src/content (AGENTS.md rule 3). */
export function t(locale: Locale) {
  return strings[locale];
}

/** Locale from an Astro.currentLocale value, defaulting to PT-BR. */
export function toLocale(value: string | undefined): Locale {
  return value === 'en' ? 'en' : 'pt-br';
}
