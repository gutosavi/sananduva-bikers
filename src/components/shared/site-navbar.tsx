"use client";
import { Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { MenuMobile } from "./menu-mobile";
import { MenuToggle } from "./menu-toggle";

export const NAV_LINKS = [
  { href: "#about", label: "O Grupo" },
  { href: "#event", label: "Pedal do Tigre" },
  { href: "#event-recap", label: "Galeria" },
  { href: "#sponsors", label: "Apoiadores" },
];

export function SiteNavBar() {
  const [open, setOpen] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const pathname = usePathname();

  const isAdminRoute = pathname === "/admin";
  const isLoginRoute = pathname === "/admin/login";

  React.useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`fixed top-0 w-screen border-white/10 z-50 ${
        scrollPosition < 60 && !isLoginRoute
          ? "bg-black/0 backdrop-blur-none transform transition-all duration-300"
          : "bg-black/60 backdrop-blur-md transform transition-all duration-300"
      }`}
    >
      <nav className="flex flex-row w-full h-24 items-center justify-between gap-4 px-6 py-3 md:px-30">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Logotipo Sananduva Bikers"
            width={200}
            height={65}
            loading="eager"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden min-w-0 items-center gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-2 py-2 text-xs font-medium text-secondary transition-colors hover:bg-white/5 hover:text-foreground lg:px-3 lg:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {isAdminRoute ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="whitespace-nowrap px-3 text-xs font-semibold lg:px-6 lg:text-sm bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Sair
            </Button>
          ) : (
            <>
              <Link
                href="/admin"
                aria-label="Painel Administrativo"
                title="Admin"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/5"
              >
                <Settings className="h-4 w-4 text-secondary" />
              </Link>
              <Button
                render={<Link href="/inscricoes" />}
                nativeButton={false}
                className="whitespace-nowrap px-3 text-xs glow-orange font-semibold lg:px-4 lg:text-sm"
              >
                Inscreva-se
              </Button>
            </>
          )}
        </div>

        {/* Menu-toggle */}
        <MenuToggle open={open} setOpen={setOpen} />
      </nav>

      {/* Menu-Mobile */}
      <MenuMobile open={open} setOpen={setOpen} />
    </header>
  );
}
