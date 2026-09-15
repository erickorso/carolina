import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getTranslations } from "next-intl/server";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("nav");

  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gold focus:px-3 focus:py-2 focus:text-navy"
      >
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
