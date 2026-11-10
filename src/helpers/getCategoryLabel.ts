import { CATEGORIES_OPTIONS } from "@/lib/event-data";

export function getCategoryLabel(categoryId: string): string | undefined {
  const category = CATEGORIES_OPTIONS.find((cat) => cat.id === categoryId);

  return category?.label;
}
