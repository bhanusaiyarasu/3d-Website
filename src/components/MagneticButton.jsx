import { useMagnetic } from '../hooks/useMagnetic';

export default function MagneticButton({ children, onClick, className = '' }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.35);

  return (
    <button
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
