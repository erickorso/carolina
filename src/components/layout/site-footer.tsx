import { VenezuelaFlag } from "@/components/brand/venezuela-flag";
import { SITE } from "@/lib/site";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const brand = await getTranslations("brand");

  return (
    <footer className="mt-auto w-full border-t border-gold/30 bg-navy-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        <div className="flex gap-3">
          <VenezuelaFlag className="mt-1 h-8 w-12 shrink-0 rounded-sm" label={brand("flag")} />
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-soft">
              {brand("republic")}
            </p>
            <p className="mt-2 text-sm font-medium">{brand("office")}</p>
            <p className="mt-1 text-sm text-gold-soft">{brand("person")}</p>
          </div>
        </div>
        <div className="text-sm">
          <p>{SITE.decree}</p>
          <p>
            {SITE.gazette} · {SITE.gazetteDate}
          </p>
        </div>
        <div className="text-sm">
          <a className="underline decoration-gold/60" href={SITE.ministryUrl}>
            minjuventud.gob.ve
          </a>
          <p className="mt-2">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
