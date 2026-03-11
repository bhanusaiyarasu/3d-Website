import { useEffect, useRef } from 'react';
import { useTilt } from '../hooks/useTilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'NEON DRIFT',
    desc: 'A WebGL racing game set in a cyberpunk city with real-time ray-traced reflections and procedural track generation.',
    tags: ['Three.js', 'WebGL', 'GLSL'],
    color: '#00f0ff',
  },
  {
    title: 'SAKURA OS',
    desc: 'An anime-inspired operating system UI concept with fully interactive desktop, file manager, and music player.',
    tags: ['React', 'Framer Motion', 'Zustand'],
    color: '#ffb7c5',
  },
  {
    title: 'VOID ENGINE',
    desc: 'A custom 3D game engine built from scratch with entity-component system, physics, and shader graph editor.',
    tags: ['Rust', 'WGPU', 'ECS'],
    color: '#a855f7',
  },
  {
    title: 'PULSE NETWORK',
    desc: 'Real-time collaborative music creation platform with spatial audio, live MIDI sync, and AI-assisted composition.',
    tags: ['Web Audio', 'WebRTC', 'Node.js'],
    color: '#ff2d7b',
  },
];

function ProjectCard({ project, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(18);

  return (
    <div
      className="project-card glass"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-glow': project.color }}
    >
      <div
        className="project-card__image"
        style={{
          background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          color: project.color,
          textShadow: `0 0 30px ${project.color}66`,
          letterSpacing: '0.1em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title" style={{ color: project.color }}>
          {project.title}
        </h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span className="project-card__tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 80, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__header">
        <p className="projects__label">// SELECTED WORK</p>
        <h2 className="projects__title text-gradient">Featured Projects</h2>
      </div>
      <div className="projects__grid">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
