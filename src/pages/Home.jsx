import Hero from '../sections/Hero';
import About from '../sections/About';
import VideoPortal from '../components/VideoPortal';
import BentoGrid from '../components/BentoGrid';
import Contact from '../sections/Contact';
import SmoothMarquee from '../components/SmoothMarquee';

const SHOWCASE_WORDS = ['CREATIVE', 'DEVELOPER', 'DESIGNER', 'DREAMER', 'BUILDER', 'INNOVATOR'];

export default function Home() {
  return (
    <div className="page-home">
      <Hero />
      
      <About />

      {/* Philosophy Section */}
      <section className="philosophy-section" style={{ padding: '0 var(--space-lg)', maxWidth: '800px', margin: '0 auto 4vh auto', textAlign: 'center' }}>
        <h3 className="font-display" style={{ color: 'var(--neon-cyan)', marginBottom: '2rem', letterSpacing: '0.3em', fontSize: '0.8rem' }}>THE PHILOSOPHY</h3>
        <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          I believe that the web shouldn't just be functional—it should be an adventure. 
          By combining the precision of modern engineering with the soul of digital art, 
          I strive to create experiences that linger in the mind long after the tab is closed.
        </p>
      </section>

      {/* Divider marquee */}
      <div style={{ margin: '4vh 0', opacity: 0.4 }}>
        <SmoothMarquee items={SHOWCASE_WORDS} speed="slow" reverse />
      </div>

      <VideoPortal />

      {/* Work Section */}
      <section id="work" style={{ padding: '10vh 0' }}>
        <section className="work-intro" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            SELECTED <span className="text-gradient">WORKS</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A collection of digital artifacts, experimental playgrounds, and 
            high-performance web applications.
          </p>
        </section>
        
        <BentoGrid />
      </section>

      <Contact />
    </div>
  );
}
