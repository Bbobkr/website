import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import { ORIGINAL_BRIEF } from '../content.js';

const ENTRIES = [
  {
    tag: 'init',
    title: 'Repository created',
    body: 'bbobkr/website, empty. No commits, no package.json, no brand guide.',
  },
  {
    tag: 'brief',
    title: 'Brief received',
    body: `“${ORIGINAL_BRIEF}.” Everything else had to be decided and labelled as decided.`,
  },
  {
    tag: 'direct',
    title: 'Direction written',
    body: 'Concept named “The Open Workbench”. Paper, ink, and one signal colour. Mechanical motion, no scroll-jacking.',
  },
  {
    tag: 'build',
    title: 'Components built',
    body: 'Brief compiler, sticky process stage, scheduler, workflow runner, brief composer. Each one works; none is an illustration.',
  },
  {
    tag: 'push',
    title: 'v0.1 pushed',
    body: 'Committed to claude/exciting-cannon-iiw5ra for review. Next: your real answers to the fifteen questions.',
  },
];

export default function BuildLog() {
  const root = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.log__progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.log__list', start: 'top 70%', end: 'bottom 60%', scrub: 0.4 },
        }
      );
      gsap.utils.toArray('.log__entry').forEach((el) => {
        gsap.from(el, {
          x: -16,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="log" className="log section" ref={root}>
      <div className="container log__grid">
        <header className="section-head log__head">
          <p className="kicker mono">§04 Build log</p>
          <h2>
            No testimonials yet.
            <br />
            <em>Here is the actual record instead.</em>
          </h2>
          <p className="muted">
            This site is new, so it has no clients to quote. What it does have is the full history
            of how it was made, dated 25 September 2026.
          </p>
        </header>

        <div className="log__timeline">
          <span className="log__rail" aria-hidden="true"><span className="log__progress" /></span>
          <ol className="log__list">
          {ENTRIES.map((e, i) => (
            <li key={e.tag} className="log__entry">
              <span className="log__dot" aria-hidden="true" />
              <p className="log__meta mono">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className="log__tag">{e.tag}</span>
              </p>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
