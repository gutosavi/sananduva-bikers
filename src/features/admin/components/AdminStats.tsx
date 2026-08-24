import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BRL, Registration } from "@/lib/event-data";
import { CircleCheck, CircleDollarSign, Clock, Users } from "lucide-react";

export function AdminStats({ rows }: { rows: Registration[] }) {
  const statsRegistration = Object.values(rows).reduce(
    (acc, user) => {
      acc.confirmed += user.status === "confirmed" ? 1 : 0;
      acc.pending += user.status === "pending" ? 1 : 0;
      acc.revenue += user.status === "confirmed" ? user.revenue : 0;

      return acc;
    },
    {
      total: rows.length,
      confirmed: 0,
      pending: 0,
      revenue: 0,
    },
  );

  const stats = [
    {
      label: "Inscrições",
      value: String(statsRegistration.total),
      icon: Users,
      accent: "text-foreground",
    },
    {
      label: "Confirmadas",
      value: String(statsRegistration.confirmed),
      icon: CircleCheck,
      accent: "text-foreground",
    },
    {
      label: "Pendentes",
      value: String(statsRegistration.pending),
      icon: Clock,
      accent: "text-warning",
    },
    {
      label: "Receita confirmada",
      value: BRL.format(statsRegistration.revenue),
      icon: CircleDollarSign,
      accent: "text-foreground",
    },
  ];

  return (
    <>
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
    </>
  );
}
