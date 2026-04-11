/**
 * feature-scaling.js
 * Interactive visualisers for feature scaling methods and the effect on
 * gradient descent convergence.
 * Based on CITS5508 mid-sem sample question 3.
 */

const FeatureScaling = (() => {
  'use strict';

  let scalingChart = null;

  // ── Sub-nav ──────────────────────────────────────────────────────────────
  function initSubNav() {
    const sec = document.getElementById('module-featurescaling');
    sec.querySelectorAll('.sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sec.querySelectorAll('.sub-btn').forEach(b => b.classList.toggle('active', b === btn));
        sec.querySelectorAll('.sub-panel').forEach(p => p.classList.toggle('active', p.id === btn.dataset.sub));
        if (btn.dataset.sub === 'fs-gdcompare') drawGDComparison();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SCALING METHODS
  // ═══════════════════════════════════════════════════════════════
  // Two features: house sizes (large scale) and lot quality score (tiny scale)
  const FEATURE1 = [120, 245, 800, 350, 92, 478, 615, 155]; // sq metres
  const FEATURE2 = [0.42, 0.71, 0.18, 0.93, 0.31, 0.55, 0.84, 0.62]; // quality score 0-1

  function stats(data) {
    const n   = data.length;
    const mu  = data.reduce((a, b) => a + b, 0) / n;
    const sig = Math.sqrt(data.reduce((a, b) => a + (b - mu) ** 2, 0) / n);
    const min = Math.min(...data);
    const max = Math.max(...data);
    return { mu, sig, min, max };
  }

  function applyMethod(data, method) {
    const s = stats(data);
    if (method === 'std')    return { vals: data.map(x => (x - s.mu) / s.sig),   ...s };
    if (method === 'minmax') return { vals: data.map(x => (x - s.min) / (s.max - s.min)), ...s };
    return { vals: data, ...s };
  }

  function updateScaling() {
    const method = document.getElementById('fs-method').value;
    const feat   = document.getElementById('fs-feat').value === 'f1' ? FEATURE1 : FEATURE2;
    const res    = applyMethod(feat, method);
    const s      = res;

    // Formula display
    const fEl = document.getElementById('fs-formula');
    if (method === 'std') {
      fEl.innerHTML = `\\[x' = \\frac{x - \\mu}{\\sigma} \\qquad \\mu = ${s.mu.toFixed(2)},\\; \\sigma = ${s.sig.toFixed(3)}\\]`;
    } else if (method === 'minmax') {
      fEl.innerHTML = `\\[x' = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\qquad x_{\\min}=${s.min},\\; x_{\\max}=${s.max}\\]`;
    } else {
      fEl.innerHTML = `\\[\\text{No transformation — original values used}\\]`;
    }
    if (window.renderMathInElement) {
      renderMathInElement(fEl, { delimiters: [{ left: '\\[', right: '\\]', display: true }], throwOnError: false });
    }

    // Result stats
    const scaled = res.vals;
    const sStats = stats(scaled);
    document.getElementById('fs-result-stats').innerHTML =
      `After scaling — mean: <strong>${sStats.mu.toFixed(4)}</strong>, σ: <strong>${sStats.sig.toFixed(4)}</strong>, ` +
      `min: <strong>${Math.min(...scaled).toFixed(4)}</strong>, max: <strong>${Math.max(...scaled).toFixed(4)}</strong>`;

    // Table
    const tbody = document.getElementById('fs-table-body');
    tbody.innerHTML = feat.map((v, i) =>
      `<tr><td>x${i + 1}</td><td>${v}</td><td style="color:var(--green)">${scaled[i].toFixed(5)}</td></tr>`
    ).join('');

    // Chart: side-by-side comparison
    const ctx = document.getElementById('scalingChart').getContext('2d');
    if (scalingChart) scalingChart.destroy();

    scalingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: feat.map((_, i) => `x${i + 1}`),
        datasets: [
          { label: 'Original', data: feat, backgroundColor: 'rgba(99,102,241,0.45)', borderColor: '#6366f1', borderWidth: 2 },
          { label: method === 'none' ? 'Scaled (same)' : method === 'std' ? 'Standardised' : 'Min-Max', data: scaled, backgroundColor: 'rgba(34,197,94,0.45)', borderColor: '#22c55e', borderWidth: 2 },
        ]
      },
      options: {
        animation: false, responsive: true,
        scales: {
          y: { grid: { color: '#30363d' }, ticks: { color: '#8b949e' } },
          x: { grid: { color: 'transparent' }, ticks: { color: '#8b949e' } },
        },
        plugins: {
          legend: { labels: { color: '#c9d1d9', font: { size: 11 } } },
          tooltip: { callbacks: { label: c => `  ${parseFloat(c.parsed.y.toFixed(5))}` } }
        }
      }
    });
  }

  function initScalingMethods() {
    document.getElementById('fs-method').addEventListener('change', updateScaling);
    document.getElementById('fs-feat').addEventListener('change', updateScaling);
    updateScaling();
  }

  // ═══════════════════════════════════════════════════════════════
  // GD CONVERGENCE CANVAS DEMO
  // Shows how unscaled features produce elongated loss contours and
  // a slow/zigzagging GD path, while scaled features give circular
  // contours and fast convergence.
  // ═══════════════════════════════════════════════════════════════

  // Viridis-inspired colormap: dark navy → teal → yellow
  function heatColor(t) {
    // 0 = low loss (dark), 1 = high loss (bright)
    const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
    if (t < 0.33) {
      const s = t / 0.33;
      return [clamp(13 + s * 40), clamp(17 + s * 100), clamp(100 + s * 100)];
    } else if (t < 0.66) {
      const s = (t - 0.33) / 0.33;
      return [clamp(53 + s * 160), clamp(117 + s * 80), clamp(200 - s * 130)];
    } else {
      const s = (t - 0.66) / 0.34;
      return [clamp(213 + s * 30), clamp(197 - s * 60), clamp(70 - s * 50)];
    }
  }

  function drawContour(canvasId, scaled, lr) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Unscaled: J = 0.5*(50*θ₂)² + 0.5*θ₁² → steep in θ₂, flat in θ₁
    // → elongated horizontal ellipses, GD zigzags in θ₂ direction
    // Scaled: J = 0.5*θ₁² + 0.5*θ₂² → circular, GD goes straight

    const xRange = [-3.5, 3.5];   // θ₁ axis
    const yRange = scaled ? [-3.5, 3.5] : [-0.2, 0.2]; // θ₂ axis

    function loss(t1, t2) {
      return scaled
        ? 0.5 * t1 * t1 + 0.5 * t2 * t2
        : 0.5 * t1 * t1 + 0.5 * (50 * t2) * (50 * t2);
    }

    function grad(t1, t2) {
      return scaled
        ? [t1, t2]
        : [t1, 50 * 50 * t2];
    }

    // Draw heatmap
    const img = ctx.createImageData(W, H);
    const maxLoss = scaled ? 12 : 12;
    for (let px = 0; px < W; px++) {
      for (let py = 0; py < H; py++) {
        const t1 = xRange[0] + (px / (W - 1)) * (xRange[1] - xRange[0]);
        const t2 = yRange[0] + ((H - 1 - py) / (H - 1)) * (yRange[1] - yRange[0]);
        const l = Math.min(loss(t1, t2) / maxLoss, 1);
        const [r, g, b] = heatColor(l);
        const idx = (py * W + px) * 4;
        img.data[idx] = r; img.data[idx + 1] = g; img.data[idx + 2] = b; img.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);

    // Coordinate helpers
    function toC(t1, t2) {
      return [
        (t1 - xRange[0]) / (xRange[1] - xRange[0]) * W,
        H - (t2 - yRange[0]) / (yRange[1] - yRange[0]) * H,
      ];
    }

    // Simulate GD path
    let t1 = scaled ? -3 : -3;
    let t2 = scaled ? 3 : 0.16;
    const path = [[t1, t2]];
    const steps = scaled ? 30 : 60;
    for (let i = 0; i < steps; i++) {
      const [g1, g2] = grad(t1, t2);
      t1 -= lr * g1;
      t2 -= lr * g2;
      path.push([t1, t2]);
      if (Math.abs(t1) < 0.02 && Math.abs(t2) < 0.02) break;
    }

    // Draw path
    ctx.setLineDash([]);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    path.forEach(([a, b], i) => {
      const [cx, cy] = toC(a, b);
      i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    });
    ctx.stroke();

    // Dots
    path.forEach(([a, b], i) => {
      const [cx, cy] = toC(a, b);
      const isStart = i === 0, isEnd = i === path.length - 1;
      ctx.fillStyle = isStart ? '#f59e0b' : isEnd ? '#22c55e' : 'rgba(255,255,255,0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy, isStart || isEnd ? 5 : 2, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Minimum circle
    const [mx, my] = toC(0, 0);
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(mx, my, 8, 0, 2 * Math.PI); ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#e6edf3';
    ctx.fillText(scaled ? 'Scaled — circular contours' : 'Unscaled — elongated contours', 6, 15);
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#8b949e';
    ctx.fillText(`GD steps taken: ${path.length - 1}`, 6, 28);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('● start', 6, H - 18);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('● minimum', 60, H - 18);
  }

  function drawGDComparison() {
    const lr = parseFloat(document.getElementById('gd-lr-slider').value);
    document.getElementById('gd-lr-val').textContent = lr.toFixed(3);
    drawContour('gd-unscaled-canvas', false, lr);
    drawContour('gd-scaled-canvas', true, lr);
  }

  function initGDComparison() {
    document.getElementById('gd-lr-slider').addEventListener('input', drawGDComparison);
    drawGDComparison();
  }

  // ═══════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════
  function init() {
    initSubNav();
    initScalingMethods();
    initGDComparison();
  }

  return { init };
})();
