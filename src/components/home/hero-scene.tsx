"use client";

import dynamic from "next/dynamic";

const ProtectionCanvas = dynamic(
  () =>
    import("@/components/home/protection-canvas").then(
      (mod) => mod.ProtectionCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-[380px] place-items-center rounded-2xl border border-gold/40 bg-navy text-cream">
        Cargando escena 3D…
      </div>
    ),
  },
);

export function HeroScene() {
  return <ProtectionCanvas />;
}
