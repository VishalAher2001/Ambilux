import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS, PRODUCT_CATEGORIES } from '../data/ambiluxData';
import { MagneticButton, Reveal } from './Reveal';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      data-theme="dark"
      className="relative z-20 border-t border-white/10 bg-[#171717] text-[#F7F6F2]"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Top Conversion Band */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wider text-[#F5A623] uppercase">
                Customised Lighting · {COMPANY_INFO.legalName}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F7F6F2] sm:text-5xl">
                Illuminate your architectural vision from concept to completion.
              </h2>
            </div>
            <MagneticButton
              onClick={() => onNavigate('/contact')}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-[#F7F6F2] px-6 py-3.5 text-sm font-semibold text-[#171717] whitespace-nowrap transition-colors hover:bg-[#F5A623]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </MagneticButton>
          </div>
        </Reveal>

        {/* Directory Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              aria-label="AmbiLux Home"
              className="focus-visible:rounded"
            >
              <img
                src="/assets/ambilux/logo-light.png"
                alt="AmbiLux"
                className="h-8 w-auto object-contain"
              />
            </button>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#A8A6A0]">
              {COMPANY_INFO.heroSupport}
            </p>
            <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1 w-5 rounded-full bg-[#E52B38]" />
              <span className="h-1 w-5 rounded-full bg-[#F5A623]" />
              <span className="h-1 w-5 rounded-full bg-[#1685C7]" />
              <span className="h-1 w-5 rounded-full bg-[#159447]" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#A8A6A0] uppercase">
              Pages
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              {NAV_ITEMS.map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.path)}
                    className="group relative inline-block text-[#F7F6F2]/85 transition-colors hover:text-[#F5A623]"
                  >
                    {link.label}
                    <span className="absolute right-0 -bottom-0.5 left-0 h-[1px] origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#A8A6A0] uppercase">
              Product Series
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm font-medium">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/products?category=${cat.id}`)}
                    className="group relative inline-block text-[#F7F6F2]/85 transition-colors hover:text-[#F5A623]"
                  >
                    {cat.name}
                    <span className="absolute right-0 -bottom-0.5 left-0 h-[1px] origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-[#A8A6A0] uppercase">
              Ambient Works · Studio
            </h3>
            <div className="mt-4 space-y-3 text-sm text-[#A8A6A0]">
              <p className="leading-relaxed text-[#F7F6F2]/90">{COMPANY_INFO.contact.address}</p>
              <p>
                <a
                  href={COMPANY_INFO.contact.phoneHref}
                  className="font-mono-num text-[#F7F6F2] hover:text-[#F5A623]"
                >
                  {COMPANY_INFO.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={COMPANY_INFO.contact.emailHref}
                  className="text-[#F7F6F2] hover:text-[#F5A623]"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </p>
              <p className="font-mono-num text-xs text-[#A8A6A0]">
                {COMPANY_INFO.contact.website} · {COMPANY_INFO.contact.gst}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#A8A6A0] sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.brand} ({COMPANY_INFO.legalName}). All rights
            reserved.
          </p>
          <p>{COMPANY_INFO.contact.website}</p>
        </div>
      </div>
    </footer>
  );
}
