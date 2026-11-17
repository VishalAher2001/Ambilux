import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  COMPANY_INFO,
  ESTEEMED_CLIENTS,
  EXECUTED_PROJECTS,
  PRODUCT_CATEGORIES,
  SERVICES,
} from '../data/ambiluxData';
import MediaFrame from '../components/MediaFrame';
import {
  MagneticButton,
  ParallaxFrame,
  Reveal,
  StaggerHeading,
  useDocumentMeta,
} from '../components/Reveal';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const prefersReducedMotion = useReducedMotion();

  useDocumentMeta(
    'AmbiLux — Architectural & Customised Lighting Solutions | Ambient Works',
    'Architectural lighting solutions by AmbiLux (Ambient Works) designed to transform commercial, decorative, geometrical, acoustic, and outdoor spaces.'
  );

  const featuredProjects = EXECUTED_PROJECTS.filter((p) =>
    [
      'circular-halo-collaborative-lounge',
      'executive-lounge-angular-suspension',
      'conference-conical-metal-domes',
      'workstation-corridor-linear-array',
    ].includes(p.slug)
  );

  return (
    <div>
      {/* 1. CINEMATIC FULL-SCREEN DARK HERO */}
      <section
        data-theme="dark"
        className="relative flex min-h-screen items-end overflow-hidden bg-[#171717] pt-28 pb-14 text-[#F7F6F2] sm:items-center sm:pt-32 sm:pb-20"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 1.07, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.42 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <img
            src="/assets/ambilux/editorial/services-ring-lounge.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717] via-[#171717]/82 to-[#171717]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-[#171717]/60" />
        </motion.div>

        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center gap-3 text-xs font-medium tracking-widest text-[#F5A623] uppercase"
            >
              <span className="h-[1px] w-8 bg-[#F5A623]" aria-hidden="true" />
              <span>
                {COMPANY_INFO.coverHeadline} · {COMPANY_INFO.coverSubline}
              </span>
            </motion.div>

            <StaggerHeading
              lines={[
                { text: 'Lighting Spaces.' },
                { text: 'Creating Experiences.', accent: true },
              ]}
              className="font-display text-5xl leading-[0.98] font-bold tracking-tight text-[#F7F6F2] sm:text-7xl lg:text-[5.25rem]"
            />

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-base leading-relaxed text-[#D8D6D0] sm:text-lg"
            >
              {COMPANY_INFO.heroSupport}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => onNavigate('/products')}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-[#F5A623] px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#F7F6F2]"
              >
                <span>Explore Products</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </MagneticButton>

              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="group inline-flex items-center gap-2.5 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#F7F6F2] transition-colors hover:border-[#F5A623] hover:text-[#F5A623]"
              >
                <span>Discover Projects</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/12 pt-6 text-xs text-[#A8A6A0]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-mono-num text-[#F7F6F2]">05 Luminaire Series</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num text-[#F7F6F2]">12 Executed Plates</span>
              <span aria-hidden="true">·</span>
              <span>Casambi Bluetooth Tunable Systems</span>
            </div>
            <button
              type="button"
              onClick={() => {
                document.getElementById('home-about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 font-medium text-[#F7F6F2]/80 transition-colors hover:text-[#F5A623]"
            >
              <span>Scroll to explore</span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. ABOUT AMBIENT WORKS EDITORIAL INTRO */}
      <section id="home-about" className="relative z-20 bg-[#F7F6F2] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
                01 · Ambient Works · Led by {COMPANY_INFO.leader}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-[1.12] font-bold tracking-tight text-[#171717] sm:text-5xl">
                Concept to completion, crafted with precision and artistry.
              </h2>
              <blockquote className="mt-6 border-l-2 border-[#F5A623] pl-5 text-base leading-relaxed font-medium text-[#171717] sm:text-lg">
                {COMPANY_INFO.aboutQuote}
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-[#555555] sm:text-base">
                {COMPANY_INFO.aboutParagraphs[0]} {COMPANY_INFO.aboutParagraphs[1]}
              </p>
              <div className="mt-8 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#171717] transition-colors hover:text-[#1685C7]"
                >
                  <span className="border-b border-[#171717]/30 pb-0.5 transition-colors group-hover:border-[#1685C7]">
                    Read our story & leadership
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-12 lg:col-span-6">
            <div className="sm:col-span-7">
              <ParallaxFrame
                src="/assets/ambilux/editorial/about-pendants-hires.jpg"
                alt="Warm architectural pendants framed cleanly across interior timber surfaces"
                aspect="aspect-[4/5]"
                parallaxOffset={24}
                className="rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-between gap-5 sm:col-span-5">
              <ParallaxFrame
                src="/assets/ambilux/editorial/about-fluted-light.jpg"
                alt="Fluted vertical light sculpture on architectural stone"
                aspect="aspect-square"
                parallaxOffset={16}
                className="rounded-xl"
              />
              <Reveal delay={0.12}>
                <div className="rounded-xl border border-[#171717]/10 bg-[#ECEAE3] p-6">
                  <p className="font-mono-num text-xs font-medium text-[#555555] uppercase">
                    Mission
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed font-medium text-[#171717]">
                    {COMPANY_INFO.mission}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LIGHTING CATEGORIES */}
      <section className="relative z-20 border-t border-[#171717]/10 bg-[#ECEAE3] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border-b border-[#171717]/12 pb-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
                  02 · Luminaire Collections
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-5xl">
                  Five architectural product families.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/products')}
                className="group inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#555555]"
              >
                <span>View Full Catalogue</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category, idx) => (
              <Reveal
                key={category.id}
                delay={idx * 0.06}
                className={idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => onNavigate(`/products?category=${category.id}`)}
                  data-cursor="media"
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#171717]/10 bg-[#F7F6F2] text-left transition-colors hover:border-[#171717]/30"
                >
                  <div className="overflow-hidden">
                    <MediaFrame
                      src={category.heroImage}
                      alt={category.name}
                      aspect={idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}
                      imgClassName="group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-num text-xs text-[#555555]">
                          Series {category.num}
                        </span>
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: category.accentColor }}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold text-[#171717]">
                        {category.name}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#555555]">
                        {category.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#171717]/10 pt-4 text-xs font-medium text-[#171717]">
                      <span>{category.subSeries.length} Sub-Series</span>
                      <span className="inline-flex items-center gap-1 font-semibold transition-transform duration-300 group-hover:translate-x-1">
                        Explore Series <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW & CASAMBI BLUETOOTH CALLOUT */}
      <section
        data-theme="dark"
        className="relative z-20 bg-[#171717] py-20 text-[#F7F6F2] lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-mono-num text-xs font-medium tracking-widest text-[#F5A623] uppercase">
                  03 · Technical & Bespoke Services
                </p>
                <h2 className="mt-4 font-display text-3xl leading-[1.1] font-bold tracking-tight text-[#F7F6F2] sm:text-5xl">
                  From photometric planning to site commissioning.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[#A8A6A0] sm:text-base">
                  {COMPANY_INFO.experientialTitle}
                </p>

                <div className="mt-8 rounded-xl border border-white/12 bg-[#222220] p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#F5A623]" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-[#F5A623] uppercase">
                        Wireless Control Integration
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#F7F6F2]">
                        {COMPANY_INFO.casambiNote}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <MagneticButton
                    onClick={() => onNavigate('/services')}
                    className="group inline-flex items-center gap-2.5 rounded-lg bg-[#F7F6F2] px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#F5A623]"
                  >
                    <span>Explore All Services</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {SERVICES.map((service, idx) => (
                <Reveal key={service.id} delay={idx * 0.08}>
                  <div className="group flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#222220] p-6 transition-colors hover:border-white/25">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-num text-xs text-[#A8A6A0]">
                          {service.num}
                        </span>
                        <span
                          className="h-1.5 w-6 rounded-full"
                          style={{ backgroundColor: service.accentHex }}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-4 font-display text-xl font-bold text-[#F7F6F2]">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#A8A6A0]">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-lg">
                      <MediaFrame
                        src={service.image}
                        alt={service.title}
                        aspect="aspect-[16/10]"
                        darkFallback
                        imgClassName="group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELECTED EXECUTED PROJECTS */}
      <section className="relative z-20 bg-[#F7F6F2] py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 border-b border-[#171717]/12 pb-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
                  04 · Executed Projects
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-5xl">
                  Real installations across modern workspaces.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#171717] transition-colors hover:text-[#1685C7]"
              >
                <span className="border-b border-[#171717]/30 pb-0.5">
                  All 12 Executed Plates
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.08}>
                <button
                  type="button"
                  onClick={() => onNavigate(`/projects/${project.slug}`)}
                  className="group block w-full text-left"
                >
                  <ParallaxFrame
                    src={project.heroImage}
                    alt={project.title}
                    aspect="aspect-[16/10]"
                    parallaxOffset={18}
                    cursorView
                    className="rounded-xl"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-mono-num text-xs text-[#555555]">
                        {project.plateNumber} · {project.applicationType}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-bold text-[#171717] transition-colors group-hover:text-[#1685C7]">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#555555] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#171717]"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ESTEEMED CLIENTS MARQUEE & WALL */}
      <section className="relative z-20 overflow-hidden border-t border-[#171717]/10 bg-[#ECEAE3] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
                  05 · Esteemed Clients
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#171717] sm:text-4xl">
                  Trusted by global enterprises & industry leaders.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/clients')}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#171717] hover:text-[#1685C7]"
              >
                <span>View All 16 Clients</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 overflow-hidden border-y border-[#171717]/10 bg-[#F7F6F2] py-8">
          <div className="animate-marquee items-center gap-16 px-8">
            {[...ESTEEMED_CLIENTS, ...ESTEEMED_CLIENTS].map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="flex h-12 w-36 shrink-0 items-center justify-center px-2"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-10 max-w-full object-contain opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
