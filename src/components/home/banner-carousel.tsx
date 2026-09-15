"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const SLIDE_IDS = ["juramentacion", "territorio", "rie"] as const;

export function BannerCarousel() {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDE_IDS.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const slideId = SLIDE_IDS[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("carouselLabel")}
      className="relative overflow-hidden rounded-2xl border border-gold/40 bg-navy text-cream"
    >
      <div className="banner-glow" />
      <div className="relative grid min-h-[280px] place-content-end gap-3 p-6 md:min-h-[340px] md:p-10">
        <p className="text-xs uppercase tracking-[0.18em] text-gold-soft">
          {t("bannerKicker")}
        </p>
        <h2 className="max-w-xl text-2xl font-semibold md:text-4xl">
          {t(`slides.${slideId}.title`)}
        </h2>
        <p className="max-w-xl text-sm text-gold-soft md:text-base">
          {t(`slides.${slideId}.text`)}
        </p>
        <p className="text-xs text-cream/70">{t("bannerHint")}</p>
      </div>
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <button
          type="button"
          className="rounded-md border border-gold/50 px-3 py-2 text-sm"
          onClick={() =>
            setIndex((current) => (current - 1 + SLIDE_IDS.length) % SLIDE_IDS.length)
          }
        >
          {t("prev")}
        </button>
        <div className="flex gap-2" role="tablist" aria-label={t("slidesLabel")}>
          {SLIDE_IDS.map((id, slideIndex) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={t(`slides.${id}.title`)}
              className={`h-2.5 w-2.5 rounded-full ${
                slideIndex === index ? "bg-gold" : "bg-white/35"
              }`}
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
        <button
          type="button"
          className="rounded-md border border-gold/50 px-3 py-2 text-sm"
          onClick={() => setIndex((current) => (current + 1) % SLIDE_IDS.length)}
        >
          {t("next")}
        </button>
      </div>
    </section>
  );
}
