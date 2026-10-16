interface SectionsHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
}: SectionsHeaderProps) {
  const date = new Date().getFullYear();
  return (
    <header
      className={`w-full flex flex-col gap-3 pt-30 pb-10 px-5 md:px-30 glass opacity-80 bg-linear-to-br from-[#1a2421] to-[#18241c] ${className || ""}`}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-2xl text-primary font-bold font-display tracking-wide">
          {title}
        </h1>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        <p className="text-3xl font-extrabold font-heading text-muted-foreground uppercase tracking-tight mt-2 md:text-4xl">
          {subtitle}{" "}
          <span className="text-primary font-bold uppercase">{date}</span>
        </p>
        <p className="text-lg text-muted-foreground mt-1">{description}</p>
      </div>
    </header>
  );
}
