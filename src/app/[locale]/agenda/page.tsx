import { AGENDA } from "@/content/agenda";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "agenda" });
  return { title: t("title") };
}

export default async function AgendaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("agenda");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("intro")}</p>
      <ol className="mt-8 grid gap-4">
        {AGENDA.map((item) => (
          <li key={item.id} className="rounded-2xl border border-gold/30 bg-white p-5">
            <p className="text-sm text-gold">{item.date}</p>
            <h2 className="mt-1 text-xl font-semibold text-navy">
              {t(`items.${item.id}`)}
            </h2>
            <p className="text-muted">{item.place}</p>
            <Link className="mt-3 inline-block text-sm underline" href={item.href}>
              {t("go")}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
