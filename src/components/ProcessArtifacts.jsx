import { CheckIcon } from './Icons.jsx';

const QUESTIONS = [
  ['Name', 'bbobkr', 'known'],
  ['What it does', 'builds websites', 'decided'],
  ['Goal', 'receive briefs', 'decided'],
  ['Audience', 'founders, small teams', 'decided'],
  ['Primary colour', 'signal vermilion', 'decided'],
  ['References', 'none given', 'open'],
  ['Stack', 'vite + react', 'known'],
  ['Copy', 'written from context', 'decided'],
];

export function DiscoverArtifact() {
  return (
    <div className="art art--discover">
      <p className="art__head mono">15 questions · 8 shown</p>
      <ul>
        {QUESTIONS.map(([q, a, s], i) => (
          <li key={q} style={{ '--i': i }}>
            <span className="art__q">{q}</span>
            <span className="art__a">{a}</span>
            <span className={`tag tag--${s}`}>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SWATCHES = [
  ['Paper', '#F3F0E8', 'ink'],
  ['Ink', '#17160F', 'paper'],
  ['Signal', '#E4491C', 'ink'],
  ['Blueprint', '#1E3A5C', 'paper'],
  ['Ochre', '#D9A21B', 'ink'],
  ['Pass', '#2F7D4F', 'paper'],
];

export function DirectArtifact() {
  return (
    <div className="art art--direct">
      <p className="art__head mono">concept: the open workbench</p>
      <div className="swatches">
        {SWATCHES.map(([name, hex, fg], i) => (
          <div key={hex} className={`swatch swatch--${fg}`} style={{ '--c': hex, '--i': i }}>
            <span>{name}</span>
            <code>{hex}</code>
          </div>
        ))}
      </div>
      <div className="specimen">
        <span className="specimen__display">Aa</span>
        <span className="specimen__editorial">Aa</span>
        <span className="specimen__mono">Aa</span>
        <span className="specimen__names mono">Bricolage · Newsreader · JetBrains</span>
      </div>
    </div>
  );
}

const CODE = [
  ['src/', 'dir'],
  ['  components/', 'dir'],
  ['    Hero.jsx', 'file'],
  ['    BriefCompiler.jsx', 'file'],
  ['    Process.jsx', 'file'],
  ['    Workbench.jsx', 'file'],
  ['  lib/gsap.js', 'file'],
  ['  styles.css', 'file'],
];

export function BuildArtifact() {
  return (
    <div className="art art--build">
      <p className="art__head mono">tree + diff</p>
      <div className="build">
        <ul className="build__tree mono">
          {CODE.map(([line, kind], i) => (
            <li key={line} className={`is-${kind}`} style={{ '--i': i }}>{line}</li>
          ))}
        </ul>
        <pre className="build__code mono">
          <code>
            <span style={{ '--i': 0 }}><b>gsap</b>.registerPlugin(ScrollTrigger);</span>
            <span className="blank" style={{ '--i': 1 }} />
            <span style={{ '--i': 2 }}><i>const</i> mm = <b>gsap</b>.matchMedia(root);</span>
            <span style={{ '--i': 3 }}>mm.add(<s>'(prefers-reduced-motion:</s></span>
            <span style={{ '--i': 4 }}>  <s>no-preference)'</s>, () =&gt; {'{'}</span>
            <span style={{ '--i': 5 }}>  <em>// motion only when welcome</em></span>
            <span style={{ '--i': 6 }}>{'}'});</span>
            <span style={{ '--i': 7 }}><i>return</i> () =&gt; mm.revert();</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

const CHECKS = [
  'Text contrast ≥ 4.5 : 1',
  'prefers-reduced-motion respected',
  'Visible keyboard focus',
  'No horizontal overflow at 360px',
  'Production build passes',
];

export function VerifyArtifact() {
  return (
    <div className="art art--verify">
      <p className="art__head mono">pre-push checklist</p>
      <ol>
        {CHECKS.map((c, i) => (
          <li key={c} style={{ '--i': i }}>
            <span className="verify__box"><CheckIcon size={14} /></span>
            {c}
          </li>
        ))}
      </ol>
      <p className="verify__result mono" style={{ '--i': CHECKS.length }}>
        5 / 5 passing → git push
      </p>
    </div>
  );
}
