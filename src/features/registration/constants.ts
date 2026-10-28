import { DefaultValues } from "react-hook-form";
import { RegistrationFormData } from "./schemas/registration.schema";

export const optionsGender = [
  { value: "Feminino" },
  { value: "Masculino" },
] as const;

export const pixKey = "23639623000104";

export const MAX_EXTRA_LUNCH = 20;

export const quantitySelect = Array.from(
  { length: MAX_EXTRA_LUNCH + 1 },
  (_, index) => ({
    value: index,
    label: `${index} ${index === 1 ? "almoço" : "almoços"}`,
  }),
);

export const tshirtSizes = ["PP", "P", "M", "G", "GG"] as const;

export const paymentInstructions = [
  {
    id: 1,
    text: "Abra o app do seu banco e escaneie o QR Code ou copie a chave.",
  },
  { id: 2, text: "Pague o valor exato da inscrição e guarde o comprovante." },
  {
    id: 3,
    text: "Sua inscrição é confirmada assim que a Associação Sananduva Bikers verificar o PIX.",
  },
];

export const defaultValues: DefaultValues<RegistrationFormData> = {
  fullname: "",
  cpf: "",
  birthDate: "",
  gender: undefined,
  email: "",
  phoneNumber: "",
  cityState: "",
  emergencyContact: "",
  emergencyPhone: "",
  category: "",
  tshirtSize: undefined,
  team: "",
  extraLunchQuantity: undefined,
  termsCheck: false,
};
