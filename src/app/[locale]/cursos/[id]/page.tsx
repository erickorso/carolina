import { CURSOS, getCurso } from "@/content/cursos";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateStaticParams() {
  return CURSOS.map((curso) => ({ id: curso.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  if (!getCurso(id)) return { title: "Curso" };
  const t = await getTranslations({ locale, namespace: "courses" });
  return { title: t(`items.${id}.title`) };
}

export default async function CursoPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const curso = getCurso(id);
  if (!curso) notFound();
  const t = await getTranslations("courses");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-wide text-gold">
        {t(`items.${id}.category`)} · {curso.modality}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-navy">
        {t(`items.${id}.title`)}
      </h1>
      <p className="mt-4 text-muted">{t(`items.${id}.summary`)}</p>
      <dl className="mt-6 grid gap-2 text-sm">
        <div>
          <dt className="font-medium">{t("date")}</dt>
          <dd>{curso.date}</dd>
        </div>
        <div>
          <dt className="font-medium">{t("place")}</dt>
          <dd>
            {curso.place} · {curso.state}
          </dd>
        </div>
        <div>
          <dt className="font-medium">{t("seats")}</dt>
          <dd>{curso.seats}</dd>
        </div>
      </dl>
      <Link
        className="mt-8 inline-block rounded-md bg-navy px-4 py-3 text-cream"
        href="/consulta"
      >
        {t("enroll")}
      </Link>
    </div>
  );
}
