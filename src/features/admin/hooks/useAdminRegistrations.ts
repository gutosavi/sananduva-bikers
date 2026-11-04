import { Registration } from "@/features/registration/schemas/registration.schema";
import useDebounce from "@/hooks/useDebounce";
import React from "react";
import { toast } from "sonner";

export const useAdminRegistrations = () => {
  const [rows, setRows] = React.useState<Registration[]>([]);
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    "all",
  );
  const [statusFilter, setStatusFilter] = React.useState<string | null>("all");
  const [inputValue, setInputValue] = React.useState("");
  const [editingRow, setEditingRow] = React.useState<Registration | null>(null);
  const [error, setError] = React.useState("");
  const debounceSearchTerm = useDebounce(inputValue, 500);

  const loadData = React.useCallback(async () => {
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar inscrições.");
      }

      const data: Registration[] = await response.json();
      setRows(data ? [...data] : []);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao buscar inscrições.", error);
      }
    }
  }, []);

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
      setError("");

      const targetRow = rows.find((row) => row.id === id);

      if (!targetRow) {
        throw new Error("Inscrição não encontrada.");
      }

      const updatedItem: Registration = {
        ...targetRow,
        status: targetRow.status === "confirmed" ? "pending" : "confirmed",
      };

      const response = await fetch("/api/admin/registrations", {
        method: "PATCH",
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.error ?? "Não foi possível editar a inscrição.");
        return;
      }

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)),
      );
    } catch (error) {
      if (error instanceof Error) {
        setError("Erro ao editar status da inscrição.");
        console.error("Erro ao editar status da inscrição.", error);
      }
    }
  };

  const handleEdit = async (updateRow: Registration) => {
    try {
      setError("");

      const response = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRow),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.error ?? "Não foi possível editar a inscrição.");
        return;
      }

      const updatedItem: Registration = await response.json();

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)),
      );
      setEditingRow(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao editar inscrição:", error);
        setError("Erro ao editar inscrição.");
      }
    }
  };

  const handleDelete = async (id: Registration["id"]) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.error ?? "Erro ao deletar a inscrição.");
        return;
      }

      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      setEditingRow(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao deletar inscrição.", error);
      }
    }
  };

  const handleCloseEdit = () => {
    setError("");
    setEditingRow(null);
  };

  const handleStartEdit = (row: Registration) => {
    setError("");
    setEditingRow(row);
  };

  return {
    error,
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
    handleCloseEdit,
    handleStartEdit,
    loadData,
  };
};
