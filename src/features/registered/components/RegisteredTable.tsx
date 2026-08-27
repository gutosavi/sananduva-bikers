import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Registration } from "@/features/registration/schemas/registration.schema";
import { User } from "lucide-react";
import { Fragment } from "react";

export function RegisteredTable({ rows }: { rows: Registration[] }) {
  function groupByCategory(
    rows: Registration[],
  ): Record<string, Registration[]> {
    return rows.reduce<Record<string, Registration[]>>((acc, row) => {
      const category = row.category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(row);

      return acc;
    }, {});
  }

  const registrationsByCategory = groupByCategory(rows);

  return (
    <Card className="m-5 overflow-hidden max-w-3xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.entries(registrationsByCategory).map(
            ([category, registrations]) => (
              <Fragment key={category}>
                <TableRow className="bg-muted/40">
                  <TableCell
                    colSpan={4}
                    className="font-semibold uppercase text-primary"
                  >
                    {category}
                  </TableCell>
                </TableRow>

                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="flex flex-col">
                      {registration.fullname}
                      <span className="text-xs text-muted-foreground">
                        Equipe - Cidade
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {registration.status === "confirmed" ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2 py-1 text-success">
                          Confirmado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-warning/40 bg-warning/15 px-2 py-1 text-warning">
                          Pendente
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow className="bg-muted/40">
                  <TableCell colSpan={4} className="text-right">
                    <span className="inline-flex gap-1 items-center justify-end">
                      {registrations.length}
                      <User size={15} />
                    </span>
                  </TableCell>
                </TableRow>
              </Fragment>
            ),
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
