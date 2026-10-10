import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { prisma } from "@/lib/prisma";
import "dotenv/config";

const registration = {
  id: crypto.randomUUID(),
  fullname: "Participante Teste Atualizado",
  cpf: "12345678909", // substitui por um CPF válido para teu schema
  birthDate: "1995-06-15",
  gender: "Masculino",
  email: `teste-${crypto.randomUUID()}@example.com`,
  phoneNumber: "51999999999",
  cityState: "Sananduva/RS",
  emergencyContact: "Contato Teste",
  emergencyPhone: "51900000000",
  category: "Adulto",
  tshirtSize: "M",
  extraLunchQuantity: 0,
  termsCheck: true,
  status: "pending" as const,
  revenue: 100,
};

async function main() {
  const repository = new PrismaRegistrationRepository(prisma);

  try {
    console.log("Iniciando busca...");

    const allRegistrations = await repository.findAll();

    console.log("Inscrições:", allRegistrations);
  } finally {
    await repository.disconnect();
  }
}

main().catch((error) => {
  console.error("Erro ao testar o repositório:", error);
  process.exitCode = 1;
});
