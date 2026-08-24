import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Registration } from "@/lib/event-data";
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
    <Card className="m-5 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Equipe</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Status</TableHead>
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
                    <TableCell>{registration.name}</TableCell>
                    <TableCell>Equipe</TableCell>
                    <TableCell>Cidade</TableCell>
                    <TableCell>
                      {registration.status === "confirmed"
                        ? "Confirmado"
                        : "Pendente"}
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
