import { SectionHeader } from "@/components/shared/section-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { RegisteredContent } from "@/features/registered/components/RegisteredContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscritos | 12° Pedal do Tigre",
  description: "Confira a lista completa de inscritos no evento.",
};

export default function InscritosPage() {
  return (
    <>
      <SiteNavBar />
      <SectionHeader
        title="Inscritos"
        subtitle="Lista de inscritos"
        description="Confira a lista completa de inscritos no evento."
      />
      <RegisteredContent />
      <SiteFooter />
    </>
  );
}
