import { useState, useEffect } from 'react';

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = NAV_LINKS.map((l) => l.toLowerCase());
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <button
            className="navbar__logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Go to top"
          >
            <span className="navbar__logo-bracket">&lt;</span>
            JW
            <span className="navbar__logo-bracket">&nbsp;/&gt;</span>
          </button>

          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  className={`navbar__link${activeSection === link.toLowerCase() ? ' navbar__link--active' : ''}`}
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__inner">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              className="mobile-menu__link"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => scrollTo(link)}
            >
              <span className="mobile-menu__num">0{i + 1}.</span>
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
