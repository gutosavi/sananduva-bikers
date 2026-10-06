import { Registration } from "@/features/registration/schemas/registration.schema";
import { RegistrationService } from "@/features/registration/services/RegistrationService";
import useDebounce from "@/hooks/useDebounce";
import React from "react";

export const useAdminRegistrations = (service: RegistrationService) => {
  const [rows, setRows] = React.useState<Registration[]>([]);
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    "all",
  );
  const [statusFilter, setStatusFilter] = React.useState<string | null>("all");
  const [inputValue, setInputValue] = React.useState("");
  const [editingRow, setEditingRow] = React.useState<Registration | null>(null);
  const debounceSearchTerm = useDebounce(inputValue, 500);

  const loadData = React.useCallback(async () => {
    const data = await service.findAllRegistrations();
    setRows(data ? [...data] : []);
  }, [service]);

  const filteredRows = rows.filter((row) => {
    const input = debounceSearchTerm.trim().toLowerCase();
    const matchInput =
      !input ||
      row.fullname.toLowerCase().includes(input) ||
      row.cityState.toLowerCase().includes(input);
    const matchCategory =
      categoryFilter === "all" || row.category === categoryFilter;
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
      const updatedItem = await service.updateRegistration(
        updateRow.id,
        updateRow,
      );

      if (!updatedItem) {
        throw new Error("Lista não encontrada.");
      }

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)),
      );
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

  return {
    rows,
    setRows,
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
  };
};
