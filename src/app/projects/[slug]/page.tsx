import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Quote } from "lucide-react";
import { caseStudyProjects, getProject, isFilled } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyHeader } from "@/components/case-study/case-study-header";
import { ProblemCards } from "@/components/case-study/problem-cards";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { ScreenGallery } from "@/components/case-study/screen-gallery";
import { CaseStudyCta } from "@/components/case-study/case-study-cta";
import { NextProject } from "@/components/case-study/next-project";

type Props = PageProps<"/projects/[slug]">;

/** Every project with a case study is prerendered at build time. */
export async function generateStaticParams() {
  return caseStudyProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return { title: "Project not found" };

  const title = `${project.title} case study`;
  return {
    title,
    description: `${project.pitch} ${project.description}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.pitch,
      type: "article",
      siteName: site.name,
      locale: "en_GB",
      url: `/projects/${project.slug}`,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.pitch,
      images: [project.cover.src],
    },
  };
}

// Cache Components: the params promise is awaited inside <Suspense> so the
// route's shared App Shell can still be prerendered.
export default function CaseStudyPage({ params }: Props) {
  return (
    <Suspense fallback={<CaseStudySkeleton />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

function Section({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const id = `section-${index}`;
  return (
    <section aria-labelledby={id} className="py-12 sm:py-16">
      <Reveal className="mb-8 flex items-baseline gap-4 sm:mb-10">
        <span className="font-heading text-sm font-bold text-brand-light">{String(index).padStart(2, "0")}</span>
        <h2 id={id} className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

async function CaseStudy({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  const caseStudy = project?.caseStudy;
  if (!project || !caseStudy) notFound();

  const all = caseStudyProjects();
  const next = all[(all.findIndex((p) => p.slug === project.slug) + 1) % all.length];
  // The brief only shows once it has real content (not a "TODO" placeholder).
  const hasBrief = isFilled(caseStudy.brief);
  const n = (i: number) => (hasBrief ? i + 1 : i);

  return (
    <article>
      <CaseStudyHeader project={project} caseStudy={caseStudy} />

      <div className="container-page pb-24">
        {hasBrief && (
          <Section index={1} title="The brief">
            <Reveal className="glass-flat relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
              <Quote aria-hidden className="size-8 text-brand-light/70" />
              <blockquote className="mt-4 max-w-3xl font-serif text-2xl leading-snug text-fg italic sm:text-3xl">
                {caseStudy.brief}
              </blockquote>
              <p className="mt-6 text-sm text-fg-muted">
                {project.kind === "Client" ? `The client, ${project.client.toLowerCase()}` : "The problem I set out to solve"}
              </p>
            </Reveal>
          </Section>
        )}

        <Section index={n(1)} title="Problems I solved">
          <ProblemCards problems={caseStudy.problems} />
        </Section>

        <Section index={n(2)} title="How it fits together">
          <ArchitectureDiagram architecture={caseStudy.architecture} title={project.title} />
        </Section>

        <Section index={n(3)} title="Screens">
          <ScreenGallery screens={project.gallery} projectTitle={project.title} />
        </Section>

        <div className="mt-8 flex flex-col gap-8 sm:mt-12">
          <CaseStudyCta projectTitle={project.title} />
          {next.slug !== project.slug && <NextProject project={next} />}
        </div>
      </div>
    </article>
  );
}

function CaseStudySkeleton() {
  return (
    <div className="container-page animate-pulse pt-40 pb-24" aria-busy="true" aria-label="Loading case study">
      <div className="h-4 w-28 rounded-full bg-white/10" />
      <div className="mt-10 h-14 w-3/4 max-w-2xl rounded-2xl bg-white/10" />
      <div className="mt-5 h-8 w-1/2 max-w-xl rounded-xl bg-white/[0.07]" />
      <div className="mt-10 h-20 rounded-2xl bg-white/[0.05]" />
      <div className="mt-12 aspect-[16/9] rounded-2xl bg-white/[0.05]" />
    </div>
  );
}
