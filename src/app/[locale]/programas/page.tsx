import { PROGRAMAS } from "@/content/programas";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programs" });
  return { title: t("title") };
}

export default async function ProgramasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("intro")}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {PROGRAMAS.map((programa) => (
          <li key={programa.slug}>
            <Link
              href={programa.href}
              className="block rounded-2xl border border-gold/30 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-wide text-gold">
                {t(`items.${programa.slug}.kicker`)}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-navy">
                {t(`items.${programa.slug}.title`)}
              </h2>
              <p className="mt-3 text-muted">{t(`items.${programa.slug}.summary`)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
