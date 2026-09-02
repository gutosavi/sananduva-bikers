import { RegistrationFormData } from "./schemas/registration.schema";

export const optionsGender = [
  { label: "Feminino", value: "Feminino" },
  { label: "Masculino", value: "Masculino" },
];

export const extraLunchQuantity = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
  extraLunchQuantity: 0,
  termsCheck: false,
};
