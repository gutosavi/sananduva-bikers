import { YouTubePlayer } from "../shared/youtube-player";

export function EventRecapSection() {
  return (
    <section
      id="event-recap"
      className="w-full bg-secondary py-20 px-6 md:px-30 lg:px-20 lg:py-24"
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Reviva essa experiência
          </p>

          <h2 className="text-2xl text-primary font-bold font-display uppercase md:text-3xl">
            Reviva os momentos da última edição
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Relembre os momentos do Pedal do Tigre, um encontro que reúne
            ciclistas, celebra o mountain bike e transforma cada percurso em uma
            experiência de aventura e superação.
          </p>
        </div>

        <YouTubePlayer videoId="h95Leg2JRts" />
      </div>
    </section>
  );
}
