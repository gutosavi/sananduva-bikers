"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, SendIcon } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Registration,
  RegistrationFormData,
  registrationSchema,
} from "../schemas/registration.schema";
import { CheckboxSection } from "./CheckboxSection";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { RegistrationDetailsCard } from "./RegistrationDetailsCard";

type RegistrationFormProps = {
  isEditing?: boolean;
  initialData?: Registration | null;
  onSave?: (data: RegistrationFormData) => void;
  onCancel?: () => void;
};

export function RegistrationForm({
  isEditing = false,
  initialData,
  onSave,
  onCancel,
}: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullname: initialData?.fullname ?? "",
      cpf: initialData?.cpf ?? "",
      birthDate: initialData?.birthDate ?? "",
      gender: initialData?.gender ?? "",
      email: initialData?.email ?? "",
      phoneNumber: initialData?.phoneNumber ?? "",
      cityState: initialData?.cityState ?? "",
      emergencyContact: initialData?.emergencyContact ?? "",
      emergencyPhone: initialData?.emergencyPhone ?? "",
      category: initialData?.category ?? "",
      route: initialData?.route ?? "",
      tshirtSize: initialData?.tshirtSize ?? "",
      team: initialData?.team ?? "",
      termsCheck: false,
    },
  });

  React.useEffect(() => {
    if (initialData) {
      methods.reset({
        fullname: initialData.fullname,
        cpf: initialData.cpf,
        birthDate: initialData.birthDate,
        gender: initialData.gender,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        cityState: initialData.cityState,
        emergencyContact: initialData.emergencyContact,
        emergencyPhone: initialData.emergencyPhone,
        category: initialData.category,
        route: initialData.route,
        tshirtSize: initialData.tshirtSize,
        team: initialData.team,
      });
    } else {
      methods.reset({
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
      });
    }
  }, [initialData, methods]);

  const onSubmit = async (data: RegistrationFormData): Promise<void> => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simula atraso no envio do formulário

      if (data) {
        const registration: Registration = {
          id: crypto.randomUUID(),
          ...data,
          status: "pending",
          revenue: 140,
        };

        localStorage.setItem("registration", JSON.stringify(registration));

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
          {!isEditing && <CheckboxSection />}
        </div>

        {!isEditing &&
          (isSubmitting ? (
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
          ))}
      </form>
    </FormProvider>
  );
}
