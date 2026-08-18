import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KIT_ITENS } from "@/lib/event-data";
import { Check } from "lucide-react";

export function ParticipantKitCard() {
  return (
    <Card className="glass border-white/10 ">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-2xl font-extrabold font-display">
          Kit do Participante
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          Incluso em todas as incrições
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <ul className="space-y-3">
          {KIT_ITENS.map((item) => (
            <li className="flex items-center gap-3" key={item.title}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground glow-orange">
                <Check className="h-4 w-4" />
              </span>
              {item.title}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
