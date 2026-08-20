import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BRL } from "@/lib/event-data";
import { CircleCheck, CircleDollarSign, Clock, Users } from "lucide-react";

const total = 10;
const confirmed = 10;
const pending = 10;
const revenue = 1000;

const stats = [
  {
    label: "Inscrições",
    value: String(total),
    icon: Users,
    accent: "text-foreground",
  },
  {
    label: "Confirmadas",
    value: String(confirmed),
    icon: CircleCheck,
    accent: "text-gradient-neon",
  },
  {
    label: "Pendentes",
    value: String(pending),
    icon: Clock,
    accent: "text-warning",
  },
  {
    label: "Receita confirmada",
    value: BRL.format(revenue),
    icon: CircleDollarSign,
    accent: "text-gradient-neon",
  },
];

export function AdminStats() {
  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-2 mx-5 pb-24 pt-24 md:pt-32 md:mx-20">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="glass hover-glow border-white/10 p-5 hover:border-primary/50"
        >
          <CardHeader>
            <CardTitle className="flex flex-row justify-between">
              <span className="text-base uppercase font-medium text-muted-foreground tracking-wide">
                {stat.label}
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`mt-3 font-heading text-2xl font-extrabold md:text-3xl ${stat.accent}`}
          >
            {stat.value}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
