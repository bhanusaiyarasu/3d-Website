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
      <Link to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>⟁ PORTFOLIO</Link>
      
      {/* Hamburger Toggle */}
      <button className="navbar__toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <div className="hamburger">
          <span className="hamburger__line line-1"></span>
          <span className="hamburger__line line-2"></span>
        </div>
      </button>

      <ul className="navbar__links">
        {links.map((link) => (
          <NavLink 
            key={link.label} 
            {...link} 
            isHome={pathname === '/'}
            closeMenu={() => setIsOpen(false)} 
          />
        ))}
      </ul>
    </nav>
  );
}

function NavLink({ label, href, id, isHome, closeMenu }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  const navigate = useNavigate();

  const handleClick = (e) => {
    closeMenu();
    if (isHome && id) {
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <li className="navbar__item">
      <Link
        ref={ref}
        to={href}
        className="navbar__link"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {label}
      </Link>
    </li>
  );
}



