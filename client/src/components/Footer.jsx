import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { site } from '../data/site.js';

export function Footer() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const formatTime = () => {
      const time = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Africa/Casablanca',
      }).format(new Date());
      setLocalTime(time);
    };

    formatTime();
    const interval = window.setInterval(formatTime, 60000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <a className="brand" href="#home" aria-label={`${site.name} — back to top`}>
              <span className="brand__mark" aria-hidden="true">
                <span>A</span>
                <span>C</span>
              </span>
              <span className="brand__name">{site.name}</span>
            </a>
            <p>
              Full-stack developer building thoughtful products for the web — from Casablanca to
              wherever the work is.
            </p>
          </div>

          <div className="site-footer__columns">
            <nav className="site-footer__nav" aria-label="Footer navigation">
              <span className="site-footer__heading">Explore</span>
              {site.nav.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="site-footer__social">
              <span className="site-footer__heading">Connect</span>
              {site.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ))}
              <a href={`mailto:${site.email}`}>
                <Mail size={14} aria-hidden="true" />
                Email
              </a>
            </div>
          </div>

          <a className="back-to-top" href="#home" aria-label="Back to top">
            <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="site-footer__time">
            <i aria-hidden="true" />
            {site.location} — {localTime} {site.timezone}
          </span>
          <span>Designed &amp; built with care.</span>
        </div>
      </div>
    </footer>
  );
}
