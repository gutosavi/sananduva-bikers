import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { AdminDashboard } from "@/features/admin/AdminDashboard";
import { DotIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página do Administrador",
  description: "Painel do adminstração de inscrições do evento.",
};

export default function AdminPage() {
  const date = new Date().getFullYear();
  return (
    <>
      <SiteNavBar />
      <main className="min-h-screen w-full overflow-x-hidden">
        <section className="w-ful flex flex-col gap-3 py-5 md:py-10 glass opacity-80 bg-linear-to-br from-[#1a2421] to-[#18241c]">
          <div className="flex items-center mx-5">
            <DotIcon
              size={40}
              className="inline-flex text-primary drop-shadow-[0_0_8px_currentColor,0_0_16px_currentColor]"
            />
            <h1 className="text-2xl text-primary font-bold font-display tracking-wide">
              Painel administrativo
            </h1>
          </div>
          <div className="flex flex-col gap-2 mb-5 mx-8">
            <p className="text-3xl font-extrabold font-heading text-muted-foreground uppercase tracking-tight mt-2 md:text-4xl">
              Inscrições{" "}
              <span className="text-primary font-bold uppercase">{date}</span>
            </p>
            <p className="text-lg text-muted-foreground mt-1">
              Acompanhe, filtre e confirme as incrições do Pedal do Tigre
            </p>
          </div>
        </section>

        <AdminDashboard />
      </main>
      <SiteFooter />
    </>
  );
}
