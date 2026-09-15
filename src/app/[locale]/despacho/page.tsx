import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "despacho" });
  return { title: t("title") };
}

export default async function DespachoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("despacho");
  const brand = await getTranslations("brand");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-navy">{t("title")}</h1>
      <p className="mt-4 text-lg">{brand("person")}</p>
      <p className="text-muted">{brand("office")}</p>
      <dl className="mt-8 grid gap-4 text-sm">
        <div>
          <dt className="font-medium text-navy">{t("appointment")}</dt>
          <dd>
            {SITE.decree} · {SITE.gazette} · {SITE.gazetteDate}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-navy">{t("ministry")}</dt>
          <dd>{brand("ministry")}</dd>
        </div>
        <div>
          <dt className="font-medium text-navy">{t("frame")}</dt>
          <dd>{t("frameText")}</dd>
        </div>
      </dl>
    </div>
  );
}
