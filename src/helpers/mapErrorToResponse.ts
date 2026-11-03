import { RegistrationError } from "@/features/registration/errors/RegistrationError";
import { NextResponse } from "next/server";

export function mapErrorToResponse(error: unknown): NextResponse {
  if (error instanceof RegistrationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json(
      { error: "Erro de sintaxe no corpo da requisição" },
      { status: 400 },
    );
  }

  console.error("Erro interno do servidor:", error);

  return NextResponse.json(
    {
      error:
        "Erro ao conectar com o banco de dados. Tente novamente mais tarde.",
    },
    { status: 500 },
  );
}
