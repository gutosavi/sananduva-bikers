import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BRL, Registration } from "@/lib/event-data";
import { CircleCheck, EllipsisVertical, Trophy } from "lucide-react";

type Props = {
  rows: Registration[];
  onClick: (index: number | null) => void;
};

export function RegistrationsTable({ rows, onClick }: Props) {
  return (
    <Table>
      <TableCaption>Lista de inscritos</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome</TableHead>
          <TableHead className="hidden md:table-cell">Percurso</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={7}
              className="py-10 text-center text-muted-foreground"
            >
              Nenhuma inscrição encontrada com os filtros atuais.
            </TableCell>
          </TableRow>
        )}
        {rows.map((row) => (
          <TableRow key={row.id} className="py-10">
            <TableCell className="font-medium flex flex-col text-foreground">
              {row.name}
              <span className="text-xs text-muted-foreground">{row.cpf}</span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <span className="flex items-center gap-1 md:flex font-medium">
                <Trophy className="h-3.5 w-3.5 text-primary" />
                {row.route}
              </span>
            </TableCell>
            <TableCell>{row.category}</TableCell>
            <TableCell className="hidden font-medium lg:table-cell">
              {BRL.format(row.revenue)}
            </TableCell>
            <TableCell>
              {row.status === "confirmed" ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2 py-1 text-success">
                  <CircleCheck className="h-3.5 w-3.5" />
                  Confirmado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-warning/40 bg-warning/15 px-2 py-1 text-warning">
                  <CircleCheck className="h-3.5 w-3.5" />
                  Pendente
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant={row.status === "confirmed" ? "ghost" : "outline"}
                size="sm"
                onClick={() => onClick(row.id)}
              >
                <EllipsisVertical />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
