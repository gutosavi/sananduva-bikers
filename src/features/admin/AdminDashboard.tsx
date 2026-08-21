"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_REGISTRATIONS, routeName, ROUTES_EVENT } from "@/lib/event-data";
import { Download, Search } from "lucide-react";
import React from "react";
import { AdminStats } from "./AdminStats";
import { RegistrationsTable } from "./RegistrationTable";

export function AdminDashboard() {
  const [routeFilter, setRouteFilter] = React.useState<string | null>("all");
  const [statusFilter, setStatusFilter] = React.useState<string | null>("all");
  const [inputValue, setInputValue] = React.useState("");
  const rows = MOCK_REGISTRATIONS;
  const eventPrice = 140;

  const stats = rows.reduce(
    (acc, user) => {
      acc.confirmed += user.status === "confirmado" ? 1 : 0;
      acc.pending += user.status === "pendente" ? 1 : 0;

      return acc;
    },
    {
      total: rows.length,
      confirmed: 0,
      pending: 0,
      revenue: rows.length * eventPrice,
    },
  );

  React.useEffect(() => {
    //for debugging
    console.log("Filtro do percurso:", routeFilter);
    console.log("Filtro do status:", statusFilter);
    console.log("Valor do input:", inputValue);
  });

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-5 pb-15 pt-15 md:pt-15">
        <AdminStats {...stats} />
      </div>

      <Card className="glass mx-5 border-white/10 p-0">
        <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-10 pl-9"
              placeholder="Buscar por nome ou cidade"
            />
          </div>
          <div>
            <Select value={routeFilter} onValueChange={setRouteFilter}>
              <SelectTrigger
                id="filterRoute"
                aria-label="Filtrar por percurso"
                className="h-10 w-45"
              >
                <SelectValue>
                  {(value: string) =>
                    value === "all"
                      ? "Todos os percursos"
                      : routeName(value)?.title
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os percursos</SelectItem>
                {ROUTES_EVENT.map((row) => (
                  <SelectItem key={row.title} value={row.title}>
                    {row.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                id="filterStatus"
                aria-label="Filtrar por status"
                className="h-10 w-45"
              >
                <SelectValue>
                  {(value: string) =>
                    value === "all"
                      ? "Todos status"
                      : value === "confirmado"
                        ? "Confirmado"
                        : "Pendente"
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="h-10 gap-2 max-w-35">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <RegistrationsTable />
        </div>
      </Card>
    </section>
  );
}
