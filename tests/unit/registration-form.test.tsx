import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import { RegistrationForm } from "../../src/features/registration/components/RegistrationForm";
import { validRegistration } from "./fixtures";

const mockedFetch = vi.spyOn(globalThis, "fetch");

function deferred<T>() {
  let resolve!: (value: T) => void;

  const promise = new Promise<T>((resolver) => {
    resolve = resolver;
  });

  return { promise, resolve };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const validFormData = {
  ...validRegistration,
  gender: "Masculino",
  category: "Masculino Master A",
};

function getField(container: HTMLElement, label: RegExp) {
  const field = Array.from(
    container.querySelectorAll<HTMLElement>('[data-slot="field"]'),
  ).find((el) => label.test(el.querySelector("label")?.textContent ?? ""));

  if (!field) throw new Error(`Campo não encontrado: ${label}`);
  return field;
}

async function selectOption(
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement,
  label: RegExp,
  option: string | RegExp,
) {
  const field = getField(container, label);

  await user.click(within(field).getByRole("combobox"));
  await user.click(await screen.findByRole("option", { name: option }));
}

const byName = (container: HTMLElement, name: string) =>
  container.querySelector<HTMLInputElement>(`[name="${name}"]`)!;

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement,
  overrides: Partial<typeof validFormData> = {},
) {
  const data = { ...validFormData, ...overrides };

  await user.type(byName(container, "fullname"), data.fullname);
  await user.type(byName(container, "cpf"), data.cpf);
  await user.type(byName(container, "birthDate"), data.birthDate);

  await selectOption(user, container, /^gênero/i, data.gender);

  await user.type(byName(container, "email"), data.email);
  await user.type(byName(container, "phoneNumber"), data.phoneNumber);
  await user.type(byName(container, "cityState"), data.cityState);
  await user.type(byName(container, "emergencyContact"), data.emergencyContact);
  await user.type(byName(container, "emergencyPhone"), data.emergencyPhone);

  await selectOption(user, container, /^categoria/i, data.category);
  await selectOption(user, container, /^tamanho da camisa/i, data.tshirtSize);
  await user.type(byName(container, "team"), data.team ?? "");

  await selectOption(
    user,
    container,
    /^almoço extra/i,
    String(data.extraLunchQuantity ?? 0),
  );

  if (data.termsCheck) {
    const terms =
      screen.getAllByRole("checkbox").find((el) => el.tagName !== "INPUT") ??
      screen.getAllByRole("checkbox")[0];

    await user.click(terms);
  }
}

const submitButtons = () =>
  screen.getAllByRole("button", {
    name: /finalizar inscrição|enviando inscrição/i,
  });

const submitButton = () => submitButtons()[0];

describe("RegistrationForm", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  afterAll(() => {
    mockedFetch.mockRestore();
  });

  describe("mensagens de erro", () => {
    it("mostra as mensagens de campos obrigatórios ao enviar vazio", async () => {
      const user = userEvent.setup();

      render(<RegistrationForm />);

      await user.click(submitButton());

      expect(
        await screen.findByText("O CPF é obrigatório"),
      ).toBeInTheDocument();
      expect(await screen.findByText("Nome é obrigatório")).toBeInTheDocument();
      expect(await screen.findByText("Informe seu gênero")).toBeInTheDocument();
      expect(
        await screen.findByText("Selecione a sua categoria"),
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Selecione o tamanho da camiseta"),
      ).toBeInTheDocument();

      expect(mockedFetch).not.toHaveBeenCalled();
    });

    it("mostra erro de e-mail inválido", async () => {
      const user = userEvent.setup();

      const { container } = render(<RegistrationForm />);
      await fillForm(user, container, { email: "gustavo.savi" });

      await user.click(submitButton());

      expect(await screen.findByText("Informe seu e-mail")).toBeInTheDocument();
      expect(mockedFetch).not.toHaveBeenCalled();
    });

    it("exige o aceite dos termos", async () => {
      const user = userEvent.setup();

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container, {
        termsCheck: false,
      });

      await user.click(submitButton());

      expect(
        await screen.findByText("Você precisa aceitar os termos"),
      ).toBeInTheDocument();
      expect(mockedFetch).not.toHaveBeenCalled();
    });
  });

  describe("envio", () => {
    it("envia os dados normalizados para a API", async () => {
      const user = userEvent.setup();

      mockedFetch.mockResolvedValue(
        jsonResponse(
          {
            success: true,
            registrationId: "reg_123",
          },
          201,
        ),
      );

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container);
      await user.click(submitButton());

      await waitFor(() => {
        expect(mockedFetch).toHaveBeenCalledTimes(1);
      });

      expect(mockedFetch).toHaveBeenCalledWith(
        "/api/registrations",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: expect.any(String),
        }),
      );

      const [, requestInit] = mockedFetch.mock.calls[0];
      const submittedData = JSON.parse(String(requestInit?.body));

      expect(submittedData).toEqual(
        expect.objectContaining({
          fullname: "Gustavo Savi",
          cpf: "52998224725",
          email: "gustavo.savi@example.com",
          category: "Masculino Master A",
          extraLunchQuantity: 2,
          termsCheck: true,
        }),
      );
    });

    it("não permite envio duplo enquanto a requisição está em andamento", async () => {
      const user = userEvent.setup();
      const pending = deferred<Response>();

      mockedFetch.mockReturnValue(pending.promise);

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container);
      await user.click(submitButton());
      await user.click(submitButton());

      expect(mockedFetch).toHaveBeenCalledTimes(1);

      pending.resolve(
        jsonResponse(
          {
            success: true,
            registrationId: "reg_123",
          },
          201,
        ),
      );

      await screen.findByText(/pagamento via pix/i);
    });
  });

  describe("estado de carregamento", () => {
    it("desabilita o botão enquanto a requisição está pendente", async () => {
      const user = userEvent.setup();
      const pending = deferred<Response>();

      mockedFetch.mockReturnValue(pending.promise);

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container);
      await user.click(submitButton());

      const button = await screen.findByRole("button", {
        name: /enviando inscrição/i,
      });

      expect(button).toBeDisabled();

      pending.resolve(
        jsonResponse(
          {
            success: true,
            registrationId: "reg_123",
          },
          201,
        ),
      );

      await screen.findByText(/pagamento via pix/i);
    });
  });

  describe("confirmação de sucesso", () => {
    it("exibe o modal de pagamento após a inscrição ser gravada", async () => {
      const user = userEvent.setup();

      mockedFetch.mockResolvedValue(
        jsonResponse(
          {
            success: true,
            registrationId: "reg_123",
          },
          201,
        ),
      );

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container);
      await user.click(submitButton());

      expect(await screen.findByText(/pagamento via pix/i)).toBeInTheDocument();
    });
  });

  describe("erros vindos do servidor", () => {
    it("mostra a mensagem retornada pelo servidor e reabilita o botão", async () => {
      const user = userEvent.setup();

      mockedFetch.mockResolvedValue(
        jsonResponse(
          {
            error: "Erro ao processar inscrição no servidor.",
          },
          400,
        ),
      );

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container);
      await user.click(submitButton());

      expect(
        await screen.findByText("Erro ao processar inscrição no servidor."),
      ).toBeInTheDocument();

      expect(submitButton()).toBeEnabled();
      expect(screen.queryByText(/pagamento via pix/i)).not.toBeInTheDocument();
    });

    it("mostra uma mensagem genérica se a requisição lançar exceção", async () => {
      const user = userEvent.setup();

      mockedFetch.mockRejectedValue(new Error("network"));

      const { container } = render(<RegistrationForm />);

      await fillForm(user, container);
      await user.click(submitButton());

      await new Promise((r) => setTimeout(r, 300));
      console.log(
        "ERROS:",
        Array.from(
          document.querySelectorAll(
            '[role="alert"], [data-invalid="true"] [data-slot="field-error"]',
          ),
        ).map((el) => el.textContent),
      );

      expect(
        await screen.findByText(/não foi possível enviar os dados/i),
      ).toBeInTheDocument();

      expect(submitButton()).toBeEnabled();
    });
  });
});
