import { site } from "@/data/site";
import { tickerWords } from "@/data/home";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonial } from "@/components/sections/testimonial";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/motion/marquee";
import { personJsonLd, toJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(personJsonLd()) }} />
      <Hero />
      <Projects />
      <Services />
      <Process />
      <TechStack />
      <Testimonial />
      <Marquee name={site.name} words={tickerWords} />
      <Contact />
    </>
  );
}
