import { useEffect, useState } from 'react';
import { usePrefersReducedMotion, useInView } from '../lib/hooks.js';
import { ORIGINAL_BRIEF } from '../content.js';

const CONTEXT = [
  ['handle', 'bbobkr'],
  ['repo', 'bbobkr/website'],
  ['state', 'empty, 0 commits'],
  ['stack', 'vite + react + gsap'],
];

const BLOCKS = ['nav', 'hero', 'process', 'workbench', 'footer'];

const TYPE_END = ORIGINAL_BRIEF.length;
const CONTEXT_END = TYPE_END + CONTEXT.length;
const BLOCKS_END = CONTEXT_END + BLOCKS.length;
const LAST = BLOCKS_END + 1;

function delayFor(tick) {
  if (tick < TYPE_END) return 42;
  if (tick === TYPE_END) return 520;
  if (tick < BLOCKS_END) return 380;
  if (tick === BLOCKS_END) return 420;
  return 3600;
}

export default function BriefCompiler() {
  const reduced = usePrefersReducedMotion();
  const [ref, visible] = useInView({ threshold: 0.1 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced || !visible) return undefined;
    const id = window.setTimeout(
      () => setTick((t) => (t >= LAST ? 0 : t + 1)),
      delayFor(tick)
    );
    return () => window.clearTimeout(id);
  }, [tick, reduced, visible]);

  const t = reduced ? LAST : tick;
  const typed = ORIGINAL_BRIEF.slice(0, Math.min(t, TYPE_END));
  const ctxShown = Math.max(0, Math.min(t - TYPE_END, CONTEXT.length));
  const blocksShown = Math.max(0, Math.min(t - CONTEXT_END, BLOCKS.length));
  const shipped = t >= LAST;
  const stage = shipped ? 'shipped' : blocksShown > 0 ? 'building' : ctxShown > 0 ? 'resolving' : 'reading';

  return (
    <figure
      ref={ref}
      className="compiler"
      aria-label="Animated diagram: the one-line brief for this site is read, resolved against known context, and assembled into page sections."
    >
      <div className="compiler__bar">
        <span>sheet 01 / brief-compiler</span>
        <span className={`compiler__stage is-${stage}`}>{stage}</span>
      </div>

      <div className="compiler__body" aria-hidden="true">
        <div className="compiler__col">
          <p className="compiler__label">Input</p>
          <p className="compiler__brief">
            “{typed}
            <span className={`caret ${t < TYPE_END ? 'is-typing' : ''}`} />”
          </p>

          <p className="compiler__label">Resolved from context</p>
          <dl className="compiler__ctx">
            {CONTEXT.map(([k, v], i) => (
              <div key={k} className={i < ctxShown ? 'is-in' : ''}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="compiler__col compiler__col--out">
          <p className="compiler__label">Output</p>
          <div className="wire">
            {BLOCKS.map((b, i) => (
              <div key={b} className={`wire__block wire__block--${b} ${i < blocksShown ? 'is-in' : ''}`}>
                <span>{b}</span>
              </div>
            ))}
            <div className={`stamp ${shipped ? 'is-in' : ''}`}>
              pushed
              <small>2026·09·25</small>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
