"use client";

import { useLocale, useTranslations } from "next-intl";
import { localeLabels, locales, type AppLocale } from "@/i18n/config";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("language")} className="flex flex-wrap gap-1">
      {locales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          hrefLang={code}
          className={`rounded-md px-2 py-1 text-xs ${
            code === locale ? "bg-gold text-navy-deep" : "text-cream hover:bg-white/10"
          }`}
          aria-current={code === locale ? "true" : undefined}
        >
          {localeLabels[code]}
        </Link>
      ))}
    </nav>
  );
}
