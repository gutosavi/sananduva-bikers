import {
  Registration,
  RegistrationFormData,
} from "@/features/registration/schemas/registration.schema";
import { REGISTRATION_PRICES } from "@/lib/event-data";

const STORAGE_KEY = "registration";

function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return JSON.parse(data) as Registration[];
  } catch (error) {
    console.error("Erro ao ler registros do localStorage:", error);
    return [];
  }
}

export const registrationsServices = {
  getRegistrations,
  createRegistration(data: RegistrationFormData): Registration {
    const registrations = getRegistrations();
    const total =
      REGISTRATION_PRICES.registrationFee +
      (data.extraLunchQuantity ?? 0) * REGISTRATION_PRICES.extraLunchFee;

    const newRegistration: Registration = {
      ...data,
      id: crypto.randomUUID(),
      status: "pending",
      revenue: total,
    };

    const updatedList = [...registrations, newRegistration];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    return newRegistration;
  },

  updateRegistration(id: string, data: Partial<Registration>) {
    const registration = getRegistrations();

    const updatedList = registration.map((item) =>
      item.id === id ? { ...item, ...data } : item,
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return updatedList;
  },

  deleteRegistration(id: string): Registration[] {
    const registration = getRegistrations();
    const updatedList = registration.filter((item) => item.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return updatedList;
  },
};
