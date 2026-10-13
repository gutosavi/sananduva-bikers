import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { RegistrationFormProps } from "../components/RegistrationForm";
import { defaultValues } from "../constants";
import {
  RegistrationFormData,
  registrationSchema,
} from "../schemas/registration.schema";

export const useRegistrationsForm = ({
  isEditing,
  initialData,
  onSave,
}: RegistrationFormProps) => {
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

      if (isEditing && initialData?.id) {
        if (onSave) {
          onSave({ ...initialData, ...data });
        }
      } else {
        const response = await fetch("/api/registrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error ?? "Erro ao adicionar inscrição.");
        }

        const registration: RegistrationFormData = await response.json();

        setSubmittedData(registration);
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

  return {
    methods,
    isSubmitting,
    error,
    isPaymentModalOpen,
    submittedData,
    userBirthDate,
    userGender,
    onSubmit,
    handleClosePaymentModal,
  };
};
