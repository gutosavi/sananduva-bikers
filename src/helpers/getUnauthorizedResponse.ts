import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function getUnauthorizedResponse(): Promise<
  NextResponse | undefined
> {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Usuário não autorizado." },
      { status: 401 },
    );
  }
}
