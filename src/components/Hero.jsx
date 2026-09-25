import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import BriefCompiler from './BriefCompiler.jsx';
import { ArrowDownIcon, ArrowRightIcon } from './Icons.jsx';
import { GITHUB_URL } from '../content.js';

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.1 } });
      tl.from('.hero__line > span', { yPercent: 110, stagger: 0.09 })
        .from('.hero__eyebrow, .hero__lede, .hero__actions', { y: 18, opacity: 0, stagger: 0.08, duration: 0.8 }, '-=0.7')
        .from('.compiler', { y: 40, opacity: 0, duration: 1 }, '-=0.9')
        .from('.hero__meta > *', { opacity: 0, stagger: 0.06, duration: 0.6 }, '-=0.6');
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="top" className="hero" ref={root}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow mono">bbobkr / personal site / v0.1</p>
          <h1 className="hero__title">
            <span className="hero__line"><span>Give me one</span></span>
            <span className="hero__line"><span>sentence. I’ll</span></span>
            <span className="hero__line"><span>hand back a</span></span>
            <span className="hero__line"><span><em>working</em> website.</span></span>
          </h1>
          <p className="hero__lede">
            I design and build art-directed landing pages and interfaces for founders and small
            teams. You get the reasoning written down, the code in your repo, and a page that
            could only belong to you.
          </p>
          <div className="hero__actions">
            <a className="btn btn--signal" href="#brief">
              Send a brief <ArrowRightIcon />
            </a>
            <a className="btn btn--line" href="#process">
              Watch a brief become a page <ArrowDownIcon />
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <BriefCompiler />
        </div>
      </div>

      <div className="container">
        <dl className="hero__meta mono">
          <div><dt>Source</dt><dd><a href={GITHUB_URL} rel="noopener">github.com/bbobkr</a></dd></div>
          <div><dt>Stack</dt><dd>React · Vite · GSAP</dd></div>
          <div><dt>Built from</dt><dd>a one-line brief</dd></div>
          <div><dt>Status</dt><dd><span className="dot" aria-hidden="true" />v0.1 test build</dd></div>
        </dl>
      </div>
    </section>
  );
}
