import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventPrices, REGISTRATION_PRICES } from "@/lib/event-data";
import { BRL } from "@/lib/utils";
import { Copy, QrCode } from "lucide-react";
import { paymentInstructions } from "../constants";
import { RegistrationFormData } from "../schemas/registration.schema";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrationData: RegistrationFormData;
}

export function PaymentModal({
  isOpen,
  onClose,
  registrationData,
}: PaymentModalProps) {
  function calculateTotalFee(eventData: EventPrices, extraLunchQuantity = 0) {
    const eventPrice = eventData.registrationFee;
    const extraLunchPrice = eventData.extraLunchFee;

    return {
      eventPrice,
      extraLunchPrice,
      total: eventPrice + extraLunchQuantity * extraLunchPrice,
    };
  }

  const { eventPrice, extraLunchPrice, total } = calculateTotalFee(
    REGISTRATION_PRICES,
    registrationData.extraLunchQuantity,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/10 sm:max-w-200">
        <DialogHeader className="px-6 pt-6">
          <DialogDescription className="mt-1 text-sm font-bold uppercase text-muted-foreground">
            Etapa 3
          </DialogDescription>

          <DialogTitle className="font-display text-2xl font-extrabold flex flex-row gap-2 items-center">
            <QrCode className="text-primary" />
            Pagamento via Pix
          </DialogTitle>
        </DialogHeader>

        <section className="px-6 py-6 grid md:grid-cols-[auto_1fr] gap-6 md:items-center">
          <div className="mx-auto flex flex-col gap-2">
            <div className="overflow-hidden rounded-2xl border-2 border-primary/40 bg-white p-2.5">
              QR Code - imagem do QR Code aqui
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <QrCode className="h-3.5 w-3.5" />
              Escaneie para pagar
            </span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div>
              <h1 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Resumo:
              </h1>

              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Categoria:</span>
                  <span className="font-medium">
                    {registrationData.category}
                  </span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Valor inscrição evento:
                  </span>
                  <span className="font-medium">{BRL.format(eventPrice)}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Almoço(s) extra(s):{" "}
                  </span>
                  <span className="font-medium">
                    {registrationData.extraLunchQuantity} ×{" "}
                    {BRL.format(extraLunchPrice)}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-primary/40 bg-primary/10 px-4 py-3.5">
              <span className="text-sm font-medium text-muted-foreground">
                Total:
              </span>
              <span className="text-primary font-heading text-2xl font-black">
                {BRL.format(total)}
              </span>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Chave PIX (Copia e Cola)
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <code className="flex-1 truncate rounded-md border border-border bg-background/60 px-3 py-2.5 text-sm">
                00.993.039/0001-57
              </code>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-11 w-11 shrink-0 border-primary/40 bg-transparent text-primary hover:glow-amber items-center"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copiar Chave Pix</span>
              </Button>
            </div>

            <div className="mt-3">
              <ul className="space-y-3 text-sm">
                {paymentInstructions.map((insctruction) => (
                  <li key={insctruction.id} className="flex gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                      {insctruction.id}
                    </span>
                    <span className="text-muted-foreground">
                      {insctruction.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
