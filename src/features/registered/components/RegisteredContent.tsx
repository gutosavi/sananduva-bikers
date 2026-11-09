"use client";

import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import React from "react";
import { useListRegistrations } from "../hooks/useListRegistrations";
import { RegisteredTable } from "./RegisteredTable";

export function RegisteredContent() {
  const { inputValue, isLoading, data, fetchData, handleInputChange } =
    useListRegistrations();

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center py-10">
          <p className="text-muted-foreground flex items-center gap-2">
            <Loader className="animate-spin" />
            Carregando inscrições...
          </p>
        </div>
      ) : (
        <main className="min-h-screen w-full overflow-x-hidden">
          <div className="mx-auto max-w-3xl px-4 py-8">
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={inputValue}
                onChange={handleInputChange}
                className="h-10 pl-9"
                placeholder="Buscar por nome"
              />
            </div>

            {data.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                Nenhuma inscrição cadastrada até o momento.
              </p>
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground" />

                <p className="font-medium">Nenhuma inscrição encontrada</p>

                <p className="text-sm text-muted-foreground">
                  Tente buscar por outro nome.
                </p>
              </div>
            ) : (
              <RegisteredTable rows={data} />
            )}
          </div>
        </main>
      )}
    </>
  );
}
