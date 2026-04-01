export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <button
          className="footer__brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <span className="text-cyan">&lt;</span>JW<span className="text-cyan">&nbsp;/&gt;</span>
        </button>

        <p className="footer__copy">
          Designed &amp; built by James Wigfield · {new Date().getFullYear()}
        </p>

        <p className="footer__sub">Made with React + ♥ in Perth, Australia</p>
      </div>
    </footer>
  );
}
