import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { site } from '../data/site.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js';

const sectionIds = ['about', 'work', 'stack', 'contact'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`.trim()}>
        <div className="container site-header__inner">
          <a className="brand" href="#home" aria-label={`${site.name} — home`}>
            <span className="brand__mark" aria-hidden="true">
              <span>A</span>
              <span>C</span>
            </span>
            <span className="brand__name">{site.name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {site.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : undefined}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="button button--accent button--small header-cta" href="#contact">
              Let&apos;s talk
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-button"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`.trim()}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div
          ref={drawerRef}
          className="mobile-menu__drawer"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-menu__header">
            <a className="brand" href="#home" onClick={closeMenu}>
              <span className="brand__mark" aria-hidden="true">
                <span>A</span>
                <span>C</span>
              </span>
              <span className="brand__name">{site.name}</span>
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              className="icon-button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <X size={21} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            {site.nav.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
                <span className="mobile-nav__index">0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="mobile-menu__footer">
            <span className="availability">
              <span className="availability__dot" aria-hidden="true" />
              {site.availability}
            </span>
            <a className="mobile-menu__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className="mobile-menu__socials">
              {site.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
