import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Delayed completion to ensure smooth transition
        setTimeout(onComplete, 500);
      }
    });

    // Bar fill
    tl.to('.loader__bar-fill', {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut'
    });

    // Logo reveal
    tl.from('.loader__text', {
      opacity: 0,
      letterSpacing: '1em',
      duration: 1,
      ease: 'power3.out'
    }, '-=1.5');

    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <div className="loader" ref={containerRef}>
      <div className="loader__text font-display">BHANU SAI</div>
      <div className="loader__bar-bg">
        <div className="loader__bar-fill" />
      </div>
    </div>
  );
}
