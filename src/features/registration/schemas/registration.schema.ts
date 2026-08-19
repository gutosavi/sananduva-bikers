import { z } from "zod";

const cpfSchema = z.string().refine(
  (val) => {
    const clear = val.replace(/\D/g, "");
    if (clear.length !== 11) return false;

    return true;
  },
  { message: "CPF inválido" },
);

export const registrationSchema = z.object({
  fullname: z.string().min(1, { message: "Nome é obrigatório" }),
  cpf: cpfSchema,
  birthDate: z.iso.date("Informe uma data válida"),
  gender: z.string(),
  cityState: z.string(),
  emergencyContact: z.string(),
  emergencyPhone: z.string(),
  category: z.string(),
  route: z.string(),
  tshirtSize: z.string(),
  team: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
