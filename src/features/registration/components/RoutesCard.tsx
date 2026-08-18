import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES_EVENT } from "@/lib/event-data";
import { Mountain, RouteIcon, TrendingUp } from "lucide-react";

export function RoutesCard() {
  return (
    <Card className="glass border-white/10 ">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-2xl font-extrabold font-display">
          Percursos
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          Escolha o seu no formulário ao lado
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-3">
          {ROUTES_EVENT.map((route) => (
            <div
              key={route.title}
              className="rounded-lg border border-white/10 bg-background/40 p-4 transition-colors hover:border-primary/40"
            >
              <div>
                <span className="font-heading text-2xl font-bold">
                  {route.title}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-10 text-lg text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <RouteIcon className="h-3.5 w-3.5 text-primary" />
                  {route.distance}
                </span>
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  {route.elevation} de elevação
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mountain className="h-3.5 w-3.5 text-primary" />
                  {route.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
