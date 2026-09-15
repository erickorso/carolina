import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import {
  CONSULTA_STATUS,
  CONSULTA_TIPOS,
  type ConsultaInput,
  type ConsultaRecord,
  type ConsultaStatus,
  type ConsultaTipo,
} from "@/lib/schemas/consulta";
import { ESTADOS_VE, type EstadoVE } from "@/lib/estados";

const COLLECTION = "consultas";

function ticketId() {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000 + 10000);
  return `VIS-${year}-${rand}`;
}

export async function createConsulta(input: ConsultaInput): Promise<string> {
  const ticket = ticketId();
  await addDoc(collection(getFirebaseDb(), COLLECTION), {
    ...input,
    ticket,
    status: "pendiente",
    notasInternas: "",
    motivoDescarte: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ticket;
}

function isStatus(value: unknown): value is ConsultaStatus {
  return CONSULTA_STATUS.includes(value as ConsultaStatus);
}

function isTipo(value: unknown): value is ConsultaTipo {
  return CONSULTA_TIPOS.includes(value as ConsultaTipo);
}

function isEstado(value: unknown): value is EstadoVE {
  return ESTADOS_VE.includes(value as EstadoVE);
}

export async function listConsultas(): Promise<ConsultaRecord[]> {
  const snap = await getDocs(
    query(collection(getFirebaseDb(), COLLECTION), orderBy("createdAt", "desc")),
  );
  return snap.docs.map((item) => {
    const data = item.data();
    return {
      id: item.id,
      ticket: String(data.ticket ?? ""),
      nombre: String(data.nombre ?? ""),
      email: String(data.email ?? ""),
      telefono: String(data.telefono ?? ""),
      edad: Number(data.edad ?? 0),
      estado: isEstado(data.estado) ? data.estado : "Distrito Capital",
      municipio: String(data.municipio ?? ""),
      tipo: isTipo(data.tipo) ? data.tipo : "otro",
      mensaje: String(data.mensaje ?? ""),
      status: isStatus(data.status) ? data.status : "pendiente",
      notasInternas: String(data.notasInternas ?? ""),
      motivoDescarte: String(data.motivoDescarte ?? ""),
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? "",
      updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? "",
    };
  });
}

export async function updateConsultaStatus(
  id: string,
  status: ConsultaStatus,
  extra: { notasInternas?: string; motivoDescarte?: string } = {},
) {
  await updateDoc(doc(getFirebaseDb(), COLLECTION, id), {
    status,
    ...extra,
    updatedAt: serverTimestamp(),
  });
}
