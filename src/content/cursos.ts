export const CURSOS = [
  {
    id: "habitat-joven",
    title: "Hábitat joven: autoconstrucción y créditos",
    category: "Vivienda y hábitat",
    modality: "Presencial",
    state: "Distrito Capital",
    place: "Caracas",
    date: "2026-10-04",
    seats: 40,
    summary: "Ruta de solicitud, materiales y organización comunitaria para vivienda joven.",
  },
  {
    id: "lucash-basico",
    title: "Crédito y proyecto de vida",
    category: "Crédito",
    modality: "Híbrido",
    state: "Miranda",
    place: "Los Teques / virtual",
    date: "2026-10-11",
    seats: 60,
    summary: "Cómo armar un expediente, Lucash y seguimiento territorial.",
  },
  {
    id: "rie-promotores",
    title: "Promotores Venezuela Ríe",
    category: "Recreación",
    modality: "Presencial",
    state: "Carabobo",
    place: "Valencia",
    date: "2026-10-18",
    seats: 50,
    summary: "Metodología de talleres, juegos tradicionales y atención en campamentos.",
  },
  {
    id: "liderazgo-comunal",
    title: "Liderazgo territorial y mapa de sueños",
    category: "Liderazgo",
    modality: "Virtual",
    state: "Nacional",
    place: "En línea",
    date: "2026-10-25",
    seats: 120,
    summary: "Equipos promotores, comunas y canalización de casos de protección.",
  },
] as const;

export function getCurso(id: string) {
  return CURSOS.find((item) => item.id === id);
}
