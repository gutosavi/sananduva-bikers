import { Registration } from "../schemas/registration.schema";
import { IRegistrationRepository } from "./IRegistrationRepository";

export class LocalStorageRegistrationRepository implements IRegistrationRepository {
  private readonly STORAGE_KEY = "registration";

  async save(registration: Registration): Promise<Registration> {
    const currentListRaw = await this.getRegistrations();
    const updateList = [...currentListRaw, registration];

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updateList));
    return registration;
  }

  async update(id: string, data: Partial<Registration>): Promise<Registration> {
    const currentList = await this.getRegistrations();
    const registrationIndex = currentList.findIndex((item) => item.id === id);

    if (registrationIndex === -1) {
      throw new Error("Item não encontrado.");
    }

    const updatedRegistration = { ...currentList[registrationIndex], ...data };
    currentList[registrationIndex] = updatedRegistration;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentList));
    return updatedRegistration;
  }

  async delete(id: string): Promise<void> {
    const currentList = await this.getRegistrations();
    const updatedList = currentList.filter((item) => item.id !== id);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedList));
  }

  async findById(id: string): Promise<Registration | undefined> {
    const currentList = await this.getRegistrations();
    return currentList.find((item) => item.id === id);
  }

  async findAll(): Promise<Readonly<Registration[]>> {
    return await this.getRegistrations();
  }

  private async getRegistrations(): Promise<Registration[]> {
    if (typeof window === "undefined") return [];

    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];

    try {
      return JSON.parse(data) as Registration[];
    } catch (error) {
      console.error("Erro ao ler registros do localStorage:", error);
      return [];
    }
  }
}
