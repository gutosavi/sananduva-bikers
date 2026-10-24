import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const database = new PrismaRegistrationRepository(prisma);
const service = new RegistrationService(database);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await service.createRegistration(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Erro ao processar inscrição no servidor:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro interno ao processar inscrição.";

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
