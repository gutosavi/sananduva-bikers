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
import { CATEGORIES_OPTIONS, routeName } from "@/lib/event-data";
import { Download, Search } from "lucide-react";
import React from "react";
import { useAdminRegistrations } from "../hooks/useAdminRegistrations";
import { AdminStats } from "./AdminStats";
import { EditRegistrationDialog } from "./EditRegistrationDialog";
import { RegistrationsTable } from "./RegistrationsTable";

const repository = new LocalStorageRegistrationRepository();
const service = new RegistrationService(repository);

export function AdminDashboard() {
  const {
    rows,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    inputValue,
    setInputValue,
    editingRow,
    setEditingRow,
    filteredRows,
    handleToggleStatus,
    handleEdit,
    handleDelete,
    loadData,
  } = useAdminRegistrations(service);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger
                id="categoryFilter"
                aria-label="Filtrar por categoria"
                className="h-10 w-45"
              >
                <SelectValue>
                  {(value: string) =>
                    value === "all"
                      ? "Categorias"
                      : routeName(value)?.label || "Categoria desconhecida"
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Categorias</SelectItem>
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
            rows={filteredRows}
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
