import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navLinks = ['Labs', 'Studio', 'Openings', 'Shop'];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <span className="font-heading text-[21px] sm:text-[26px] tracking-tight text-white">
              Mainframe(R)
            </span>
            <span className="asterisk text-[25px] sm:text-[30px] text-white select-none">✳︎</span>
          </a>

          {/* Desktop nav */}
          <div className="desktop-nav hidden md:flex items-center gap-0 text-[23px] text-white">
            {navLinks.map((link, index) => (
              <React.Fragment key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:opacity-60 transition-opacity"
                >
                  {link}
                </a>
                {index < navLinks.length - 1 && <span className="px-2">,</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="desktop-cta hidden md:block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`hamburger-btn md:hidden ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        {navLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
        <a
          href="#contact"
          className="underline underline-offset-2"
        >
          Get in touch
        </a>
      </div>
    </>
  );
};
