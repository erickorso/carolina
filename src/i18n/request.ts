import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as AppLocale)
    ? (requested as AppLocale)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
