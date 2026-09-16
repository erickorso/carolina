/** Sustituye los JPG en `public/banner/` manteniendo el nombre del archivo. */
export const BANNER_SLIDES = [
  { id: "juramentacion", src: "/banner/juramentacion.jpg" },
  { id: "territorio", src: "/banner/territorio.jpg" },
  { id: "rie", src: "/banner/rie.jpg" },
  { id: "cancha", src: "/banner/cancha-basket.jpg" },
  { id: "salon", src: "/banner/salon-escuela.jpg" },
  { id: "comedor", src: "/banner/comedor.jpg" },
] as const;

export type BannerSlideId = (typeof BANNER_SLIDES)[number]["id"];
