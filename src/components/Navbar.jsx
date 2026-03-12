import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';
import ScrollProgress from './ScrollProgress';
import gsap from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overlayRef = useRef(null);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Animate mobile menu links on open
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.navbar__mobile-overlay .navbar__link', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.15 }
      );
    }
  }, [isOpen]);

  return (
    <nav className={`navbar ${isOpen ? 'navbar--open' : ''} ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
        <span className="navbar__logo-icon">⟁</span> PORTFOLIO
      </Link>
      
      {/* Mobile Overlay */}
      <div ref={overlayRef} className={`navbar__mobile-overlay ${isOpen ? 'navbar__mobile-overlay--open' : ''}`}>
        <ul className="navbar__links">
          {links.map((link) => (
            <NavLink 
              key={link.label} 
              {...link}
              isActive={pathname === link.href}
              closeMenu={() => setIsOpen(false)} 
            />
          ))}
        </ul>
      </div>
      
      {/* Hamburger */}
      <button className="navbar__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <div className="hamburger">
          <span className="hamburger__line line-1"></span>
          <span className="hamburger__line line-2"></span>
        </div>
      </button>

      {/* Scroll progress bar */}
      <ScrollProgress />
    </nav>
  );
}

function NavLink({ label, href, isActive, closeMenu }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  return (
    <li className="navbar__item">
      <Link
        ref={ref}
        to={href}
        className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={closeMenu}
      >
        {label}
        {isActive && <span className="navbar__link-dot" />}
      </Link>
    </li>
  );
}
