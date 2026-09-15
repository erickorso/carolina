"use client";

import { VenezuelaFlag } from "@/components/brand/venezuela-flag";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

const NAV = [
  { href: "/", key: "home" as const },
  { href: "/programas", key: "programs" as const },
  { href: "/cursos", key: "courses" as const },
  { href: "/agenda", key: "agenda" as const },
  { href: "/consulta", key: "consulta" as const },
  { href: "/despacho", key: "office" as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const brand = useTranslations("brand");
  const [open, setOpen] = useState(false);

  return (
    <header className="relative border-b border-gold/40 bg-navy text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label={`${brand("office")} — ${t("home")}`}
        >
          <VenezuelaFlag className="h-8 w-12 shrink-0 rounded-sm" label={brand("flag")} />
          <span className="min-w-0">
            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-gold-soft">
              {brand("ministry")}
            </span>
            <span className="block truncate text-sm font-semibold leading-tight md:text-base">
              {brand("shortName")}
            </span>
          </span>
        </Link>
        <button
          type="button"
          className="rounded-md border border-gold/50 px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t("close") : t("menu")}
        </button>
        <div
          id="site-nav"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[4.25rem] z-30 flex-col gap-3 border-b border-gold/40 bg-navy px-4 py-3 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          <nav aria-label={t("primary")} className="flex flex-col gap-1 md:flex-row">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm ${
                    active
                      ? "bg-gold text-navy-deep"
                      : "text-cream hover:bg-white/10"
                  }`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
