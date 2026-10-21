import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { registrationSchema } from "../../src/features/registration/schemas/registration.schema";
import { minimalRegistration, validRegistration } from "./fixtures";

/** Mensagens de erro de um campo específico. */
function errorsFor(data: unknown, field: string): string[] {
  const result = registrationSchema.safeParse(data);
  if (result.success) return [];
  return result.error.issues
    .filter((issue) => issue.path[0] === field)
    .map((issue) => issue.message);
}

describe("registrationSchema", () => {
  describe("1) Submissão com dados válidos", () => {
    it("aceita uma inscrição completa", () => {
      const result = registrationSchema.safeParse(validRegistration);

      expect(result.success).toBe(true);
    });

    it("aceita uma inscrição apenas com os campos obrigatórios", () => {
      const result = registrationSchema.safeParse(minimalRegistration);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.team).toBeUndefined();
        expect(result.data.extraLunchQuantity).toBeUndefined();
      }
    });

    it("remove a máscara do CPF (transform)", () => {
      const result = registrationSchema.parse(validRegistration);

      expect(result.cpf).toBe("52998224725");
    });

    it("aceita CPF já sem máscara", () => {
      const result = registrationSchema.parse({
        ...validRegistration,
        cpf: "52998224725",
      });

      expect(result.cpf).toBe("52998224725");
    });

    it("aceita extraLunchQuantity igual a zero", () => {
      const result = registrationSchema.safeParse({
        ...validRegistration,
        extraLunchQuantity: 0,
      });

      expect(result.success).toBe(true);
    });
  });

  describe("2) Submissão com dados inválidos", () => {
    it.each([
      ["fullname", "", "Nome é obrigatório"],
      ["fullname", "Jo", "Nome é obrigatório"],
      ["birthDate", "12/04/1995", "Informe uma data válida"],
      ["birthDate", "1995-02-30", "Informe uma data válida"],
      ["birthDate", "", "Informe uma data válida"],
      ["gender", "", "Informe seu gênero"],
      ["email", "gustavo.savi", "Informe seu e-mail"],
      ["email", "gustavo@", "Informe seu e-mail"],
      ["email", "", "Informe seu e-mail"],
      ["phoneNumber", "", "Informe seu telefone de contato"],
      ["cityState", "", "Informe a cidade e o Estado"],
      ["emergencyContact", "", "Este campo é obrigatório"],
      ["emergencyPhone", "", "Este campo é obrigatório"],
      ["category", "", "Selecione a sua categoria"],
      ["category", "   ", "Selecione a sua categoria"],
      ["tshirtSize", "", "Selecione o tamanho da camiseta"],
    ])("rejeita %s = %j com a mensagem correta", (field, value, message) => {
      const errors = errorsFor({ ...validRegistration, [field]: value }, field);

      expect(errors).toContain(message);
    });

    it("rejeita quando os termos não foram aceitos", () => {
      const errors = errorsFor(
        { ...validRegistration, termsCheck: false },
        "termsCheck",
      );

      expect(errors).toContain("Você precisa aceitar os termos");
    });

    it("rejeita termsCheck que não seja booleano", () => {
      const result = registrationSchema.safeParse({
        ...validRegistration,
        termsCheck: "true",
      });

      expect(result.success).toBe(false);
    });

    it("rejeita extraLunchQuantity que não seja número", () => {
      const result = registrationSchema.safeParse({
        ...validRegistration,
        extraLunchQuantity: "2",
      });

      expect(result.success).toBe(false);
    });

    it("exige o CPF com a mensagem específica quando vazio", () => {
      const errors = errorsFor({ ...validRegistration, cpf: "" }, "cpf");

      expect(errors).toContain("O CPF é obrigatório");
    });

    it.each([
      ["com 10 dígitos", "529.982.247-2"],
      ["com 12 dígitos", "529.982.247-255"],
      ["sem nenhum dígito", "abc.def.ghi-jk"],
    ])("rejeita CPF %s", (_label, cpf) => {
      const errors = errorsFor({ ...validRegistration, cpf }, "cpf");

      // O refine do CPF não define mensagem; validamos só que o campo falhou.
      expect(errors.length).toBeGreaterThan(0);
    });

    it("reporta erro em todos os campos obrigatórios quando o objeto está vazio", () => {
      const result = registrationSchema.safeParse({});

      expect(result.success).toBe(false);
      if (!result.success) {
        const failedFields = new Set(result.error.issues.map((i) => i.path[0]));
        expect(failedFields).toEqual(
          new Set([
            "fullname",
            "cpf",
            "birthDate",
            "gender",
            "email",
            "phoneNumber",
            "cityState",
            "emergencyContact",
            "emergencyPhone",
            "category",
            "tshirtSize",
            "termsCheck",
          ]),
        );
      }
    });

    // Lacunas conhecidas do schema atual — ative quando o schema for reforçado.
    it.todo(
      "rejeita CPF com dígitos verificadores inválidos (ex.: 111.111.111-11)",
    );
    it.todo(
      "rejeita extraLunchQuantity negativo ou fracionado (.int().min(0))",
    );
  });
});
