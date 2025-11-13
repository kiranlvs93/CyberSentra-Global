import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Academy', path: '/academy' },
  { label: 'Labs', path: '/labs' },
  { label: 'Community', path: '/community' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <header className={`top-nav ${isScrolled ? 'top-nav--scrolled' : ''}`}>
      <div className="container top-nav__inner">
        <Link to="/" className="brand">
          <img src="/logo.svg" alt="CyberSentra Global" className="brand__logo" />
          <div className="brand__text">
            <span className="brand__name">CyberSentra Global</span>
            <span className="brand__tagline">Security • Strategy • Skills</span>
          </div>
        </Link>

        <button
          className="top-nav__toggle"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`top-nav__menu ${isOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `top-nav__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="top-nav__cta"
            href="https://forms.gle/placeholder"
            target="_blank"
            rel="noreferrer"
          >
            Talk to Us
          </a>
        </nav>
      </div>
    </header>
  );
}
