"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const [user, setUser] = useState<User | null | undefined>(() =>
    isFirebaseConfigured() ? undefined : null,
  );

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      return;
    }
    return onAuthStateChanged(getFirebaseAuth(), setUser);
  }, []);

  if (user === undefined) {
    return <p className="p-6 text-muted">{t("checking")}</p>;
  }

  if (!isFirebaseConfigured()) {
    return (
      <div className="rounded-xl border border-gold/40 bg-white p-6">
        <h1 className="text-xl font-semibold text-navy">{t("title")}</h1>
        <p className="mt-2 text-muted">{t("needFirebase")}</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <>{children}</>;
}

function AdminLogin() {
  const t = useTranslations("admin");
  const tConsulta = useTranslations("consulta");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    } catch {
      setError(t("loginError"));
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="mx-auto grid max-w-md gap-4 rounded-2xl border border-gold/30 bg-white p-6"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold text-navy">{t("login")}</h1>
      <label className="grid gap-1 text-sm">
        <span>{tConsulta("email")}</span>
        <input
          className="form__control"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span>{t("password")}</span>
        <input
          className="form__control"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="rounded-md bg-navy px-4 py-3 text-cream disabled:opacity-60"
        disabled={pending}
      >
        {pending ? t("entering") : t("enter")}
      </button>
    </form>
  );
}
