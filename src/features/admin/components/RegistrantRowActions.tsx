import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Registration } from "@/lib/event-data";
import { EllipsisVertical } from "lucide-react";

type RegistrantRowActionsProps = {
  row: Registration;
  onToggleStatus: (id: Registration["id"]) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function RegistrantRowActions({
  row,
  onToggleStatus,
  onEdit,
  onDelete,
}: RegistrantRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => (
          <button
            {...props}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </button>
        )}
      />

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            closeOnClick={false}
            onClick={() => onToggleStatus(row.id)}
            className={
              row.status === "confirmed"
                ? "text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10 dark:text-emerald-500 dark:focus:text-emerald-400"
                : "text-amber-600 focus:text-amber-600 focus:bg-amber-500/10 dark:text-amber-500 dark:focus:text-amber-400"
            }
          >
            {row.status === "confirmed" ? "Confirmar" : "Desconfirmar"}
          </DropdownMenuItem>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Excluir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
