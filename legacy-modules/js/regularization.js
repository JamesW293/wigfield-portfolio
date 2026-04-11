/**
 * regularization.js
 * Shows how Ridge, Lasso, and Elastic Net regularisation shrink coefficients.
 *
 * Uses analytical/soft-thresholding solutions for an orthogonal design,
 * which cleanly demonstrates the key behavioural difference:
 *   Ridge  →  θ_j^ridge = θ_j^OLS / (1 + α)           (smooth shrinkage)
 *   Lasso  →  θ_j^lasso = sign(θ) · max(0, |θ| − α)   (sparse, exact zeros)
 *   ElNet  →  combination via mix ratio r
 */

const Regularization = (() => {

  // "True" OLS coefficients for 7 features (hypothetical regression problem)
  const OLS_COEFFS  = [2.8, -1.9, 3.4, -0.6, 1.5, -2.7, 0.4];
  const FEAT_LABELS = ['x₁', 'x₂', 'x₃', 'x₄', 'x₅', 'x₆', 'x₇'];

  const COLORS_POS = 'rgba(99,102,241,0.75)';
  const COLORS_NEG = 'rgba(239,68,68,0.75)';
  const COLORS_ZERO = 'rgba(48,54,61,0.6)';

  let chart  = null;
  let method = 'ridge';

  function applyRidge(olsCoeffs, alpha) {
    return olsCoeffs.map(c => c / (1 + alpha));
  }

  function applyLasso(olsCoeffs, alpha) {
    return olsCoeffs.map(c => Math.sign(c) * Math.max(0, Math.abs(c) - alpha));
  }

  function applyElasticNet(olsCoeffs, alpha, r) {
    // Closed-form for orthogonal design:
    // θ_j^EN = sign(θ_j^OLS) · max(0, |θ_j^OLS| − r·α) / (1 + (1−r)·α)
    return olsCoeffs.map(c => {
      const soft = Math.sign(c) * Math.max(0, Math.abs(c) - r * alpha);
      return soft / (1 + (1 - r) * alpha);
    });
  }

  function computeCoeffs(alpha, r) {
    switch (method) {
      case 'ridge':   return applyRidge(OLS_COEFFS, alpha);
      case 'lasso':   return applyLasso(OLS_COEFFS, alpha);
      case 'elastic': return applyElasticNet(OLS_COEFFS, alpha, r);
      default:        return OLS_COEFFS;
    }
  }

  function barColors(coeffs) {
    return coeffs.map(c =>
      Math.abs(c) < 1e-6 ? COLORS_ZERO : (c >= 0 ? COLORS_POS : COLORS_NEG)
    );
  }

  function initChart() {
    const ctx = document.getElementById('regChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: FEAT_LABELS,
        datasets: [
          {
            label: 'OLS (unregularised)',
            data: OLS_COEFFS,
            backgroundColor: OLS_COEFFS.map(c => c >= 0 ? 'rgba(99,102,241,0.2)' : 'rgba(239,68,68,0.2)'),
            borderColor: OLS_COEFFS.map(c => c >= 0 ? 'rgba(99,102,241,0.5)' : 'rgba(239,68,68,0.5)'),
            borderWidth: 1.5,
            borderDash: [4, 3],
            type: 'bar',
            order: 2,
          },
          {
            label: 'Regularised',
            data: OLS_COEFFS.slice(),
            backgroundColor: barColors(OLS_COEFFS),
            borderColor: barColors(OLS_COEFFS).map(c => c.replace('0.75', '1')),
            borderWidth: 1.5,
            type: 'bar',
            order: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 200 },
        plugins: {
          legend: {
            labels: { color: '#8b949e', font: { size: 11 }, boxWidth: 16 }
          },
          tooltip: {
            backgroundColor: '#1e2530',
            borderColor: '#30363d',
            borderWidth: 1,
            titleColor: '#c9d1d9',
            bodyColor: '#8b949e',
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(4)}`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#8b949e', font: { size: 12, weight: '600' } },
            grid:  { display: false }
          },
          y: {
            min: -4, max: 4,
            title: { display: true, text: 'Coefficient value', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e' }
          }
        }
      }
    });
  }

  function updateChart() {
    const alpha = parseFloat(document.getElementById('regAlpha').value);
    const r     = parseFloat(document.getElementById('regMix').value);
    const coeffs = computeCoeffs(alpha, r);

    chart.data.datasets[1].data = coeffs;
    chart.data.datasets[1].backgroundColor = barColors(coeffs);
    chart.data.datasets[1].borderColor = barColors(coeffs).map(c => c.replace('0.75', '1'));
    chart.data.datasets[1].label = method.charAt(0).toUpperCase() + method.slice(1) + ' (α=' + alpha.toFixed(2) + ')';
    chart.update('none');

    // Update insight
    const zeroCount = coeffs.filter(c => Math.abs(c) < 1e-6).length;
    const insight = document.getElementById('regInsight');
    if (method === 'lasso' && zeroCount > 0) {
      insight.innerHTML = `<strong>Lasso feature selection:</strong> ${zeroCount} of ${OLS_COEFFS.length} features have been driven <em>exactly to zero</em> at α = ${alpha.toFixed(2)}. This is automatic feature selection — Ridge would only shrink these, never zero them.`;
    } else if (method === 'ridge') {
      insight.innerHTML = `<strong>Ridge</strong> shrinks all coefficients proportionally toward zero but never reaches exactly zero. Useful when most features contribute.`;
    } else if (method === 'elastic') {
      insight.innerHTML = `<strong>Elastic Net</strong> (mix ratio r = ${r.toFixed(2)}) blends both penalties. At r≈1 it behaves like Lasso; at r≈0 like Ridge.`;
    } else {
      insight.innerHTML = `<strong>Lasso</strong> applies soft-thresholding — increase α further to eliminate more features.`;
    }
  }

  function init() {
    initChart();

    const alphaSlider = document.getElementById('regAlpha');
    const alphaVal    = document.getElementById('regAlphaVal');
    const mixSlider   = document.getElementById('regMix');
    const mixVal      = document.getElementById('regMixVal');
    const mixRow      = document.getElementById('regMixRow');

    alphaSlider.addEventListener('input', () => {
      alphaVal.textContent = parseFloat(alphaSlider.value).toFixed(2);
      updateChart();
    });

    mixSlider.addEventListener('input', () => {
      mixVal.textContent = parseFloat(mixSlider.value).toFixed(2);
      updateChart();
    });

    document.querySelectorAll('#regMethodToggle .toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#regMethodToggle .toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        method = btn.dataset.method;
        mixRow.style.display = method === 'elastic' ? '' : 'none';
        updateChart();
      });
    });

    updateChart();
  }

  return { init };
})();
