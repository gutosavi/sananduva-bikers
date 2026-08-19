import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página do Administrador",
  description: "Painel do adminstração de inscrições do evento.",
};

export default function AdminPage() {
  return (
    <>
      <SiteNavBar />
      <main>
        <h1>Painel do administrador</h1>
      </main>
      <SiteFooter />
    </>
  );
}
