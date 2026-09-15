"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const ProtectionCanvas = dynamic(
  () =>
    import("@/components/home/protection-canvas").then(
      (mod) => mod.ProtectionCanvas,
    ),
  {
    ssr: false,
    loading: () => <HeroSceneFallback />,
  },
);

function HeroSceneFallback() {
  const t = useTranslations("home");
  return (
    <div className="grid h-[440px] place-items-center rounded-2xl border border-gold/40 bg-navy text-cream">
      {t("sceneLoading")}
    </div>
  );
}

export function HeroScene() {
  return <ProtectionCanvas />;
}
