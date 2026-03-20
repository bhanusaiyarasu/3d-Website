import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useGSAP(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      }
    });

    // Glitch counter 0% → 100%
    tl.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val) + '%';
        }
      }
    });

    // Logo text reveal with letter spacing
    tl.from('.loader__name', {
      opacity: 0,
      letterSpacing: '1.5em',
      duration: 1.2,
      ease: 'power3.out'
    }, '-=2');

    // Glitch flicker on the counter
    tl.to('.loader__counter', {
      keyframes: [
        { opacity: 0.3, x: -3, duration: 0.05 },
        { opacity: 1, x: 2, duration: 0.05 },
        { opacity: 0.5, x: -1, duration: 0.05 },
        { opacity: 1, x: 0, duration: 0.05 },
      ],
    }, '-=0.5');

    // Scanning line sweep
    tl.from('.loader__scanline', {
      top: '-5%',
      duration: 1.5,
      ease: 'none',
      repeat: 1,
    }, 0);

    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.15
    });
  }, { scope: containerRef });

  return (
    <div className="loader" ref={containerRef}>
      <div className="loader__scanline" />
      <div className="loader__counter font-display" ref={counterRef}>0%</div>
      <div className="loader__name font-display">BHANU SAI</div>
      <div className="loader__tagline">INITIALIZING EXPERIENCE...</div>
      <div className="loader__border-pulse" />
    </div>
  );
}
