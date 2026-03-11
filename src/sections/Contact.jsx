import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Heading reveal
    gsap.from('.contact__heading', {
      opacity: 0,
      y: 100,
      rotateX: -15,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact__heading',
        start: 'top 90%',
      }
    });

    // Tagline reveal
    gsap.from('.contact__text', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__text',
        start: 'top 90%',
      }
    });

    // Socials stagger
    gsap.from('.contact__social-link', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__socials',
        start: 'top 95%',
      }
    });
  }, { scope: containerRef });

  return (
    <section id="contact" className="contact" ref={containerRef}>
      <div className="contact__label">// READY TO CONNECT?</div>
      
      <h2 className="contact__heading font-display">
        LET'S BUILD THE <br />
        <span className="text-gradient">UNIMAGINABLE</span> TOGETHER.
      </h2>

      <p className="contact__text">
        I'm currently available for freelance opportunities and full-time 
        creative roles. Whether you have a specific project in mind or 
        just want to say hi, my inbox is always open.
      </p>

      <div style={{ marginTop: '3rem' }}>
        <MagneticButton href="mailto:hello@bhanu.dev">
          GET IN TOUCH
        </MagneticButton>
      </div>

      <div className="contact__socials">
        {['GITHUB', 'LINKEDIN', 'TWITTER', 'INSTAGRAM'].map(platform => (
          <a key={platform} href="#" className="contact__social-link">
            {platform}
          </a>
        ))}
      </div>
    </section>
  );
}
