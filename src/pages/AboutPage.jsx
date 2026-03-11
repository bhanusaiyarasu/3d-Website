import About from '../sections/About';

export default function AboutPage() {
  return (
    <div className="page-about" style={{ paddingTop: '10vh' }}>
      <About />
      
      <section className="story-extra" style={{ padding: '0 var(--space-lg)', maxWidth: '800px', margin: '0 auto 10vh auto' }}>
        <h3 className="font-display" style={{ color: 'var(--neon-cyan)', marginBottom: '2rem' }}>THE PHILOSOPHY</h3>
        <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          I believe that the web shouldn't just be functional—it should be an adventure. 
          By combining the precision of modern engineering with the soul of digital art, 
          I strive to create experiences that linger in the mind long after the tab is closed.
        </p>
      </section>
    </div>
  );
}
