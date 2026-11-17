import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/ambiluxData';
import {
  MagneticButton,
  ParallaxFrame,
  Reveal,
  StaggerHeading,
  useDocumentMeta,
} from '../components/Reveal';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  useDocumentMeta(
    'About Us — AmbiLux | Ambient Works Architectural Lighting',
    'Led by Dharmesh Lad, Ambient Works pairs top-tier OEM sourcing and stringent quality assessments with bespoke architectural lighting design.'
  );

  return (
    <div>
      {/* Dark Architectural Hero */}
      <section
        data-theme="dark"
        className="relative overflow-hidden bg-[#171717] pt-32 pb-20 text-[#F7F6F2] lg:pt-40 lg:pb-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="font-mono-num text-xs font-medium tracking-widest text-[#F5A623] uppercase">
            About AmbiLux · {COMPANY_INFO.legalName}
          </p>
          <StaggerHeading
            lines={[
              { text: 'Illuminating your vision' },
              { text: 'from concept to completion.', accent: true },
            ]}
            className="mt-5 max-w-4xl font-display text-4xl leading-[1.03] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          />
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#D8D6D0] sm:text-lg">
            {COMPANY_INFO.aboutQuote}
          </p>
        </div>
      </section>

      {/* Editorial Narrative, OEM Quality & Leadership */}
      <section className="relative z-20 bg-[#F7F6F2] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <ParallaxFrame
              src="/assets/ambilux/editorial/about-pendants-clean.jpg"
              alt="Ambient Works architectural suspension lighting study"
              aspect="aspect-[4/5]"
              parallaxOffset={24}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-8 lg:col-span-6 lg:pt-6">
            <Reveal>
              <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
                Heritage & Quality Standards
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
                Local mastery aligned with global OEM engineering.
              </h2>
            </Reveal>

            {COMPANY_INFO.aboutParagraphs.map((paragraph, idx) => (
              <Reveal key={idx} delay={0.08 * idx}>
                <p className="text-base leading-relaxed text-[#555555]">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.28}>
              <div className="rounded-xl border border-[#171717]/12 bg-[#ECEAE3] p-7">
                <p className="font-mono-num text-xs font-medium text-[#555555] uppercase">
                  Leadership
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#171717]">
                  {COMPANY_INFO.leader}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                  Guiding {COMPANY_INFO.legalName} with a customer-centric approach — tailoring each
                  luminaire schedule to match the exact spatial, thermal, and aesthetic requirements
                  of architects, designers, and enterprise workplaces.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision Spread */}
      <section className="relative z-20 border-t border-[#171717]/10 bg-[#ECEAE3] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="grid gap-6 lg:col-span-7">
              <Reveal>
                <div className="rounded-xl border border-[#171717]/10 bg-[#F7F6F2] p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-num text-xs text-[#555555] uppercase">
                      01 · Mission
                    </span>
                    <span className="h-1.5 w-8 rounded-full bg-[#1685C7]" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl leading-snug font-bold text-[#171717] sm:text-3xl">
                    {COMPANY_INFO.mission}
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-xl border border-[#171717]/10 bg-[#F7F6F2] p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-num text-xs text-[#555555] uppercase">
                      02 · Vision
                    </span>
                    <span className="h-1.5 w-8 rounded-full bg-[#F5A623]" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl leading-snug font-bold text-[#171717] sm:text-3xl">
                    {COMPANY_INFO.vision}
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <ParallaxFrame
                src="/assets/ambilux/editorial/vision-brass-spot.jpg"
                alt="Precision brass architectural spotlight detail"
                aspect="aspect-[4/5]"
                parallaxOffset={20}
                className="h-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Closing Chapter */}
      <section
        data-theme="dark"
        className="relative z-20 overflow-hidden bg-[#171717] py-24 text-[#F7F6F2] lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:px-12">
          <Reveal>
            <p className="font-mono-num text-xs font-medium tracking-widest text-[#F5A623] uppercase">
              Ambient Works Philosophy
            </p>
            <h2 className="mx-auto mt-6 max-w-4xl font-display text-3xl leading-tight font-bold tracking-tight text-[#F7F6F2] sm:text-5xl lg:text-6xl">
              {COMPANY_INFO.manifestoQuote}
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton
                onClick={() => onNavigate('/contact')}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-[#F5A623] px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#F7F6F2]"
              >
                <span>Start a Project Conversation</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-[#F7F6F2] transition-colors hover:border-[#F5A623] hover:text-[#F5A623]"
              >
                <span>Our 4 Core Services</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
