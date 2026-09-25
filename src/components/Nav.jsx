import { useEffect, useState } from 'react';
import { HANDLE, SECTIONS } from '../content.js';
import { ArrowRightIcon } from './Icons.jsx';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(SECTIONS.findIndex((s) => s.id === entry.target.id));
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const current = SECTIONS[active];

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__mark" href="#top" aria-label={`${HANDLE}, back to top`}>
          <span className="nav__glyph" aria-hidden="true" />
          {HANDLE}
          <span className="nav__slash">/</span>
        </a>

        <p className="nav__section" aria-live="polite">
          <span className="nav__index">§{String(active + 1).padStart(2, '0')}</span>
          <span key={current.id} className="nav__label">{current.label}</span>
          <span className="nav__ticks" aria-hidden="true">
            {SECTIONS.map((s, i) => (
              <span key={s.id} className={i <= active ? 'is-on' : ''} />
            ))}
          </span>
        </p>

        <nav aria-label="Primary">
          <ul className="nav__links">
            <li><a href="#process">Process</a></li>
            <li><a href="#workbench">Workbench</a></li>
            <li><a href="#log">Log</a></li>
          </ul>
        </nav>

        <a className="btn btn--ink btn--sm" href="#brief">
          Send a brief <ArrowRightIcon size={16} />
        </a>
      </div>
    </header>
  );
}
