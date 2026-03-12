import { useRef } from 'react';
import { useTilt } from '../hooks/useTilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedCounter from '../components/AnimatedCounter';
import SmoothMarquee from '../components/SmoothMarquee';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = ['REACT', 'THREE.JS', 'GSAP', 'WEBGL', 'NODE.JS', 'FIGMA', 'BLENDER', 'TYPESCRIPT', 'VITE', 'GLSL'];

const TIMELINE = [
  { year: '2022', title: 'Started Web Dev', desc: 'Dove into HTML, CSS, JavaScript — building day and night.' },
  { year: '2023', title: 'Frontend Engineer', desc: 'Mastered React, animations, and performance optimization.' },
  { year: '2024', title: '3D & Creative Dev', desc: 'Entered the world of Three.js, shaders, and immersive web.' },
  { year: '2025', title: 'Freelance & Beyond', desc: 'Building award-worthy digital experiences for clients worldwide.' },
];

export default function About() {
  const containerRef = useRef(null);
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt(5);

  useGSAP(() => {
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

    // Timeline items stagger
    gsap.from('.timeline__item', {
      opacity: 0,
      x: -50,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about__timeline',
        start: 'top 85%',
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
          {' '}with Code and Art.
        </h2>
        
        <p className="about__text">
          I'm a multidisciplinary developer specializing in high-performance WebGL 
          experiences. My work blends cinematic storytelling with cutting-edge 
          frontend engineering to create websites that don't just work—they inspire.
        </p>

        <div className="about__stats">
          <div className="about__stat">
            <div className="about__stat-value text-gradient">
              <AnimatedCounter target={50} suffix="+" />
            </div>
            <div className="about__stat-label">Projects</div>
          </div>
          <div className="about__stat">
            <div className="about__stat-value text-gradient">
              <AnimatedCounter target={4} suffix="yrs" />
            </div>
            <div className="about__stat-label">Experience</div>
          </div>
          <div className="about__stat">
            <div className="about__stat-value text-gradient">
              <AnimatedCounter target={99} suffix="%" />
            </div>
            <div className="about__stat-label">Passion</div>
          </div>
        </div>
      </div>

      {/* Skill marquee */}
      <div className="about__skills-marquee">
        <SmoothMarquee items={SKILLS} speed="fast" />
      </div>

      {/* Experience timeline */}
      <div className="about__timeline">
        <h3 className="about__timeline-title font-display">
          <span className="text-gradient">JOURNEY</span> SO FAR
        </h3>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline__item">
              <div className="timeline__year font-display">{item.year}</div>
              <div className="timeline__content glass">
                <h4 className="timeline__heading">{item.title}</h4>
                <p className="timeline__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
