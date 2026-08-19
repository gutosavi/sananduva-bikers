import { Menu, X } from "lucide-react";
export interface MenuToggleProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuToggle({ open, setOpen }: MenuToggleProps) {
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
