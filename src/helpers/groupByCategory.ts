export function groupByCategory<T extends { category: string }>(
  rows: T[],
): Record<string, T[]> {
  return rows.reduce<Record<string, T[]>>((acc, row) => {
    if (!("category" in row)) {
      throw new Error("O objeto não possui a propriedade 'category'.");
    }

    const category = row.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(row);

    return acc;
  }, {});
}
