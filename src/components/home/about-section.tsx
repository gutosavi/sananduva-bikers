import Image from "next/image";

export function AboutSection() {
  return (
    <section className="w-full bg-background py-20 px-6 md:px-30">
      <h1 className="text-lg text-primary font-bold font-display md:text-2xl">
        SANANDUVA BIKERS · NOSSA HISTÓRIA
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
            Bikers reúne apaixonados pelo ciclismo e pelo espírito de
            comunidade. Sem fins lucrativos e apartidária, promove atividades
            sociais, ações solidárias e iniciativas que aproximam o esporte da
            comunidade.
          </p>
        </div>
        <div className="flex items-center justify-center shadow-lg rounded-xl">
          <Image
            src="/assets/images/o-grupo.jpg"
            alt="Integrantes da Associação Sananduva Bikers reunidos"
            width={1200}
            height={650}
            className="w-full aspect-4/3 rounded-xl object-cover"
          />
        </div>
      </article>
      <article className="w-full text-sm md:text-base text-muted-foreground flex flex-col md:flex-row-reverse gap-8 md:gap-20 py-6">
        <div className="flex flex-col gap-3 md:w-4/3">
          <h3 className="font-bold uppercase">O que nos move</h3>
          <div className="h-1 w-10 bg-primary" />
          <p className="text-justify">
            Acreditamos que o ciclismo vai além das pedaladas. Por meio de
            iniciativas como o Pedal Kids e da participação em eventos
            comunitários, buscamos incentivar o esporte, promover a integração e
            fortalecer os laços que nos unem.
          </p>
        </div>
        <div className="flex items-center justify-center shadow-lg rounded-xl">
          <Image
            src="/assets/images/pedal-kids.jpg"
            alt="Integrantes da Associação Sananduva Bikers reunidos"
            width={1200}
            height={650}
            className="w-full aspect-4/3 rounded-xl object-cover"
          />
        </div>
      </article>
      <article className="w-full text-sm md:text-base text-muted-foreground flex flex-col md:flex-row gap-8 md:gap-20 py-6">
        <div className="flex flex-col gap-3 md:w-4/3">
          <h3 className="font-bold uppercase">Pedal do Tigre</h3>
          <div className="h-1 w-10 bg-primary" />
          <p className="text-justify">
            Realizado anualmente desde 2014, o Pedal do Tigre reúne ciclistas em
            uma experiência que combina cicloturismo, natureza e competição. Com
            percursos para diferentes níveis e uma etapa do Circuito do Planalto
            Médio de Mountain Bike, o evento atrai atletas e entusiastas do Rio
            Grande do Sul e de Santa Catarina.
          </p>
        </div>
        <div className="flex items-center justify-center shadow-lg rounded-xl">
          <Image
            src="/assets/images/pedal-do-tigre.jpg"
            alt="Integrantes da Associação Sananduva Bikers reunidos"
            width={1200}
            height={650}
            className="w-full aspect-4/3 rounded-xl object-cover"
          />
        </div>
      </article>
    </section>
  );
}
