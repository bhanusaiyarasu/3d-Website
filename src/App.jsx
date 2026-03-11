import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// Hooks
import { useScrollProgress } from './hooks/useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

function ScrollManager() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [pathname]);

  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const scrollProgress = useScrollProgress();

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <ScrollManager />
        <Loader onComplete={() => setLoaded(true)} />
        <Cursor />
        <Navbar />
        <AudioPlayer />

        <div className="canvas-container">
          <Scene scrollProgress={scrollProgress} />
        </div>

        <div className="content-overlay">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>

          <footer className="footer">
            <p>© 2026 — Designed & Coded with ♥ and too much caffeine</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

