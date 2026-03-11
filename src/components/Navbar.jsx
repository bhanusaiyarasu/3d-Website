import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Navbar() {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">⟁ PORTFOLIO</Link>
      <ul className="navbar__links">
        {links.map((link) => (
          <NavLink key={link.label} {...link} />
        ))}
      </ul>
    </nav>
  );
}

function NavLink({ label, href }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  return (
    <li>
      <Link
        ref={ref}
        to={href}
        className="navbar__link"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {label}
      </Link>
    </li>
  );
}

