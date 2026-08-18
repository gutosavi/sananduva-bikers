import { SiteFooter } from "@/components/site-footer";
import { SiteNavBar } from "@/components/site-navbar";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Inscrições | 12° Pedal do Tigre",
  description: "Garanta sua vaga na 12ª edição do Pedal do Tigre.",
};

export default function InscricoesPage() {
  return (
    <>
      <SiteNavBar />
      <main className="w-screen h-screen max-h-screen">
        <section className="relative h-80 w-full top-0 flex justify-center ">
          <Image
            src="/assets/section-inscricoes.png"
            alt="Painel Inscreva-se"
            fill
            style={{ objectFit: "cover" }}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
