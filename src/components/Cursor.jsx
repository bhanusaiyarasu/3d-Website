import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const ctx = trail.getContext('2d');
    trail.width = window.innerWidth;
    trail.height = window.innerHeight;

    const pos = { x: 0, y: 0 };
    const trailPoints = [];
    const maxTrailPoints = 25;

    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power2.out' });
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      quickX(pos.x);
      quickY(pos.y);

      // Add trail point
      trailPoints.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailPoints.length > maxTrailPoints) trailPoints.shift();
    };

    const handleMouseEnterInteractive = (e) => {
      cursor.classList.add('custom-cursor--hover');
      const el = e.currentTarget;
      if (el.tagName === 'A' || el.classList.contains('navbar__link')) {
        setLabel('VIEW');
      } else if (el.tagName === 'BUTTON' || el.classList.contains('magnetic-btn')) {
        setLabel('CLICK');
      } else if (el.classList.contains('project-card') || el.classList.contains('bento-card')) {
        setLabel('EXPLORE');
      } else {
        setLabel('');
      }
    };

    const handleMouseLeaveInteractive = () => {
      cursor.classList.remove('custom-cursor--hover');
      setLabel('');
    };

    // Draw trail
    const drawTrail = () => {
      ctx.clearRect(0, 0, trail.width, trail.height);
      for (let i = 0; i < trailPoints.length; i++) {
        const p = trailPoints[i];
        p.alpha -= 0.04;
        if (p.alpha <= 0) continue;
        const size = (i / trailPoints.length) * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha * 0.4})`;
        ctx.fill();
      }
      // Remove dead points
      while (trailPoints.length > 0 && trailPoints[0].alpha <= 0) {
        trailPoints.shift();
      }
      requestAnimationFrame(drawTrail);
    };

    const animId = requestAnimationFrame(drawTrail);

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      trail.width = window.innerWidth;
      trail.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, .project-card, .magnetic-btn, .navbar__link, .contact__social-link, .bento-card'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      return interactives;
    };

    const interactives = addListeners();

    const observer = new MutationObserver(() => addListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={trailRef}
        className="cursor-trail-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      />
      <div className="custom-cursor" ref={cursorRef}>
        <div className="cursor__dot" ref={dotRef} />
        <div className="cursor__ring" ref={ringRef} />
        {label && <div className="cursor__label font-display">{label}</div>}
      </div>
    </>
  );
}
