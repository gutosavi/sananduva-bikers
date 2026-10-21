import { SectionHeader } from "@/components/shared/section-header";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página do Administrador",
  description: "Painel do adminstração de inscrições do evento.",
};

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <SiteNavBar />
      <main className="min-h-screen w-full overflow-x-hidden">
        <SectionHeader
          title="Página do Administrador"
          subtitle="Inscrições"
          description="Painel de administração de inscrições do evento."
        />

        <AdminDashboard />
      </main>
    </div>
  );
}
