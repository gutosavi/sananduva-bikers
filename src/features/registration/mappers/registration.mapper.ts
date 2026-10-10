import { Prisma } from "../../../generated/prisma/client";
import { Registration } from "../schemas/registration.schema";

export function fromPrismaRegistration(
  record: Prisma.RegistrationGetPayload<object>,
): Registration {
  return {
    fullname: record.fullname,
    cpf: record.cpf,
    birthDate: record.birthDate.toISOString().slice(0, 10),
    gender: record.gender,
    email: record.email,
    phoneNumber: record.phoneNumber,
    cityState: record.cityState,
    emergencyContact: record.emergencyContact,
    emergencyPhone: record.emergencyPhone,
    category: record.category,
    tshirtSize: record.tshirtSize,
    termsCheck: record.termsCheck,
    team: record.team ?? undefined,
    extraLunchQuantity: record.extraLunchQuantity,
    id: record.id,
    status: record.status,
    revenue: record.revenue,
  };
}

export function fromPrismaRegistrations(
  records: Prisma.RegistrationGetPayload<object>[],
): Registration[] {
  return records.map((record) => ({
    fullname: record.fullname,
    cpf: record.cpf,
    birthDate: record.birthDate.toISOString().slice(0, 10),
    gender: record.gender,
    email: record.email,
    phoneNumber: record.phoneNumber,
    cityState: record.cityState,
    emergencyContact: record.emergencyContact,
    emergencyPhone: record.emergencyPhone,
    category: record.category,
    tshirtSize: record.tshirtSize,
    termsCheck: record.termsCheck,
    team: record.team ?? undefined,
    extraLunchQuantity: record.extraLunchQuantity,
    id: record.id,
    status: record.status,
    revenue: record.revenue,
  }));
}
