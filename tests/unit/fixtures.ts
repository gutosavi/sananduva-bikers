import type {
  Registration,
  RegistrationFormData,
} from "../../src/features/registration/schemas/registration.schema";

/** Inscrição válida e completa (CPF formatado, como vem do input). */
export const validRegistration: RegistrationFormData = {
  fullname: "Gustavo Savi",
  cpf: "529.982.247-25", // CPF válido de exemplo
  birthDate: "1995-04-12",
  gender: "Masculino",
  email: "gustavo.savi@example.com",
  phoneNumber: "(54) 99999-1234",
  cityState: "Sananduva/RS",
  emergencyContact: "Maria Savi",
  emergencyPhone: "(54) 98888-4321",
  category: "pro-masc-elite",
  tshirtSize: "M",
  team: "Sananduva Bikers",
  extraLunchQuantity: 2,
  termsCheck: true,
};

/** Versão mínima: só os campos obrigatórios. */
export const minimalRegistration: RegistrationFormData = {
  fullname: "Ana Souza",
  cpf: "11144477735",
  birthDate: "1990-11-03",
  gender: "Feminino",
  email: "ana.souza@example.com",
  phoneNumber: "54988887777",
  cityState: "Passo Fundo/RS",
  emergencyContact: "Carlos Souza",
  emergencyPhone: "54977776666",
  category: "pro-fem-elite",
  tshirtSize: "P",
  termsCheck: true,
};

/** Registro como devolvido pelo banco após o `create`. */
export const savedRegistration: Registration = {
  ...validRegistration,
  cpf: "52998224725",
  id: "reg_123",
  status: "pending",
  revenue: 160,
};
