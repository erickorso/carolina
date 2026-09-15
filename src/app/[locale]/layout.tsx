import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { localeHtmlLang, type AppLocale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { IBM_Plex_Sans, Noto_Sans_SC } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const notoSc = Noto_Sans_SC({
  variable: "--font-zh",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      default: t("title"),
      template: `%s · ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const appLocale = locale as AppLocale;

  return (
    <html
      lang={localeHtmlLang[appLocale]}
      className={`${ibmPlex.variable} ${notoSc.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col ${
          appLocale === "zh" ? notoSc.className : ibmPlex.className
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <SiteShell>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
