"use client";

import { SiteFooter } from "@/components/shared/site-footer";
import { SiteNavBar } from "@/components/shared/site-navbar";
import { Input } from "@/components/ui/input";
import { RegisteredTable } from "@/features/registered/components/RegisteredTable";
import useDebounce from "@/hooks/useDebounce";
import { MOCK_REGISTRATIONS } from "@/lib/event-data";
import { Search } from "lucide-react";
import React from "react";

export default function InscritosPage() {
  const [inputValue, setInputValue] = React.useState("");
  const rows = MOCK_REGISTRATIONS;
  const debounceSearchTerm = useDebounce(inputValue, 500);

  const filtered = rows.filter((row) => {
    const input = debounceSearchTerm.trim().toLowerCase();
    const matchInput = !input || row.name.toLowerCase().includes(input);

    return matchInput;
  });

  return (
    <>
      <SiteNavBar />
      <main className="min-h-screen w-full overflow-x-hidden">
        <div className="mx-auto max-w-3xl">
          <div className="relative m-5 max-w-3xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-10 pl-9"
              placeholder="Buscar por nome"
            />
          </div>

          <RegisteredTable rows={filtered} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
