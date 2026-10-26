import { Registration } from "@/features/registration/schemas/registration.schema";

export function convertJsonToCsv(jsonData: Registration[]): string {
  if (!jsonData.length) {
    return "";
  }

  const headers = Object.keys({
    fullname: "Nome completo",
    cpf: "CPF",
    birthDate: "Data de nascimento",
    gender: "Gênero",
    email: "E-mail",
    phoneNumber: "Telefone",
    cityState: "Cidade/UF",
    status: "Status",
    revenue: "Receita",
    category: "Categoria",
    extraLunchQuantity: "Almoços extras",
    emergencyPhone: "Telefone do contato de emergência",
  });

  return [
    headers.join(";"),
    ...jsonData.map((row) =>
      headers.map((header) => row[header as keyof Registration]).join(";"),
    ),
  ].join("\n");
}
