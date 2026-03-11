import { useRef } from 'react';
import { useTilt } from '../hooks/useTilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt(5);

  useGSAP(() => {
    // Card reveal
    gsap.from('.about__card', {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.about__card',
        start: 'top 85%',
      }
    });

    // Stats stagger
    gsap.from('.about__stat', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.about__stats',
        start: 'top 90%',
      }
    });
  }, { scope: containerRef });

  return (
    <section id="about" className="about" ref={containerRef}>
      <div 
        ref={tiltRef}
        className="about__card glass"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="about__label">THE ARCHITECT</div>
        <h2 className="about__heading font-display">
          Building Digital <span className="text-gradient">Worlds</span> 
          with Code and Art.
        </h2>
        
        <p className="about__text">
          I'm a multidisciplinary developer specializing in high-performance WebGL 
          experiences. My work blends cinematic storytelling with cutting-edge 
          frontend engineering to create websites that don't just work—they inspire.
        </p>

        <div className="about__stats">
          <div className="about__stat">
            <div className="about__stat-value text-gradient">50+</div>
            <div className="about__stat-label">Projects</div>
          </div>
          <div className="about__stat">
            <div className="about__stat-value text-gradient">4yrs</div>
            <div className="about__stat-label">Exp</div>
          </div>
          <div className="about__stat">
            <div className="about__stat-value text-gradient">99%</div>
            <div className="about__stat-label">Vibe</div>
          </div>
        </div>
      </div>
    </section>
  );
}
