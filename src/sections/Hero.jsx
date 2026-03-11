import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });

    // Subtitle fade in
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Title words stagger reveal
    const words = titleRef.current?.querySelectorAll('.hero__title-word');
    if (words) {
      tl.to(
        words,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
        },
        '-=0.4'
      );
    }

    // Tagline fade in
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  // Glitch effect on hover
  const handleGlitch = (e) => {
    const el = e.target;
    el.classList.add('glitching');
    el.setAttribute('data-text', el.textContent);

    gsap.to(el, {
      skewX: () => gsap.utils.random(-3, 3),
      duration: 0.05,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.set(el, { skewX: 0 });
        el.classList.remove('glitching');
      },
    });
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <p className="hero__subtitle" ref={subtitleRef}>
        ✦ Welcome to my universe ✦
      </p>

      <h1 className="hero__title" ref={titleRef} onMouseEnter={handleGlitch}>
        <span className="hero__title-line">
          <span className="hero__title-word text-gradient">CREATIVE</span>
        </span>
        <span className="hero__title-line">
          <span className="hero__title-word text-gradient">DEVELOPER</span>
        </span>
        <span className="hero__title-line">
          <span className="hero__title-word" style={{ color: 'var(--neon-cyan)' }}>
            &amp; DESIGNER
          </span>
        </span>
      </h1>

      <p className="hero__tagline" ref={taglineRef}>
        Crafting immersive digital experiences at the intersection of
        code, art, and imagination.
      </p>

      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
