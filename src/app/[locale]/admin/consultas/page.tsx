import { ConsultasBoard } from "@/components/admin/consultas-board";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("consultas") };
}

export default async function AdminConsultasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold text-navy">{t("consultas")}</h1>
      <ConsultasBoard />
    </div>
  );
}
