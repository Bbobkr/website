import { useInView } from '../lib/hooks.js';

const REFUSED = [
  'Purple gradients',
  'Glowing AI orbs',
  'Invented testimonials',
  'Counters that count nothing',
  'Three identical cards',
];

export default function Principles() {
  const [ref, inView] = useInView({ threshold: 0.35, once: true });

  return (
    <section id="principles" className="principles section">
      <div className="container">
        <header className="section-head section-head--split">
          <p className="kicker mono">§05 Principles</p>
          <h2>What you won’t find on a page I build.</h2>
        </header>

        <ul ref={ref} className={`refused ${inView ? 'is-in' : ''}`}>
          {REFUSED.map((r, i) => (
            <li key={r} style={{ '--i': i }}>
              <span className="refused__num mono">✕ 0{i + 1}</span>
              <span className="refused__text">{r}</span>
            </li>
          ))}
        </ul>

        <p className="principles__instead">
          In their place: <em>things that work.</em> A scheduler you can click, a workflow you can run,
          a log you can check. If a section can’t show something real, it doesn’t ship.
        </p>
      </div>
    </section>
  );
}
