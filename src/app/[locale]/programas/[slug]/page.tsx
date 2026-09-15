import { getPrograma, PROGRAMAS } from "@/content/programas";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return PROGRAMAS.map((programa) => ({ slug: programa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const programa = getPrograma(slug);
  if (!programa) return { title: "Programa" };
  const t = await getTranslations({ locale, namespace: "programs" });
  return { title: t(`items.${slug}.title`) };
}

export default async function ProgramaPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const programa = getPrograma(slug);
  if (!programa) notFound();
  const t = await getTranslations("programs");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase tracking-wide text-gold">
        {t(`items.${slug}.kicker`)}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-navy">
        {t(`items.${slug}.title`)}
      </h1>
      <p className="mt-4 text-lg text-muted">{t(`items.${slug}.summary`)}</p>
      <div className="mt-8 flex gap-3">
        <Link className="rounded-md bg-navy px-4 py-3 text-cream" href="/consulta">
          {t("openConsulta")}
        </Link>
        <Link className="rounded-md border border-navy px-4 py-3" href="/cursos">
          {t("seeCourses")}
        </Link>
      </div>
    </div>
  );
}
