import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/hooks.js';
import { CheckIcon, PlayIcon, ResetIcon } from './Icons.jsx';

/* ---------- Landing page: a long page scrolling inside a frame ---------- */
function PageArtifact() {
  return (
    <div className="bench-page">
      <div className="bench-page__chrome mono">
        <span /><span /><span />
        <em>your-brand.com</em>
      </div>
      <div className="bench-page__viewport">
        <div className="bench-page__scroll">
          <div className="bp bp--hero"><i /><i /><i /><b /></div>
          <div className="bp bp--split"><div /><div><i /><i /><i /></div></div>
          <div className="bp bp--band"><i /><i /></div>
          <div className="bp bp--cols"><div /><div /><div /></div>
          <div className="bp bp--quote"><i /><i /></div>
          <div className="bp bp--cta"><i /><b /></div>
          <div className="bp bp--hero"><i /><i /><i /><b /></div>
        </div>
      </div>
      <p className="bench-caption mono">One scroll, one story, one call to action.</p>
    </div>
  );
}

/* ---------- Interface: a working mini scheduler ---------- */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const TIMES = ['09:00', '11:00', '14:00', '16:00'];
const TAKEN = new Set(['Mon-09:00', 'Tue-14:00', 'Wed-11:00', 'Thu-16:00', 'Fri-09:00', 'Fri-14:00']);

function SchedulerArtifact() {
  const [picked, setPicked] = useState('Wed-14:00');
  const [day, time] = picked ? picked.split('-') : [];

  return (
    <div className="sched">
      <div className="sched__grid" role="group" aria-label="Pick a slot">
        <span />
        {DAYS.map((d) => <span key={d} className="sched__day mono">{d}</span>)}
        {TIMES.map((t) => (
          <div key={t} className="sched__row">
            <span className="sched__time mono">{t}</span>
            {DAYS.map((d) => {
              const id = `${d}-${t}`;
              const taken = TAKEN.has(id);
              const on = picked === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`sched__slot ${taken ? 'is-taken' : ''} ${on ? 'is-on' : ''}`}
                  disabled={taken}
                  aria-pressed={on}
                  aria-label={`${d} ${t}${taken ? ', unavailable' : ''}`}
                  onClick={() => setPicked(on ? null : id)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className="bench-caption mono" aria-live="polite">
        {picked ? <>Holding <b>{day} {time}</b>. Click again to release.</> : 'No slot held. Pick one.'}
      </p>
    </div>
  );
}

/* ---------- Automation: a workflow that actually runs ---------- */
const NODES = ['Form submitted', 'Enrich lead', 'Draft reply', 'Notify owner'];

function WorkflowArtifact() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(-1);
  const timer = useRef(null);
  const running = step >= 0 && step < NODES.length;

  useEffect(() => {
    if (!running) return undefined;
    timer.current = window.setTimeout(() => setStep((s) => s + 1), reduced ? 120 : 850);
    return () => window.clearTimeout(timer.current);
  }, [step, running, reduced]);

  const done = step >= NODES.length;

  return (
    <div className="flow">
      <ol className="flow__nodes">
        {NODES.map((n, i) => {
          const state = step > i || done ? 'done' : step === i ? 'running' : 'idle';
          return (
            <li key={n} className={`flow__node is-${state}`}>
              <span className="flow__status" aria-hidden="true">
                {state === 'done' ? <CheckIcon size={12} /> : null}
              </span>
              <span className="flow__name">{n}</span>
              <span className="flow__state mono">{state}</span>
            </li>
          );
        })}
      </ol>
      <div className="flow__foot">
        <button
          type="button"
          className="btn btn--ink btn--sm"
          onClick={() => setStep(done ? -1 : 0)}
          disabled={running}
          aria-busy={running}
        >
          {done ? <><ResetIcon /> Reset</> : running ? 'Running…' : <><PlayIcon /> Run workflow</>}
        </button>
        <p className="bench-caption mono" aria-live="polite">
          {done ? 'Finished: 4 of 4 steps, reply drafted.' : running ? `Step ${step + 1} of 4` : 'Idle. Press run.'}
        </p>
      </div>
    </div>
  );
}

const TABS = [
  {
    id: 'pages',
    label: 'Landing pages',
    title: 'Pages that explain themselves.',
    body: 'Single-scroll sites built around the one action you need a visitor to take, with every section earning its place in the argument.',
    Artifact: PageArtifact,
  },
  {
    id: 'interfaces',
    label: 'Interfaces',
    title: 'Controls that feel considered.',
    body: 'Schedulers, dashboards, and forms with real states: disabled, held, focused, and confirmed. Try the one on the right.',
    Artifact: SchedulerArtifact,
  },
  {
    id: 'automations',
    label: 'Automations',
    title: 'Workflows you can watch run.',
    body: 'Small pipelines that turn a form submission into something useful, shown step by step so nobody has to trust a black box.',
    Artifact: WorkflowArtifact,
  },
];

export default function Workbench() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const onKeyDown = (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (e.key in keys) next = (active + keys[e.key] + TABS.length) % TABS.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const tab = TABS[active];

  return (
    <section id="workbench" className="workbench section section--ink">
      <div className="container">
        <header className="section-head">
          <p className="kicker mono">§03 Workbench</p>
          <h2>Three things a brief <em>usually</em> turns into.</h2>
        </header>

        <div className="bench">
          <div className="bench__tabs" role="tablist" aria-label="Kinds of work" onKeyDown={onKeyDown}>
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                className="bench__tab"
                onClick={() => setActive(i)}
              >
                <span className="mono">0{i + 1}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div
            className="bench__panel"
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            key={tab.id}
          >
            <div className="bench__text">
              <h3>{tab.title}</h3>
              <p>{tab.body}</p>
            </div>
            <div className="bench__artifact">
              <tab.Artifact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
