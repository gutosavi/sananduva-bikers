import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
}

export function PaymentModal({ isOpen }: PaymentModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="glass border-white/10">
        <DialogHeader className="px-6 pt-6">
          <DialogDescription className="mt-1 text-sm font-bold uppercase text-muted-foreground">
            Etapa 3
          </DialogDescription>

          <DialogTitle className="font-display text-2xl font-extrabold flex flex-row gap-2 items-center">
            <QrCode className="text-primary" />
            Pagamento via Pix
          </DialogTitle>
        </DialogHeader>

        <section className="px-6 pt-6 flex flex-row">
          <div>
            QR Code
            <span>Escaneie para pagar</span>
          </div>
          <div>
            <div>Total inscrição</div>
            <div>Chave Pix - Copia e Cola</div>
            <div>Lista com instruções</div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
