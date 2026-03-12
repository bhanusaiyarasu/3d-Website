import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    gsap.from('.contact__heading', {
      opacity: 0,
      y: 100,
      rotateX: -15,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.contact__heading', start: 'top 90%' }
    });

    gsap.from('.contact__text', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact__text', start: 'top 90%' }
    });

    gsap.from('.contact__form', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact__form', start: 'top 90%' }
    });

    gsap.from('.contact__social-link', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.contact__socials', start: 'top 95%' }
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const socials = [
    { name: 'GITHUB', href: 'https://github.com' },
    { name: 'LINKEDIN', href: 'https://linkedin.com' },
    { name: 'TWITTER', href: 'https://twitter.com' },
    { name: 'INSTAGRAM', href: 'https://instagram.com' },
  ];

  return (
    <section id="contact" className="contact" ref={containerRef}>
      <div className="contact__label">// READY TO CONNECT?</div>
      
      {/* Availability badge */}
      <div className="contact__availability">
        <span className="contact__availability-dot" />
        <span className="contact__availability-text font-display">AVAILABLE FOR WORK</span>
      </div>

      <h2 className="contact__heading font-display">
        LET'S BUILD THE <br />
        <span className="text-gradient">UNIMAGINABLE</span> TOGETHER.
      </h2>

      <p className="contact__text">
        I'm currently available for freelance opportunities and full-time 
        creative roles. Whether you have a specific project in mind or 
        just want to say hi, my inbox is always open.
      </p>

      {/* Contact form */}
      <form className="contact__form glass" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="contact-name"
            className="form-input"
            placeholder=" "
            value={formState.name}
            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <label htmlFor="contact-name" className="form-label font-display">YOUR NAME</label>
        </div>
        <div className="form-group">
          <input
            type="email"
            id="contact-email"
            className="form-input"
            placeholder=" "
            value={formState.email}
            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <label htmlFor="contact-email" className="form-label font-display">YOUR EMAIL</label>
        </div>
        <div className="form-group">
          <textarea
            id="contact-message"
            className="form-input form-textarea"
            placeholder=" "
            rows={4}
            value={formState.message}
            onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
            required
          />
          <label htmlFor="contact-message" className="form-label font-display">YOUR MESSAGE</label>
        </div>
        <button type="submit" className={`magnetic-btn contact__submit ${sending ? 'sending' : ''} ${sent ? 'sent' : ''}`}>
          {sent ? '✓ SENT!' : sending ? 'SENDING...' : 'SEND MESSAGE →'}
        </button>
      </form>

      <div className="contact__socials">
        {socials.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="contact__social-link">
            {s.name}
          </a>
        ))}
      </div>
    </section>
  );
}
