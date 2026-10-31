import { REGISTRATION_PRICES } from "@/lib/event-data";
import { Participant } from "@/models/Participant";
import { RegistrationError } from "../errors/RegistrationError";
import { IRegistrationRepository } from "../repositories/IRegistrationRepository";
import {
  Registration,
  registrationSchema,
  updateSchema,
} from "../schemas/registration.schema";

export class RegistrationService {
  constructor(private readonly storage: IRegistrationRepository) {}

  async createRegistration(input: unknown): Promise<Registration> {
    const result = registrationSchema.safeParse(input);

    if (!result.success) {
      throw new RegistrationError(result.error.issues[0].message);
    }

    const registration = new Participant(result.data);

    const total = registration.calculateTotalValue(REGISTRATION_PRICES);

    const newRegistration: Registration = {
      ...result.data,
      id: crypto.randomUUID(),
      status: "pending",
      revenue: total,
    };

    return await this.storage.save(newRegistration);
  }

  async updateRegistration(id: string, data: unknown): Promise<Registration> {
    const result = updateSchema.safeParse(data);

    if (!result.success) {
      throw new RegistrationError(result.error.issues[0].message);
    }

    const existingRegistration = await this.storage.findById(id);

    if (!existingRegistration) {
      throw new RegistrationError("Inscrição não encontrada.");
    }

    const updatedFormData = {
      ...existingRegistration,
      ...result.data,
    };

    const participant = new Participant(updatedFormData);
    const total = participant.calculateTotalValue(REGISTRATION_PRICES);

    const updatedRegistration: Registration = {
      ...updatedFormData,
      revenue: total,
    };

    return await this.storage.update(id, updatedRegistration);
  }

  async deleteRegistration(id: string): Promise<void> {
    const existingRegistration = await this.storage.findById(id);

    if (!existingRegistration) {
      throw new RegistrationError("Inscrição não encontrada para remoção.");
    }

    await this.storage.delete(id);
  }

  async findAllRegistrations(): Promise<readonly Registration[]> {
    return await this.storage.findAll();
  }
}
