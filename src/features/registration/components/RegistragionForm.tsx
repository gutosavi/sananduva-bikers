"use client";

import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { RegistrationDetailsCard } from "./RegistrationDetailsCard";

type FormData = {
  fullname: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  cityState: string;
  emergencyContact: string;
  emergencyPhone: string;
  category: string;
  route: string;
  tshirtSize: string;
  team: string;
};

export function RegistrationForm() {
  const methods = useForm<FormData>();

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);

    methods.reset();
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-5"
      >
        <div className="space-y-6">
          <ParticipantDetailsCard />
          <RegistrationDetailsCard />
        </div>

        <Button
          onClick={onSubmit}
          className="whitespace-nowrap px-3 text-xs glow-orange font-semibold lg:px-4 lg:text-sm"
          type="submit"
        >
          Confirmar Inscrição
        </Button>
      </form>
    </FormProvider>
  );
}
