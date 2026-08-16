import { inter, neueMachina } from "@/functions/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sananduva Bikers",
  description: "Associação Sananduva Bikers",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`dark scroll-smooth ${cn("font-sans", inter.variable)} ${neueMachina.variable} bg-background`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
