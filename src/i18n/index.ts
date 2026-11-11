import ptBR from './pt-br.json';
import en from './en.json';

export const locales = ['pt-br', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

/** BCP 47 tags for <html lang> and hreflang. */
export const langTag: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en' };

const strings = { 'pt-br': ptBR, en } satisfies Record<Locale, typeof ptBR>;

/** UI strings for a locale. All copy lives in src/i18n or src/content (AGENTS.md rule 3). */
export function t(locale: Locale) {
  return strings[locale];
}
