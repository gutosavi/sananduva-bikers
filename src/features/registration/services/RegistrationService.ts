import { REGISTRATION_PRICES } from "@/lib/event-data";
import { Participant } from "@/models/Participant";
import { IRegistrationRepository } from "../repositories/IRegistrationRepository";
import {
  Registration,
  RegistrationFormData,
} from "../schemas/registration.schema";

export class RegistrationService {
  constructor(private readonly storage: IRegistrationRepository) {}

  async createRegistration(data: RegistrationFormData): Promise<Registration> {
    const registration = new Participant(data);

    const total = registration.calculateTotalValue(REGISTRATION_PRICES);

    const newRegistration: Registration = {
      ...data,
      id: crypto.randomUUID(),
      status: "pending",
      revenue: total,
    };

    return await this.storage.save(newRegistration);
  }

  async updateRegistration(
    id: string,
    data: Partial<Registration>,
  ): Promise<Registration> {
    const existingRegistration = await this.storage.findById(id);

    if (!existingRegistration) {
      throw new Error("Inscrição não encontrada.");
    }

    const updatedFormData: RegistrationFormData = {
      ...existingRegistration,
      ...data,
    };

    const participant = new Participant(updatedFormData);
    const total = participant.calculateTotalValue(REGISTRATION_PRICES);

    const updatedRegistration: Registration = {
      ...existingRegistration,
      ...updatedFormData,
      revenue: total,
    };

    return await this.storage.update(id, updatedRegistration);
  }

  async deleteRegistration(id: string): Promise<Registration[]> {
    const existingRegistration = await this.storage.findById(id);

    if (!existingRegistration) {
      throw new Error("Inscrição não encontrada para remoção.");
    }

    return await this.storage.delete(id);
  }

  async findAllRegistrations(): Promise<readonly Registration[]> {
    return await this.storage.findAll();
  }
}
