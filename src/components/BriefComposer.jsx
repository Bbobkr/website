import { useId, useState } from 'react';
import { GITHUB_URL } from '../content.js';
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, CopyIcon } from './Icons.jsx';

const GOALS = ['Get leads', 'Sell a product', 'Collect signups', 'Show my work'];
const TIMELINES = ['This month', 'Next 1–3 months', 'Just exploring'];

function formatBrief({ name, what, goal, timeline }) {
  return [
    `Brand: ${name}`,
    `What it does: ${what}`,
    `Main goal: ${goal}`,
    `Timeline: ${timeline}`,
  ].join('\n');
}

export default function BriefComposer() {
  const uid = useId();
  const [form, setForm] = useState({ name: '', what: '', goal: GOALS[0], timeline: TIMELINES[1] });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | composing | ready
  const [copied, setCopied] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    if (status === 'ready') setStatus('idle');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Give it a name, even a working one.';
    if (form.what.trim().length < 12) next.what = 'One sentence, at least a few words.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${uid}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setStatus('composing');
    setCopied(false);
    window.setTimeout(() => setStatus('ready'), 700);
  };

  const brief = formatBrief(form);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="brief" className="composer section section--signal">
      <div className="container composer__grid">
        <header className="composer__head">
          <p className="kicker mono">§06 Send a brief</p>
          <h2>
            Your turn.
            <br />
            <em>One sentence is enough.</em>
          </h2>
          <p>
            Fill in the four lines below. The composer turns them into a brief you can paste into
            an issue or message. There’s no form backend yet, so nothing is sent anywhere
            automatically.
          </p>
        </header>

        <form className="composer__form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor={`${uid}-name`}>Brand or project name</label>
            <input
              id={`${uid}-name`}
              value={form.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              autoComplete="organization"
            />
            {errors.name && <p id={`${uid}-name-err`} className="field__err">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor={`${uid}-what`}>What does it do?</label>
            <textarea
              id={`${uid}-what`}
              rows={3}
              value={form.what}
              onChange={update('what')}
              aria-invalid={Boolean(errors.what)}
              aria-describedby={errors.what ? `${uid}-what-err` : undefined}
            />
            {errors.what && <p id={`${uid}-what-err`} className="field__err">{errors.what}</p>}
          </div>

          <fieldset className="field">
            <legend>Main goal</legend>
            <div className="choices">
              {GOALS.map((g) => (
                <label key={g} className="choice">
                  <input type="radio" name={`${uid}-goal`} value={g} checked={form.goal === g} onChange={update('goal')} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor={`${uid}-timeline`}>Timeline</label>
            <select id={`${uid}-timeline`} value={form.timeline} onChange={update('timeline')}>
              {TIMELINES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn--ink btn--block" disabled={status === 'composing'} aria-busy={status === 'composing'}>
            {status === 'composing' ? <><span className="spinner" aria-hidden="true" /> Composing…</> : <>Compose my brief <ArrowRightIcon /></>}
          </button>

          <div className="composer__out" aria-live="polite">
            {status === 'ready' && (
              <div className="ticket">
                <p className="ticket__head mono"><CheckIcon size={14} /> Brief ready</p>
                <pre className="mono">{brief}</pre>
                <div className="ticket__actions">
                  <button type="button" className="btn btn--line btn--sm" onClick={copy}>
                    {copied ? <><CheckIcon size={14} /> Copied</> : <><CopyIcon size={14} /> Copy brief</>}
                  </button>
                  <a className="btn btn--line btn--sm" href={GITHUB_URL} rel="noopener">
                    Open GitHub profile <ArrowUpRightIcon size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
