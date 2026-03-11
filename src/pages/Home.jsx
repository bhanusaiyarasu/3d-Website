import Hero from '../sections/Hero';
import About from '../sections/About';
import VideoPortal from '../components/VideoPortal';
import BentoGrid from '../components/BentoGrid';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <div className="page-home">
      <Hero />
      
      <About />

      {/* Philosophy Section from AboutPage */}
      <section className="story-extra" style={{ padding: '0 var(--space-lg)', maxWidth: '800px', margin: '0 auto 10vh auto', textAlign: 'center' }}>
        <h3 className="font-display" style={{ color: 'var(--neon-cyan)', marginBottom: '2rem', letterSpacing: '0.3em' }}>THE PHILOSOPHY</h3>
        <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          I believe that the web shouldn't just be functional—it should be an adventure. 
          By combining the precision of modern engineering with the soul of digital art, 
          I strive to create experiences that linger in the mind long after the tab is closed.
        </p>
      </section>

      <VideoPortal />

      {/* Work Section from Work page */}
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

