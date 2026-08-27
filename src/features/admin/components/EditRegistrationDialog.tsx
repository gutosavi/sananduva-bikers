import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegistrationForm } from "@/features/registration/components/RegistrationForm";
import { Registration } from "@/features/registration/schemas/registration.schema";

type EditRegistrationDialogProps = {
  editingRow: Registration;
  setEditingRow: React.Dispatch<React.SetStateAction<Registration | null>>;
};

export function EditRegistrationDialog({
  editingRow,
  setEditingRow,
}: EditRegistrationDialogProps) {
  return (
    <Dialog open={!!editingRow} onOpenChange={() => setEditingRow(null)}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="sm:max-w-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="m-2">
          <DialogTitle>
            <span className="font-semibold text-primary">Editar dados: </span>
            {editingRow.fullname}
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm">
            Edite os dados do inscrito e clique em salvar para atualizar as
            informações.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-2 space-y-4 my-2 max-h-[60vh] scrollbar-thin scrollbar-thumb-accent">
          <RegistrationForm isEditing={true} initialData={editingRow} />
        </div>

        <DialogFooter className="pt-2 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingRow(null)}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
