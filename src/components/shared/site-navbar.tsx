"use client";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { MenuMobile } from "./menu-mobile";
import { MenuToggle } from "./menu-toggle";

export const NAV_LINKS = [
  { href: "/about", label: "O Grupo" },
  { href: "/routes", label: "Percursos" },
  { href: "/gallery", label: "Galeria" },
  { href: "/sponsor", label: "Apoiadores" },
];

export function SiteNavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto h-24 flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Logotipo Sananduva Bikers"
            width={200}
            height={65}
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden min-w-0 items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground lg:px-3 lg:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Link
            href="/admin"
            aria-label="Painel Administrativo"
            title="Admin"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/5"
          >
            <Settings className="h-4 w-4" />
          </Link>
          <Button
            render={<Link href="/inscricoes" />}
            nativeButton={false}
            className="whitespace-nowrap px-3 text-xs glow-orange font-semibold lg:px-4 lg:text-sm"
          >
            Inscreva-se
          </Button>
        </div>

        {/* Menu-toggle */}
        <MenuToggle open={open} setOpen={setOpen} />
      </nav>

      {/* Menu-Mobile */}
      <MenuMobile open={open} setOpen={setOpen} />
    </header>
  );
}
