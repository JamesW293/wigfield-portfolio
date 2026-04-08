import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

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

      {/* Hidden hub gate — intentionally low-contrast */}
      <button
        className="footer__hub-gate"
        onClick={() => navigate('/hub')}
        aria-label="hub"
        tabIndex={-1}
      >
        ·
      </button>
    </footer>
  );
}
