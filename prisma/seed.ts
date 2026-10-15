import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@sananduvabikers.com.br";
  const adminPassword =
    process.env.ADMIN_PASSWORD || "mude_esta_senha_para_uma_senha_segura";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: "gutosavi@hotmail.com",
      name: "Gustavo Savi",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Usuário administrador criado: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
