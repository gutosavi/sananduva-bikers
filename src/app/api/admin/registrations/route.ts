import { auth } from "@/auth";
import { RegistrationError } from "@/features/registration/errors/RegistrationError";
import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { idSchema } from "@/features/registration/schemas/registration.schema";
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

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autorizado." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const idResult = idSchema.safeParse(body);

    if (!idResult.success) {
      throw new RegistrationError(idResult.error.issues[0].message);
    }

    const { id } = idResult.data;
    const { id: _, ...data } = body;

    const result = await service.updateRegistration(id, data);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return mapErrorToResponse(error);
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autorizado." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const idResult = idSchema.safeParse(body);

    if (!idResult.success) {
      throw new RegistrationError(idResult.error.issues[0].message);
    }

    const { id } = idResult.data;

    await service.deleteRegistration(id);
    return NextResponse.json(
      { message: "Inscrição deletada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    return mapErrorToResponse(error);
  }
}
