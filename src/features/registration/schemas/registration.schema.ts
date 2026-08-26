import { z } from "zod";

const cpfSchema = z.string().refine(
  (val) => {
    const cpf = val.replace(/\D/g, "");
    if (cpf.length !== 11) return false;

    return true;
  },
  { message: "CPF inválido" },
);

export const registrationSchema = z.object({
  fullname: z.string().min(3, "Nome é obrigatório"),
  cpf: cpfSchema,
  birthDate: z.iso.date("Informe uma data válida"),
  gender: z.string().optional(),
  email: z.email("Informe seu e-mail"),
  phoneNumber: z.string().min(1, "Informe seu telefone de contato"),
  cityState: z.string().min(1, "Informe a cidade e o Estado"),
  emergencyContact: z.string().min(1, "Este campo é obrigatório"),
  emergencyPhone: z.string().min(1, "Este campo é obrigatório"),
  category: z.string().min(1, "Selecione sua categoria"),
  route: z.string().min(1, "Selecione o percurso desejado"),
  tshirtSize: z.string().min(1, "Selecione o tamanho da camiseta"),
  team: z.string().optional(),

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
