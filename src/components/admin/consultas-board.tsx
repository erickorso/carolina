"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { listConsultas, updateConsultaStatus } from "@/lib/consultas";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  CONSULTA_STATUS,
  type ConsultaRecord,
  type ConsultaStatus,
} from "@/lib/schemas/consulta";

export function ConsultasBoard() {
  const t = useTranslations("admin");
  const [items, setItems] = useState<ConsultaRecord[]>([]);
  const [filter, setFilter] = useState<ConsultaStatus | "todas">("pendiente");
  const [error, setError] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");

  async function refresh() {
    const rows = await listConsultas();
    setItems(rows);
  }

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let cancelled = false;
    void listConsultas()
      .then((rows) => {
        if (!cancelled) setItems(rows);
      })
      .catch(() => {
        if (!cancelled) setError(t("loadError"));
      });
    return () => {
      cancelled = true;
    };
  }, [t]);

  const visible = useMemo(
    () => (filter === "todas" ? items : items.filter((item) => item.status === filter)),
    [filter, items],
  );

  async function changeStatus(item: ConsultaRecord, status: ConsultaStatus) {
    if (status === "descartada" && motivo.trim().length < 8) {
      setError(t("discardNeedReason"));
      return;
    }
    setError(null);
    await updateConsultaStatus(item.id, status, {
      motivoDescarte: status === "descartada" ? motivo.trim() : item.motivoDescarte,
    });
    setMotivo("");
    await refresh();
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("statusFilter")}>
        {(["todas", ...CONSULTA_STATUS] as const).map((status) => (
          <button
            key={status}
            type="button"
            className={`rounded-full px-3 py-1 text-sm ${
              filter === status ? "bg-navy text-cream" : "bg-white text-navy"
            }`}
            aria-pressed={filter === status}
            onClick={() => setFilter(status)}
          >
            {status === "todas"
              ? t("all")
              : status === "pendiente"
                ? t("pending")
                : status === "resuelta"
                  ? t("resolved")
                  : t("discarded")}
          </button>
        ))}
      </div>
      <label className="grid gap-1 text-sm">
        <span>{t("discardReason")}</span>
        <input
          className="form__control"
          value={motivo}
          onChange={(event) => setMotivo(event.target.value)}
        />
      </label>
      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <ul className="grid gap-3">
        {visible.map((item) => (
          <li
            key={item.id}
            className="grid gap-2 rounded-xl border border-gold/30 bg-white p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-sm text-navy">{item.ticket}</p>
              <p className="rounded-full bg-cream px-2 py-1 text-xs capitalize">
                {item.status}
              </p>
            </div>
            <p className="font-semibold">{item.nombre}</p>
            <p className="text-sm text-muted">
              {item.tipo} · {item.estado} · {item.municipio}
            </p>
            <p className="text-sm">{item.mensaje}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-navy px-3 py-2 text-sm text-cream"
                onClick={() => changeStatus(item, "resuelta")}
              >
                {t("markResolved")}
              </button>
              <button
                type="button"
                className="rounded-md border border-navy px-3 py-2 text-sm"
                onClick={() => changeStatus(item, "descartada")}
              >
                {t("discard")}
              </button>
              <button
                type="button"
                className="rounded-md border border-gold/50 px-3 py-2 text-sm"
                onClick={() => changeStatus(item, "pendiente")}
              >
                {t("backPending")}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {visible.length === 0 ? (
        <p className="text-muted">{t("empty")}</p>
      ) : null}
    </section>
  );
}
