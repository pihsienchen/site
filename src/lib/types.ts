export const supportedLocales = ['en', 'de', 'fr', 'zh-TW', 'zh'] as const;
export type SupportedLocale = typeof supportedLocales[number];

export function isValidLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

export interface ContentMetadata {
  title: string;
  subtitle: string;
  image: string;
  excerpt: string;
}

export interface ContentData {
  metadata: ContentMetadata;
  content: string;
  slug: string;
}