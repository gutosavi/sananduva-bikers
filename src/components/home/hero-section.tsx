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
    image: "/assets/images/hero-image.jpg",
    title: "Slide 1",
    description: "Pedal do Tigre •  12ª EDIÇÃO • SANANDUVA-RS",
  },
  {
    id: 2,
    image: "/assets/images/hero-image.jpg",
    title: "Slide 2",
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
              <div
                className="absolute inset-0 bg-cover bg-start bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/60 bg-linear-to-t from-zinc-950 via-black/40 to-black/20" />
              </div>

              <div className="relative z-10 container h-full flex flex-col items-start justify-center text-start space-y-6 px-10 md:px-35">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase italic">
                  {slide.title.split(" ")[0]}{" "}
                  <span className="text-orange-500">
                    {slide.title.split(" ")[1] || ""}
                  </span>
                </h1>

                <p className="max-w-2xl text-lg text-zinc-300">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/inscricao">
                    <Button
                      size="xs"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold px-4 h-12 md:text-lg"
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
