import { IRegistrationRepository } from "@/features/registration/repositories/IRegistrationRepository";
import { Registration } from "@/features/registration/schemas/registration.schema";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { validRegistration } from "./fixtures";

function createMockRepository(): Mocked<IRegistrationRepository> {
  return {
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
  };
}

describe("RegistrationService", () => {
  let repository: Mocked<IRegistrationRepository>;
  let service: RegistrationService;

  beforeEach(() => {
    repository = createMockRepository();
    service = new RegistrationService(repository);
  });

  describe("createRegistration", () => {
    it("grava a inscrição como pendente com o valor calculado", async () => {
      repository.save.mockImplementation(async (data) => data);

      const result = await service.createRegistration(validRegistration);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          status: "pending",
          revenue: 180,
        }),
      );
      expect(result).toMatchObject({
        id: expect.any(String),
        status: "pending",
        revenue: 180,
      });
    });
  });

  describe("updateRegistration", () => {
    const existing: Registration = {
      ...validRegistration,
      id: "reg_123",
      status: "pending",
      revenue: 180,
    };

    beforeEach(() => {
      repository.findById.mockResolvedValue(existing);
      repository.update.mockImplementation(
        async (_id, data) => data as Registration,
      );
    });

    it("confirma inscrição", async () => {
      const result = await service.updateRegistration("reg_123", {
        status: "confirmed",
      });

      expect(repository.findById).toHaveBeenCalledWith("reg_123");
      expect(repository.update).toHaveBeenCalledWith("reg_123", {
        ...existing,
        status: "confirmed",
      });

      expect(result.revenue).toBe(180);
    });

    it("reduz os almoços extras", async () => {
      const result = await service.updateRegistration("reg_123", {
        extraLunchQuantity: 1,
      });

      expect(repository.findById).toHaveBeenCalledWith("reg_123");
      expect(repository.update).toHaveBeenCalledWith("reg_123", {
        ...existing,
        extraLunchQuantity: 1,
        revenue: 140,
      });

      expect(result.revenue).toBe(140);
    });

    it("altera o nome do participante", async () => {
      const result = await service.updateRegistration("reg_123", {
        fullname: "Novo Nome",
      });

      expect(repository.findById).toHaveBeenCalledWith("reg_123");
      expect(repository.update).toHaveBeenCalledWith("reg_123", {
        ...existing,
        fullname: "Novo Nome",
      });

      expect(result.fullname).toBe("Novo Nome");
    });

    it("rejeita quando a inscrição não existe", async () => {
      repository.findById.mockResolvedValue(undefined);

      await expect(
        service.updateRegistration("reg_404", { status: "confirmed" }),
      ).rejects.toThrow("Inscrição não encontrada");

      expect(repository.findById).toHaveBeenCalledWith("reg_404");
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteRegistration", () => {
    const existing: Registration = {
      ...validRegistration,
      id: "reg_123",
      status: "pending",
      revenue: 180,
    };

    beforeEach(() => {
      repository.findById.mockResolvedValue(existing);
      repository.delete.mockImplementation(async (_id) => undefined);
    });

    it("deleta inscrição", async () => {
      const result = await service.deleteRegistration("reg_123");

      expect(repository.findById).toHaveBeenCalledWith("reg_123");
      expect(repository.delete).toHaveBeenCalledWith("reg_123");

      expect(result).toBe(undefined);
    });
  });
});
