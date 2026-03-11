import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoPortal() {
  const containerRef = useRef(null);
  const portalRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Expand circle on scroll
      gsap.fromTo(
        portalRef.current,
        {
          clipPath: 'circle(15% at 50% 50%)',
        },
        {
          clipPath: 'circle(75% at 50% 50%)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          }
        }
      );

      // Parallax text inside
      gsap.fromTo(
        textRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1.2,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="video-portal-wrapper" ref={containerRef}>
      <div className="video-portal-sticky">
        <div 
          ref={portalRef}
          className="video-portal-mask" 
        >
          <div 
            ref={videoRef}
            className="video-content"
          >
            {/* Grain/Noise Overlay */}
            <div className="portal-grain-overlay" />

            <h2 
              ref={textRef}
              className="font-display portal-title" 
            >
              IMMERSE
            </h2>
            <div className="portal-divider" />
          </div>
        </div>
        
        {/* Background content revealed as portal expands */}
        <div className="portal-bg-content">
          <h3 className="font-display portal-bg-title">
            THE NEW REALITY
          </h3>
        </div>
      </div>
    </div>
  );
}


