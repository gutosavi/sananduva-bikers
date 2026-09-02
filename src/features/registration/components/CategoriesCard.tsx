import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CATEGORIES_OPTIONS } from "@/lib/event-data";

export function CategoriesCard() {
  return (
    <Card className="glass border-white/10 ">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-2xl font-extrabold font-display">
          Categorias
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          Disputas por modalidade e idade
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES_OPTIONS.map((category) => (
            <span
              key={category.id}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground"
            >
              {category.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
