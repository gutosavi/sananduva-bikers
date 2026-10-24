import { auth } from "@/auth";
import { PrismaRegistrationRepository } from "@/features/registration/repositories/PrismaRegistrationRepository";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
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
    console.error("Erro ao buscar inscrições no servidor:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro interno ao buscar inscrições.";

    return NextResponse.json({ error: errorMessage }, { status: 400 });
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
    const { id, ...data } = body;
    const result = await service.updateRegistration(id, data);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar inscrição no servidor:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro interno ao atualizar inscrição.";

    return NextResponse.json({ error: errorMessage }, { status: 400 });
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
    const { id } = body;
    await service.deleteRegistration(id);
    return NextResponse.json(
      { message: "Inscrição deletada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao deletar inscrição no servidor:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Erro interno ao deletar inscrição.";

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
