"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  RegistrationFormData,
  registrationSchema,
} from "../schemas/registration.schema";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { RegistrationDetailsCard } from "./RegistrationDetailsCard";

export type FormData = {
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
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullname: "",
      cpf: "",
      birthDate: "",
      gender: "",
      cityState: "",
      emergencyContact: "",
      emergencyPhone: "",
      category: "",
      route: "",
      tshirtSize: "",
      team: "",
    },
  });

  const onSubmit = methods.handleSubmit((data: RegistrationFormData) => {
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
