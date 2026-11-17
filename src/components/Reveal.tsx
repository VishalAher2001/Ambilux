import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import MediaFrame from './MediaFrame';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  scale?: boolean;
}

export function Reveal({ children, delay = 0, className = '', scale = false }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: scale ? 0.97 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerHeadingProps {
  lines: { text: string; accent?: boolean }[];
  className?: string;
  delay?: number;
  accentColorClass?: string;
}

export function StaggerHeading({
  lines,
  className = '',
  delay = 0.08,
  accentColorClass = 'text-[#F5A623]',
}: StaggerHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h1 className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`inline-block ${line.accent ? accentColorClass : ''}`}
            initial={prefersReducedMotion ? false : { y: '108%', opacity: 0.4 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.95,
              delay: prefersReducedMotion ? 0 : delay + idx * 0.11,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

interface ParallaxFrameProps {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  darkFallback?: boolean;
  parallaxOffset?: number;
  cursorView?: boolean;
  rounded?: boolean;
}

export function ParallaxFrame({
  src,
  alt,
  aspect = 'aspect-[16/10]',
  className = '',
  imgClassName = '',
  darkFallback = false,
  parallaxOffset = 28,
  cursorView = false,
  rounded = true,
}: ParallaxFrameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [parallaxOffset, -parallaxOffset]
  );
  const smoothY = useSpring(rawY, { stiffness: 160, damping: 28, mass: 0.4 });
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.08, 1.03, 1.0]
  );

  const radius = rounded ? 'round 12px' : 'round 0px';

  return (
    <motion.div
      ref={containerRef}
      data-cursor={cursorView ? 'media' : undefined}
      initial={
        prefersReducedMotion
          ? false
          : { clipPath: `inset(6% 0% 6% 0% ${radius})`, opacity: 0.7 }
      }
      whileInView={{ clipPath: `inset(0% 0% 0% 0% ${radius})`, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y: smoothY, scale: rawScale }}
        className="h-full w-full will-change-transform"
      >
        <MediaFrame
          src={src}
          alt={alt}
          aspect={aspect}
          darkFallback={darkFallback}
          className="h-full w-full"
          imgClassName={imgClassName}
        />
      </motion.div>
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 22 });
  const sy = useSpring(my, { stiffness: 300, damping: 22 });

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    mx.set(dx);
    my.set(dy);
  };

  const handleLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={prefersReducedMotion ? undefined : { x: sx, y: sy }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      data-hovered={hovered}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [title, description]);
}
