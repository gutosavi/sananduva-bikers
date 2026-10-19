import { YouTubePlayer } from "../shared/youtube-player";

export function EventRecapSection() {
  return (
    <section className="w-full bg-secondary px-6 py-16 md:px-12 lg:px-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold font-display uppercase tracking-widest text-primary">
            Reviva essa experiência
          </p>

          <h2 className="text-2xl font-bold uppercase md:text-3xl">
            Reviva os momentos da última edição
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Relembre os momentos do Pedal do Tigre, um encontro que reúne
            ciclistas, celebra o mountain bike e transforma cada percurso em uma
            experiência de aventura e superação.
          </p>
        </div>

        <YouTubePlayer videoId="dQw4w9WgXcQ" />
      </div>
    </section>
  );
}
