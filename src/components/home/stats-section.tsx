"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    id: 1,
    title: "Ciclistas participantes",
    value: 350,
    suffix: "+",
  },
  {
    id: 2,
    title: "Seguidores",
    value: 4000,
    suffix: "+",
  },
  {
    id: 3,
    title: "Cidades representadas",
    value: 65,
    suffix: "+",
  },
  {
    id: 4,
    title: "Espírito MTB",
    value: 100,
    suffix: "%",
  },
];

export function StatsSection() {
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  if (inView && !hasAnimated) {
    setHasAnimated(true);
  }

  return (
    <section
      ref={ref}
      className="w-full bg-secondary-foreground text-primary-foreground py-20 px-6 md:px-30 lg:px-20 lg:py-24"
    >
      <h1 className="text-lg font-bold font-display md:text-2xl uppercase tracking-widest text-primary">
        Estatísticas · Sananduva Bikers
      </h1>
      <article className="w-full text-base md:text-lg grid grid-cols-2 md:grid-cols-4 place-items-center gap-8 pt-10">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <h2 className="text-5xl font-bold">
              {hasAnimated && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  separator=""
                />
              )}
              <span className="text-primary">{stat.suffix}</span>
            </h2>
            <p className="text-muted text-sm md:text-base">{stat.title}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
