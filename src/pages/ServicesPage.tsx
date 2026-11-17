import { useState } from 'react';
import { ArrowUpRight, Bluetooth } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/ambiluxData';
import MediaFrame from '../components/MediaFrame';
import {
  MagneticButton,
  ParallaxFrame,
  Reveal,
  StaggerHeading,
  useDocumentMeta,
} from '../components/Reveal';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

  useDocumentMeta(
    'Services — AmbiLux | Customized Lighting, Testing, Planning & Installation',
    'AmbiLux architectural lighting services: Customized Lighting, Testing & Validation, Light Planning, Installation Support, and Casambi Bluetooth tunable control.'
  );

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <div>
      {/* Dark Header */}
      <section
        data-theme="dark"
        className="relative overflow-hidden bg-[#171717] pt-32 pb-20 text-[#F7F6F2] lg:pt-40 lg:pb-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="font-mono-num text-xs font-medium tracking-widest text-[#F5A623] uppercase">
            End-to-End Execution · 04 Verified Disciplines
          </p>
          <StaggerHeading
            lines={[
              { text: 'Precision engineering' },
              { text: 'for experiential illumination.', accent: true },
            ]}
            className="mt-5 max-w-4xl font-display text-4xl leading-[1.03] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#D8D6D0] sm:text-lg">
            {COMPANY_INFO.experientialTitle}
          </p>
        </div>
      </section>

      {/* Interactive 4-Service Architectural Index */}
      <section className="relative z-20 bg-[#F7F6F2] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              {SERVICES.map((service, idx) => {
                const isSelected = service.id === activeService.id;
                return (
                  <Reveal key={service.id} delay={idx * 0.06}>
                    <div
                      onMouseEnter={() => setActiveServiceId(service.id)}
                      className={`rounded-xl border p-7 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#171717] bg-[#ECEAE3]'
                          : 'border-[#171717]/12 bg-[#F7F6F2] hover:border-[#171717]/35'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="font-mono-num text-sm font-medium text-[#555555]">
                            {service.num}
                          </span>
                          <span
                            className="h-2 w-6 rounded-full"
                            style={{ backgroundColor: service.accentHex }}
                            aria-hidden="true"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onNavigate(
                              `/contact?enquiry=${encodeURIComponent(`Service: ${service.title}`)}`
                            )
                          }
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#1685C7]"
                        >
                          <span>Enquire</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <h2 className="mt-4 font-display text-2xl font-bold text-[#171717] sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-[#555555]">
                        {service.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <Reveal>
                  <div className="overflow-hidden rounded-xl border border-[#171717]/12 bg-[#ECEAE3] p-5">
                    <MediaFrame
                      src={activeService.image}
                      alt={activeService.title}
                      aspect="aspect-[4/3]"
                      className="rounded-lg"
                    />
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <div>
                        <p className="font-mono-num text-xs text-[#555555]">
                          Discipline {activeService.num}
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-bold text-[#171717]">
                          {activeService.title}
                        </h3>
                      </div>
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: activeService.accentHex }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#555555]">
                      {activeService.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate(
                          `/contact?enquiry=${encodeURIComponent(
                            `Service Consultation: ${activeService.title}`
                          )}`
                        )
                      }
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#555555]"
                    >
                      <span>Request {activeService.title}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiential Design & Casambi Bluetooth Wireless Control */}
      <section className="relative z-20 border-t border-[#171717]/10 bg-[#ECEAE3] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <ParallaxFrame
              src="/assets/ambilux/editorial/casambi-track-spots.jpg"
              alt="Casambi Bluetooth controlled magnetic track spots in modern space"
              aspect="aspect-[16/11]"
              parallaxOffset={20}
              className="rounded-xl"
            />
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#1685C7] uppercase">
                <Bluetooth className="h-4 w-4" aria-hidden="true" />
                <span>Smart Wireless Lighting Architecture</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                {COMPANY_INFO.casambiNote}
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#555555] sm:text-base">
                {COMPANY_INFO.experientialBody.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton
                  onClick={() => onNavigate('/products')}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-6 py-3.5 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#555555]"
                >
                  <span>Browse Compatible Luminaires</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate('/contact?enquiry=Casambi%20Bluetooth%20Control%20System')
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-[#171717]/20 bg-[#F7F6F2] px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:border-[#171717]"
                >
                  <span>Discuss Controls</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
