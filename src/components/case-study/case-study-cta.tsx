import { Mail, MessageCircle } from "lucide-react";
import { mailtoHref, whatsappHref } from "@/data/site";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/motion/reveal";

export function CaseStudyCta({ projectTitle }: { projectTitle: string }) {
  return (
    <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(100%_120%_at_50%_0%,#2a1460_0%,#120a28_55%,#0a0616_90%)] px-6 py-14 text-center shadow-[inset_0_1px_0_0_rgb(255_255_255/0.1)] sm:px-12 sm:py-16">
      <h2 className="mx-auto max-w-2xl text-3xl leading-tight font-bold tracking-[-0.03em] sm:text-5xl">
        Need something like this? <span className="headline-accent text-brand-light">Let&rsquo;s talk.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-fg-muted">
        Tell me what&rsquo;s slowing your business down. I&rsquo;ll tell you honestly whether software can fix it.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ActionLink
          href={whatsappHref(`Hi Gopal! I saw the ${projectTitle} case study and I'd like something similar.`)}
          size="lg"
          icon="external"
          leadingIcon={<MessageCircle aria-hidden className="size-4" />}
        >
          WhatsApp me
        </ActionLink>
        <ActionLink
          href={mailtoHref(`Enquiry about something like ${projectTitle}`)}
          variant="glass"
          size="lg"
          icon="none"
          leadingIcon={<Mail aria-hidden className="size-4 text-brand-light" />}
        >
          Email me
        </ActionLink>
      </div>
    </Reveal>
  );
}
