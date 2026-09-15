"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { PROGRAMAS } from "@/content/programas";
import { useRouter } from "@/i18n/navigation";

const POSITIONS: [number, number, number][] = [
  [-1.6, 0.4, 0],
  [1.5, 0.6, 0.2],
  [-0.2, -0.9, 0.4],
  [0.3, 1.2, -0.3],
];

function Node({
  position,
  label,
  href,
  active,
  onFocus,
}: {
  position: [number, number, number];
  label: string;
  href: string;
  active: boolean;
  onFocus: () => void;
}) {
  const router = useRouter();

  return (
    <group position={position}>
      <mesh
        onClick={() => router.push(href)}
        onPointerOver={onFocus}
      >
        <sphereGeometry args={[0.28, 28, 28]} />
        <meshStandardMaterial
          color={active ? "#c4a35a" : "#e8d5a3"}
          emissive={active ? "#c4a35a" : "#0b1f3a"}
          emissiveIntensity={active ? 0.35 : 0.08}
        />
      </mesh>
      <Html distanceFactor={8} center>
        <p className="rounded-md bg-navy/90 px-2 py-1 text-[0.65rem] text-cream">
          {label}
        </p>
      </Html>
    </group>
  );
}

function Scene() {
  const t = useTranslations("programs");
  const [active, setActive] = useState(0);
  const nodes = useMemo(
    () =>
      PROGRAMAS.map((programa, index) => ({
        ...programa,
        position: POSITIONS[index],
      })),
    [],
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshStandardMaterial color="#071526" />
      </mesh>
      {nodes.map((node, index) => (
        <Node
          key={node.slug}
          position={node.position}
          label={t(`items.${node.slug}.title`)}
          href={node.href}
          active={active === index}
          onFocus={() => setActive(index)}
        />
      ))}
      <OrbitControls enablePan={false} maxDistance={7} minDistance={4} />
    </>
  );
}

export function ProtectionCanvas() {
  return (
    <div className="h-[380px] overflow-hidden rounded-2xl border border-gold/40 bg-navy-deep">
      <Canvas camera={{ position: [0, 0.4, 5.2], fov: 45 }} aria-hidden>
        <Scene />
      </Canvas>
    </div>
  );
}
