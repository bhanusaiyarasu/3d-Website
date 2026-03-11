import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Components
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import AudioPlayer from './components/AudioPlayer';

// Canvas
import Scene from './canvas/Scene';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

// Global ref for scroll progress to prevent React re-renders on every scroll tick
const scrollState = {
  progress: 0,
  lenis: null
};

function PageTransition() {
  const { pathname } = useLocation();
  const overlayRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Fade out/in sequence
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      }
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.1
    });
  }, [pathname]);

  return (
    <div 
      ref={overlayRef} 
      className="page-transition-overlay" 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-deep)',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0
      }}
    />
  );
}

function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    scrollState.lenis = lenis;

    lenis.on('scroll', (e) => {
      scrollState.progress = e.progress;
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      scrollState.lenis = null;
    };
  }, [pathname]);

  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <ScrollManager />
        <PageTransition />
        <Loader onComplete={() => setLoaded(true)} />
        <Cursor />
        <Navbar />
        <AudioPlayer />

        <div className="canvas-container">
          <Scene scrollState={scrollState} />
        </div>

        <div className="content-overlay">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>

          <footer className="footer" style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="font-display" style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
              © 2026 — BHANU SAI — BUILT FOR THE FUTURE
            </p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export { scrollState };
