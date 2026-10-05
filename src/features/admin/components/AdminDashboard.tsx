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
import { LocalStorageRegistrationRepository } from "@/features/registration/repositories/LocalStorageRegistrationRepository";
import { Registration } from "@/features/registration/schemas/registration.schema";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import useDebounce from "@/hooks/useDebounce";
import { CATEGORIES_OPTIONS, routeName } from "@/lib/event-data";
import { Download, Search } from "lucide-react";
import React from "react";
import { AdminStats } from "./AdminStats";
import { EditRegistrationDialog } from "./EditRegistrationDialog";
import { RegistrationsTable } from "./RegistrationsTable";

const repository = new LocalStorageRegistrationRepository();
const service = new RegistrationService(repository);

export function AdminDashboard() {
  const [rows, setRows] = React.useState<Registration[]>([]);
  const [routeFilter, setRouteFilter] = React.useState<string | null>("all");
  const [statusFilter, setStatusFilter] = React.useState<string | null>("all");
  const [inputValue, setInputValue] = React.useState("");
  const [editingRow, setEditingRow] = React.useState<Registration | null>(null);
  const debounceSearchTerm = useDebounce(inputValue, 500);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await service.findAllRegistrations();
      setRows(data ? [...data] : []);
    };
    loadData();
  }, []);

  const filtered = rows.filter((row) => {
    const input = debounceSearchTerm.trim().toLowerCase();
    const matchInput =
      !input ||
      row.fullname.toLowerCase().includes(input) ||
      row.cityState.toLowerCase().includes(input);
    const matchCategory = routeFilter === "all" || row.category === routeFilter; // ********* refatorar **********
    const matchStatus = statusFilter === "all" || row.status === statusFilter;

    return matchInput && matchCategory && matchStatus;
  });

  const handleToggleStatus = async (id: Registration["id"]) => {
    try {
      const targetRow = rows.find((row) => row.id === id);

      if (!targetRow) {
        throw new Error("Inscrição não encontrada.");
      }

      const updatedItem = await service.updateRegistration(targetRow.id, {
        status: targetRow.status === "confirmed" ? "pending" : "confirmed",
      });

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)),
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Erro ao editar status da inscrição.", error);
      }
    }
  };

  const handleEdit = async (updateRow: Registration) => {
    try {
      await service.updateRegistration(updateRow.id, updateRow);
      const updatedList = await service.findAllRegistrations();

      if (!updatedList) {
        throw new Error("Lista não encontrada.");
      }

      setRows([...updatedList]);
      setEditingRow(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao editar inscrição:", error);
      }
    }
  };

  const handleDelete = async (id: Registration["id"]) => {
    try {
      await service.deleteRegistration(id);

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setEditingRow(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao deletar inscrição.", error);
      }
    }
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-5 pb-15 pt-15 md:pt-15">
        <AdminStats rows={rows} />
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
                      : routeName(value)?.label || "Percurso desconhecido"
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos os percursos</SelectItem>
                {CATEGORIES_OPTIONS.map((row) => (
                  <SelectItem key={row.id} value={row.label}>
                    {row.label}
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
          <RegistrationsTable
            rows={filtered}
            onToggleStatus={handleToggleStatus}
            onEdit={(row: Registration) => setEditingRow(row)}
            onDelete={handleDelete}
          />

          {editingRow && (
            <EditRegistrationDialog
              editingRow={editingRow}
              setEditingRow={setEditingRow}
              onSave={handleEdit}
            />
          )}
        </div>
      </Card>
    </section>
  );
}
