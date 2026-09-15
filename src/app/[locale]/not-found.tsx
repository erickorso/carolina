import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold text-navy">{t("title")}</h1>
      <Link className="mt-6 inline-block text-navy underline" href="/">
        {t("back")}
      </Link>
    </div>
  );
}
