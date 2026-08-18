import { Card } from "@/components/ui/card";
import { KIT_ITENS } from "@/lib/event-data";
import { Check } from "lucide-react";

export function ParticipantKitCard() {
  return (
    <Card className="glass p-6 border-white/10 ">
      <h2 className="text-2xl font-extrabold font-display">
        Kit do participante
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Incluso em todas as incrições
      </p>
      <ul className="mt-4 space-y-3">
        {KIT_ITENS.map((item) => (
          <li className="flex items-center gap-3" key={item.title}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground glow-orange">
              <Check className="h-4 w-4" />
            </span>
            {item.title}
          </li>
        ))}
      </ul>
    </Card>
  );
}
