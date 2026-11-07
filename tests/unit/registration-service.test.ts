import { RegistrationError } from "@/features/registration/errors/RegistrationError";
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

    it("rejeita quando os dados são inválidos", async () => {
      const invalidData = { ...validRegistration, fullname: "" };

      await expect(service.createRegistration(invalidData)).rejects.toThrow();
      await expect(
        service.createRegistration(invalidData),
      ).rejects.toBeInstanceOf(RegistrationError);

      expect(repository.save).not.toHaveBeenCalled();
    });

    it("ignora o status e a receita enviados e aplica os valores padrão", async () => {
      repository.save.mockImplementation(async (data) => data);

      const result = await service.createRegistration({
        ...validRegistration,
        status: "confirmed",
        revenue: 9999,
      });

      expect(result.status).toBe("pending");
      expect(result.revenue).toBe(180);
    });

    it("propaga o RegistrationError intacto quando o repositório falhar", async () => {
      const existingEmail = {
        ...validRegistration,
        email: "gustavo.savi@example.com",
      };
      const errorSimulated = new RegistrationError("Erro simulado");

      repository.save.mockRejectedValue(errorSimulated);

      await expect(service.createRegistration(existingEmail)).rejects.toBe(
        errorSimulated,
      );
      await expect(service.createRegistration(existingEmail)).rejects.toThrow(
        "Erro simulado",
      );
    });

    it("propaga erros inesperados do repositório", async () => {
      const unexpectedError = new Error("Erro inesperado");
      repository.save.mockRejectedValue(unexpectedError);

      await expect(service.createRegistration(validRegistration)).rejects.toBe(
        unexpectedError,
      );
    });
  });

  describe("updateRegistration", () => {
    const existingData: Registration = {
      ...validRegistration,
      id: "reg_123",
      status: "pending",
      revenue: 180,
    };

    beforeEach(() => {
      repository.findById.mockResolvedValue(existingData);
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
        ...existingData,
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
        ...existingData,
        extraLunchQuantity: 1,
        revenue: 140,
      });

      expect(result.extraLunchQuantity).toBe(1);
      expect(result.revenue).toBe(140);
    });

    it("rejeita input inválido sem consultar o banco", async () => {
      const invalidInput = { fullname: "" };

      await expect(
        service.updateRegistration("reg_123", invalidInput),
      ).rejects.toThrow(RegistrationError);

      expect(repository.findById).not.toHaveBeenCalled();
    });

    it("altera o nome do participante", async () => {
      const result = await service.updateRegistration("reg_123", {
        fullname: "Novo Nome",
      });

      expect(repository.findById).toHaveBeenCalledWith("reg_123");

      expect(repository.update).toHaveBeenCalledWith("reg_123", {
        ...existingData,
        fullname: "Novo Nome",
      });

      expect(result).toEqual(
        expect.objectContaining({
          ...existingData,
          fullname: "Novo Nome",
        }),
      );
    });

    it("rejeita quando a inscrição é inexistente", async () => {
      repository.findById.mockResolvedValue(undefined);

      await expect(
        service.updateRegistration("reg_404", { status: "confirmed" }),
      ).rejects.toThrow("Inscrição não encontrada");

      expect(repository.findById).toHaveBeenCalledWith("reg_404");
      expect(repository.update).not.toHaveBeenCalled();
    });

    it("ignora a receita e o termo de aceite enviados", async () => {
      const result = await service.updateRegistration("reg_123", {
        ...existingData,
        revenue: 9999,
        termsCheck: false,
      });

      expect(result.termsCheck).toBe(true);
      expect(result.revenue).toBe(180);
    });
  });

  describe("deleteRegistration", () => {
    const existingData: Registration = {
      ...validRegistration,
      id: "reg_123",
      status: "pending",
      revenue: 180,
    };

    beforeEach(() => {
      repository.findById.mockResolvedValue(existingData);
      repository.delete.mockImplementation(async (_id) => undefined);
    });

    it("deleta inscrição", async () => {
      const result = await service.deleteRegistration("reg_123");

      expect(repository.findById).toHaveBeenCalledWith("reg_123");
      expect(repository.delete).toHaveBeenCalledWith("reg_123");

      expect(result).toBe(undefined);
    });

    it("rejeita quando a inscrição é inexistente", async () => {
      repository.findById.mockResolvedValue(undefined);

      const result = service.deleteRegistration("id_inexistente");

      await expect(result).rejects.toBeInstanceOf(RegistrationError);
      await expect(result).rejects.toThrow(
        "Inscrição não encontrada para remoção.",
      );

      expect(repository.delete).not.toHaveBeenCalled();
    });
  });

  describe("findPublicRegistrations", () => {
    const existingData: Registration = {
      ...validRegistration,
      id: "reg_123",
      status: "pending",
      revenue: 180,
    };

    it("não expõe dados sensíveis", async () => {
      repository.findAll.mockResolvedValue([existingData]);

      const result = await service.findPublicRegistrations();

      expect(result).toEqual([
        {
          id: "reg_123",
          fullname: "Gustavo Savi",
          cityState: "Sananduva/RS",
          status: "pending",
          category: "pro-masc-elite",
          team: "Sananduva Bikers",
        },
      ]);
    });

    it("inclui inscrições confirmadas", async () => {
      const confirmedRegistration: Registration = {
        ...existingData,
        status: "confirmed",
      };

      repository.findAll.mockResolvedValue([confirmedRegistration]);

      const result = await service.findPublicRegistrations();

      expect(result).toEqual([
        {
          id: "reg_123",
          fullname: "Gustavo Savi",
          cityState: "Sananduva/RS",
          status: "confirmed",
          category: "pro-masc-elite",
          team: "Sananduva Bikers",
        },
      ]);
    });

    it("exclui inscrições canceladas", async () => {
      const cancelledRegistration: Registration = {
        ...existingData,
        status: "cancelled",
      };

      repository.findAll.mockResolvedValue([cancelledRegistration]);

      const result = await service.findPublicRegistrations();

      expect(result).toHaveLength(0);
    });
  });
});
