"use client";

import { BANNER_SLIDES } from "@/content/banner";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function BannerCarousel() {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const total = BANNER_SLIDES.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 7000);
    return () => window.clearInterval(id);
  }, [total]);

  const slideId = BANNER_SLIDES[index].id;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("carouselLabel")}
      className="overflow-hidden rounded-2xl border border-gold/40 bg-navy text-cream"
    >
      <div className="grid md:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[220px] md:min-h-[340px]">
          {BANNER_SLIDES.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                slideIndex === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={slide.src}
                alt={t(`slides.${slide.id}.alt`)}
                fill
                priority={slideIndex === 0}
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="relative grid content-end gap-3 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-soft">
            {t("bannerKicker")}
          </p>
          <h2 className="max-w-xl text-2xl font-semibold md:text-4xl">
            {t(`slides.${slideId}.title`)}
          </h2>
          <p className="max-w-xl text-sm text-gold-soft md:text-base">
            {t(`slides.${slideId}.text`)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <button
          type="button"
          className="rounded-md border border-gold/50 px-3 py-2 text-sm"
          onClick={() => setIndex((current) => (current - 1 + total) % total)}
        >
          {t("prev")}
        </button>
        <div className="flex gap-2" role="tablist" aria-label={t("slidesLabel")}>
          {BANNER_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={t(`slides.${slide.id}.title`)}
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
          onClick={() => setIndex((current) => (current + 1) % total)}
        >
          {t("next")}
        </button>
      </div>
    </section>
  );
}
