import BentoCard from './BentoCard';

export default function BentoGrid() {
  const projects = [
    {
      title: 'NEON DRIFT',
      description: 'A WebGL racing game set in a cyberpunk city with real-time reflections.',
      tags: ['THREE.JS', 'WEBGL'],
      color: 'var(--neon-cyan)',
      className: 'bento-1',
      icon: '⚡'
    },
    {
      title: 'SAKURA OS',
      description: 'Anime-inspired operating system UI concept.',
      tags: ['REACT', 'GSAP'],
      color: 'var(--neon-pink)',
      className: 'bento-2',
      icon: '🌸'
    },
    {
      title: 'VOID ENGINE',
      description: 'Custom 3D game engine built from scratch.',
      tags: ['RUST', 'WGPU'],
      color: 'var(--violet)',
      className: 'bento-3',
      icon: '⟁'
    },
    {
      title: 'PULSE',
      description: 'Real-time collaborative music platform.',
      tags: ['WEBRTC', 'AUDIO'],
      color: 'var(--gold)',
      className: 'bento-4',
      icon: '〰'
    },
  ];

  return (
    <div className="bento-grid-container" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridAutoRows: 'minmax(200px, auto)',
      gap: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
        <BentoCard {...projects[0]} />
      </div>
      <div style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
        <BentoCard {...projects[1]} />
      </div>
      <div style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        <BentoCard {...projects[2]} />
      </div>
      <div style={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
        <BentoCard {...projects[3]} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .bento-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
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
