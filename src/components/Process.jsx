import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap.js';
import { BuildArtifact, DirectArtifact, DiscoverArtifact, VerifyArtifact } from './ProcessArtifacts.jsx';

const STEPS = [
  {
    key: 'discover',
    title: 'Discover',
    lede: 'Fifteen questions, asked once.',
    body: 'Name, goal, audience, colour, references, stack. Whatever you leave blank, I decide and label as decided. Nothing gets invented and passed off as fact.',
    Artifact: DiscoverArtifact,
  },
  {
    key: 'direct',
    title: 'Direct',
    lede: 'A concept with a name, before any code.',
    body: 'Palette in HEX, type roles, shape and motion rules, section order. One page you can argue with, so disagreements happen in words and not in pull requests.',
    Artifact: DirectArtifact,
  },
  {
    key: 'build',
    title: 'Build',
    lede: 'Components, not a template.',
    body: 'Every section gets a working artifact instead of an icon and a claim. Motion is registered, scoped, and cleaned up. It stops entirely when your OS asks it to.',
    Artifact: BuildArtifact,
  },
  {
    key: 'verify',
    title: 'Verify',
    lede: 'Checked before it is pushed.',
    body: 'Contrast, focus states, reduced motion, overflow at phone width, a clean production build. Then it lands on your branch with a commit message a human can read.',
    Artifact: VerifyArtifact,
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const triggers = stepRefs.current.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive) return;
          setActive(i);
          setFurthest((f) => Math.max(f, i));
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="process" className="process section">
      <div className="container">
        <header className="section-head section-head--split">
          <p className="kicker mono">§02 Process</p>
          <h2>
            This page went from one sentence to a pushed commit in four steps.{' '}
            <em>Yours takes the same four.</em>
          </h2>
        </header>

        <div className="process__grid">
          <ol className="process__steps">
            {STEPS.map((s, i) => (
              <li
                key={s.key}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`step ${i === active ? 'is-active' : ''} ${i <= furthest ? 'is-reached' : ''}`}
              >
                <span className="step__num mono">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p className="step__lede">{s.lede}</p>
                <p className="step__body">{s.body}</p>
                <div className="step__inline">
                  <s.Artifact />
                </div>
              </li>
            ))}
          </ol>

          <div className="process__stage" aria-hidden="true">
            <div className="stage">
              <div className="stage__rail">
                {STEPS.map((s, i) => (
                  <span key={s.key} className={i <= active ? 'is-on' : ''}>
                    {s.title}
                  </span>
                ))}
              </div>
              <div className="stage__frames">
                {STEPS.map((s, i) => (
                  <div key={s.key} className={`stage__frame ${i === active ? 'is-active' : ''}`}>
                    <s.Artifact />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
