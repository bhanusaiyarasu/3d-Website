import BentoCard from './BentoCard';

export default function BentoGrid() {
  const projects = [
    {
      title: 'SRI MARUTHI AQUA WORLD',
      description: 'Full-stack aqua business e-commerce platform and integrated ERP administration suite for operational management.',
      tags: ['REACT', 'NODE.JS', 'ERP', 'FULL-STACK'],
      color: 'var(--neon-cyan)',
      icon: '💧',
      demoUrl: '#',
      repoUrl: 'https://github.com/bhanusaiyarasu'
    },
    {
      title: 'AI IMAGE-TO-SKETCH APP',
      description: 'AI-powered image processing application integrating deep learning models to convert images into detailed artistic sketches.',
      tags: ['REACT', 'PYTHON', 'DEEP LEARNING'],
      color: 'var(--neon-pink)',
      icon: '🎨',
      demoUrl: '#',
      repoUrl: 'https://github.com/bhanusaiyarasu'
    },
    {
      title: 'HUSK & HARBOUR',
      description: 'Modern, high-performance e-commerce website with fluid layout and custom animations.',
      tags: ['REACT', 'E-COMMERCE', 'CSS'],
      color: 'var(--violet)',
      icon: '🛒',
      demoUrl: '#',
      repoUrl: 'https://github.com/bhanusaiyarasu'
    },
    {
      title: 'CLIENT DESIGNER PORTFOLIO',
      description: 'Bespoke portfolio website built for a designer client, highlighting custom animations and high-fidelity visuals.',
      tags: ['GSAP', 'PORTFOLIO', 'INTERACTIVE'],
      color: 'var(--gold)',
      icon: '✨',
      demoUrl: '#',
      repoUrl: 'https://github.com/bhanusaiyarasu'
    },
    {
      title: 'VELORIXIS 3D',
      description: 'Immersive anime-inspired cyberpunk 3D portfolio featuring interactive WebGL/Three.js environments and smooth scroll rigs.',
      tags: ['THREE.JS', 'REACT', 'GSAP', 'WEBGL'],
      color: 'var(--neon-cyan)',
      icon: '⟁',
      demoUrl: '/',
      repoUrl: 'https://github.com/bhanusaiyarasu/3d-Website'
    }
  ];

  return (
    <div className="bento-grid-container">
      <div className="bento-item-1">
        <BentoCard {...projects[0]} />
      </div>
      <div className="bento-item-2">
        <BentoCard {...projects[1]} />
      </div>
      <div className="bento-item-3">
        <BentoCard {...projects[2]} />
      </div>
      <div className="bento-item-4">
        <BentoCard {...projects[3]} />
      </div>
      <div className="bento-item-5">
        <BentoCard {...projects[4]} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bento-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: 1.5rem;
          maxWidth: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        .bento-item-1 { grid-column: span 2; grid-row: span 2; }
        .bento-item-2 { grid-column: span 2; grid-row: span 1; }
        .bento-item-3 { grid-column: span 1; grid-row: span 1; }
        .bento-item-4 { grid-column: span 1; grid-row: span 1; }
        .bento-item-5 { grid-column: span 4; grid-row: span 1; }

        @media (max-width: 900px) {
          .bento-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-item-1 { grid-column: span 2 !important; grid-row: span 2 !important; }
          .bento-item-2 { grid-column: span 2 !important; }
          .bento-item-3 { grid-column: span 1 !important; }
          .bento-item-4 { grid-column: span 1 !important; }
          .bento-item-5 { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .bento-grid-container {
            grid-template-columns: 1fr !important;
          }
          .bento-grid-container > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}} />
    </div>
  );
}
