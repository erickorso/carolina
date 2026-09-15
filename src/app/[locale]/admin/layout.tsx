import { AuthGate } from "@/components/admin/auth-gate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <AuthGate>{children}</AuthGate>
    </div>
  );
}
