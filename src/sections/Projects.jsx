import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTilt } from '../hooks/useTilt';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header reveal
    gsap.from('.projects__header', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects__header',
        start: 'top 90%',
      }
    });

    // Cards stagger
    gsap.from('.project-card', {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.projects__grid',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  const projectData = [
    {
      title: 'Neon Drift',
      desc: 'High-speed cyberpunk racing experience built with Three.js and custom shaders.',
      tags: ['Three.js', 'GLSL', 'GSAP'],
      img: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Void Engine',
      desc: 'A procedural universe generator using noise algorithms and instanced rendering.',
      tags: ['React', 'R3F', 'WebGL'],
      img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Sakura OS',
      desc: 'Interactive desktop-style portfolio with draggable windows and anime aesthetics.',
      tags: ['Zustand', 'Framer', 'Vite'],
      img: 'https://images.unsplash.com/photo-1578632738980-4331495c4671?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <section id="projects" className="projects" ref={containerRef}>
      <div className="projects__header">
        <p className="projects__label">// SELECTED WORKS</p>
        <h2 className="projects__title font-display">Crafting Modern <span className="text-gradient">Legacies</span></h2>
      </div>

      <div className="projects__grid">
        {projectData.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ title, desc, tags, img }) {
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt(10);

  return (
    <div 
      ref={tiltRef}
      className="project-card glass glow-border-violet"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img src={img} alt={title} className="project-card__image" />
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{desc}</p>
        <div className="project-card__tags">
          {tags.map(tag => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
