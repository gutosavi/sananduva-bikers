import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { TornPaper } from "@/components/shared/torn-paper";
import { CategoriesCard } from "@/features/registration/components/CategoriesCard";
import { ParticipantKitCard } from "@/features/registration/components/ParticipantKidCard";
import { RegistrationForm } from "@/features/registration/components/RegistragionForm";
import { RoutesCard } from "@/features/registration/components/RoutesCard";
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
      <main className="min-h-screen w-full overflow-x-hidden">
        <section className="relative">
          <div className="relative h-40 w-full overflow-visible md:h-85">
            <Image
              src="/assets/section-inscricoes.png"
              alt="Painel Inscreva-se"
              fill
              priority
              className="object-fill md:object-cover"
            />
            <TornPaper
              position="bottom"
              className="h-6 sm:h-8 md:h-16"
              zIndex="z-20"
            />
          </div>
        </section>

        <section className="relative">
          <TornPaper
            position="top"
            className="h-8 sm:h-8 md:h-16"
            zIndex="z-20"
          />
        </section>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] mx-5 pb-24 pt-24 md:pt-32 md:mx-20">
          <div className="col-start-1 space-y-10">
            <ParticipantKitCard />
            <RoutesCard />
            <CategoriesCard />
          </div>

          <div className="col-start-1 space-y-10 md:col-start-2">
            <RegistrationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
