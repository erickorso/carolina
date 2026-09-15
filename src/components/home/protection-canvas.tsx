"use client";

import { Float, Html, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { PROGRAMAS } from "@/content/programas";
import { Link, useRouter } from "@/i18n/navigation";

const NODE_COLORS = ["#c4a35a", "#e8d5a3", "#7eb6ff", "#f0c27a"] as const;

function unitNoise(index: number, salt: number) {
  const n = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function createDustGeometry() {
  const count = 520;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const gold = new THREE.Color("#c4a35a");
  const cream = new THREE.Color("#e8d5a3");
  for (let i = 0; i < count; i += 1) {
    const radius = 1.2 + unitNoise(i, 1) * 3.4;
    const theta = unitNoise(i, 2) * Math.PI * 2;
    const phi = Math.acos(2 * unitNoise(i, 3) - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi) * 0.62;
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    const mixed = gold.clone().lerp(cream, unitNoise(i, 4));
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

const DUST_GEOMETRY = createDustGeometry();

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function GoldDust({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!points.current || reduced) {
      return;
    }
    points.current.rotation.y += delta * 0.06;
    points.current.rotation.x += delta * 0.012;
  });

  return (
    <points ref={points} geometry={DUST_GEOMETRY}>
      <pointsMaterial
        vertexColors
        size={0.038}
        transparent
        opacity={0.82}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function Core({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current || reduced) {
      return;
    }
    mesh.current.rotation.y += delta * 0.35;
    mesh.current.rotation.z += delta * 0.12;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#c4a35a"
          emissive="#c4a35a"
          emissiveIntensity={0.7}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.58, 0]} />
        <meshBasicMaterial
          color="#e8d5a3"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
      <Sparkles
        count={reduced ? 12 : 48}
        scale={1.4}
        size={3}
        speed={reduced ? 0 : 0.55}
        color="#e8d5a3"
        opacity={0.9}
      />
    </group>
  );
}

function ProgramNode({
  index,
  label,
  href,
  active,
  reduced,
  paused,
  onFocus,
  onBlur,
  onCursor,
}: {
  index: number;
  label: string;
  href: string;
  active: boolean;
  reduced: boolean;
  paused: RefObject<boolean>;
  onFocus: () => void;
  onBlur: () => void;
  onCursor: (hot: boolean) => void;
}) {
  const router = useRouter();
  const group = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const angle = useRef((index / PROGRAMAS.length) * Math.PI * 2);
  const radius = 1.95;
  const color = NODE_COLORS[index];
  const lit = active;

  useFrame((_, delta) => {
    if (!group.current || !ball.current) {
      return;
    }
    if (!reduced && !paused.current) {
      angle.current += delta * 0.28;
    }
    const t = angle.current;
    group.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.35 + index) * 0.34,
      Math.sin(t) * radius,
    );
    const target = lit ? 1.38 : 1;
    const current = ball.current.scale.x;
    const next = THREE.MathUtils.lerp(current, target, 8 * delta);
    ball.current.scale.setScalar(next);
    ball.current.rotation.y += delta * (lit ? 1.1 : 0.35);
  });

  return (
    <group ref={group}>
      <Float
        enabled={!reduced}
        speed={2.2}
        rotationIntensity={0.35}
        floatIntensity={0.25}
      >
        <mesh
          ref={ball}
          onClick={(event) => {
            event.stopPropagation();
            router.push(href);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            onCursor(true);
            onFocus();
          }}
          onPointerOut={() => {
            onCursor(false);
            onBlur();
          }}
        >
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={lit ? 0.85 : 0.22}
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.012, 8, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={lit ? 0.9 : 0.35}
          />
        </mesh>
        {lit ? (
          <Sparkles
            count={18}
            scale={0.9}
            size={2.4}
            speed={0.8}
            color={color}
          />
        ) : null}
      </Float>
      <Html distanceFactor={7.5} center pointerEvents="none" zIndexRange={[10, 0]}>
        <p
          className={`max-w-[8.5rem] rounded-md px-2 py-1 text-center text-[0.65rem] leading-tight ${
            lit ? "bg-gold text-navy-deep" : "bg-navy/90 text-cream"
          }`}
        >
          {label}
        </p>
      </Html>
    </group>
  );
}

function OrbitRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <torusGeometry args={[1.95, 0.01, 8, 96]} />
      <meshBasicMaterial color="#c4a35a" transparent opacity={0.28} />
    </mesh>
  );
}

function Scene({ onCursor }: { onCursor: (hot: boolean) => void }) {
  const t = useTranslations("programs");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  return (
    <>
      <color attach="background" args={["#071526"]} />
      <fog attach="fog" args={["#071526", 7, 16]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0.3, 0]} color="#c4a35a" intensity={2.4} distance={7} />
      <spotLight
        position={[4, 6, 3]}
        angle={0.45}
        penumbra={0.8}
        intensity={1.15}
        color="#f7f3ea"
      />
      <Stars
        radius={18}
        depth={30}
        count={reduced ? 200 : 900}
        factor={2.6}
        saturation={0.4}
        fade
        speed={reduced ? 0 : 0.6}
      />
      <GoldDust reduced={reduced} />
      <Sparkles
        count={reduced ? 20 : 80}
        scale={[6, 3.2, 6]}
        size={2}
        speed={reduced ? 0 : 0.4}
        color="#c4a35a"
        opacity={0.55}
      />
      <Core reduced={reduced} />
      <OrbitRing />
      {PROGRAMAS.map((programa, index) => (
        <ProgramNode
          key={programa.slug}
          index={index}
          label={t(`items.${programa.slug}.title`)}
          href={programa.href}
          active={active === index}
          reduced={reduced}
          paused={paused}
          onFocus={() => {
            paused.current = true;
            setActive(index);
          }}
          onBlur={() => {
            paused.current = false;
          }}
          onCursor={onCursor}
        />
      ))}
      <OrbitControls
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.45}
        maxDistance={8}
        minDistance={3.6}
        maxPolarAngle={Math.PI / 1.55}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

export function ProtectionCanvas() {
  const t = useTranslations("home");
  const programs = useTranslations("programs");
  const [hot, setHot] = useState(false);

  return (
    <div className="grid gap-2">
      <div
        className={`relative h-[440px] overflow-hidden rounded-2xl border border-gold/40 bg-navy-deep ${
          hot ? "cursor-pointer" : "cursor-grab"
        }`}
        aria-hidden="true"
      >
        <Canvas camera={{ position: [0, 1.15, 5.6], fov: 42 }} dpr={[1, 1.75]}>
          <Scene onCursor={setHot} />
        </Canvas>
      </div>
      <p className="text-center text-xs text-muted">{t("sceneHint")}</p>
      <nav className="sr-only" aria-label={t("sceneLabel")}>
        <ul>
          {PROGRAMAS.map((programa) => (
            <li key={programa.slug}>
              <Link href={programa.href}>
                {programs(`items.${programa.slug}.title`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
