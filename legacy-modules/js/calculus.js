/**
 * calculus.js
 * Interactive visualisers for derivatives, differentiation rules, and partial derivatives.
 * Based on PDF 3 — Calculus.
 */

const Calculus = (() => {
  'use strict';

  let derivChart = null;
  let partialChart = null;

  // ── Sub-nav ──────────────────────────────────────────────────────────────
  function initSubNav() {
    const section = document.getElementById('module-calculus');
    section.querySelectorAll('.sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        section.querySelectorAll('.sub-btn').forEach(b => b.classList.toggle('active', b === btn));
        section.querySelectorAll('.sub-panel').forEach(p => p.classList.toggle('active', p.id === btn.dataset.sub));
        if (btn.dataset.sub === 'calc-deriv') updateDerivChart();
        if (btn.dataset.sub === 'calc-partial') updatePartials();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // DERIVATIVE VISUALISER — secant → tangent as h → 0
  // ═══════════════════════════════════════════════════════════════
  const FN_DEFS = {
    x2:   { label: 'x²',    f: x => x*x,              df: x => 2*x,          xRange: [-4, 4],  yClamp: 16,  tex: 'f(x)=x^2',      dtex: "f'(x)=2x"       },
    x3:   { label: 'x³',    f: x => x*x*x,            df: x => 3*x*x,        xRange: [-3, 3],  yClamp: 20,  tex: 'f(x)=x^3',      dtex: "f'(x)=3x^2"     },
    sinx: { label: 'sin x', f: x => Math.sin(x),      df: x => Math.cos(x),  xRange: [-6, 6],  yClamp: 2,   tex: 'f(x)=\\sin x',  dtex: "f'(x)=\\cos x"  },
    expx: { label: 'eˣ',    f: x => Math.exp(x),      df: x => Math.exp(x),  xRange: [-3, 3],  yClamp: 20,  tex: 'f(x)=e^x',      dtex: "f'(x)=e^x"      },
    lnx:  { label: 'ln x',  f: x => x>0 ? Math.log(x) : null, df: x => 1/x, xRange: [0.05, 6], yClamp: 4, tex: 'f(x)=\\ln x',  dtex: "f'(x)=1/x"      },
  };

  function updateDerivChart() {
    const fnKey = document.getElementById('calc-fn-select').value;
    const fn = FN_DEFS[fnKey];
    const a = parseFloat(document.getElementById('calc-point-a').value);
    const h = parseFloat(document.getElementById('calc-h').value);

    document.getElementById('calc-point-a-val').textContent = a.toFixed(2);
    document.getElementById('calc-h-val').textContent = h.toFixed(4);

    const [xMin, xMax] = fn.xRange;
    const pts = [];
    const nPts = 300;
    for (let k = 0; k <= nPts; k++) {
      const x = xMin + (xMax - xMin) * k / nPts;
      const y = fn.f(x);
      if (y !== null && isFinite(y) && Math.abs(y) <= fn.yClamp) {
        pts.push({ x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(4)) });
      }
    }

    const fa = fn.f(a);
    const fah = fn.f(a + h);
    const slopeSecant = (fah !== null && fa !== null) ? (fah - fa) / h : 0;
    const slopeTangent = fn.df(a);

    const span = (xMax - xMin) * 0.35;
    const secLine = [a - span, a + span].map(x => ({ x, y: fa + slopeSecant * (x - a) }));
    const tanLine = [a - span, a + span].map(x => ({ x, y: fa + slopeTangent * (x - a) }));

    // Update info text
    document.getElementById('calc-secant-info').textContent =
      `Secant slope = [f(${a.toFixed(2)} + ${h.toFixed(4)}) − f(${a.toFixed(2)})] / ${h.toFixed(4)} = ${slopeSecant.toFixed(5)}`;
    document.getElementById('calc-tangent-info').textContent =
      `True derivative f'(${a.toFixed(2)}) = ${slopeTangent.toFixed(5)}`;
    document.getElementById('calc-error').textContent =
      `|secant − tangent| = ${Math.abs(slopeSecant - slopeTangent).toFixed(6)}`;

    const ctx = document.getElementById('calcDerivChart').getContext('2d');
    if (derivChart) derivChart.destroy();

    derivChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          { label: fn.label, data: pts, borderColor: '#6366f1', borderWidth: 2.5, pointRadius: 0, tension: 0.3 },
          { label: `Secant (h=${h.toFixed(3)})`, data: secLine, borderColor: '#f59e0b', borderWidth: 2, pointRadius: 0, borderDash: [6,3] },
          { label: "Tangent (h→0)", data: tanLine, borderColor: '#22c55e', borderWidth: 2, pointRadius: 0 },
          { label: `Point a=${a.toFixed(2)}`, data: [{ x: a, y: fa }], type: 'scatter', pointRadius: 7, backgroundColor: '#e6edf3', borderColor: '#e6edf3', showLine: false },
          { label: `a+h`, data: [{ x: a+h, y: fah }], type: 'scatter', pointRadius: 5, backgroundColor: '#f59e0b', borderColor: '#f59e0b', showLine: false },
        ]
      },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: { type: 'linear', min: xMin, max: xMax, grid: { color: '#30363d' }, ticks: { color: '#8b949e' } },
          y: { min: -fn.yClamp, max: fn.yClamp, grid: { color: '#30363d' }, ticks: { color: '#8b949e' } }
        },
        plugins: { legend: { labels: { color: '#c9d1d9', font: { size: 11 }, boxWidth: 24 } } }
      }
    });
  }

  function initDerivative() {
    const hSlider = document.getElementById('calc-h');

    document.getElementById('calc-fn-select').addEventListener('change', updateDerivChart);
    document.getElementById('calc-point-a').addEventListener('input', updateDerivChart);
    hSlider.addEventListener('input', updateDerivChart);

    // "Shrink h" button
    document.getElementById('calc-shrink-h').addEventListener('click', () => {
      const cur = parseFloat(hSlider.value);
      const next = Math.max(parseFloat(hSlider.min), parseFloat((cur / 10).toFixed(5)));
      hSlider.value = next;
      updateDerivChart();
    });
    document.getElementById('calc-reset-h').addEventListener('click', () => {
      hSlider.value = 1.0;
      updateDerivChart();
    });

    updateDerivChart();
  }

  // ═══════════════════════════════════════════════════════════════
  // DIFFERENTIATION RULES — step-by-step worked examples
  // ═══════════════════════════════════════════════════════════════
  const RULES = {
    power: {
      name: 'Power Rule',
      formula: '\\dfrac{d}{dx}\\left[x^n\\right] = nx^{n-1}',
      exampleTitle: 'Differentiate \\(x^4\\)',
      steps: [
        'Identify:\\ n = 4',
        '\\dfrac{d}{dx}\\left[x^4\\right] = 4 \\cdot x^{4-1}',
        '= 4x^3',
      ],
    },
    product: {
      name: 'Product Rule',
      formula: "\\dfrac{d}{dx}\\left[f \\cdot g\\right] = f'g + fg'",
      exampleTitle: "Differentiate \\(x^2 \\sin(x)\\)",
      steps: [
        'Let\\ f(x) = x^2,\\quad g(x) = \\sin(x)',
        "f'(x) = 2x,\\quad g'(x) = \\cos(x)",
        "\\dfrac{d}{dx}\\left[x^2\\sin(x)\\right] = 2x\\cdot\\sin(x) + x^2\\cdot\\cos(x)",
        '= 2x\\sin(x) + x^2\\cos(x)',
      ],
    },
    chain: {
      name: 'Chain Rule',
      formula: "\\dfrac{d}{dx}\\left[f(g(x))\\right] = f'(g(x)) \\cdot g'(x)",
      exampleTitle: "Differentiate \\(\\sin(3x^2)\\)",
      steps: [
        'Outer: f(u) = \\sin(u),\\quad Inner: g(x) = 3x^2',
        "f'(u) = \\cos(u),\\quad g'(x) = 6x",
        "\\dfrac{d}{dx}\\left[\\sin(3x^2)\\right] = \\cos(3x^2) \\cdot 6x",
        '= 6x\\cos(3x^2)',
      ],
    },
    quotient: {
      name: 'Quotient Rule',
      formula: "\\dfrac{d}{dx}\\left[\\dfrac{f}{g}\\right] = \\dfrac{f'g - fg'}{g^2}",
      exampleTitle: "Differentiate \\(\\dfrac{x^2}{\\cos(x)}\\)",
      steps: [
        'f(x) = x^2,\\quad g(x) = \\cos(x)',
        "f'(x) = 2x,\\quad g'(x) = -\\sin(x)",
        "= \\dfrac{2x \\cdot \\cos(x) - x^2 \\cdot (-\\sin(x))}{\\cos^2(x)}",
        '= \\dfrac{2x\\cos(x) + x^2\\sin(x)}{\\cos^2(x)}',
      ],
    },
    common: {
      name: 'Common Derivatives',
      formula: '\\text{Reference table from the PDF}',
      exampleTitle: 'Key derivatives to memorise',
      steps: [
        '\\dfrac{d}{dx}[c] = 0',
        '\\dfrac{d}{dx}[x^n] = nx^{n-1}',
        '\\dfrac{d}{dx}[e^x] = e^x',
        '\\dfrac{d}{dx}[\\ln x] = \\dfrac{1}{x}',
        '\\dfrac{d}{dx}[\\sin x] = \\cos x',
        '\\dfrac{d}{dx}[\\cos x] = -\\sin x',
      ],
    },
  };

  let ruleStepIdx = 0;
  let currentRule = null;

  function showRule(key) {
    currentRule = RULES[key];
    ruleStepIdx = 0;

    const display = document.getElementById('rule-display');
    display.innerHTML = `
      <div class="rule-header">
        <div class="rule-name">${currentRule.name}</div>
        <div class="rule-formula">\\[${currentRule.formula}\\]</div>
      </div>
      <div class="rule-example-label">Example: ${currentRule.exampleTitle}</div>
      <div class="rule-steps-list" id="rule-steps-list"></div>
      <div class="btn-row" style="margin-top:0.75rem">
        <button class="btn btn-primary" id="rule-step-btn">Show Step 1</button>
        <button class="btn btn-outline" id="rule-reset-btn">↺ Reset</button>
      </div>
    `;

    if (window.renderMathInElement) {
      renderMathInElement(display, {
        delimiters: [
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        throwOnError: false,
      });
    }

    document.getElementById('rule-step-btn').addEventListener('click', revealStep);
    document.getElementById('rule-reset-btn').addEventListener('click', () => showRule(key));
  }

  function revealStep() {
    const steps = currentRule.steps;
    if (ruleStepIdx >= steps.length) return;

    const list = document.getElementById('rule-steps-list');
    const div = document.createElement('div');
    div.className = 'rule-step-item';
    div.innerHTML = `<span class="step-num">${ruleStepIdx + 1}</span><span class="step-tex">\\[${steps[ruleStepIdx]}\\]</span>`;
    list.appendChild(div);

    if (window.renderMathInElement) {
      renderMathInElement(div, {
        delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
        throwOnError: false,
      });
    }

    ruleStepIdx++;
    const btn = document.getElementById('rule-step-btn');
    if (ruleStepIdx < steps.length) {
      btn.textContent = `Show Step ${ruleStepIdx + 1}`;
    } else {
      btn.textContent = '✓ Complete';
      btn.disabled = true;
    }
  }

  function initRules() {
    document.querySelectorAll('.rule-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.rule-btn').forEach(b => b.classList.toggle('active', b === btn));
        showRule(btn.dataset.rule);
      });
    });
    document.querySelector('.rule-btn[data-rule="power"]').classList.add('active');
    showRule('power');
  }

  // ═══════════════════════════════════════════════════════════════
  // PARTIAL DERIVATIVES
  // ═══════════════════════════════════════════════════════════════
  const PARTIAL_FNS = {
    linear: {
      label: '2x + 4y + 3',
      f:   (x, y) => 2*x + 4*y + 3,
      dfx: (x, y) => 2,
      dfy: (x, y) => 4,
      texF:  'f(x,y) = 2x + 4y + 3',
      texDx: '\\dfrac{\\partial f}{\\partial x} = 2',
      texDy: '\\dfrac{\\partial f}{\\partial y} = 4',
      note: 'Linear function — partial derivatives are constants (slopes in each direction).',
    },
    quadratic: {
      label: 'x² + xy + y²',
      f:   (x, y) => x*x + x*y + y*y,
      dfx: (x, y) => 2*x + y,
      dfy: (x, y) => x + 2*y,
      texF:  'f(x,y) = x^2 + xy + y^2',
      texDx: '\\dfrac{\\partial f}{\\partial x} = 2x + y',
      texDy: '\\dfrac{\\partial f}{\\partial y} = x + 2y',
      note: 'Now partials depend on the point — the gradient ∇f varies across the surface.',
    },
    sincos: {
      label: 'x²·sin(4y)',
      f:   (x, y) => x*x*Math.sin(4*y),
      dfx: (x, y) => 2*x*Math.sin(4*y),
      dfy: (x, y) => 4*x*x*Math.cos(4*y),
      texF:  'f(x,y) = x^2\\sin(4y)',
      texDx: '\\dfrac{\\partial f}{\\partial x} = 2x\\sin(4y)',
      texDy: '\\dfrac{\\partial f}{\\partial y} = 4x^2\\cos(4y)',
      note: 'When differentiating with respect to x, treat y as a constant and vice versa.',
    },
  };

  function updatePartials() {
    const fnKey = document.getElementById('partial-fn').value;
    const fn = PARTIAL_FNS[fnKey];
    const x0 = parseFloat(document.getElementById('partial-x').value);
    const y0 = parseFloat(document.getElementById('partial-y').value);

    document.getElementById('partial-x-val').textContent = x0.toFixed(2);
    document.getElementById('partial-y-val').textContent = y0.toFixed(2);

    const f0   = fn.f(x0, y0);
    const dfx  = fn.dfx(x0, y0);
    const dfy  = fn.dfy(x0, y0);

    // Render formulas
    const texEl = document.getElementById('partial-tex');
    texEl.innerHTML =
      `<div class="partial-tex-row">\\(${fn.texF}\\)</div>` +
      `<div class="partial-tex-row">\\(${fn.texDx}\\)</div>` +
      `<div class="partial-tex-row">\\(${fn.texDy}\\)</div>`;
    if (window.renderMathInElement) {
      renderMathInElement(texEl, {
        delimiters: [{ left:'\\(',right:'\\)',display:false }],
        throwOnError: false,
      });
    }

    // Numerical readout
    document.getElementById('partial-vals').innerHTML =
      `<div class="partial-readout-row">Point: <strong>x = ${x0.toFixed(2)}, y = ${y0.toFixed(2)}</strong></div>` +
      `<div class="partial-readout-row">f(x, y) = <strong>${f0.toFixed(4)}</strong></div>` +
      `<div class="partial-readout-row">∂f/∂x = <strong>${dfx.toFixed(4)}</strong></div>` +
      `<div class="partial-readout-row">∂f/∂y = <strong>${dfy.toFixed(4)}</strong></div>` +
      `<div class="partial-readout-row">Gradient ∇f = [<strong>${dfx.toFixed(3)}, ${dfy.toFixed(3)}</strong>]</div>`;

    document.getElementById('partial-note').textContent = fn.note;

    // Chart: show x-slice f(x, y₀) and tangent at x₀
    const xs = [];
    for (let x = -3; x <= 3; x += 0.05) xs.push(parseFloat(x.toFixed(3)));

    const xSlice = xs.map(x => ({ x, y: fn.f(x, y0) })).filter(p => isFinite(p.y) && Math.abs(p.y) < 50);
    const tanXs = [x0 - 1.5, x0 + 1.5];
    const xTan = tanXs.map(x => ({ x, y: f0 + dfx * (x - x0) }));

    const ySlice = xs.map(y => ({ x: y, y: fn.f(x0, y) })).filter(p => isFinite(p.y) && Math.abs(p.y) < 50);
    const tanYs = [y0 - 1.5, y0 + 1.5];
    const yTan = tanYs.map(y => ({ x: y, y: f0 + dfy * (y - y0) }));

    const ctx = document.getElementById('partialChart').getContext('2d');
    if (partialChart) partialChart.destroy();

    partialChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          { label: `f(x, y=${y0.toFixed(1)}) — x-slice`, data: xSlice, borderColor: '#6366f1', borderWidth: 2, pointRadius: 0, tension: 0.2 },
          { label: `∂f/∂x tangent at x=${x0.toFixed(1)}`, data: xTan, borderColor: '#22c55e', borderWidth: 2, pointRadius: 0, borderDash: [6,3] },
          { label: `f(x=${x0.toFixed(1)}, y) — y-slice`, data: ySlice, borderColor: '#818cf8', borderWidth: 2, pointRadius: 0, tension: 0.2, borderDash: [3,2] },
          { label: `∂f/∂y tangent at y=${y0.toFixed(1)}`, data: yTan, borderColor: '#f59e0b', borderWidth: 2, pointRadius: 0, borderDash: [6,3] },
          { label: 'Point (x₀, f)', data: [{ x: x0, y: f0 }], type: 'scatter', pointRadius: 7, backgroundColor: '#ef4444', borderColor: '#ef4444', showLine: false },
        ]
      },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: { type: 'linear', min: -3, max: 3, grid: { color: '#30363d' }, ticks: { color: '#8b949e' }, title: { display: true, text: 'x or y', color: '#8b949e' } },
          y: { grid: { color: '#30363d' }, ticks: { color: '#8b949e' }, title: { display: true, text: 'f value', color: '#8b949e' } }
        },
        plugins: { legend: { labels: { color: '#c9d1d9', font: { size: 10 }, boxWidth: 20 } } }
      }
    });
  }

  function initPartials() {
    document.getElementById('partial-fn').addEventListener('change', updatePartials);
    document.getElementById('partial-x').addEventListener('input', updatePartials);
    document.getElementById('partial-y').addEventListener('input', updatePartials);
    updatePartials();
  }

  // ═══════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════
  function init() {
    initSubNav();
    initDerivative();
    initRules();
    initPartials();
  }

  return { init };
})();
