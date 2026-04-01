import { useRef, useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TITLES = ['AI Engineer', 'Automation Architect', 'Full-Stack Developer', 'Co-Founder @ GoFlo'];

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const title = useTypewriter(TITLES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const NODE_COUNT = 85;
    const MAX_DIST = 155;
    const MOUSE_RADIUS = 210;

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      const mouse = mouseRef.current;

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const mi = Math.hypot(mouse.x - nodes[i].x, mouse.y - nodes[i].y);
          const mj = Math.hypot(mouse.x - nodes[j].x, mouse.y - nodes[j].y);
          const nearMouse = mi < MOUSE_RADIUS || mj < MOUSE_RADIUS;
          const proximity = nearMouse ? Math.max(0, 1 - Math.min(mi, mj) / MOUSE_RADIUS) : 0;

          const baseAlpha = (1 - dist / MAX_DIST) * 0.22;
          const alpha = baseAlpha + proximity * 0.55;
          const width = nearMouse ? 0.8 + proximity * 1.2 : 0.5;

          let r, g, b;
          if (nearMouse) {
            // Interpolate cyan → violet near mouse
            r = Math.round(34 + (167 - 34) * proximity);
            g = Math.round(211 + (139 - 211) * proximity);
            b = Math.round(238 + (250 - 238) * proximity);
          } else {
            r = 34; g = 211; b = 238;
          }

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(t * 1.8 + n.phase) * 0.5 + 0.5;
        const md = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        const mg = Math.max(0, 1 - md / MOUSE_RADIUS);
        const r = n.r + pulse * 1.2 + mg * 3.5;
        const cr = Math.round(34 + (167 - 34) * mg);
        const cg = Math.round(211 + (139 - 211) * mg);
        const cb = Math.round(238 + (250 - 238) * mg);

        // Halo glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${0.28 + pulse * 0.15 + mg * 0.35})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.75 + pulse * 0.25})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {/* Radial vignette overlay */}
      <div className="hero__vignette" aria-hidden="true" />

      <div className={`hero__content${loaded ? ' hero__content--loaded' : ''}`}>
        <div className="hero__status">
          <span className="hero__status-dot" />
          <span>Available for opportunities</span>
        </div>

        <p className="hero__greeting">// Hello, I'm</p>

        <h1 className="hero__name">
          James<br />
          <span className="hero__name-accent">Wigfield</span>
        </h1>

        <div className="hero__typewriter">
          <span className="hero__title-prefix">{'>'}&nbsp;</span>
          <span className="hero__title">{title}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </div>

        <p className="hero__description">
          CS student at UWA specialising in AI. Co-Founder of{' '}
          <span className="text-violet">GoFlo Solutions</span>. Building intelligent systems
          that automate the complex and amplify human potential.
        </p>

        <div className="hero__cta">
          <button
            className="btn btn--primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </button>
        </div>

        <div className="hero__badges">
          <span className="hero__badge">🇦🇺 Perth, AU</span>
          <span className="hero__badge">🎓 UWA 2026</span>
          <span className="hero__badge">🌍 Leeds, UK Alum</span>
        </div>
      </div>

      <a
        className="hero__scroll"
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-label">scroll</span>
        <div className="hero__scroll-line" />
      </a>
    </section>
  );
}
