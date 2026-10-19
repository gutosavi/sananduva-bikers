import { AboutEventCard } from "../shared/about-event-card";

export function EventSection() {
  return (
    <section className="w-full bg-surface py-20 px-6 md:px-30">
      <h1 className="text-lg text-primary font-bold font-display md:text-2xl uppercase">
        O Evento · Pedal do Tigre
      </h1>
      <h2 className="text-md text-muted-foreground font-medium py-3 md:text-lg">
        Uma tradição que cresce a cada edição.
      </h2>
      <p className="text-justify text-muted-foreground text-sm md:text-base py-3">
        O Pedal do Tigre é o encontro anual do Sananduva Bikers: desafio,
        paisagem, comunidade e aquela sensação de chegada.
      </p>

      <article className="py-6 flex flex-col gap-6 md:flex-row md:gap-12">
        <AboutEventCard />
      </article>
    </section>
  );
}
