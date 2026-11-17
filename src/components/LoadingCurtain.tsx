import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export default function LoadingCurtain() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReducedMotion);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 700;

    const step = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) {
        raf = requestAnimationFrame(step);
      } else {
        window.setTimeout(() => setVisible(false), 160);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#171717] text-[#F7F6F2]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <img
              src="/assets/ambilux/logo-light.png"
              alt="AmbiLux"
              className="mb-8 h-10 w-auto object-contain sm:h-12"
            />
            <div className="mb-5 flex items-center gap-1.5">
              {['#E52B38', '#F5A623', '#1685C7', '#159447'].map((color, idx) => (
                <motion.span
                  key={color}
                  initial={{ scaleX: 0.2, opacity: 0.3 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 0.5,
                    delay: idx * 0.08,
                  }}
                  style={{ backgroundColor: color }}
                  className="h-1 w-6 origin-left rounded-full"
                />
              ))}
            </div>
            <div className="flex items-center gap-3 font-mono-num text-xs tracking-[0.2em] text-[#A8A6A0]">
              <span>AMBIENT WORKS</span>
              <span aria-hidden="true">·</span>
              <span>{String(progress).padStart(3, '0')}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
