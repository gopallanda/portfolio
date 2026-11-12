"use client";

import * as m from "motion/react-m";
import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "cn";
import { site } from "@/data/site";
import { ActionLink } from "@/components/ui/action-link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Active = the last section whose top has passed 40% of the viewport.
    // At the very bottom of the page the last section wins, even if it is short.
    // Five rect reads per scroll event is cheap; no rAF needed.
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };
    // Run once after layout settles (e.g. when arriving via /#projects).
    const initial = window.setTimeout(update, 100);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, enabled]);

  return active;
}

const sectionIds = site.nav.map((n) => n.id);

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(sectionIds, isHome);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Tuck the navbar away while reading down the page; bring it back on any
  // upward scroll, near the top, or when keyboard focus moves into it.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y < 140) setHidden(false);
    else if (y > prev + 6) setHidden(true);
    else if (y < prev - 6) setHidden(false);
  });

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  // On case study pages, keep "Projects" highlighted.
  const current = isHome ? active : pathname.startsWith("/projects/") ? "projects" : undefined;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50" onFocusCapture={() => setHidden(false)}>
      <m.div
        className="container-page pointer-events-auto flex items-center justify-between gap-4 pt-4 md:pt-5"
        animate={{ y: hidden ? "-140%" : scrolled ? -6 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul
            className={cn(
              "glass flex items-center gap-1 rounded-full p-1.5 transition-[background-color,box-shadow] duration-500",
              scrolled && "bg-[#0d0918]/70 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.8)]",
            )}
          >
            {site.nav.map((item) => {
              const isActive = current === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.09] shadow-[inset_0_1px_0_0_rgb(255_255_255/0.12)]"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ActionLink
            href={hrefFor("contact")}
            variant="primary"
            size="sm"
            icon="none"
            className="hidden sm:inline-flex"
          >
            Let&rsquo;s Talk
          </ActionLink>
          <MobileNav hrefFor={hrefFor} active={current} />
        </div>
      </m.div>
    </header>
  );
}
