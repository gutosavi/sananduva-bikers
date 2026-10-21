import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-background py-20 px-6 md:px-30 lg:px-20 lg:py-24"
    >
      <h1 className="text-lg text-primary font-bold font-display md:text-2xl uppercase tracking-widest">
        Sananduva Bikers · Nossa História
      </h1>
      <h2 className="text-md text-muted-foreground font-medium py-3 md:text-lg">
        Muito mais que pedalar.
      </h2>
      <article className="w-full text-sm md:text-base text-muted-foreground flex flex-col md:flex-row gap-8 md:gap-20 py-6">
        <div className="flex flex-col gap-3 md:w-4/3">
          <h3 className="font-bold uppercase">Quem somos</h3>
          <div className="h-1 w-10 bg-primary" />
          <p className="text-justify">
            Fundada em 2014 e oficializada em 2015, a Associação Sananduva
            Bikers reúne apaixonados por ciclismo e pelo espírito de comunidade.
            Sem fins lucrativos e apartidária, a associação promove atividades
            sociais, ações solidárias e iniciativas que aproximam o esporte das
            pessoas.
          </p>
          <p className="text-justify">
            Acreditamos que o ciclismo vai muito além das pedaladas. Por meio de
            projetos como o Pedal Kids e da participação em eventos
            comunitários, buscamos incentivar a prática esportiva, promover a
            integração e fortalecer os laços entre ciclistas e comunidade.{" "}
          </p>
          <p className="text-justify">
            Desde 2014, realizamos anualmente o Pedal do Tigre, um evento que
            combina cicloturismo, natureza e competição. Com percursos para
            diferentes níveis e uma etapa do Circuito do Planalto Médio de
            Mountain Bike, o Pedal do Tigre reúne atletas e entusiastas do Rio
            Grande do Sul e de Santa Catarina.
          </p>
        </div>
        <div className="flex items-center justify-center rounded-xl overflow-hidden">
          <Image
            src="/assets/images/o-grupo.jpg"
            alt="Integrantes da Associação Sananduva Bikers reunidos"
            width={1200}
            height={650}
            className="w-full aspect-4/3 rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </article>
    </section>
  );
}
