"use client";

import { LocaleFlag } from "@/components/brand/locale-flag";
import { localeLabels, locales, type AppLocale } from "@/i18n/config";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className="flex items-center gap-1 rounded-md border border-gold/40 p-1.5 text-cream hover:bg-white/10"
        aria-label={`${t("language")}: ${localeLabels[locale]}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <LocaleFlag locale={locale} label={localeLabels[locale]} />
        <svg
          className="h-3 w-3 opacity-80"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <ul
          id={menuId}
          role="listbox"
          aria-label={t("language")}
          className="absolute right-0 top-full z-40 mt-1 min-w-[10.5rem] rounded-md border border-gold/40 bg-navy p-1 shadow-lg"
        >
          {locales.map((code) => (
            <li key={code} role="none">
              <Link
                href={pathname}
                locale={code}
                hrefLang={code}
                role="option"
                aria-selected={code === locale}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                  code === locale
                    ? "bg-gold text-navy-deep"
                    : "text-cream hover:bg-white/10"
                }`}
                onClick={() => setOpen(false)}
              >
                <LocaleFlag locale={code} label={localeLabels[code]} />
                {localeLabels[code]}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
