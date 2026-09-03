import { RegistrationFormData } from "./schemas/registration.schema";

export const optionsGender = [
  { label: "Feminino", value: "Feminino" },
  { label: "Masculino", value: "Masculino" },
];

export const extraLunchQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const tshirtSizes = ["PP", "P", "M", "G", "GG"];

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
