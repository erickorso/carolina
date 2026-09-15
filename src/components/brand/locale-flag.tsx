import { VenezuelaFlag } from "@/components/brand/venezuela-flag";
import type { AppLocale } from "@/i18n/config";

const FLAG_CLASS = "h-5 w-7 overflow-hidden rounded-sm";

export function LocaleFlag({
  locale,
  label,
}: {
  locale: AppLocale;
  label: string;
}) {
  if (locale === "es") {
    return <VenezuelaFlag className={FLAG_CLASS} label={label} />;
  }

  return (
    <svg
      className={FLAG_CLASS}
      viewBox="0 0 21 14"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      {locale === "en" ? <UkMark /> : null}
      {locale === "zh" ? <ChinaMark /> : null}
      {locale === "ru" ? <RussiaMark /> : null}
    </svg>
  );
}

function UkMark() {
  return (
    <>
      <rect width="21" height="14" fill="#012169" />
      <path d="M0 0 21 14M21 0 0 14" stroke="#fff" strokeWidth="3" />
      <path d="M0 0 21 14M21 0 0 14" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M10.5 0v14M0 7h21" stroke="#fff" strokeWidth="4.2" />
      <path d="M10.5 0v14M0 7h21" stroke="#C8102E" strokeWidth="2.4" />
    </>
  );
}

function ChinaMark() {
  return (
    <>
      <rect width="21" height="14" fill="#DE2910" />
      <polygon
        fill="#FFDE00"
        points="4.2,2.4 4.7,3.9 6.2,3.9 5,4.8 5.5,6.3 4.2,5.4 2.9,6.3 3.4,4.8 2.2,3.9 3.7,3.9"
      />
    </>
  );
}

function RussiaMark() {
  return (
    <>
      <rect width="21" height="14" fill="#fff" />
      <rect width="21" height="4.7" y="4.65" fill="#0039A6" />
      <rect width="21" height="4.7" y="9.3" fill="#D52B1E" />
    </>
  );
}
