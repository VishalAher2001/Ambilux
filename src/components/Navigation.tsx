import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS } from '../data/ambiluxData';
import MediaFrame from './MediaFrame';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkSurface, setDarkSurface] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredDest, setHoveredDest] = useState(
    () => NAV_ITEMS.find((p) => p.path === currentPath) || NAV_ITEMS[0]
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const matched = NAV_ITEMS.find((p) => currentPath === p.path || (p.path !== '/' && currentPath.startsWith(p.path)));
    if (matched) setHoveredDest(matched);
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const checkHeaderState = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const probeY = 32;
      const darkEls = document.querySelectorAll('[data-theme="dark"]');
      let overDark = false;
      darkEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          overDark = true;
        }
      });
      setDarkSurface(overDark);
    };

    window.addEventListener('scroll', checkHeaderState, { passive: true });
    window.addEventListener('resize', checkHeaderState);
    const timer = window.setTimeout(checkHeaderState, 60);
    checkHeaderState();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', checkHeaderState);
      window.removeEventListener('resize', checkHeaderState);
    };
  }, [currentPath]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = (path: string) => {
    setMenuOpen(false);
    onNavigate(path);
  };

  const isLightHeader = !menuOpen && !darkSurface;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          menuOpen
            ? 'text-[#F7F6F2]'
            : darkSurface
              ? scrolled
                ? 'border-b border-white/10 bg-[#171717]/92 text-[#F7F6F2]'
                : 'bg-gradient-to-b from-[#171717]/75 to-transparent text-[#F7F6F2]'
              : 'border-b border-[#171717]/10 bg-[#F7F6F2]/94 text-[#171717]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Uploaded Official AmbiLux Logo */}
          <button
            type="button"
            onClick={() => handleLinkClick('/')}
            className="flex shrink-0 items-center whitespace-nowrap focus-visible:rounded"
            aria-label="AmbiLux Home"
          >
            <img
              src={isLightHeader ? '/assets/ambilux/logo-dark.png' : '/assets/ambilux/logo-light.png'}
              alt="AmbiLux"
              className="h-7 w-auto object-contain transition-opacity duration-200 sm:h-8"
            />
          </button>

          {/* Zone 2: Primary Multipage Links */}
          <nav
            className="hidden items-center gap-6 xl:gap-8 lg:flex"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active =
                item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleLinkClick(item.path)}
                  className={`group relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? isLightHeader
                        ? 'text-[#171717] font-semibold'
                        : 'text-[#F5A623] font-semibold'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute right-0 -bottom-0.5 left-0 h-[2px] origin-left transition-transform duration-300 ease-out ${
                      isLightHeader ? 'bg-[#171717]' : 'bg-[#F5A623]'
                    } ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Animated Hamburger Menu Button (Mobile & Quick Overview) */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`inline-flex h-10 min-w-[44px] items-center justify-center gap-2.5 rounded-lg border px-3.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                menuOpen
                  ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
                  : isLightHeader
                    ? 'border-[#171717]/15 text-[#171717] hover:bg-[#171717]/5'
                    : 'border-white/20 text-[#F7F6F2] hover:bg-white/10'
              }`}
            >
              <span className="relative flex h-3 w-4 flex-col justify-between" aria-hidden="true">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-[1.5px] w-full origin-center bg-current"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-[1.5px] w-full origin-center bg-current"
                />
              </span>
              <span className="lg:hidden">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="hidden lg:inline">{menuOpen ? 'Close' : 'Index'}</span>
            </button>
          </div>
        </div>

        {/* Scroll Progress Hairline Indicator */}
        {!menuOpen && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="h-[2px] w-full origin-left bg-[#F5A623]"
          />
        )}
      </header>

      {/* Full-Screen Animated Hamburger Directory Curtain */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation directory"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 overflow-y-auto bg-[#171717] pt-24 pb-12 text-[#F7F6F2]"
          >
            <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
              <div className="lg:col-span-7">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="mb-6 text-xs font-medium tracking-wider text-[#A8A6A0] uppercase"
                >
                  AmbiLux · Architectural Lighting Directory
                </motion.p>
                <div className="grid gap-x-8 gap-y-1">
                  {NAV_ITEMS.map((page, idx) => {
                    const isActive =
                      page.path === '/' ? currentPath === '/' : currentPath.startsWith(page.path);
                    return (
                      <motion.button
                        key={page.path}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 + 0.04 * idx,
                          duration: 0.48,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onMouseEnter={() => setHoveredDest(page)}
                        onFocus={() => setHoveredDest(page)}
                        onClick={() => handleLinkClick(page.path)}
                        className={`group flex items-baseline justify-between border-b border-white/10 py-4 text-left transition-colors ${
                          isActive ? 'text-[#F5A623]' : 'text-[#F7F6F2] hover:text-[#F5A623]'
                        }`}
                      >
                        <div className="flex items-baseline gap-5 transition-transform duration-300 group-hover:translate-x-2">
                          <span className="font-mono-num text-xs text-[#A8A6A0] transition-colors group-hover:text-[#F5A623]">
                            {page.num}
                          </span>
                          <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                            {page.label}
                          </span>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 opacity-40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-12">
                <div>
                  <p className="mb-3 font-mono-num text-xs text-[#A8A6A0]">
                    {hoveredDest.num} · Selected Page
                  </p>
                  <div className="overflow-hidden rounded-lg border border-white/10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={hoveredDest.path}
                        initial={{ opacity: 0.35, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.35 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <MediaFrame
                          src={hoveredDest.previewImage}
                          alt={hoveredDest.label}
                          aspect="aspect-[16/10]"
                          darkFallback
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#F7F6F2]">
                    {hoveredDest.label}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#A8A6A0]">
                    {hoveredDest.tagline}
                  </p>
                </div>

                <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-[#A8A6A0]">Ambient Works</p>
                    <p className="mt-1.5 text-sm font-medium text-[#F7F6F2]">
                      Malad (W), Mumbai-400064
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A8A6A0]">Direct Enquiries</p>
                    <a
                      href={COMPANY_INFO.contact.emailHref}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5A623] hover:underline"
                    >
                      {COMPANY_INFO.contact.email}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
