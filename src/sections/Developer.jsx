import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedCounter from '../components/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

export default function Developer() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Left column specialty cards entrance
    gsap.from('.specialty-card', {
      opacity: 0,
      x: -50,
      stagger: 0.15,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.developer-grid',
        start: 'top 80%',
      }
    });

    // Center photo container scale & fade entrance
    gsap.from('.developer-photo-container', {
      opacity: 0,
      scale: 0.85,
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.developer-grid',
        start: 'top 80%',
      }
    });

    // Right column header and code frame entrance
    gsap.from('.developer-name-header', {
      opacity: 0,
      x: 50,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.developer-grid',
        start: 'top 80%',
      }
    });

    gsap.from('.developer-code-frame', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.developer-code-frame',
        start: 'top 85%',
      }
    });

    // Quote block and signature entrance
    gsap.from('.developer-quote-block, .developer-signature', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.developer-quote-block',
        start: 'top 85%',
      }
    });

    // Stats bar stagger entrance
    gsap.from('.stat-item', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1.0,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.developer-stats-bar',
        start: 'top 90%',
      }
    });

    // Parallax scroll effect on the photo
    gsap.to('.developer-photo', {
      y: '-8%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.developer-grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Signature line animation
    gsap.from('.signature-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.developer-signature',
        start: 'top 90%',
      }
    });

  }, { scope: containerRef });

  return (
    <section id="developer" className="developer-section" ref={containerRef}>
      {/* ── Outer Layout Grid ── */}
      <div className="developer-grid">
        
        {/* ── Left Column: Specialties & Bio ── */}
        <div className="developer-col developer-col--left">
          <div className="developer-tagline-label font-display">// ABOUT ME</div>
          <h2 className="developer-heading font-display">
            I DESIGN <span className="text-gradient">EXPERIENCES</span>.<br />
            I BUILD <span className="text-gradient">SOLUTIONS</span>.<br />
            I CREATE <span className="text-gradient text-gradient--pink">IMPACT</span>.
          </h2>
          <p className="developer-bio">
            I'm a passionate developer and designer who loves turning ideas into digital products that are not only beautiful but also functional and meaningful.
          </p>

          <div className="developer-specialties">
            {/* Specialty 1 */}
            <div className="specialty-card glass">
              <div className="specialty-card__icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="specialty-card__content">
                <h3 className="specialty-card__title font-display">DEVELOPER</h3>
                <p className="specialty-card__text">Building fast, scalable and efficient web applications.</p>
              </div>
            </div>

            {/* Specialty 2 */}
            <div className="specialty-card glass">
              <div className="specialty-card__icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <div className="specialty-card__content">
                <h3 className="specialty-card__title font-display">DESIGNER</h3>
                <p className="specialty-card__text">Crafting clean, modern and user-focused visual experiences.</p>
              </div>
            </div>

            {/* Specialty 3 */}
            <div className="specialty-card glass">
              <div className="specialty-card__icon">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <div className="specialty-card__content">
                <h3 className="specialty-card__title font-display">PROBLEM SOLVER</h3>
                <p className="specialty-card__text">Solving real-world problems with code and creativity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Center Column: Visual Photo ── */}
        <div className="developer-col developer-col--center">
          <div className="developer-photo-container">
            <div className="developer-photo-smoke" />
            <div className="developer-photo-frame">
              <img src="/bhanusaiyarasu.png" alt="Bhanu Sai Yarasu" className="developer-photo" />
              <div className="developer-photo-overlay" />
            </div>
            <div className="developer-photo-glow" />
          </div>
        </div>

        {/* ── Right Column: Name Header, Code & Signature ── */}
        <div className="developer-col developer-col--right">
          
          <div className="developer-name-header">
            <h1 className="developer-fullname font-display">
              BHANU <br />
              SAI <br />
              <span className="text-gradient">YARASU</span>
            </h1>
            <div className="developer-role-sub font-display">DEVELOPER • DESIGNER • CREATOR</div>
          </div>

          {/* Code Window */}
          <div className="developer-code-frame glass">
            <div className="code-frame-header">
              <div className="code-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <span className="code-frame-title font-display">passion.js</span>
            </div>
            <pre className="code-frame-pre">
              <code>
                <span className="code-keyword">const</span> <span className="code-name">Passion</span> = () =&gt; &#123;{"\n"}
                {"  "}<span className="code-keyword">return</span> [{"\n"}
                {"    "}<span className="code-string">'Code'</span>,{"\n"}
                {"    "}<span className="code-string">'Design'</span>,{"\n"}
                {"    "}<span className="code-string">'Explore'</span>,{"\n"}
                {"    "}<span className="code-string">'Repeat'</span>{"\n"}
                {"  "}]{"\n"}
                &#125;;
              </code>
            </pre>
          </div>

          {/* Quote Block */}
          <div className="developer-quote-block">
            <span className="quote-mark">“</span>
            <p className="quote-text">
              Code is my language, Design is my passion, Innovation is my habit.
            </p>
            <span className="quote-mark-end">”</span>
          </div>

          {/* Signature */}
          <div className="developer-signature">
            <div className="signature-text">Bhanu Sai</div>
            <div className="signature-line" />
          </div>

        </div>

      </div>

      {/* ── Bottom Metrics Grid Bar ── */}
      <div className="developer-stats-bar glass">
        {/* Stat Item 1 */}
        <div className="stat-item">
          <div className="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div className="stat-number font-display">
            <AnimatedCounter target={20} suffix="+" />
          </div>
          <div className="stat-label font-display">Projects Completed</div>
        </div>

        {/* Stat Item 2 */}
        <div className="stat-item">
          <div className="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-number font-display">
            <AnimatedCounter target={10} suffix="+" />
          </div>
          <div className="stat-label font-display">Happy Clients</div>
        </div>

        {/* Stat Item 3 */}
        <div className="stat-item">
          <div className="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div className="stat-number font-display">
            <AnimatedCounter target={2} suffix="+" />
          </div>
          <div className="stat-label font-display">Years of Learning</div>
        </div>

        {/* Stat Item 4 */}
        <div className="stat-item">
          <div className="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"></path>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
          <div className="stat-number font-display">
            <AnimatedCounter target={100} suffix="%" />
          </div>
          <div className="stat-label font-display">Dedication & Passion</div>
        </div>
      </div>

      {/* ── Footer Connection Row ── */}
      <div className="developer-footer-connect">
        <div className="connect-tagline font-display">
          LET'S BUILD SOMETHING <span className="text-gradient">EXTRAORDINARY</span> TOGETHER.
        </div>
        <div className="connect-status">
          <span className="status-dot animate-pulse" />
          <span className="status-text font-display">AVAILABLE FOR FREELANCE</span>
        </div>
        <div className="connect-socials">
          <span className="connect-socials-label font-display">LET'S CONNECT</span>
          <div className="social-icons">
            <a href="https://github.com/bhanusaiyarasu" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/bhanusaiyarasu" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://instagram.com/bhanusaiyarasu" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="mailto:yarasubhanusai@gmail.com" className="social-icon-link" aria-label="Email">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
