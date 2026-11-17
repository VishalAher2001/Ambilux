import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export default function StudioCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<'default' | 'interactive' | 'media'>('default');

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 420, damping: 36, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-cursor="media"]')) {
        setMode('media');
      } else if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        setMode('interactive');
      } else {
        setMode('default');
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [prefersReducedMotion, rawX, rawY, visible]);

  if (!enabled || prefersReducedMotion) return null;

  const size = mode === 'media' ? 58 : mode === 'interactive' ? 34 : 14;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none fixed top-0 left-0 z-50 hidden items-center justify-center rounded-full border transition-colors duration-200 lg:flex ${
        mode === 'media'
          ? 'border-[#F5A623] bg-[#171717]/90 text-[#F7F6F2]'
          : mode === 'interactive'
            ? 'border-[#F5A623] bg-[#F5A623]/15'
            : 'border-[#555555]/45 bg-transparent'
      }`}
    >
      {mode === 'media' && (
        <span className="font-mono-num text-[10px] font-medium tracking-wider uppercase">View</span>
      )}
    </motion.div>
  );
}
