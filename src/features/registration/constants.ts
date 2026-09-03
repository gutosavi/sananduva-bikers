import { RegistrationFormData } from "./schemas/registration.schema";

export const optionsGender = [
  { label: "Feminino", value: "Feminino" },
  { label: "Masculino", value: "Masculino" },
];

export const extraLunchQuantity = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

export const tshirtSizes = ["PP", "P", "M", "G", "GG"];

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

export const defaultValues: RegistrationFormData = {
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
  tshirtSize: "",
  team: "",
  extraLunchQuantity: undefined,
  termsCheck: false,
};
