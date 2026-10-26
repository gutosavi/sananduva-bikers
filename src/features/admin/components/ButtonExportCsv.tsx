"use client";

import { Button } from "@/components/ui/button";
import { Registration } from "@/features/registration/schemas/registration.schema";
import { convertJsonToCsv } from "@/helpers/convertJsonToCsv";
import { Download } from "lucide-react";
import React from "react";

export function ButtonExportCsv() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/registrations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Registration[] = await response.json();

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(
          errorData?.message || "Erro ao buscar os dados das inscrições.",
        );
        return;
      }

      const csvContent = convertJsonToCsv(data);

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "relatorio-inscricoes.csv";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      setError("Erro ao exportar CSV");
      console.error("Erro ao exportar CSV:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        disabled={isLoading}
        onClick={handleExport}
        className="h-10 gap-2 max-w-35"
      >
        <Download className="h-4 w-4" />
        Exportar CSV
      </Button>
      {error && <p className="text-destructive mt-2 text-[12px]">{error}</p>}
    </div>
  );
}
