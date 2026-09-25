import { GITHUB_URL, HANDLE } from '../content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row mono">
          <p>Built from a one-line brief · v0.1 · 2026</p>
          <ul>
            <li><a href={GITHUB_URL} rel="noopener">GitHub</a></li>
            <li><a href="#top">Back to top ↑</a></li>
          </ul>
        </div>
        <p className="footer__mark" aria-hidden="true">{HANDLE}<span>/</span></p>
      </div>
    </footer>
  );
}
