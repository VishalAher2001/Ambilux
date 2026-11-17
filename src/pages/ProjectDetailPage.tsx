import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { EXECUTED_PROJECTS, PRODUCTS } from '../data/ambiluxData';
import MediaFrame from '../components/MediaFrame';
import {
  MagneticButton,
  ParallaxFrame,
  Reveal,
  StaggerHeading,
  useDocumentMeta,
} from '../components/Reveal';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function ProjectDetailPage({ slug, onNavigate }: ProjectDetailPageProps) {
  const project = EXECUTED_PROJECTS.find((p) => p.slug === slug);

  useDocumentMeta(
    project
      ? `${project.title} — Executed Project | AmbiLux`
      : 'Project Not Found — AmbiLux',
    project?.summary ||
      'Executed architectural lighting installation documented in the AmbiLux (Ambient Works) catalogue.'
  );

  if (!project) {
    return (
      <section className="bg-[#F7F6F2] pt-36 pb-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <h1 className="font-display text-3xl font-bold text-[#171717]">
            Executed project not found.
          </h1>
          <button
            type="button"
            onClick={() => onNavigate('/projects')}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-[#F7F6F2]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Executed Projects</span>
          </button>
        </div>
      </section>
    );
  }

  const currentIdx = EXECUTED_PROJECTS.findIndex((p) => p.slug === project.slug);
  const relatedProjects = [
    EXECUTED_PROJECTS[(currentIdx + 1) % EXECUTED_PROJECTS.length],
    EXECUTED_PROJECTS[(currentIdx + 2) % EXECUTED_PROJECTS.length],
  ];
  const matchedProducts = PRODUCTS.filter((p) => project.relatedProductIds.includes(p.id));

  return (
    <div>
      {/* Dark Architectural Hero */}
      <section
        data-theme="dark"
        className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#171717] pt-32 pb-16 text-[#F7F6F2]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <img
            src={project.heroImage}
            alt=""
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/65 to-[#171717]/40" />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => onNavigate('/projects')}
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#F7F6F2]/80 uppercase hover:text-[#F5A623]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>All Executed Projects</span>
          </button>

          <p className="font-mono-num text-xs font-medium tracking-widest text-[#F5A623] uppercase">
            {project.plateNumber} · {project.applicationType} · {project.cataloguePage}
          </p>

          <StaggerHeading
            lines={[{ text: project.title }]}
            className="mt-4 max-w-4xl font-display text-3xl leading-[1.05] font-bold tracking-tight text-[#F7F6F2] sm:text-5xl lg:text-6xl"
          />
        </div>
      </section>

      {/* Project Narrative, Systems & Gallery */}
      <section className="relative z-20 bg-[#F7F6F2] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-mono-num text-xs text-[#555555] uppercase">
                  Installation Summary
                </p>
                <h2 className="mt-3 font-display text-2xl leading-snug font-bold text-[#171717] sm:text-3xl">
                  {project.summary}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-xl border border-[#171717]/12 bg-[#ECEAE3] p-6 sm:p-7">
                  <p className="font-mono-num text-xs font-semibold text-[#555555] uppercase">
                    Lighting Applications Used
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm font-medium text-[#171717]">
                    {project.lightingSystems.map((sys) => (
                      <li key={sys} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" aria-hidden="true" />
                        <span>{sys}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-[#171717]/10 pt-5">
                    <MagneticButton
                      onClick={() =>
                        onNavigate(
                          `/contact?enquiry=${encodeURIComponent(
                            `Similar to ${project.plateNumber}: ${project.title}`
                          )}`
                        )
                      }
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#555555]"
                    >
                      <span>Enquire About This Lighting Approach</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Large Gallery Frames */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {project.gallery.map((imgSrc, idx) => (
              <ParallaxFrame
                key={`${project.slug}-img-${idx}`}
                src={imgSrc}
                alt={`${project.title} installation view ${idx + 1}`}
                aspect="aspect-[16/10]"
                parallaxOffset={18}
                className={idx === 0 ? 'rounded-xl md:col-span-2' : 'rounded-xl'}
              />
            ))}
          </div>

          {/* Related Luminaire Fixtures */}
          {matchedProducts.length > 0 && (
            <div className="mt-20 border-t border-[#171717]/10 pt-14">
              <Reveal>
                <p className="font-mono-num text-xs text-[#555555] uppercase">
                  Corresponding Series Models
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#171717] sm:text-3xl">
                  Fixtures featured in similar installations
                </h2>
              </Reveal>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {matchedProducts.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => onNavigate(`/products/${prod.id}`)}
                    className="group flex flex-col overflow-hidden rounded-xl border border-[#171717]/10 bg-[#FFFFFF] text-left transition-colors hover:border-[#171717]/35"
                  >
                    <div className="bg-[#ECEAE3] p-5">
                      <MediaFrame
                        src={prod.image}
                        alt={prod.name}
                        aspect="aspect-[4/3]"
                        fit={prod.category === 'geometrical' ? 'cover' : 'contain'}
                        imgClassName="group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-mono-num text-xs text-[#555555]">{prod.code}</p>
                      <h3 className="mt-1 font-display text-base font-bold text-[#171717] group-hover:text-[#1685C7]">
                        {prod.name}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Executed Plates */}
          <div className="mt-20 border-t border-[#171717]/10 pt-14">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono-num text-xs text-[#555555] uppercase">
                    Next Executed Installations
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#171717] sm:text-3xl">
                    Continue exploring plates
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/projects')}
                  className="text-sm font-semibold text-[#171717] hover:text-[#1685C7]"
                >
                  All 12 plates
                </button>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {relatedProjects.map((rel) => (
                <button
                  key={rel.slug}
                  type="button"
                  onClick={() => onNavigate(`/projects/${rel.slug}`)}
                  className="group block text-left"
                >
                  <ParallaxFrame
                    src={rel.heroImage}
                    alt={rel.title}
                    aspect="aspect-[16/10]"
                    parallaxOffset={14}
                    cursorView
                    className="rounded-xl"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-mono-num text-xs text-[#555555]">
                        {rel.plateNumber} · {rel.applicationType}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#171717] group-hover:text-[#1685C7]">
                        {rel.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#555555]" aria-hidden="true" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
