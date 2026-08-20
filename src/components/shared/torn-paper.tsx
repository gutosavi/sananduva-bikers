import Image from "next/image";

type TornPaperProps = {
  position?: "top" | "bottom";
  src?: string;
  className?: string;
  zIndex?: string;
};

export function TornPaper({
  position = "bottom",
  src = "/assets/images/torn-paper.svg",
  className = "",
  zIndex = "z-10",
}: TornPaperProps) {
  const positionClass =
    position === "top"
      ? "top-0 translate-y-[-50%] md:-translate-y-[50%] rotate-180"
      : "bottom-3 translate-y-[65%] md:translate-y-1/2";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 w-full h-8 sm:h-4 ${positionClass} ${zIndex} ${className}`}
    >
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="w-full object-cover"
      />
    </div>
  );
}
