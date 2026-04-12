import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// ── Module metadata registry — mirrors Hub.jsx MODULES array ─────
const MODULE_META = {
  cits5508: {
    code: 'CITS5508',
    title: 'Machine Learning',
    color: 'cyan',
    semester: 'Sem 2, 2025',
  },
  cits4404: {
    code: 'CITS4404',
    title: 'AI & Adaptive Systems',
    color: 'violet',
    semester: 'Sem 1, 2025',
  },
};

export default function UniversityModule() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const meta = MODULE_META[moduleId] ?? {
    code: moduleId?.toUpperCase(),
    title: 'Unknown Module',
    color: 'cyan',
    semester: '—',
  };

  useEffect(() => {
    document.title = `${meta.code} · Learning Hub`;
    return () => { document.title = 'James Wigfield'; };
  }, [meta.code]);

  const colorMap = {
    cyan: { accent: 'var(--cyan)', dim: 'var(--cyan-dim)' },
    violet: { accent: 'var(--violet)', dim: 'var(--violet-dim)' },
    emerald: { accent: 'var(--emerald)', dim: 'var(--emerald-dim)' },
    rose: { accent: 'var(--rose)', dim: 'var(--rose-dim)' },
    amber: { accent: 'var(--amber)', dim: 'var(--amber-dim)' },
  };
  const c = colorMap[meta.color] ?? colorMap.cyan;

  return (
    <div className="umod" style={{ '--mod-accent': c.accent, '--mod-dim': c.dim }}>
      <div className="umod__inner">

        {/* Nav bar */}
        <nav className="umod__nav">
          <button className="umod__back" onClick={() => navigate('/hub')}>
            &larr; Back to Hub
          </button>
          <span className="umod__breadcrumb">
            Hub &nbsp;/&nbsp; <span style={{ color: 'var(--mod-accent)' }}>{meta.code}</span>
          </span>
        </nav>

        {/* Header */}
        <header className="umod__header">
          <p className="umod__code">{meta.code} · {meta.semester}</p>
          <h1 className="umod__title">{meta.title}</h1>
          <div className="umod__divider" />
        </header>

        {/* Content area — replace the placeholder below with module content */}
        <main className="umod__content">
          <div className="umod__placeholder">
            <p className="umod__placeholder-label">// MODULE CONTENT</p>
            <p>
              Content for <strong>{meta.code}: {meta.title}</strong> goes here.
              Add topic sections, notes, interactive components, and study resources below.
            </p>
          </div>
        </main>

      </div>
    </div>
  );
}
