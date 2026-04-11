/**
 * ridge-lasso.js
 * Visualises Ridge (ℓ₂) vs Lasso (ℓ₁) regularisation geometry:
 * MSE loss contours + constraint regions. Shows why Lasso produces sparse solutions.
 */

const RidgeLasso = (() => {
  'use strict';

  let chart = null;

  // ── helpers ────────────────────────────────────────────────────────────────

  /** Evaluate MSE loss at (w1, w2): elliptical contour centred at (wOLS1, wOLS2) */
  function mseLoss(w1, w2, cx, cy, a, b) {
    return ((w1 - cx) / a) ** 2 + ((w2 - cy) / b) ** 2;
  }

  /** Generate points for an ellipse contour (MSE loss) */
  function ellipsePoints(cx, cy, rx, ry, level, n = 120) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (2 * Math.PI * i) / n;
      pts.push({ x: cx + rx * Math.sqrt(level) * Math.cos(t), y: cy + ry * Math.sqrt(level) * Math.sin(t) });
    }
    return pts;
  }

  /** Generate points for an ℓ₂ circle (Ridge constraint region boundary) */
  function circlePoints(r, n = 120) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (2 * Math.PI * i) / n;
      pts.push({ x: r * Math.cos(t), y: r * Math.sin(t) });
    }
    return pts;
  }

  /** Generate points for an ℓ₁ diamond (Lasso constraint region boundary) */
  function diamondPoints(r) {
    return [
      { x: r, y: 0 }, { x: 0, y: r }, { x: -r, y: 0 }, { x: 0, y: -r }, { x: r, y: 0 },
    ];
  }

  /**
   * Find the point on the ℓ₂ circle boundary where the MSE contour is tangent.
   * Minimise MSE loss on the circle: w = r * (cx,cy)/||(cx,cy)||_2 (projection).
   */
  function ridgeOptimal(cx, cy, r) {
    const norm = Math.sqrt(cx * cx + cy * cy);
    if (norm < 1e-9) return { x: r, y: 0 };
    return { x: r * cx / norm, y: r * cy / norm };
  }

  /**
   * Find the point on the ℓ₁ diamond boundary that minimises MSE loss.
   * The diamond has 4 edges; we solve analytically for each and take the min.
   * If OLS is far enough from origin, the minimum is at a corner (axis-aligned).
   */
  function lassoOptimal(cx, cy, r) {
    // Check all 4 corners first
    const corners = [
      { x: r, y: 0 }, { x: -r, y: 0 }, { x: 0, y: r }, { x: 0, y: -r },
    ];

    // Project onto each of the 4 edges and find the point on each edge
    const edges = [
      { p1: { x: r, y: 0 }, p2: { x: 0, y: r } },
      { p1: { x: 0, y: r }, p2: { x: -r, y: 0 } },
      { p1: { x: -r, y: 0 }, p2: { x: 0, y: -r } },
      { p1: { x: 0, y: -r }, p2: { x: r, y: 0 } },
    ];

    let best = null;
    let bestLoss = Infinity;

    const a = 1, b = 0.6; // ellipse semi-axes (matching the chart config)

    // Check edges
    for (const edge of edges) {
      const dx = edge.p2.x - edge.p1.x;
      const dy = edge.p2.y - edge.p1.y;
      // Parameterise: P(t) = p1 + t*(p2-p1), t in [0,1]
      // Minimise MSE = ((p1x+t*dx - cx)/a)^2 + ((p1y+t*dy - cy)/b)^2
      const denom = (dx / a) ** 2 + (dy / b) ** 2;
      if (Math.abs(denom) < 1e-12) continue;
      const t = ((cx - edge.p1.x) * dx / a ** 2 + (cy - edge.p1.y) * dy / b ** 2) / denom;
      const tc = Math.max(0, Math.min(1, t));
      const px = edge.p1.x + tc * dx;
      const py = edge.p1.y + tc * dy;
      const loss = mseLoss(px, py, cx, cy, a, b);
      if (loss < bestLoss) { bestLoss = loss; best = { x: px, y: py }; }
    }

    // Check corners
    for (const c of corners) {
      const loss = mseLoss(c.x, c.y, cx, cy, a, b);
      if (loss < bestLoss) { bestLoss = loss; best = c; }
    }

    return best;
  }

  // ── render ─────────────────────────────────────────────────────────────────

  function buildDatasets(alpha, regType) {
    // OLS solution (unconstrained minimum of MSE loss)
    const cx = 1.8, cy = 1.2;
    const a = 1, b = 0.6;

    // Constraint radius scales with alpha (larger alpha = smaller region)
    // alpha range 0..1 maps to r range 2.5..0.3
    const r = 2.5 - alpha * 2.2;

    const datasets = [];

    // Loss contour levels (ellipses around OLS solution)
    const levels = [0.5, 1.2, 2.2, 3.5, 5.5];
    const contourColors = ['#4fc3f7', '#29b6f6', '#0288d1', '#01579b', '#012d5c'];
    levels.forEach((lv, i) => {
      datasets.push({
        label: i === 0 ? 'MSE contours' : '_nolegend_',
        data: ellipsePoints(cx, cy, a, b, lv),
        borderColor: contourColors[i],
        backgroundColor: 'transparent',
        borderWidth: 1.2,
        pointRadius: 0,
        showLine: true,
        tension: 0.4,
        type: 'line',
      });
    });

    // OLS optimum (unconstrained)
    datasets.push({
      label: 'OLS optimum (unconstrained)',
      data: [{ x: cx, y: cy }],
      borderColor: '#fff',
      backgroundColor: '#fff',
      pointRadius: 7,
      pointStyle: 'star',
      type: 'scatter',
    });

    if (regType === 'ridge') {
      // Ridge: ℓ₂ circle
      datasets.push({
        label: `Ridge (ℓ₂) constraint  |w|₂ ≤ ${r.toFixed(2)}`,
        data: circlePoints(r),
        borderColor: '#a78bfa',
        backgroundColor: 'rgba(167,139,250,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        showLine: true,
        tension: 0.4,
        type: 'line',
      });

      const opt = ridgeOptimal(cx, cy, r);
      datasets.push({
        label: `Ridge optimal  (w₁=${opt.x.toFixed(2)}, w₂=${opt.y.toFixed(2)})`,
        data: [opt],
        borderColor: '#a78bfa',
        backgroundColor: '#a78bfa',
        pointRadius: 8,
        pointStyle: 'circle',
        type: 'scatter',
      });
    } else {
      // Lasso: ℓ₁ diamond
      datasets.push({
        label: `Lasso (ℓ₁) constraint  |w|₁ ≤ ${r.toFixed(2)}`,
        data: diamondPoints(r),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        showLine: true,
        tension: 0,
        type: 'line',
      });

      const opt = lassoOptimal(cx, cy, r);
      const atCorner = Math.abs(opt.x) < 1e-6 || Math.abs(opt.y) < 1e-6;
      datasets.push({
        label: `Lasso optimal  (w₁=${opt.x.toFixed(2)}, w₂=${opt.y.toFixed(2)})${atCorner ? '  ← sparse!' : ''}`,
        data: [opt],
        borderColor: '#f97316',
        backgroundColor: '#f97316',
        pointRadius: 8,
        pointStyle: atCorner ? 'triangle' : 'circle',
        type: 'scatter',
      });
    }

    return { datasets, r, cx, cy };
  }

  function updateInsight(alpha, regType, datasets, r, cx, cy) {
    const box = document.getElementById('rl-insight');
    if (!box) return;
    if (regType === 'ridge') {
      box.innerHTML = `<strong>Ridge (ℓ₂):</strong> The constraint region is a <em>circle</em>.
        The MSE loss contour touches the circle tangentially — typically at a point where
        neither w₁ nor w₂ is exactly zero. Ridge <em>shrinks</em> coefficients toward zero
        but rarely sets them to exactly zero.<br><br>
        As α ↑ the circle shrinks (r = ${r.toFixed(2)}), pulling the solution
        closer to the origin and increasing regularisation strength.`;
    } else {
      const opt = datasets[datasets.length - 1].data[0];
      const atCorner = Math.abs(opt.x) < 1e-6 || Math.abs(opt.y) < 1e-6;
      box.innerHTML = `<strong>Lasso (ℓ₁):</strong> The constraint region is a <em>diamond</em>.
        Its <em>corners lie on the axes</em>. The MSE loss contour tends to first touch the
        diamond at a corner — forcing one weight to exactly zero.
        ${atCorner
          ? `<br><br><span style="color:#f97316;font-weight:700">◆ Corner hit! w = (${opt.x.toFixed(2)}, ${opt.y.toFixed(2)}) — one weight is exactly zero → sparse model.</span>`
          : `<br><br>At α = ${alpha.toFixed(2)} the constraint radius is large enough (r = ${r.toFixed(2)}) that the optimal point is not yet at a corner. Increase α to force sparsity.`}`;
    }
  }

  function render() {
    const alpha = parseFloat(document.getElementById('rl-alpha').value);
    const regType = document.getElementById('rl-type').value;
    document.getElementById('rl-alpha-val').textContent = alpha.toFixed(2);

    const { datasets, r, cx, cy } = buildDatasets(alpha, regType);

    if (chart) {
      chart.data.datasets = datasets;
      chart.update('none');
    } else {
      const ctx = document.getElementById('rlChart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          scales: {
            x: {
              min: -2.8, max: 3.0,
              title: { display: true, text: 'w₁', color: '#9ca3af' },
              grid: { color: 'rgba(255,255,255,0.06)' },
              ticks: { color: '#9ca3af' },
            },
            y: {
              min: -2.8, max: 3.0,
              title: { display: true, text: 'w₂', color: '#9ca3af' },
              grid: { color: 'rgba(255,255,255,0.06)' },
              ticks: { color: '#9ca3af' },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: '#d1d5db',
                filter: item => !item.text.startsWith('_'),
                boxWidth: 16,
              },
            },
            tooltip: { enabled: false },
          },
        },
      });
    }

    updateInsight(alpha, regType, datasets, r, cx, cy);
  }

  // ── init ──────────────────────────────────────────────────────────────────

  function init() {
    document.getElementById('rl-alpha').addEventListener('input', render);
    document.getElementById('rl-type').addEventListener('change', render);

    // Sub-tabs
    const subBtns = document.querySelectorAll('#module-ridgelasso .sub-btn');
    const subPanels = document.querySelectorAll('#module-ridgelasso .sub-panel');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        subBtns.forEach(b => b.classList.remove('active'));
        subPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.panel).classList.add('active');
      });
    });

    render();
  }

  return { init };
})();
