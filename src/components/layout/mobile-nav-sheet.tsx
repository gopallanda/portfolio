"use client";

import { cn } from "cn";
import { MessageCircle, Phone } from "lucide-react";
import { site, telHref, whatsappHref } from "@/data/site";
import { ActionLink } from "@/components/ui/action-link";
import { SocialIcon } from "@/components/ui/social-icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hrefFor: (id: string) => string;
  active?: string;
}

/** Loaded on first open (see mobile-nav.tsx) so the dialog code stays out of the initial bundle. */
export default function MobileNavSheet({ open, onOpenChange, hrefFor, active }: MobileNavSheetProps) {
  const setOpen = onOpenChange;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-[min(86vw,22rem)] gap-0 border-l border-white/10 bg-[#0b0716]/95 text-fg supports-backdrop-filter:backdrop-blur-2xl"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="font-heading text-lg font-semibold">Menu</SheetTitle>
          <SheetDescription className="text-fg-muted">
            {site.role} · {site.address.city}
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-3 py-4">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 font-heading text-2xl font-semibold tracking-tight transition-colors",
                    active === item.id ? "bg-white/[0.07] text-fg" : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                  )}
                >
                  {item.label}
                  {active === item.id && <span aria-hidden className="size-2 rounded-full bg-brand-light" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-5 border-t border-white/10 p-6">
          <div className="grid grid-cols-2 gap-2">
            <ActionLink
              href={whatsappHref("Hi Gopal! I'd like to talk about a project.")}
              variant="primary"
              size="lg"
              icon="none"
              leadingIcon={<MessageCircle aria-hidden className="size-4" />}
            >
              WhatsApp
            </ActionLink>
            <ActionLink
              href={telHref}
              variant="glass"
              size="lg"
              icon="none"
              leadingIcon={<Phone aria-hidden className="size-4 text-brand-light" />}
            >
              Call
            </ActionLink>
          </div>
          <ul className="flex items-center gap-2" aria-label="Social links">
            {site.socials.map((s) => (
              <li key={s.platform}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="glass grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:text-fg"
                >
                  <SocialIcon platform={s.platform} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
