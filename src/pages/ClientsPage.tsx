import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, ESTEEMED_CLIENTS } from '../data/ambiluxData';
import { MagneticButton, Reveal, StaggerHeading, useDocumentMeta } from '../components/Reveal';

interface ClientsPageProps {
  onNavigate: (path: string) => void;
}

export default function ClientsPage({ onNavigate }: ClientsPageProps) {
  useDocumentMeta(
    'Esteemed Clients — AmbiLux | Architectural Lighting Partners',
    'AmbiLux (Ambient Works) proudly serves esteemed clients across technology, finance, pharmaceuticals, interiors, and enterprise workplaces.'
  );

  return (
    <div>
      {/* Light Editorial Intro */}
      <section className="relative z-20 bg-[#F7F6F2] pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
            Esteemed Clients · {ESTEEMED_CLIENTS.length} Verified Partners
          </p>
          <StaggerHeading
            lines={[
              { text: 'Trusted by global' },
              { text: 'workplaces & institutions.', accent: true },
            ]}
            className="mt-4 max-w-4xl font-display text-4xl leading-[1.04] font-bold tracking-tight text-[#171717] sm:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555555]">
            {COMPANY_INFO.vision}
          </p>
        </div>
      </section>

      {/* Monochrome / Neutral Logo Showcase */}
      <section className="relative z-20 border-t border-[#171717]/10 bg-[#ECEAE3] py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#171717]/12 bg-[#171717]/12 sm:grid-cols-3 lg:grid-cols-4">
            {ESTEEMED_CLIENTS.map((client, idx) => (
              <Reveal key={client.id} delay={(idx % 4) * 0.04}>
                <div className="group flex h-44 flex-col items-center justify-between bg-[#F7F6F2] p-6 transition-colors hover:bg-[#FFFFFF]">
                  <span className="self-start font-mono-num text-[11px] text-[#555555]/70">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="flex h-20 w-full items-center justify-center px-4">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-14 max-w-[85%] object-contain opacity-80 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-center text-xs font-medium text-[#555555] transition-colors group-hover:text-[#171717]">
                    {client.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-xl border border-[#171717]/10 bg-[#F7F6F2] p-8 sm:flex-row sm:items-center sm:p-10">
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-bold text-[#171717] sm:text-3xl">
                  Collaborate with {COMPANY_INFO.legalName} on your next architectural brief.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                  Connect with our technical team for customised luminaire manufacturing, light
                  planning, and OEM validation.
                </p>
              </div>
              <MagneticButton
                onClick={() => onNavigate('/contact')}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#171717] px-6 py-3.5 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#F5A623] hover:text-[#171717]"
              >
                <span>Contact Our Team</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
