import BentoGrid from '../components/BentoGrid';

export default function Work() {
  return (
    <div className="page-work" style={{ paddingTop: '10vh' }}>
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
      
      <section style={{ height: '10vh' }} />
    </div>
  );
}

