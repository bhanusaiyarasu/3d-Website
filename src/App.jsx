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
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Split panels slide in from top/bottom
    tl.set([topRef.current, bottomRef.current], { scaleY: 0 })
      .set(textRef.current, { opacity: 0, scale: 0.8 })
      .to(topRef.current, {
        scaleY: 1,
        duration: 0.45,
        ease: 'power4.inOut',
      })
      .to(bottomRef.current, {
        scaleY: 1,
        duration: 0.45,
        ease: 'power4.inOut',
      }, '<0.05')
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(2)',
      }, '-=0.15')
      .call(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      })
      .to(textRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 0.2,
        ease: 'power2.in',
        delay: 0.1
      })
      .to(topRef.current, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power4.inOut',
      })
      .to(bottomRef.current, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power4.inOut',
      }, '<0.05');
  }, [pathname]);

  const panelStyle = {
    position: 'fixed',
    left: 0,
    width: '100%',
    height: '50vh',
    zIndex: 9999,
    pointerEvents: 'none',
    background: 'linear-gradient(180deg, #0a0e1a 0%, #111827 100%)',
  };

  return (
    <>
      <div ref={topRef} style={{ ...panelStyle, top: 0, transformOrigin: 'top', scaleY: 0, borderBottom: '2px solid var(--neon-cyan)', boxShadow: '0 2px 30px rgba(0,240,255,0.3)' }} />
      <div ref={bottomRef} style={{ ...panelStyle, bottom: 0, top: 'auto', transformOrigin: 'bottom', scaleY: 0, borderTop: '2px solid var(--neon-pink)', boxShadow: '0 -2px 30px rgba(255,45,123,0.3)' }} />
      <div ref={textRef} className="font-display" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        pointerEvents: 'none',
        fontSize: 'clamp(1rem, 3vw, 1.8rem)',
        letterSpacing: '0.5em',
        color: 'var(--neon-cyan)',
        textShadow: '0 0 30px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.3)',
        opacity: 0,
      }}>⟁</div>
    </>
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
