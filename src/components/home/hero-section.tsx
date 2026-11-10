import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/assets/images/hero-image-1.jpg",
    title: "A AVENTURA COMEÇA AQUI",
    description: "Pedal do Tigre •  12ª EDIÇÃO • SANANDUVA-RS",
  },
  {
    id: 2,
    image: "/assets/images/hero-image-2.jpg",
    title: "AQUI, CADA KM CONTA",
    description: "Pedal do Tigre •  12ª EDIÇÃO • SANANDUVA-RS",
  },
  {
    id: 3,
    image: "/assets/images/hero-image-3.jpg",
    title: "VÁ MAIS LONGE",
    description: "Pedal do Tigre •  12ª EDIÇÃO • SANANDUVA-RS",
  },
];

export function HeroSection() {
  return (
    <section className="w-full h-[60vh] bg-black overflow-hidden md:h-[65vh]">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {HERO_SLIDES.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="pl-0 w-full h-[65vh] relative"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-[center_25%]"
                priority={slide.id === 1}
                quality={75}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50 bg-linear-to-t from-zinc-950 via-black/40 to-black/20" />

              <div className="relative z-10 container h-full flex flex-col items-start justify-center text-start space-y-6 px-10 md:px-25">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase italic">
                  {slide.title}
                  <span className="text-primary">!</span>
                </h1>

                <p className="max-w-2xl text-lg text-zinc-300">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/inscricoes">
                    <Button
                      size="xs"
                      className="w-full bg-primary hover:bg-orange-500 text-black font-bold px-4 h-12 md:text-lg"
                    >
                      Garantir Minha Inscrição
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-4 absolute bottom-0 left-0 right-0 h-8 items-center pb-10">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
