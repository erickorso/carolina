import { BannerCarousel } from "@/components/home/banner-carousel";
import { HeroScene } from "@/components/home/hero-scene";
import { PROGRAMAS } from "@/content/programas";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const brand = await getTranslations("brand");
  const programs = await getTranslations("programs");

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8">
      <BannerCarousel />
      <section className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-gold">
            {brand("ministry")}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-navy md:text-5xl">
            {brand("person")}
          </h1>
          <p className="mt-3 text-lg text-muted">{brand("office")}</p>
          <p className="mt-4 max-w-xl text-ink">{t("lead")}</p>
        </div>
        <HeroScene />
      </section>
      <section aria-labelledby="lineas-heading">
        <h2 id="lineas-heading" className="text-2xl font-semibold text-navy">
          {t("lines")}
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {PROGRAMAS.map((programa) => (
            <li key={programa.slug}>
              <Link
                href={programa.href}
                className="block h-full rounded-2xl border border-gold/30 bg-white p-5 hover:border-gold"
              >
                <p className="text-xs uppercase tracking-wide text-gold">
                  {programs(`items.${programa.slug}.kicker`)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-navy">
                  {programs(`items.${programa.slug}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {programs(`items.${programa.slug}.summary`)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
