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

  const handleToggleStatus = async (id: Registration["id"]): Promise<void> => {
    try {
      const targetRow = rows.find((row) => row.id === id);

      if (!targetRow) {
        throw new Error("Inscrição não encontrada.");
      }

      const updatedItem: Registration = {
        ...targetRow,
        status: targetRow.status === "confirmed" ? "pending" : "confirmed",
      };

      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.error ?? "Não foi possível editar a inscrição.");
        return;
      }

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)),
      );
    } catch (error) {
      console.error(
        "Não foi possível conectar ao servidor. Tente novamente.",
        error,
      );
      toast.error("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };

  const handleEdit = async (updateRow: Registration): Promise<void> => {
    try {
      const response = await fetch(`/api/admin/registrations/${updateRow.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRow),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.error ?? "Não foi possível editar a inscrição.");
        return;
      }

      const updatedItem: Registration = await response.json();

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedItem.id ? updatedItem : row)),
      );
      setEditingRow(null);
      toast.success("Inscrição editada com sucesso!");
    } catch (error) {
      console.error(
        "Não foi possível conectar ao servidor. Tente novamente.",
        error,
      );
      toast.error("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };

  const handleDelete = async (id: Registration["id"]): Promise<void> => {
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
      toast.success("Inscrição excluída com sucesso!");
    } catch (error) {
      console.error(
        "Não foi possível conectar ao servidor. Tente novamente.",
        error,
      );
      toast.error("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };

  const handleCloseEdit = (): void => {
    setEditingRow(null);
  };

  const handleStartEdit = (row: Registration): void => {
    setEditingRow(row);
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
    handleCloseEdit,
    handleStartEdit,
    loadData,
  };
};
