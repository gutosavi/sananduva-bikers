import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartHandshake, Mountain, Trophy } from "lucide-react";
import Image from "next/image";

const eventDescription = [
  {
    id: 1,
    title: "Cicloturismo",
    image: "/assets/images/pedal-ciclo.jpg",
    icon: Mountain,
    description:
      "Descubra as paisagens do interior de Sananduva em um passeio que une natureza, aventura e a paixão por pedalar.",
    badges: ["Natureza", "Paisagens", "Experiência"],
  },
  {
    id: 2,
    title: "Competição MTB",
    image: "/assets/images/pedal-do-tigre.jpg",
    icon: Trophy,
    description:
      "Para quem busca superar limites, encarar desafios e testar suas habilidades em uma experiência de mountain bike.",
    badges: ["Desafio", "Performance", "Superação"],
  },
  {
    id: 3,
    title: "Muito Além do Pedal",
    image: "/assets/images/pedal-kids.jpg",
    icon: HeartHandshake,
    description:
      "Um evento construído por pessoas que compartilham a paixão pelo ciclismo, valorizam a comunidade e fazem cada edição acontecer.",
    badges: ["Comunidade", "União", "Paixão pelo MTB"],
  },
];

export function AboutEventCard() {
  return (
    <>
      {eventDescription.map((event) => (
        <Card
          key={event.id}
          className="relative group overflow-hidden mx-auto w-full max-w-sm pt-0 shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-4"
        >
          <div className="absolute inset-0 z-30 aspect-video bg-black/5" />
          <Image
            src={event.image}
            alt="Pedal do Tigre 2026"
            width={1200}
            height={650}
            className="relative z-20 aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 pb-2">
              <event.icon className="h-4 w-4 text-primary" />
              <span className="font-display font-bold text-muted-foreground">
                {event.title}
              </span>
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardAction className="flex flex-wrap gap-2 px-4 py-2">
            {event.badges.map((badge, index) => (
              <Badge key={`${event.id}-${index}`} variant="secondary">
                {badge}
              </Badge>
            ))}
          </CardAction>
        </Card>
      ))}
    </>
  );
}
