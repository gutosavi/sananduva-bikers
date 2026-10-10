-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('pending', 'confirmed', 'cancelled');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Masculino', 'Feminino');

-- CreateEnum
CREATE TYPE "TShirtSize" AS ENUM ('PP', 'P', 'M', 'G', 'GG');

-- CreateTable
CREATE TABLE "inscricoes" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "genero" "Gender" NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "cidade_estado" TEXT NOT NULL,
    "nome_contato_emergencia" TEXT NOT NULL,
    "telefone_emergencia" TEXT NOT NULL,
    "equipe" TEXT,
    "tamanho_camisa" "TShirtSize" NOT NULL,
    "quantidade_almoco_extra" INTEGER NOT NULL,
    "aceitou_termos" BOOLEAN NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'pending',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscricoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inscricoes_cpf_key" ON "inscricoes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "inscricoes_email_key" ON "inscricoes"("email");
