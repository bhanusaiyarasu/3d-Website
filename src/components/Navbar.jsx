import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work', id: 'work' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${isOpen ? 'navbar--open' : ''}`}>
      <Link to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
        ⟁ PORTFOLIO
      </Link>
      
      {/* Mobile Overlay Background - Reset blend mode here */}
      <div className={`navbar__mobile-overlay ${isOpen ? 'navbar__mobile-overlay--open' : ''}`}>
        <ul className="navbar__links">
          {links.map((link) => (
            <NavLink 
              key={link.label} 
              {...link} 
              closeMenu={() => setIsOpen(false)} 
            />
          ))}
        </ul>
      </div>
      
      {/* Hamburger Toggle - Stays on top */}
      <button className="navbar__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <div className="hamburger">
          <span className="hamburger__line line-1"></span>
          <span className="hamburger__line line-2"></span>
        </div>
      </button>
    </nav>
  );
}

function NavLink({ label, href, closeMenu }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  return (
    <li className="navbar__item">
      <Link
        ref={ref}
        to={href}
        className="navbar__link"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={closeMenu}
      >
        {label}
      </Link>
    </li>
  );
}




