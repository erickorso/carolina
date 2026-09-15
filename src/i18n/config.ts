export const locales = ["es", "en", "zh", "ru"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "es";

export const localeHtmlLang: Record<AppLocale, string> = {
  es: "es-VE",
  en: "en",
  zh: "zh-CN",
  ru: "ru-RU",
};

export const localeLabels: Record<AppLocale, string> = {
  es: "Español",
  en: "English",
  zh: "中文",
  ru: "Русский",
};
