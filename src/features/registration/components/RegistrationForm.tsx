"use client";

import { Button } from "@/components/ui/button";
import { CircleX, LoaderIcon, SendIcon } from "lucide-react";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useRegistrationsForm } from "../hooks/useRegistrationsForm";
import { LocalStorageRegistrationRepository } from "../repositories/LocalStorageRegistrationRepository";
import { Registration } from "../schemas/registration.schema";
import { RegistrationService } from "../services/RegistrationService";
import { CheckboxSection } from "./CheckboxSection";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { PaymentModal } from "./PaymentModal";
import { RegistrationDetailsCard } from "./RegistrationDetailsCard";

export type RegistrationFormProps = {
  isEditing?: boolean;
  initialData?: Registration | null;
  onSave?: (data: Registration) => void;
  onCancel?: React.Dispatch<React.SetStateAction<Registration | null>>;
};

const dataStorage = new LocalStorageRegistrationRepository();
const service = new RegistrationService(dataStorage);

export function RegistrationForm({
  isEditing = false,
  initialData,
  onSave,
  onCancel,
}: RegistrationFormProps) {
  const {
    methods,
    isSubmitting,
    error,
    isPaymentModalOpen,
    submittedData,
    userBirthDate,
    userGender,
    onSubmit,
    handleClosePaymentModal,
  } = useRegistrationsForm({ isEditing, initialData, onSave, service });

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
              onClick={() => onCancel && onCancel(null)}
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
