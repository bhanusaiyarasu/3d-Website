import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import SmoothMarquee from '../components/SmoothMarquee';

const TECH_STACK = ['THREE.JS', 'REACT', 'GSAP', 'WEBGL', 'GLSL', 'VITE', 'R3F', 'FIGMA', 'BLENDER', 'NODE.JS'];

const FLOATING_BADGES = [
  { label: 'WebGL', x: '12%', y: '20%', delay: 0 },
  { label: 'Three.js', x: '80%', y: '15%', delay: 0.4 },
  { label: 'React', x: '8%', y: '70%', delay: 0.8 },
  { label: 'GSAP', x: '85%', y: '65%', delay: 1.2 },
  { label: 'GLSL', x: '18%', y: '45%', delay: 1.6 },
  { label: 'R3F', x: '78%', y: '40%', delay: 2.0 },
];

function Typewriter({ texts, speed = 80, pause = 2000 }) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return (
    <span>
      {display}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const badgesRef = useRef([]);

  // Mouse parallax for floating badges
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      badgesRef.current.forEach((badge, i) => {
        if (!badge) return;
        const factor = (i + 1) * 8;
        gsap.to(badge, {
          x: -x * factor,
          y: -y * factor,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      // Parallax orbs
      document.querySelectorAll('.hero__orb').forEach((orb, i) => {
        const factor = (i + 1) * 15;
        gsap.to(orb, {
          x: x * factor,
          y: y * factor,
          duration: 1.2,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set('.hero__title-word', { y: '110%', opacity: 0 });
    gsap.set('.hero__badge', { scale: 0, opacity: 0 });

    // Title reveal
    tl.to('.hero__title-word', {
      y: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.3
    });

    // Subtitle fade
    tl.from('.hero__subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.9');

    // Tagline
    tl.from('.hero__tagline', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // CTA button
    tl.from('.hero__cta', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    // Floating badges
    tl.to('.hero__badge', {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(2)'
    }, '-=0.6');

    // Scroll hint
    gsap.from('.hero__scroll-hint', {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 2.5,
      ease: 'power3.out'
    });

    // Floating badges continuous animation
    gsap.utils.toArray('.hero__badge').forEach((badge, i) => {
      gsap.to(badge, {
        y: '+=15',
        duration: 2 + i * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
      });
    });
  }, { scope: containerRef });

  const handleGlitch = (e) => {
    const el = e.currentTarget;
    gsap.to(el, {
      skewX: () => gsap.utils.random(-4, 4),
      duration: 0.04,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
      onComplete: () => gsap.set(el, { skewX: 0 }),
    });
  };

  // Magnetic ripple CTA
  const handleCtaMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCtaMouseLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <section id="hero" className="hero" ref={containerRef}>
      {/* Holographic scan-line overlay */}
      <div className="hero__scanlines" />
      
      {/* Animated gradient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Floating tech badges with parallax */}
      {FLOATING_BADGES.map((badge, i) => (
        <div
          key={badge.label}
          ref={el => badgesRef.current[i] = el}
          className="hero__badge glass"
          style={{ left: badge.x, top: badge.y }}
        >
          {badge.label}
        </div>
      ))}

      <div className="hero__subtitle">WELCOME TO THE FUTURE</div>
      <h1 className="hero__title font-display" onMouseEnter={handleGlitch}>
        <span className="hero__title-line">
          <span className="hero__title-word hero__title-word--shimmer">BHANU</span>
          <span className="hero__title-word hero__title-word--shimmer" style={{ marginLeft: '1.5rem', color: 'var(--neon-pink)' }}>SAI</span>
        </span>
        <span className="hero__title-line">
          <span className="hero__title-word hero__title-word--shimmer">YARASU</span>
        </span>
      </h1>
      <p className="hero__tagline">
        <Typewriter
          texts={[
            'Creative Developer & 3D Artist.',
            'Crafting immersive digital experiences.',
            'Where imagination meets code.',
            'Building the future of the web.',
          ]}
          speed={60}
          pause={2500}
        />
      </p>

      {/* CTA Button with magnetic effect */}
      <div className="hero__cta" style={{ marginTop: '2rem' }}>
        <Link
          to="/work"
          className="magnetic-btn hero__cta-btn"
          onMouseMove={handleCtaMouseMove}
          onMouseLeave={handleCtaMouseLeave}
        >
          <span>EXPLORE WORK</span>
          <span className="hero__cta-arrow">→</span>
        </Link>
      </div>

      {/* Tech-stack marquee */}
      <div className="hero__marquee">
        <SmoothMarquee items={TECH_STACK} speed="normal" />
      </div>

      <div className="hero__scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
