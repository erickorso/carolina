"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ESTADOS_VE } from "@/lib/estados";
import { createConsulta } from "@/lib/consultas";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  CONSULTA_TIPOS,
  consultaSchema,
  type ConsultaInput,
} from "@/lib/schemas/consulta";

export function ConsultaForm() {
  const t = useTranslations("consulta");
  const [ticket, setTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ConsultaInput>({
    resolver: zodResolver(consultaSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      edad: 18,
      municipio: "",
      mensaje: "",
      tipo: "proteccion",
      estado: "Distrito Capital",
    },
  });

  async function onSubmit(values: ConsultaInput) {
    setError(null);
    if (!isFirebaseConfigured()) {
      setError(t("firebaseMissing"));
      return;
    }
    try {
      const created = await createConsulta(values);
      setTicket(created);
      form.reset();
    } catch {
      setError(t("sendError"));
    }
  }

  if (ticket) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-white p-6" role="status">
        <h2 className="text-xl font-semibold text-navy">{t("successTitle")}</h2>
        <p className="mt-2 text-muted">{t("successText")}</p>
        <p className="mt-4 font-mono text-lg text-navy">{ticket}</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-2xl border border-gold/30 bg-white p-6"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t("name")} error={form.formState.errors.nombre?.message}>
          <input
            className="form__control"
            autoComplete="name"
            {...form.register("nombre")}
          />
        </Field>
        <Field label={t("email")} error={form.formState.errors.email?.message}>
          <input
            className="form__control"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
        </Field>
        <Field label={t("phone")} error={form.formState.errors.telefono?.message}>
          <input
            className="form__control"
            type="tel"
            autoComplete="tel"
            {...form.register("telefono")}
          />
        </Field>
        <Field label={t("age")} error={form.formState.errors.edad?.message}>
          <input
            className="form__control"
            type="number"
            min={15}
            max={35}
            {...form.register("edad", { valueAsNumber: true })}
          />
        </Field>
        <Field label={t("state")} error={form.formState.errors.estado?.message}>
          <select className="form__control" {...form.register("estado")}>
            {ESTADOS_VE.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("municipio")} error={form.formState.errors.municipio?.message}>
          <input className="form__control" {...form.register("municipio")} />
        </Field>
      </div>
      <Field label={t("type")} error={form.formState.errors.tipo?.message}>
        <select className="form__control" {...form.register("tipo")}>
          {CONSULTA_TIPOS.map((tipo) => (
            <option key={tipo} value={tipo}>
              {t(`types.${tipo}`)}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t("message")} error={form.formState.errors.mensaje?.message}>
        <textarea
          className="form__control min-h-32"
          {...form.register("mensaje")}
        />
      </Field>
      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="rounded-md bg-navy px-5 py-3 font-medium text-cream disabled:opacity-60"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-navy">{label}</span>
      {children}
      {error ? (
        <span className="text-red-800" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
