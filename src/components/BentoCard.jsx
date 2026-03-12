import { useRef } from 'react';
import gsap from 'gsap';
import { useTilt } from '../hooks/useTilt';

export default function BentoCard({ title, description, tags, color, icon }) {
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt(12);
  const shineRef = useRef(null);

  const handleMouse = (e) => {
    handleMouseMove(e);
    // Position shine effect
    if (shineRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      shineRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    }
  };

  const handleLeave = (e) => {
    handleMouseLeave(e);
    if (shineRef.current) {
      shineRef.current.style.background = 'transparent';
    }
  };

  return (
    <div
      ref={tiltRef}
      className="bento-card glass"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ '--card-accent': color }}
    >
      {/* Shine glare overlay */}
      <div ref={shineRef} className="bento-card__shine" />
      
      <div className="bento-card__icon">{icon}</div>
      <h3 className="bento-card__title font-display" style={{ color }}>{title}</h3>
      <p className="bento-card__desc">{description}</p>
      <div className="bento-card__tags">
        {tags.map(tag => (
          <span key={tag} className="bento-card__tag" style={{ borderColor: `${color}33`, color }}>{tag}</span>
        ))}
      </div>
      <div className="bento-card__actions">
        <a href="#" className="bento-card__action" style={{ color }}>
          LIVE DEMO <span>→</span>
        </a>
        <a href="#" className="bento-card__action" style={{ color }}>
          GITHUB <span>→</span>
        </a>
      </div>
      <div className="bento-card__border-glow" style={{ boxShadow: `0 0 20px ${color}33, 0 0 60px ${color}11` }} />
    </div>
  );
}
