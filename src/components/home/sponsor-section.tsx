export function SponsorSection() {
  return (
    <section
      id="sponsors"
      className="w-full bg-background py-20 px-6 md:px-30 lg:px-20 lg:py-24 flex flex-col gap-12 items-center justify-center"
    >
      <article className="flex flex-col gap-4 items-center justify-center md:flex-row md:gap-8 lg:gap-12">
        <div className="flex flex-col items-center md:items-start gap-3">
          <h1 className="text-md md:text-base font-bold font-display text-muted-foreground">
            Apoiadores Master
          </h1>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-8">
            <span>Prefeitura</span>
            <span>Sicredi</span>
          </div>
        </div>
      </article>

      <article className="flex flex-col gap-4 items-center justify-center md:flex-row md:gap-8 lg:gap-12">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-md md:text-base font-bold font-display text-muted-foreground">
            Apoiadores Ouro
          </h2>
          <div className="flex flex-row items-center gap-2 md:gap-8">
            <span>Valvita</span>
            <span>Cresol</span>
            <span>Furbo</span>
          </div>
        </div>
      </article>
    </section>
  );
}
