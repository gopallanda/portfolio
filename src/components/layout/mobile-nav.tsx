"use client";

import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { useRef, useState } from "react";

// The sheet (and its dialog library) is only downloaded once the menu is first
// opened; hovering or focusing the button starts the download a bit earlier.
const loadSheet = () => import("./mobile-nav-sheet");
const MobileNavSheet = dynamic(loadSheet, { ssr: false });

interface MobileNavProps {
  hrefFor: (id: string) => string;
  active?: string;
}

export function MobileNav({ hrefFor, active }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setMounted(true);
    setOpen(true);
  };

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    // Return focus to the menu button when the sheet closes.
    if (!next) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openMenu}
        onPointerEnter={() => void loadSheet()}
        onFocus={() => void loadSheet()}
        className="glass grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/10 active:scale-95 md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      {mounted && <MobileNavSheet open={open} onOpenChange={onOpenChange} hrefFor={hrefFor} active={active} />}
    </>
  );
}
