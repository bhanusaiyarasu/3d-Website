import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset initial states to prevent flash
    gsap.set('.hero__title-word', { y: '110%', opacity: 0 });

    // Initial name reveal
    tl.to('.hero__title-word', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    });

    // Subtitle fade in
    tl.from('.hero__subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.8');

    // Tagline fade in
    tl.from('.hero__tagline', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // Scroll hint bounce
    gsap.from('.hero__scroll-hint', {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  // Glitch effect on hover
  const handleGlitch = (e) => {
    const el = e.currentTarget;
    const word = el.querySelector('.hero__title-word'); // Or the whole thing
    
    gsap.to(el, {
      skewX: () => gsap.utils.random(-3, 3),
      duration: 0.05,
      yoyo: true,
      repeat: 3,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.set(el, { skewX: 0 });
      },
    });
  };

  return (
    <section id="hero" className="hero" ref={containerRef}>
      <div className="hero__subtitle">WELCOME TO THE FUTURE</div>
      <h1 className="hero__title font-display" onMouseEnter={handleGlitch}>
        <span className="hero__title-line">
          <span className="hero__title-word">BHANU</span>
          <span className="hero__title-word" style={{ marginLeft: '1.5rem', color: 'var(--neon-pink)' }}>SAI</span>
        </span>
        <span className="hero__title-line">
          <span className="hero__title-word">YARASU</span>
        </span>
      </h1>
      <p className="hero__tagline">
        Creative Developer & 3D Artist. Crafting immersive digital 
        experiences at the intersection of imagination and code.
      </p>

      <div className="hero__scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
