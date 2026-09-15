import { CURSOS } from "@/content/cursos";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courses" });
  return { title: t("title") };
}

export default async function CursosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("courses");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("intro")}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {CURSOS.map((curso) => (
          <li key={curso.id}>
            <article className="h-full rounded-2xl border border-gold/30 bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-gold">
                {t(`items.${curso.id}.category`)} · {curso.modality}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-navy">
                {t(`items.${curso.id}.title`)}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {t(`items.${curso.id}.summary`)}
              </p>
              <p className="mt-3 text-sm">
                {curso.date} · {curso.place} · {curso.seats}
              </p>
              <Link
                className="mt-4 inline-block text-sm font-medium text-navy underline"
                href={`/cursos/${curso.id}`}
              >
                {t("open")}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
