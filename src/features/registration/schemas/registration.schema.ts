import { z } from "zod";

const cpfSchema = z
  .string()
  .min(1, "O CPF é obrigatório")
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length === 11);

export const registrationSchema = z.object({
  fullname: z.string().min(3, "Nome é obrigatório"),
  cpf: cpfSchema,
  birthDate: z.iso.date("Informe uma data válida"),
  gender: z.string().min(1, "Informe seu gênero"),
  email: z.email("Informe seu e-mail"),
  phoneNumber: z.string().min(1, "Informe seu telefone de contato"),
  cityState: z.string().min(1, "Informe a cidade e o Estado"),
  emergencyContact: z.string().min(1, "Este campo é obrigatório"),
  emergencyPhone: z.string().min(1, "Este campo é obrigatório"),
  category: z.string().refine((val) => val.trim().length > 0, {
    message: "Selecione a sua categoria",
  }),
  tshirtSize: z.string().min(1, "Selecione o tamanho da camiseta"),
  team: z.string().optional(),
  extraLunchQuantity: z.number().optional(),

  termsCheck: z
    .boolean()
    .refine((value) => value === true, "Você precisa aceitar os termos"),
});

export type RegistrationStatus = "pending" | "confirmed";

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export type Registration = RegistrationFormData & {
  id: string;
  status: RegistrationStatus;
  revenue: number;
};
