import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = { x: 0, y: 0 };
    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      quickX(pos.x);
      quickY(pos.y);
    };

    const handleMouseEnterInteractive = () => {
      cursor.classList.add('custom-cursor--hover');
    };

    const handleMouseLeaveInteractive = () => {
      cursor.classList.remove('custom-cursor--hover');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Observe DOM for interactive elements
    const addListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, .project-card, .magnetic-btn, .navbar__link, .contact__social-link'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return interactives;
    };

    const interactives = addListeners();

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <div className="cursor__dot" ref={dotRef} />
      <div className="cursor__ring" ref={ringRef} />
    </div>
  );
}
