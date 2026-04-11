/**
 * functions-explorer.js
 * Interactive function plotter — covers PDF 1 (Functions).
 * Explores linear, exponential, logarithmic, absolute value, sigmoid, and more.
 */

const FunctionsExplorer = (() => {
  'use strict';

  let fnChart = null;

  const DEFS = {
    linear: {
      label: 'Linear',
      params: [
        { id: 'fp-a', label: 'slope (a)', min: -5, max: 5, step: 0.1, def: 1 },
        { id: 'fp-b', label: 'intercept (b)', min: -5, max: 5, step: 0.1, def: 0 },
      ],
      f: (x, p) => p.a * x + p.b,
      tex: p => `f(x) = ${fmtCoef(p.a)}x + ${p.b}`,
      xRange: [-5, 5], yClamp: 12,
      insight: 'The slope <strong>a</strong> controls steepness. The intercept <strong>b</strong> shifts vertically. In ML: ŷ = θ₁x + θ₀.',
      domain: 'All real numbers',
    },
    quadratic: {
      label: 'Quadratic',
      params: [
        { id: 'fp-a', label: 'a', min: -3, max: 3, step: 0.1, def: 1 },
        { id: 'fp-b', label: 'b', min: -5, max: 5, step: 0.1, def: 0 },
        { id: 'fp-c', label: 'c', min: -5, max: 5, step: 0.1, def: 0 },
      ],
      f: (x, p) => p.a * x*x + p.b * x + p.c,
      tex: p => `f(x) = ${fmtCoef(p.a)}x² + ${fmtCoef(p.b)}x + ${p.c}`,
      xRange: [-5, 5], yClamp: 15,
      insight: 'Parabola — opens up when a > 0 (has minimum), down when a < 0. The MSE cost function J(θ) = (θ−2)² is a parabola!',
      domain: 'All real numbers',
    },
    exponential: {
      label: 'Exponential',
      params: [
        { id: 'fp-b', label: 'base (b > 0)', min: 0.1, max: 5, step: 0.05, def: 2.718 },
      ],
      f: (x, p) => Math.pow(Math.max(0.001, p.b), x),
      tex: p => `f(x) = ${p.b.toFixed(2)}ˣ`,
      xRange: [-4, 4], yClamp: 20,
      insight: 'Exponential growth (b > 1) or decay (b < 1). Base <em>e</em> ≈ 2.718 is special: d/dx[eˣ] = eˣ. Used in softmax and sigmoid.',
      domain: 'All real numbers',
    },
    logarithm: {
      label: 'Logarithm',
      params: [
        { id: 'fp-b', label: 'base (b > 1)', min: 1.01, max: 10, step: 0.01, def: 2.718 },
      ],
      f: (x, p) => x > 0 ? Math.log(x) / Math.log(Math.max(1.001, p.b)) : null,
      tex: p => `f(x) = log_${p.b.toFixed(2)}(x)`,
      xRange: [0.02, 8], yClamp: 6,
      insight: 'Inverse of exponential. <strong>Domain: x > 0 only.</strong> Natural log ln(x) = log_e(x) appears in cross-entropy loss. log is the "undo" of exponential.',
      domain: 'x > 0',
    },
    sigmoid: {
      label: 'Sigmoid',
      params: [],
      f: (x, p) => 1 / (1 + Math.exp(-x)),
      tex: p => 'σ(x) = 1 / (1 + e⁻ˣ)',
      xRange: [-7, 7], yClamp: 1.2,
      insight: 'Maps any real number → (0, 1). Used in <strong>logistic regression</strong> to produce probabilities. At x=0, σ=0.5. Derivative: σ(x)(1−σ(x)).',
      domain: 'All real numbers',
    },
    absolute: {
      label: 'Absolute Value',
      params: [],
      f: (x, p) => Math.abs(x),
      tex: p => 'f(x) = |x|',
      xRange: [-5, 5], yClamp: 6,
      insight: 'Piecewise: x for x ≥ 0, −x for x < 0. <strong>Not differentiable at x = 0</strong> — no unique tangent at the corner. Used in Lasso (ℓ₁) regularisation.',
      domain: 'All real numbers',
    },
    squareroot: {
      label: 'Square Root',
      params: [],
      f: (x, p) => x >= 0 ? Math.sqrt(x) : null,
      tex: p => 'f(x) = √x',
      xRange: [0, 9], yClamp: 4,
      insight: 'Only the positive square root is returned (a function gives one output per input). <strong>Domain: x ≥ 0.</strong> Derivative: 1/(2√x) — increases slowly.',
      domain: 'x ≥ 0',
    },
  };

  function fmtCoef(v) {
    if (v === 1) return '';
    if (v === -1) return '-';
    return v % 1 === 0 ? v : v.toFixed(2);
  }

  function getParams(def) {
    const p = {};
    def.params.forEach(param => {
      const el = document.getElementById(param.id);
      const key = param.id.replace('fp-', '');
      p[key] = el ? parseFloat(el.value) : param.def;
    });
    return p;
  }

  function buildControls(def) {
    const container = document.getElementById('fn-param-controls');
    container.innerHTML = '';
    if (def.params.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No parameters — fixed function.</p>';
      return;
    }
    def.params.forEach(param => {
      const valId = `${param.id}-val`;
      const div = document.createElement('div');
      div.className = 'control-row';
      div.innerHTML = `
        <label for="${param.id}">${param.label} <strong id="${valId}" class="param-val">${parseFloat(param.def.toFixed(3))}</strong></label>
        <input type="range" id="${param.id}" min="${param.min}" max="${param.max}" step="${param.step}" value="${param.def}" />
      `;
      container.appendChild(div);
    });
    def.params.forEach(param => {
      const el = document.getElementById(param.id);
      const valEl = document.getElementById(`${param.id}-val`);
      if (el && valEl) {
        el.addEventListener('input', () => {
          valEl.textContent = parseFloat(el.value).toFixed(3);
          renderChart();
        });
      }
    });
  }

  function renderChart() {
    const key = document.getElementById('fn-type-select').value;
    const def = DEFS[key];
    const params = getParams(def);
    const [xMin, xMax] = def.xRange;

    const pts = [];
    const N = 400;
    for (let k = 0; k <= N; k++) {
      const x = xMin + (xMax - xMin) * k / N;
      const y = def.f(x, params);
      if (y !== null && isFinite(y) && Math.abs(y) <= def.yClamp) {
        pts.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(5)) });
      }
    }

    // Determine actual range from data
    const yVals = pts.map(p => p.y);
    const yMin = yVals.length ? Math.min(...yVals) : -def.yClamp;
    const yMax = yVals.length ? Math.max(...yVals) : def.yClamp;
    const yPad = (yMax - yMin) * 0.1 || 1;

    // Update formula display
    const formulaEl = document.getElementById('fn-formula-display');
    formulaEl.textContent = def.tex(params);

    document.getElementById('fn-insight-text').innerHTML = def.insight;
    document.getElementById('fn-domain-display').textContent = `Domain: ${def.domain}`;

    const ctx = document.getElementById('fnChart').getContext('2d');
    if (fnChart) fnChart.destroy();

    fnChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: def.label,
          data: pts,
          borderColor: '#6366f1',
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.15,
          fill: false,
        }]
      },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: {
            type: 'linear', min: xMin, max: xMax,
            grid: { color: '#30363d' }, ticks: { color: '#8b949e' },
            title: { display: true, text: 'x', color: '#8b949e' },
          },
          y: {
            min: yMin - yPad, max: yMax + yPad,
            grid: { color: '#30363d' }, ticks: { color: '#8b949e' },
            title: { display: true, text: 'f(x)', color: '#8b949e' },
          }
        },
        plugins: {
          legend: { labels: { color: '#c9d1d9', font: { size: 12 } } },
          tooltip: {
            mode: 'index', intersect: false,
            callbacks: { label: ctx => `f(${ctx.parsed.x.toFixed(2)}) = ${ctx.parsed.y.toFixed(4)}` }
          }
        }
      }
    });
  }

  function init() {
    const select = document.getElementById('fn-type-select');
    select.addEventListener('change', () => {
      buildControls(DEFS[select.value]);
      renderChart();
    });
    buildControls(DEFS[select.value]);
    renderChart();
  }

  return { init };
})();
