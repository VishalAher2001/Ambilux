import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LuminaireSculptureCanvas from './components/LuminaireSculptureCanvas';
import LoadingCurtain from './components/LoadingCurtain';
import StudioCursor from './components/StudioCursor';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';

interface ParsedLocation {
  pathname: string;
  search: string;
}

function getCurrentLocation(): ParsedLocation {
  const pathname = window.location.pathname || '/';
  const search = window.location.search || '';
  return { pathname, search };
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [location, setLocation] = useState<ParsedLocation>(() => getCurrentLocation());

  useEffect(() => {
    const onPopState = () => {
      setLocation(getCurrentLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((rawTarget: string) => {
    const [rawPath, rawQuery] = rawTarget.split('?');
    const pathname = rawPath || '/';
    const search = rawQuery ? `?${rawQuery}` : '';
    const fullUrl = `${pathname}${search}`;

    if (`${window.location.pathname}${window.location.search}` !== fullUrl) {
      window.history.pushState({}, '', fullUrl);
    }
    setLocation({ pathname, search });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || undefined;
  const enquiryParam = searchParams.get('enquiry') || undefined;

  const renderPage = () => {
    const { pathname } = location;

    if (pathname === '/') {
      return <HomePage onNavigate={navigate} />;
    }
    if (pathname === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (pathname === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }
    if (pathname === '/products') {
      return <ProductsPage initialCategory={categoryParam} onNavigate={navigate} />;
    }
    if (pathname.startsWith('/products/')) {
      const productId = decodeURIComponent(pathname.replace('/products/', ''));
      return <ProductDetailPage productId={productId} onNavigate={navigate} />;
    }
    if (pathname === '/projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/projects/')) {
      const slug = decodeURIComponent(pathname.replace('/projects/', ''));
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }
    if (pathname === '/clients') {
      return <ClientsPage onNavigate={navigate} />;
    }
    if (pathname === '/contact') {
      return <ContactPage initialEnquiry={enquiryParam} />;
    }

    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717]">
      <LoadingCurtain />
      <StudioCursor />
      <Navigation currentPath={location.pathname} onNavigate={navigate} />
      <LuminaireSculptureCanvas currentPath={location.pathname} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${location.pathname}${location.search}`}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.994 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: 0.996 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
