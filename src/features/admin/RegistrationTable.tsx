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
import { CircleCheck, Trophy } from "lucide-react";

export function RegistrationsTable() {
  return (
    <Table>
      <TableCaption>Lista de inscritos</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nome</TableHead>
          <TableHead className="hidden md:table-cell">Percurso</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="py-10">
          {/*passar dados aqui*/}
          <TableCell className="font-medium flex flex-col text-foreground">
            Gustavo Savi
            <span className="text-xs text-muted-foreground">
              000.000.000-00
            </span>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <span className="flex items-center gap-1 md:flex font-medium">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              Sport
            </span>
          </TableCell>
          <TableCell>Cicloturismo Amador</TableCell>
          <TableCell>
            <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2 py-1 text-success glow-green">
              <CircleCheck className="h-3.5 w-3.5" />
              Confirmado
            </span>
          </TableCell>
          <TableCell className="text-right">
            <Button
              size="sm"
              className="border-success/40 bg-transparent text-xs text-success hover:bg-success/10"
            >
              Confirmado
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
