import { Card } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/event-data";

export function CategoriesCard() {
  return (
    <Card className="glass p-6 border-white/10 ">
      <h2 className="text-2xl font-extrabold font-display">Categorias</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Disputas por modalidade e idade
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <span
            key={category}
            className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground"
          >
            {category}
          </span>
        ))}
      </div>
    </Card>
  );
}
