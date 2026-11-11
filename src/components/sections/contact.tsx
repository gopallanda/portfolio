import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { fullAddress, mailtoHref, site, telHref, whatsappHref } from "@/data/site";
import { ActionLink } from "@/components/ui/action-link";
import { SectionBadge } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Starfield } from "@/components/motion/starfield";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,#2a1460_0%,#150a30_45%,#0a0616_80%)] px-6 py-16 text-center shadow-[inset_0_1px_0_0_rgb(255_255_255/0.12),0_40px_120px_-40px_rgb(124_58_237/0.6)] sm:px-12 sm:py-24">
          <Starfield className="-z-10 opacity-70" />
          {/* Glowing arc along the bottom edge, echoing the hero horizon */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[84%] left-1/2 -z-10 aspect-[2.4/1] w-[160%] -translate-x-1/2 rounded-[50%] border-t border-brand-light/50 bg-bg shadow-[0_-20px_80px_0_rgb(139_92_246/0.45)]"
          />

          <SectionBadge icon={MessageCircle}>Contact</SectionBadge>

          <h2
            id="contact-title"
            className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl md:text-6xl"
          >
            Got a problem slowing your business down?{" "}
            <span className="headline-accent text-brand-light">Let&rsquo;s fix it.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Tell me what&rsquo;s eating your team&rsquo;s time. One message is enough to see whether software can fix it,
            and roughly what it would take.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ActionLink
              href={whatsappHref("Hi Gopal! I'd like to talk about a project.")}
              variant="primary"
              size="lg"
              icon="external"
              leadingIcon={<MessageCircle aria-hidden className="size-4" />}
            >
              WhatsApp me
            </ActionLink>
            <ActionLink
              href={telHref}
              variant="glass"
              size="lg"
              icon="none"
              leadingIcon={<Phone aria-hidden className="size-4 text-brand-light" />}
            >
              {site.phone}
            </ActionLink>
            <ActionLink
              href={mailtoHref("Project enquiry")}
              variant="glass"
              size="lg"
              icon="none"
              leadingIcon={<Mail aria-hidden className="size-4 text-brand-light" />}
            >
              Email me
            </ActionLink>
          </div>

          <p className="mt-10 flex items-center justify-center gap-1.5 text-sm text-fg-muted">
            <MapPin aria-hidden className="size-4 text-brand-light" />
            {fullAddress} · building softwares for businesses
          </p>
        </Reveal>
      </div>
    </section>
  );
}
