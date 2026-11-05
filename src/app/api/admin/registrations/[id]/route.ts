import { RegistrationError } from "@/features/registration/errors/RegistrationError";
import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { idSchema } from "@/features/registration/schemas/registration.schema";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import { getUnauthorizedResponse } from "@/helpers/getUnauthorizedResponse";
import { mapErrorToResponse } from "@/helpers/mapErrorToResponse";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const database = new PrismaRegistrationRepository(prisma);
const service = new RegistrationService(database);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResponse = await getUnauthorizedResponse();

  if (authResponse) return authResponse;

  try {
    const { id } = await params;
    const idResult = idSchema.safeParse({ id });

    if (!idResult.success) {
      throw new RegistrationError(idResult.error.issues[0].message);
    }

    const { id: registrationId } = idResult.data;
    const body = await request.json();

    const result = await service.updateRegistration(registrationId, body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return mapErrorToResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResponse = await getUnauthorizedResponse();

  if (authResponse) return authResponse;

  try {
    const { id } = await params;
    const idResult = idSchema.safeParse({ id });

    if (!idResult.success) {
      throw new RegistrationError(idResult.error.issues[0].message);
    }

    const { id: registrationId } = idResult.data;

    await service.deleteRegistration(registrationId);
    return NextResponse.json(
      { message: "Inscrição deletada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    return mapErrorToResponse(error);
  }
}
