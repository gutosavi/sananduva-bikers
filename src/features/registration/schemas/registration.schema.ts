import { CATEGORIES_OPTIONS } from "@/lib/event-data";
import { z } from "zod";
import { MAX_EXTRA_LUNCH, optionsGender, tshirtSizes } from "../constants";

const cpfSchema = z
  .string()
  .min(1, "O CPF é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length === 11, "CPF deve ter 11 dígitos");

export const registrationSchema = z.object({
  fullname: z
    .string()
    .min(3, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  cpf: cpfSchema,
  birthDate: z.iso.date("Informe uma data válida"),
  gender: z.enum(
    optionsGender.map((item) => item.value),
    { error: "Informe seu gênero" },
  ),
  email: z
    .email("Informe seu e-mail")
    .max(254, "E-mail deve ter no máximo 254 caracteres"),
  phoneNumber: z
    .string()
    .min(1, "Informe seu telefone de contato")
    .max(20, "Telefone deve ter no máximo 20 caracteres"),
  cityState: z
    .string()
    .min(1, "Informe a cidade e o Estado")
    .max(50, "Cidade e Estado devem ter no máximo 50 caracteres"),
  emergencyContact: z
    .string()
    .min(1, "Este campo é obrigatório")
    .max(80, "Este campo deve ter no máximo 80 caracteres"),
  emergencyPhone: z
    .string()
    .min(1, "Este campo é obrigatório")
    .max(20, "Telefone de emergência deve ter no máximo 20 caracteres"),
  category: z
    .string()
    .refine(
      (value) => CATEGORIES_OPTIONS.some((category) => category.id === value),
      "Selecione a sua categoria",
    ),
  tshirtSize: z.enum(tshirtSizes, "Selecione o tamanho da camiseta"),
  team: z
    .string()
    .max(80, "Nome da equipe deve ter no máximo 80 caracteres")
    .optional(),
  extraLunchQuantity: z
    .number()
    .min(0, "Quantidade de almoços extras deve ser no mínimo 0")
    .max(
      MAX_EXTRA_LUNCH,
      `Quantidade de almoços extras deve ser no máximo ${MAX_EXTRA_LUNCH}`,
    )
    .int("Quantidade de almoços extras deve ser um número inteiro")
    .optional(),

  termsCheck: z
    .boolean()
    .refine((value) => value === true, "Você precisa aceitar os termos"),
});

export type RegistrationStatus = "pending" | "confirmed" | "cancelled";

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export type Registration = RegistrationFormData & {
  id: string;
  status: RegistrationStatus;
  revenue: number;
};
