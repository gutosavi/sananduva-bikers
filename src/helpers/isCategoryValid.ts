import { CategoryOptions } from "@/lib/event-data";
import { calculateAge } from "@/lib/utils";

export const getAvailableCategories = (
  birthDate: string | undefined,
  gender: string | undefined,
  categoriesOptions: CategoryOptions[],
): CategoryOptions[] => {
  if (!birthDate || !gender) return [];

  const userAge = calculateAge(birthDate);

  return categoriesOptions.filter((cat) => {
    const matchGender =
      !cat.gender || cat.gender === "Unissex" || cat.gender === gender;

    const minAge = cat.minAge ?? 0;
    const maxAge = cat.maxAge ?? 150;
    const matchAge = userAge >= minAge && userAge <= maxAge;

    return matchAge && matchGender;
  });
};
