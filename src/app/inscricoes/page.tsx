import { SiteFooter } from "@/components/site-footer";
import { SiteNavBar } from "@/components/site-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscrições | 12° Pedal do Tigre",
  description: "Garanta sua vaga na 12ª edição do Pedal do Tigre.",
};

export default function InscricoesPage() {
  return (
    <>
      <SiteNavBar />
      <main>
        <h1>Página de formulário de inscrição</h1>
      </main>
      <SiteFooter />
    </>
  );
}
