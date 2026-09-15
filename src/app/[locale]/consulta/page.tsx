import { ConsultaForm } from "@/components/consulta/consulta-form";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "consulta" });
  return { title: t("title") };
}

export default async function ConsultaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("consulta");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("intro")}</p>
      <div className="mt-8">
        <ConsultaForm />
      </div>
    </div>
  );
}
