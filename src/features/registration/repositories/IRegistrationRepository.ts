import { Registration } from "../schemas/registration.schema";

export interface IRegistrationRepository {
  save(registration: Registration): Promise<Registration>;
  update(id: string, data: Partial<Registration>): Promise<Registration>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Registration | undefined>;
  findAll(): Promise<Readonly<Registration[]>>;
}
