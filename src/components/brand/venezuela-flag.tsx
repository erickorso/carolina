const STAR_COUNT = 8;
const ARC_CX = 13.5;
const ARC_CY = 13.85;
const ARC_R = 7.05;
const ARC_START = (206 * Math.PI) / 180;
const ARC_END = (334 * Math.PI) / 180;
const STAR_R = 0.55;

function starPoints(cx: number, cy: number, r: number): string {
  const inner = r * 0.4;
  return Array.from({ length: 10 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? r : inner;
    return `${(cx + Math.cos(angle) * radius).toFixed(3)},${(cy + Math.sin(angle) * radius).toFixed(3)}`;
  }).join(" ");
}

const ARC_STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const t = ARC_START + ((ARC_END - ARC_START) * i) / (STAR_COUNT - 1);
  return {
    x: ARC_CX + ARC_R * Math.cos(t),
    y: ARC_CY + ARC_R * Math.sin(t),
  };
});

export function VenezuelaFlag({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 27 18"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      <rect width="27" height="6" y="0" fill="#ffcc00" />
      <rect width="27" height="6" y="6" fill="#00247d" />
      <rect width="27" height="6" y="12" fill="#cf142b" />
      <g fill="#fff">
        {ARC_STARS.map((star) => (
          <polygon key={`${star.x}-${star.y}`} points={starPoints(star.x, star.y, STAR_R)} />
        ))}
      </g>
    </svg>
  );
}
