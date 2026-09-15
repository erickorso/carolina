import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("title") };
}

export default async function AdminHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold text-navy">{t("title")}</h1>
      <Link
        className="rounded-xl border border-gold/40 bg-white p-5"
        href="/admin/consultas"
      >
        {t("inbox")}
      </Link>
    </div>
  );
}
