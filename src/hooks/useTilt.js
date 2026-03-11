import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export function useTilt(maxTilt = 15) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: x * maxTilt,
      rotateX: -y * maxTilt,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
