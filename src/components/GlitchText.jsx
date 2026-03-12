import { useRef } from 'react';
import gsap from 'gsap';

export default function GlitchText({ children, className = '', tag: Tag = 'span' }) {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      skewX: () => gsap.utils.random(-4, 4),
      duration: 0.04,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
      onComplete: () => gsap.set(ref.current, { skewX: 0 }),
    });
  };

  return (
    <Tag
      ref={ref}
      className={`glitch-text ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </Tag>
  );
}
