import { auth } from "@/auth";
import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import { mapErrorToResponse } from "@/helpers/mapErrorToResponse";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const database = new PrismaRegistrationRepository(prisma);
const service = new RegistrationService(database);

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autorizado." },
      { status: 401 },
    );
  }

  try {
    const result = await service.findAllRegistrations();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return mapErrorToResponse(error);
  }
}
