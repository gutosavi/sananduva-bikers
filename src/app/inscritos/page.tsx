"use client";

import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { Input } from "@/components/ui/input";
import { useAdminRegistrations } from "@/features/admin/hooks/useAdminRegistrations";
import { RegisteredTable } from "@/features/registered/components/RegisteredTable";
import useDebounce from "@/hooks/useDebounce";
// import { MOCK_REGISTRATIONS } from "@/lib/event-data";
import { Loader, Search } from "lucide-react";
import React from "react";

export default function InscritosPage() {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const debounceSearchTerm = useDebounce(inputValue, 500);

  const { rows, loadData } = useAdminRegistrations();

  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        await loadData();
      } catch (error) {
        console.error("Erro ao buscar inscrições.", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [loadData]);

  const filtered = rows.filter((row) => {
    const input = debounceSearchTerm.trim().toLowerCase();
    const matchInput = !input || row.fullname.toLowerCase().includes(input);

    return matchInput;
  });

  return (
    <>
      <SiteNavBar />
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
                onChange={(e) => setInputValue(e.target.value)}
                className="h-10 pl-9"
                placeholder="Buscar por nome"
              />
            </div>

            {rows.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                Nenhuma inscrição cadastrada até o momento.
              </p>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground" />

                <p className="font-medium">Nenhuma inscrição encontrada</p>

                <p className="text-sm text-muted-foreground">
                  Tente buscar por outro nome.
                </p>
              </div>
            ) : (
              <RegisteredTable rows={filtered} />
            )}
          </div>
        </main>
      )}
      <SiteFooter />
    </>
  );
}
