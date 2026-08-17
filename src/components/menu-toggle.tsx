"use client";
import { Menu, X } from "lucide-react";
import React from "react";

export function MenuToggle() {
  const [open, setOpen] = React.useState(false);

  return (
    <button
      type="button"
      aria-label="Abrir menu"
      aria-expanded={open}
      className="flex items-center justify-center rouded-md p-2 text-foreground md:hidden"
      onClick={() => setOpen((prev) => !prev)}
    >
      {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
}
