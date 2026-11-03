import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import { mapErrorToResponse } from "@/helpers/mapErrorToResponse";
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
    return mapErrorToResponse(error);
  }
}
