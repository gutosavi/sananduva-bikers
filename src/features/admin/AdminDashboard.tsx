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
import {
  MOCK_REGISTRATIONS,
  Registration,
  routeName,
  ROUTES_EVENT,
} from "@/lib/event-data";
import { Download, Search } from "lucide-react";
import React from "react";
import { AdminStats } from "./AdminStats";
import { RegistrationsTable } from "./RegistrationsTable";

export function AdminDashboard() {
  const [rows, setRows] = React.useState<Registration[]>(MOCK_REGISTRATIONS);
  const [routeFilter, setRouteFilter] = React.useState<string | null>("all");
  const [statusFilter, setStatusFilter] = React.useState<string | null>("all");
  const [inputValue, setInputValue] = React.useState("");

  const stats = Object.values(rows).reduce(
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

  const filtered = Object.values(rows).filter((row) => {
    const input = inputValue.trim().toLowerCase();
    const matchInput =
      !input ||
      row.name.toLowerCase().includes(input) ||
      row.cpf.includes(input);
    const matchRoute = routeFilter === "all" || row.route === routeFilter;
    const matchStatus = statusFilter === "all" || row.status === statusFilter;

    return matchInput && matchRoute && matchStatus;
  });

  const toggleStatus = (index: number) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        status: newRows[index].status === "confirmed" ? "pending" : "confirmed",
      };
      return newRows;
    });
  };

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
                      : value === "confirmed"
                        ? "Confirmado"
                        : "Pendente"
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="h-10 gap-2 max-w-35">
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <RegistrationsTable rows={filtered} onClick={toggleStatus} />
        </div>
      </Card>
    </section>
  );
}
