"use client";

import { Button } from "@/components/ui/button";
import { registrationsServices } from "@/services/registrations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, LoaderIcon, SendIcon } from "lucide-react";
import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { defaultValues } from "../constants";
import {
  Registration,
  RegistrationFormData,
  registrationSchema,
} from "../schemas/registration.schema";
import { CheckboxSection } from "./CheckboxSection";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { PaymentModal } from "./PaymentModal";
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [submittedData, setSubmittedData] =
    React.useState<RegistrationFormData>();
  const [error, setError] = React.useState("");
  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: initialData
      ? {
          ...defaultValues,
          ...initialData,
          termsCheck: true,
        }
      : defaultValues,
  });

  const {
    control,
    reset,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (initialData) {
      reset({
        ...defaultValues,
        ...initialData,
        termsCheck: true,
      });
    }
  }, [initialData, reset]);

  const userBirthDate = useWatch({ control, name: "birthDate" });
  const userGender = useWatch({ control, name: "gender" });

  const onSubmit = async (data: RegistrationFormData): Promise<void> => {
    try {
      setError("");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEditing && initialData?.id) {
        if (onSave) {
          onSave({ ...initialData, ...data });
        }
      } else {
        registrationsServices.createRegistration(data);
        setSubmittedData(data);
        setIsPaymentModalOpen(true);
      }
    } catch (err) {
      setError(`Não foi possível enviar os dados: ${err}`);
      console.error("Erro no envio:", err);
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    reset(defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        id="registration-form"
        onSubmit={methods.handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-5"
      >
        {/* Etapas do formulário */}
        <div className="space-y-6">
          <ParticipantDetailsCard />
          <RegistrationDetailsCard
            birthDate={userBirthDate}
            gender={userGender}
          />
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

            <Button
              type="submit"
              form="registration-form"
              disabled={isSubmitting}
            >
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

        {/* Modal de pagamento */}
        {isPaymentModalOpen && submittedData && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handleClosePaymentModal}
            registrationData={submittedData}
          />
        )}

        {/* Mensagem de erro */}
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
