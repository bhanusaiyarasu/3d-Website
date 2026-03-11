import { useRef } from 'react';
import { useTilt } from '../hooks/useTilt';

export default function BentoCard({ 
  title, 
  description, 
  tags, 
  className = '', 
  color = 'var(--neon-cyan)',
  icon = '⟁'
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(10);

  return (
    <div 
      ref={ref}
      className={`bento-card glass ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--card-glow': color,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div 
        className="bento-card__glow"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at center, ${color}11, transparent)`,
          pointerEvents: 'none'
        }}
      />
      
      <div className="bento-card__icon" style={{ 
        position: 'absolute', 
        top: 'var(--space-lg)', 
        right: 'var(--space-lg)', 
        fontSize: '2rem', 
        opacity: 0.2,
        color: color
      }}>
        {icon}
      </div>

      <div className="bento-card__content" style={{ position: 'relative', zIndex: 2 }}>
        <p className="font-display" style={{ fontSize: '0.6rem', color: color, marginBottom: '0.5rem', letterSpacing: '0.2em' }}>
          {tags?.join(' / ')}
        </p>
        <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{description}</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bento-card:hover {
          box-shadow: 0 0 40px -10px var(--card-glow);
          border-color: var(--card-glow);
        }
      `}} />
    </div>
  );
}
