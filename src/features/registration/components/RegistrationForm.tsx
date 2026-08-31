"use client";

import { Button } from "@/components/ui/button";
import { registrationsServices } from "@/services/registrations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, LoaderIcon, SendIcon } from "lucide-react";
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
  onSave?: (data: Registration) => void;
  onCancel: React.Dispatch<React.SetStateAction<Registration | null>>;
};

export function RegistrationForm({
  isEditing = false,
  initialData,
  onSave,
  onCancel,
}: RegistrationFormProps) {
  const [error, setError] = React.useState("");
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
        termsCheck: true,
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
        termsCheck: false,
      });
    }
  }, [initialData, methods]);

  const {
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: RegistrationFormData): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simula atraso no envio do formulário

      if (isEditing && initialData?.id) {
        if (onSave) {
          onSave({ ...initialData, ...data });
        }
      } else {
        registrationsServices.createRegistration(data);

        methods.reset();
        console.log("Dados enviados", data); // para debug
      }
    } catch (error) {
      setError(`Não foi possível enviar os dados: ${error}`);
      console.error("Erro no envio:", error); // para debug
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="registration-form"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Etapas do formulário */}
        <div className="space-y-6">
          <ParticipantDetailsCard />
          <RegistrationDetailsCard />
          {!isEditing && <CheckboxSection />}
        </div>

        {isEditing ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => onCancel(null)}
            >
              Cancelar
            </Button>

            <Button type="submit" form="registration-form">
              {isSubmitting ? (
                <>
                  Salvando...
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                </>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            className="whitespace-nowrap px-3 py-5 text-xs font-semibold glow-orange lg:px-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                Enviando inscrição...
                <LoaderIcon className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Finalizar inscrição
                <SendIcon className="h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {error && (
          <div className="flex flex-row gap-2 items-center text-sm text-destructive">
            <CircleX className="h-6 w-6" />
            {error}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
