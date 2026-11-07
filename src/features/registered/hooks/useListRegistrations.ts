import { PublicRegistration } from "@/features/registration/schemas/registration.schema";
import useDebounce from "@/hooks/useDebounce";
import React from "react";

export const useListRegistrations = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<PublicRegistration[]>([]);
  const debounceSearchTerm = useDebounce(inputValue, 500);

  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/registrations", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar inscrições.");
      }

      const data: PublicRegistration[] = await response.json();
      setData(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao buscar inscrições.", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filtered = data.filter((row) => {
    const input = debounceSearchTerm.trim().toLowerCase();
    const matchInput = !input || row.fullname.toLowerCase().includes(input);

    return matchInput;
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    isLoading,
    data: filtered,
    fetchData,
    handleInputChange,
  };
};
