import { useMagnetic } from '../hooks/useMagnetic';

export default function MagneticButton({ children, onClick, href, className = '' }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.35);

  const Tag = href ? 'a' : 'button';
  const extraProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: href.startsWith('http') ? 'noopener noreferrer' : undefined } : {};

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...extraProps}
    >
      <span className="magnetic-btn__text">{children}</span>
      <span className="magnetic-btn__shine" />
    </Tag>
  );
}
