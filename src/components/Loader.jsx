import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [show, setShow] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShow(false);
        onComplete?.();
      },
    });

    tl.to(loaderRef.current, {
      delay: 2.2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    });
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__text">INITIALIZING</div>
      <div className="loader__bar-bg">
        <div className="loader__bar-fill" />
      </div>
    </div>
  );
}
