/**
 * classification.js
 * Interactive visualisers for supervised/unsupervised learning,
 * sigmoid (binary classification), and softmax (multi-class).
 * Based on CITS5508 mid-sem sample questions 1 & 2.
 */

const Classification = (() => {
  'use strict';

  let supChart    = null;
  let sigChart    = null;
  let smChart     = null;
  let smN         = 3;
  let showLabels  = true;

  // ── Sub-nav ──────────────────────────────────────────────────────────────
  function initSubNav() {
    const sec = document.getElementById('module-classification');
    sec.querySelectorAll('.sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sec.querySelectorAll('.sub-btn').forEach(b => b.classList.toggle('active', b === btn));
        sec.querySelectorAll('.sub-panel').forEach(p => p.classList.toggle('active', p.id === btn.dataset.sub));
        if (btn.dataset.sub === 'cls-sigmoid') updateSigmoid();
        if (btn.dataset.sub === 'cls-softmax') buildSoftmaxSliders();
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // SUPERVISED vs UNSUPERVISED
  // ═══════════════════════════════════════════════════════════════
  function randn(mu, sigma) {
    const u = Math.random() || 1e-10, v = Math.random() || 1e-10;
    return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  // Pre-generate a stable dataset
  const SCATTER_DATA = (() => {
    const pts = [];
    const seed = [
      [2.1,2.3],[1.4,2.8],[2.7,1.9],[2.0,1.5],[1.8,2.1],[3.1,2.5],[2.4,3.0],[1.1,1.8],[2.6,2.9],[1.7,1.2],
      [2.9,1.4],[1.5,2.6],[2.2,2.0],[2.8,2.7],[1.3,1.5],[2.5,2.2],[1.9,2.9],[3.0,1.8],[2.3,2.6],[1.6,1.3],
      [-2.0,-2.2],[-1.5,-1.8],[-2.6,-2.0],[-1.9,-2.7],[-2.3,-1.5],[-1.2,-2.4],[-2.8,-2.1],[-1.7,-1.4],
      [-2.4,-2.9],[-1.4,-2.0],[-2.9,-1.6],[-1.6,-2.6],[-2.1,-2.5],[-1.8,-1.2],[-2.5,-1.9],[-1.3,-2.3],
      [-2.7,-2.4],[-1.1,-1.7],[-2.2,-1.3],[-1.9,-2.8],
    ];
    seed.forEach(([x, y], i) => pts.push({ x, y, cls: i < 20 ? 0 : 1 }));
    return pts;
  })();

  function updateSupChart() {
    const ctx = document.getElementById('supUnsupChart').getContext('2d');
    if (supChart) supChart.destroy();

    const opts = {
      animation: false, responsive: true,
      scales: {
        x: { type: 'linear', min: -4.5, max: 4.5, grid: { color: '#30363d' }, ticks: { color: '#8b949e' } },
        y: { min: -4.5, max: 4.5, grid: { color: '#30363d' }, ticks: { color: '#8b949e' } },
      },
      plugins: { legend: { labels: { color: '#c9d1d9', font: { size: 11 } } } }
    };

    if (showLabels) {
      // Supervised view: colored by true class + decision boundary
      const cls0 = SCATTER_DATA.filter(d => d.cls === 0);
      const cls1 = SCATTER_DATA.filter(d => d.cls === 1);
      // Decision boundary: x + y = 0 (i.e. y = -x) divides the two clusters
      const bound = [{ x: -4, y: 4 }, { x: 4, y: -4 }];
      supChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            { label: 'Class 0 (labeled)', data: cls0, backgroundColor: '#6366f1', pointRadius: 7, pointHoverRadius: 9 },
            { label: 'Class 1 (labeled)', data: cls1, backgroundColor: '#f59e0b', pointRadius: 7, pointHoverRadius: 9 },
            { label: 'Decision boundary', data: bound, showLine: true, borderColor: '#ef4444', borderDash: [6,3], pointRadius: 0, borderWidth: 2 },
          ]
        },
        options: opts
      });
      document.getElementById('sup-mode-label').textContent = 'Supervised Learning';
      document.getElementById('sup-description').innerHTML =
        '<strong>Labels are known.</strong> The model learns to map features → class. ' +
        'Train/test split, cross-entropy loss, and a learned decision boundary separate the classes. ' +
        '<em>Examples: spam detection, image classification, house price regression.</em>';
    } else {
      // Unsupervised view: no labels, K-Means result
      const c0 = { x: 2, y: 2 }, c1 = { x: -2, y: -2 };
      const cluster0 = [], cluster1 = [];
      SCATTER_DATA.forEach(d => {
        const d0 = (d.x - c0.x) ** 2 + (d.y - c0.y) ** 2;
        const d1 = (d.x - c1.x) ** 2 + (d.y - c1.y) ** 2;
        (d0 < d1 ? cluster0 : cluster1).push(d);
      });
      supChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            { label: 'Cluster A', data: cluster0, backgroundColor: '#3b82f6', pointRadius: 6 },
            { label: 'Cluster B', data: cluster1, backgroundColor: '#22c55e', pointRadius: 6 },
            { label: 'Centroids', data: [c0, c1], backgroundColor: '#ef4444', pointRadius: 11, pointStyle: 'crossRot', pointBorderWidth: 3, borderColor: '#ef4444' },
          ]
        },
        options: opts
      });
      document.getElementById('sup-mode-label').textContent = 'Unsupervised Learning (K-Means)';
      document.getElementById('sup-description').innerHTML =
        '<strong>No labels provided.</strong> K-Means finds structure by assigning each point to its nearest centroid. ' +
        'The clusters discovered may or may not align with true classes. ' +
        '<em>Examples: customer segmentation, anomaly detection, topic modelling.</em>';
    }
  }

  function initSupUnsup() {
    document.getElementById('sup-toggle-btn').addEventListener('click', () => {
      showLabels = !showLabels;
      document.getElementById('sup-toggle-btn').textContent =
        showLabels ? 'Switch to Unsupervised' : 'Switch to Supervised';
      updateSupChart();
    });
    updateSupChart();
  }

  // ═══════════════════════════════════════════════════════════════
  // SIGMOID — binary classification
  // ═══════════════════════════════════════════════════════════════
  function updateSigmoid() {
    const z = parseFloat(document.getElementById('sigmoid-z').value);
    document.getElementById('sigmoid-z-val').textContent = z.toFixed(2);

    const sigma = 1 / (1 + Math.exp(-z));
    document.getElementById('sigmoid-out').textContent = sigma.toFixed(5);

    const isPos = sigma >= 0.5;
    const decEl = document.getElementById('sigmoid-decision');
    decEl.textContent = isPos ? 'Predict: Class 1 (positive)' : 'Predict: Class 0 (negative)';
    decEl.style.color = isPos ? 'var(--green)' : 'var(--yellow)';
    document.getElementById('sigmoid-formula-live').textContent =
      `σ(${z.toFixed(2)}) = 1 / (1 + e^(−${z.toFixed(2)})) = ${sigma.toFixed(5)}`;

    // Build curve data
    const xs = [], ys = [];
    for (let x = -7; x <= 7.01; x += 0.07) {
      xs.push(parseFloat(x.toFixed(3)));
      ys.push(1 / (1 + Math.exp(-x)));
    }

    const ctx = document.getElementById('sigmoidChart').getContext('2d');
    if (sigChart) sigChart.destroy();

    sigChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'σ(z) = 1/(1+e⁻ᶻ)',
            data: xs.map((x, i) => ({ x, y: ys[i] })),
            borderColor: '#6366f1', borderWidth: 2.5, pointRadius: 0, tension: 0.3,
          },
          {
            label: 'Decision threshold (p = 0.5)',
            data: [{ x: -7, y: 0.5 }, { x: 7, y: 0.5 }],
            borderColor: '#ef4444', borderWidth: 1.5, borderDash: [5, 3], pointRadius: 0,
          },
          {
            label: `z=${z.toFixed(2)} → σ=${sigma.toFixed(3)}`,
            data: [{ x: z, y: sigma }],
            type: 'scatter', pointRadius: 9,
            backgroundColor: isPos ? '#22c55e' : '#f59e0b',
            borderColor: '#fff', borderWidth: 2, showLine: false,
          },
        ]
      },
      options: {
        animation: false, responsive: true,
        scales: {
          x: { type: 'linear', min: -7, max: 7, grid: { color: '#30363d' }, ticks: { color: '#8b949e' }, title: { display: true, text: 'z  (logit = wᵀx + b)', color: '#8b949e' } },
          y: { min: -0.05, max: 1.1, grid: { color: '#30363d' }, ticks: { color: '#8b949e' }, title: { display: true, text: 'P(class = 1)', color: '#8b949e' } },
        },
        plugins: { legend: { labels: { color: '#c9d1d9', font: { size: 11 } } } }
      }
    });
  }

  function initSigmoid() {
    document.getElementById('sigmoid-z').addEventListener('input', updateSigmoid);
    updateSigmoid();
  }

  // ═══════════════════════════════════════════════════════════════
  // SOFTMAX — multi-class classification
  // ═══════════════════════════════════════════════════════════════
  const SM_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];
  const SM_DEFAULTS = [2.0, 1.0, -0.5, 0.5, -1.0, 3.0];

  function buildSoftmaxSliders() {
    smN = parseInt(document.getElementById('softmax-n').value);
    const container = document.getElementById('softmax-sliders');
    container.innerHTML = '';
    for (let k = 0; k < smN; k++) {
      const def = SM_DEFAULTS[k] !== undefined ? SM_DEFAULTS[k] : 0;
      const div = document.createElement('div');
      div.className = 'control-row';
      div.innerHTML = `
        <label style="color:${SM_COLORS[k]}">Class ${k} logit z<sub>${k}</sub> = <strong id="smz${k}-val" class="param-val">${def.toFixed(1)}</strong></label>
        <input type="range" id="smz${k}" min="-5" max="5" step="0.1" value="${def}" />
      `;
      container.appendChild(div);
    }
    for (let k = 0; k < smN; k++) {
      const el  = document.getElementById(`smz${k}`);
      const val = document.getElementById(`smz${k}-val`);
      if (el) el.addEventListener('input', () => { if (val) val.textContent = parseFloat(el.value).toFixed(1); updateSoftmax(); });
    }
    updateSoftmax();
  }

  function updateSoftmax() {
    const zs = Array.from({ length: smN }, (_, k) => {
      const el = document.getElementById(`smz${k}`);
      return el ? parseFloat(el.value) : 0;
    });

    // Numerically stable softmax (subtract max)
    const maxZ = Math.max(...zs);
    const exps = zs.map(z => Math.exp(z - maxZ));
    const sumE = exps.reduce((a, b) => a + b, 0);
    const probs = exps.map(e => e / sumE);
    const argmax = probs.indexOf(Math.max(...probs));

    document.getElementById('sm-sum-check').textContent =
      `∑ probabilities = ${probs.reduce((a, b) => a + b, 0).toFixed(6)}  ✓  (always = 1)`;
    const predEl = document.getElementById('sm-prediction');
    predEl.textContent = `Predicted: Class ${argmax}  (${(probs[argmax] * 100).toFixed(1)}% confidence)`;
    predEl.style.color = SM_COLORS[argmax];

    const ctx = document.getElementById('softmaxChart').getContext('2d');
    if (smChart) smChart.destroy();

    smChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: zs.map((z, k) => `Class ${k}  (z=${z.toFixed(1)})`),
        datasets: [{
          label: 'Softmax probability',
          data: probs,
          backgroundColor: SM_COLORS.slice(0, smN).map((c, i) => i === argmax ? c : c + '55'),
          borderColor: SM_COLORS.slice(0, smN),
          borderWidth: 2,
        }]
      },
      options: {
        animation: { duration: 200 },
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: { min: 0, max: 1, grid: { color: '#30363d' }, ticks: { color: '#8b949e', callback: v => `${Math.round(v * 100)}%` }, title: { display: true, text: 'Probability', color: '#8b949e' } },
          y: { grid: { color: 'transparent' }, ticks: { color: '#c9d1d9', font: { size: 11 } } },
        },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => `  ${(c.parsed.x * 100).toFixed(2)}%` } }
        }
      }
    });
  }

  function initSoftmax() {
    document.getElementById('softmax-n').addEventListener('change', buildSoftmaxSliders);
    buildSoftmaxSliders();
  }

  // ═══════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════
  function init() {
    initSubNav();
    initSupUnsup();
    initSigmoid();
    initSoftmax();
  }

  return { init };
})();
