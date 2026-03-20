import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const [label, setLabel] = useState('');
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const smoothRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isHover = useRef(false);
  const isClick = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Trail history (stores last N cursor positions)
    const trail = [];
    const maxTrail = 35;

    // Click ripples
    const ripples = [];

    // Orbiting dots
    const orbitCount = 6;

    let frame = 0;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleClick = (e) => {
      isClick.current = true;
      // Add ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 80 + Math.random() * 40,
        alpha: 1,
        hue: 180 + Math.random() * 160,
        lineWidth: 3,
      });
      setTimeout(() => { isClick.current = false; }, 150);
    };

    const handleMouseEnterInteractive = (e) => {
      isHover.current = true;
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
      isHover.current = false;
      cursor.classList.remove('custom-cursor--hover');
      setLabel('');
    };

    // Main animation loop
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Smooth follow
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.15;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.15;
      const sx = smoothRef.current.x;
      const sy = smoothRef.current.y;

      // Position the DOM cursor element
      gsap.set(cursor, { x: sx, y: sy });

      // Store trail point
      trail.push({ x: sx, y: sy, time: frame });
      if (trail.length > maxTrail) trail.shift();

      // ─── DRAW RAINBOW COMET TRAIL ───
      if (trail.length > 2) {
        for (let i = 1; i < trail.length; i++) {
          const t = i / trail.length; // 0→1
          const prev = trail[i - 1];
          const curr = trail[i];

          // Rainbow hue shifting along the trail
          const hue = (frame * 2 + i * 10) % 360;
          const alpha = t * 0.5;
          const lineW = t * 4;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
          ctx.lineWidth = lineW;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Glow layer
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha * 0.3})`;
          ctx.lineWidth = lineW * 3;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      // ─── DRAW ORBITING DOTS ───
      const hoverScale = isHover.current ? 1.8 : 1;
      const orbitRadius = (isHover.current ? 30 : 18) * hoverScale;

      for (let i = 0; i < orbitCount; i++) {
        const angle = (frame * 0.03) + (i / orbitCount) * Math.PI * 2;
        const ox = sx + Math.cos(angle) * orbitRadius;
        const oy = sy + Math.sin(angle) * orbitRadius;
        const dotSize = isHover.current ? 3 : 2;
        const hue = (i / orbitCount) * 360;

        // Dot
        ctx.beginPath();
        ctx.arc(ox, oy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.9)`;
        ctx.fill();

        // Dot glow
        ctx.beginPath();
        ctx.arc(ox, oy, dotSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.15)`;
        ctx.fill();

        // Connection line to center
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ─── DRAW CROSSHAIR ───
      const crossSize = isHover.current ? 14 : 8;
      const crossAlpha = isHover.current ? 0.6 : 0.35;
      const rotation = frame * 0.02;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rotation);

      // Crosshair lines
      const crossColor = isHover.current ? 'rgba(255, 45, 123,' : 'rgba(0, 240, 255,';
      [-1, 1].forEach(dir => {
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(dir * 4, 0);
        ctx.lineTo(dir * crossSize, 0);
        ctx.strokeStyle = `${crossColor} ${crossAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Vertical
        ctx.beginPath();
        ctx.moveTo(0, dir * 4);
        ctx.lineTo(0, dir * crossSize);
        ctx.strokeStyle = `${crossColor} ${crossAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Corner brackets
      const bracketSize = isHover.current ? 10 : 6;
      const bracketOffset = isHover.current ? 18 : 12;
      const bracketAlpha = isHover.current ? 0.5 : 0.25;

      [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(dx * bracketOffset, dy * (bracketOffset + bracketSize));
        ctx.lineTo(dx * bracketOffset, dy * bracketOffset);
        ctx.lineTo(dx * (bracketOffset + bracketSize), dy * bracketOffset);
        ctx.strokeStyle = `rgba(0, 240, 255, ${bracketAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.restore();

      // ─── DRAW CENTER DOT ───
      const centerPulse = 2 + Math.sin(frame * 0.08) * 1;
      const centerGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, centerPulse * 4);
      centerGrad.addColorStop(0, isHover.current ? 'rgba(255, 45, 123, 0.9)' : 'rgba(0, 240, 255, 0.9)');
      centerGrad.addColorStop(0.5, isHover.current ? 'rgba(255, 45, 123, 0.2)' : 'rgba(0, 240, 255, 0.2)');
      centerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(sx, sy, centerPulse * 4, 0, Math.PI * 2);
      ctx.fillStyle = centerGrad;
      ctx.fill();

      // Bright center
      ctx.beginPath();
      ctx.arc(sx, sy, centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // ─── DRAW CLICK RIPPLES ───
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.08;
        r.alpha -= 0.02;
        r.lineWidth *= 0.97;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Outer ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue}, 100%, 65%, ${r.alpha})`;
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue + 40}, 100%, 65%, ${r.alpha * 0.5})`;
        ctx.lineWidth = r.lineWidth * 0.5;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
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
      window.removeEventListener('click', handleClick);
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
        ref={canvasRef}
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
      <div className="custom-cursor" ref={cursorRef} style={{ display: 'none' }}>
        {/* All visuals drawn on canvas now */}
      </div>
      {label && (
        <div className="cursor-label-float font-display" style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '0.55rem',
          letterSpacing: '0.15em',
          color: 'var(--neon-cyan)',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
          left: mouseRef.current?.x || 0,
          top: (mouseRef.current?.y || 0) + 30,
          transform: 'translateX(-50%)',
        }}>
          {label}
        </div>
      )}
    </>
  );
}
