import Link from "next/link";
import { Button } from "../ui/button";
import { MenuToggleProps } from "./menu-toggle";
import { NAV_LINKS } from "./site-navbar";

export function MenuMobile({ open, setOpen }: MenuToggleProps) {
  return (
    <>
      {open && (
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-white/10" />

            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-white/5"
            >
              Admin
            </Link>

            <div className="my-2 h-px bg-white/10" />

            <Button
              render={
                <Link href="/inscricoes" onClick={() => setOpen(false)} />
              }
              nativeButton={false}
              className="mt-2 font-semibold glow-orange"
            >
              Inscreva-se Agora
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
