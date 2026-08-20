import Image from "next/image";
import { ReactNode } from "react";

interface BannerProps {
  children?: ReactNode;
  className?: string;
}

export function Banner({ children, className = "" }: BannerProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src="/assets/images/banner-inscricoes.png"
        alt="Banner"
        width={1440}
        height={64}
        className="w-full h-64 object-fill"
      />

      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
