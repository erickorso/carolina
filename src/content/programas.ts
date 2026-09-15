export const PROGRAMAS = [
  {
    slug: "vivienda",
    title: "Vivienda joven",
    kicker: "Vamos a crecer",
    summary:
      "Acompañamiento a parejas y núcleos jóvenes: asignación, autoconstrucción, créditos de materiales y alquiler accesible.",
    href: "/programas/vivienda",
  },
  {
    slug: "credito",
    title: "Crédito y proyecto de vida",
    kicker: "Lucash",
    summary:
      "Orientación para financiamiento, billeteras digitales y democratización del crédito productivo juvenil.",
    href: "/programas/credito",
  },
  {
    slug: "recreacion",
    title: "Recreación y cuidados",
    kicker: "Venezuela Ríe",
    summary:
      "Talleres, juegos tradicionales y jornadas de recreación en circuitos comunales y campamentos.",
    href: "/programas/recreacion",
  },
  {
    slug: "emergencia",
    title: "Atención en emergencia",
    kicker: "Protección territorial",
    summary:
      "Despliegue humanitario con la Vicepresidencia Social: recreación, contención y enlace de casos.",
    href: "/programas/emergencia",
  },
] as const;

export type ProgramaSlug = (typeof PROGRAMAS)[number]["slug"];

export function getPrograma(slug: string) {
  return PROGRAMAS.find((item) => item.slug === slug);
}
