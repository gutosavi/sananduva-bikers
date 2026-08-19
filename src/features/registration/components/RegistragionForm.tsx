"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  RegistrationFormData,
  registrationSchema,
} from "../schemas/registration.schema";
import { CheckboxSection } from "./CheckboxSection";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { RegistrationDetailsCard } from "./RegistrationDetailsCard";

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullname: "",
      cpf: "",
      birthDate: "",
      gender: "",
      email: "",
      phoneNumber: "",
      cityState: "",
      emergencyContact: "",
      emergencyPhone: "",
      category: "",
      route: "",
      tshirtSize: "",
      team: "",
      termsCheck: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData): Promise<void> => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simula atraso no envio do formulário

      if (data) {
        localStorage.setItem(
          "registration",
          JSON.stringify({ id: crypto.randomUUID(), ...data }),
        );

        methods.reset();
        console.log("Dados enviados", data);
      } else {
        throw new Error("Os dados não puderam ser enviados");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Etapas do formulário */}
        <div className="space-y-6">
          <ParticipantDetailsCard />
          <RegistrationDetailsCard />
          <CheckboxSection />
        </div>

        {isSubmitting ? (
          <Button
            className="whitespace-nowrap px-3 py-5 text-xs glow-orange font-semibold lg:px-4 lg:text-sm"
            type="submit"
            disabled
          >
            <span className="flex flex-row gap-1">
              Enviando inscrição...
              <LoaderIcon className="w-4 h-4 animate-spin" />
            </span>
          </Button>
        ) : (
          <Button
            className="whitespace-nowrap px-3 py-5 text-xs glow-orange font-semibold lg:px-4 lg:text-sm"
            type="submit"
          >
            <SendIcon className="w-4 h-4" />
            Finalizar inscrição
          </Button>
        )}
      </form>
    </FormProvider>
  );
}
