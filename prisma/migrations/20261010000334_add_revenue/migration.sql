/*
  Warnings:

  - Added the required column `receita` to the `inscricoes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `genero` on the `inscricoes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tamanho_camisa` on the `inscricoes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "inscricoes" ADD COLUMN     "receita" INTEGER NOT NULL,
DROP COLUMN "genero",
ADD COLUMN     "genero" TEXT NOT NULL,
DROP COLUMN "tamanho_camisa",
ADD COLUMN     "tamanho_camisa" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "TShirtSize";
