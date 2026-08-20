import { Banner } from "@/components/shared/Banner";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { CategoriesCard } from "@/features/registration/components/CategoriesCard";
import { ParticipantKitCard } from "@/features/registration/components/ParticipantKidCard";
import { RegistrationForm } from "@/features/registration/components/RegistragionForm";
import { RoutesCard } from "@/features/registration/components/RoutesCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscrições | 12° Pedal do Tigre",
  description: "Garanta sua vaga na 12ª edição do Pedal do Tigre.",
};

export default function InscricoesPage() {
  return (
    <>
      <SiteNavBar />
      <main className="min-h-screen w-full overflow-x-hidden">
        <Banner />

        <section className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr] mx-5 pb-24 pt-24 md:pt-32 md:mx-20">
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
