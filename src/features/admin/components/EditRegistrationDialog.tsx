import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegistrationForm } from "@/features/registration/components/RegistrationForm";
import { Registration } from "@/features/registration/schemas/registration.schema";

type EditRegistrationDialogProps = {
  editingRow: Registration;
  onClose: () => void;
  onSave: (updateRow: Registration) => void;
  errorMessage: string;
};

export function EditRegistrationDialog({
  errorMessage,
  editingRow,
  onClose,
  onSave,
}: EditRegistrationDialogProps) {
  return (
    <Dialog open={!!editingRow} onOpenChange={(open) => !open && onClose()}>
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
          <RegistrationForm
            isEditing={true}
            initialData={editingRow}
            onSave={onSave}
            onCancel={onClose}
          />
        </div>
        {errorMessage && (
          <p className="text-destructive text-sm text-center">{errorMessage}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
