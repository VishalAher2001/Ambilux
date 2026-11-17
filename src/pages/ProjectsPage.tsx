import { ArrowUpRight } from 'lucide-react';
import { EXECUTED_PROJECTS } from '../data/ambiluxData';
import { ParallaxFrame, Reveal, StaggerHeading, useDocumentMeta } from '../components/Reveal';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  useDocumentMeta(
    'Executed Projects — AmbiLux | Architectural Lighting Installations',
    'Explore all 12 executed architectural lighting installations documented in the AmbiLux (Ambient Works) catalogue.'
  );

  return (
    <div>
      {/* Editorial Header */}
      <section className="relative z-20 bg-[#F7F6F2] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
            Executed Projects · {EXECUTED_PROJECTS.length} Documented Plates
          </p>
          <StaggerHeading
            lines={[
              { text: 'Architectural lighting' },
              { text: 'delivered in practice.', accent: true },
            ]}
            className="mt-4 max-w-4xl font-display text-4xl leading-[1.04] font-bold tracking-tight text-[#171717] sm:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555555]">
            A complete photographic record of spaces executed by Ambient Works — spanning corporate
            workstations, executive boardrooms, collaborative lounges, acoustic ceilings, and
            customised decorative feature zones.
          </p>
        </div>
      </section>

      {/* Asymmetrical Executed Projects Gallery */}
      <section className="relative z-20 bg-[#F7F6F2] pb-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
            {EXECUTED_PROJECTS.map((project, idx) => {
              const isWide = idx % 3 === 0;
              return (
                <Reveal
                  key={project.slug}
                  delay={(idx % 3) * 0.06}
                  className={isWide ? 'md:col-span-12' : 'md:col-span-6'}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(`/projects/${project.slug}`)}
                    className="group block w-full text-left"
                  >
                    <ParallaxFrame
                      src={project.heroImage}
                      alt={project.title}
                      aspect={isWide ? 'aspect-[16/8]' : 'aspect-[16/10]'}
                      parallaxOffset={isWide ? 24 : 18}
                      cursorView
                      className="rounded-xl"
                    />

                    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4 border-b border-[#171717]/10 pb-5">
                      <div className="max-w-2xl">
                        <p className="font-mono-num text-xs text-[#555555]">
                          {project.plateNumber} · {project.applicationType}
                        </p>
                        <h2 className="mt-1.5 font-display text-2xl font-bold text-[#171717] transition-colors group-hover:text-[#1685C7] sm:text-3xl">
                          {project.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#555555]">
                          {project.summary}
                        </p>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#171717] group-hover:text-[#1685C7]">
                        <span>View Plate</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
