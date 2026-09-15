import { z } from "zod";
import { ESTADOS_VE } from "@/lib/estados";

export const CONSULTA_TIPOS = [
  "vivienda",
  "credito",
  "taller",
  "proteccion",
  "emergencia",
  "otro",
] as const;

export const CONSULTA_STATUS = ["pendiente", "resuelta", "descartada"] as const;

export const consultaSchema = z.object({
  nombre: z.string().trim().min(3).max(80),
  email: z.string().trim().email(),
  telefono: z.string().trim().min(7).max(20),
  edad: z.number().int().min(15).max(35),
  estado: z.enum(ESTADOS_VE),
  municipio: z.string().trim().min(2).max(60),
  tipo: z.enum(CONSULTA_TIPOS),
  mensaje: z.string().trim().min(30).max(1500),
});

export type ConsultaInput = z.infer<typeof consultaSchema>;
export type ConsultaTipo = (typeof CONSULTA_TIPOS)[number];
export type ConsultaStatus = (typeof CONSULTA_STATUS)[number];

export type ConsultaRecord = ConsultaInput & {
  id: string;
  ticket: string;
  status: ConsultaStatus;
  notasInternas: string;
  motivoDescarte: string;
  createdAt: string;
  updatedAt: string;
};
