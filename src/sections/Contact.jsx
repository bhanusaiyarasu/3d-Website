import { useEffect, useRef } from 'react';
import MagneticButton from '../components/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact__heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.contact__text',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.contact__social-link',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact__socials',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <p className="contact__label">// GET IN TOUCH</p>
      <h2 className="contact__heading">
        Let's create<br />
        <span className="text-gradient">something epic</span>
      </h2>
      <p className="contact__text">
        Have a project in mind? Want to collaborate on the next big thing?
        I'm always open to new adventures. Let's make it happen.
      </p>
      <MagneticButton onClick={() => window.open('mailto:hello@example.com')}>
        SAY HELLO ↗
      </MagneticButton>
      <div className="contact__socials">
        <a href="https://github.com" className="contact__social-link" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://twitter.com" className="contact__social-link" target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a href="https://linkedin.com" className="contact__social-link" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://dribbble.com" className="contact__social-link" target="_blank" rel="noreferrer">
          Dribbble
        </a>
      </div>
    </section>
  );
}
