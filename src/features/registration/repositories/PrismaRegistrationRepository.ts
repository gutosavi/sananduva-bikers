import { Prisma, PrismaClient } from "../../../generated/prisma/client";
import {
  fromPrismaRegistration,
  fromPrismaRegistrations,
} from "../mappers/registration.mapper";
import { Registration } from "../schemas/registration.schema";
import { IRegistrationRepository } from "./IRegistrationRepository";

export class PrismaRegistrationRepository implements IRegistrationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  async testConnection(): Promise<void> {
    console.log("A - Testando conexão com o banco");

    await this.prisma.$queryRaw`SELECT 1`;

    console.log("B - Conexão funcionando");
  }

  async save(registration: Registration): Promise<Registration> {
    const saved = await this.prisma.registration.create({
      data: {
        ...registration,
        birthDate: registration.birthDate
          ? new Date(`${registration.birthDate}T00:00:00.000Z`)
          : new Date(),
        extraLunchQuantity: registration.extraLunchQuantity ?? 0,
      },
    });

    return fromPrismaRegistration(saved);
  }

  async update(id: string, data: Partial<Registration>): Promise<Registration> {
    const { id: _, birthDate, ...updatePayload } = data;

    try {
      const updated = await this.prisma.registration.update({
        where: { id },
        data: {
          ...updatePayload,
          ...(birthDate && {
            birthDate: new Date(`${data.birthDate}T00:00:00.000Z`),
          }),
        },
      });

      return fromPrismaRegistration(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Inscrição não encontrada para atualização.");
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.registration.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Inscrição não encontrada para remoção.");
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Registration | undefined> {
    console.log("Iniciando busca");
    const registration = await this.prisma.registration.findUnique({
      where: { id },
    });

    console.log("Consulta finalizada", registration);

    if (!registration) {
      return undefined;
    }

    return fromPrismaRegistration(registration);
  }

  async findByCpf(cpf: string): Promise<Registration | undefined> {
    const registration = await this.prisma.registration.findUnique({
      where: { cpf },
    });

    if (!registration) {
      return undefined;
    }

    return fromPrismaRegistration(registration);
  }

  async findAll(): Promise<Readonly<Registration[]>> {
    const allRegistrations = await this.prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    return fromPrismaRegistrations(allRegistrations);
  }
}
