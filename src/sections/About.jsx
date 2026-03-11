import { useEffect, useRef } from 'react';
import { useTilt } from '../hooks/useTilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const { ref: cardRef, handleMouseMove, handleMouseLeave } = useTilt(12);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about__card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        '.about__stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about__stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div
        className="about__card glass glow-border-cyan"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <p className="about__label">// ABOUT ME</p>
        <h2 className="about__heading">
          I build <span className="text-gradient">digital worlds</span> that feel alive
        </h2>
        <p className="about__text">
          A full-stack creative developer with a passion for blending cutting-edge
          technology with stunning visual design. I specialize in interactive 3D web
          experiences, generative art, and immersive UI that pushes the boundaries
          of what's possible in a browser. When I'm not coding, you'll find me
          watching anime or exploring new musical landscapes.
        </p>
        <div className="about__stats">
          <div className="about__stat">
            <div className="about__stat-value text-gradient">5+</div>
            <div className="about__stat-label">Years Experience</div>
          </div>
          <div className="about__stat">
            <div className="about__stat-value text-gradient">50+</div>
            <div className="about__stat-label">Projects Shipped</div>
          </div>
          <div className="about__stat">
            <div className="about__stat-value text-gradient">∞</div>
            <div className="about__stat-label">Curiosity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
