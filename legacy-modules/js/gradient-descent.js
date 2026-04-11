/**
 * gradient-descent.js
 * Visualises Gradient Descent on J(θ) = (θ − 2)²
 * Demonstrates the effect of learning rate η on convergence / divergence.
 */

const GradientDescent = (() => {

  // ── Cost function and its derivative ──
  const J      = theta => (theta - 2) ** 2;
  const dJ     = theta => 2 * (theta - 2);
  const THETA_MIN = -6, THETA_MAX = 8;
  const MAX_DISPLAY_STEPS = 50;

  let chart = null;
  let steps = [];        // [{theta, cost}]
  let displayedCount = 0;
  let animFrame = null;

  // ── Compute all GD steps up-front ──
  function computeSteps(startTheta, eta, maxSteps) {
    const pts = [{ theta: startTheta, cost: J(startTheta) }];
    let theta = startTheta;
    for (let i = 0; i < maxSteps; i++) {
      theta = theta - eta * dJ(theta);
      pts.push({ theta, cost: J(theta) });
      // Stop early if diverged (no point plotting infinity)
      if (Math.abs(theta) > 60 || !isFinite(theta)) break;
    }
    return pts;
  }

  // ── Build the smooth parabola data for the chart ──
  function buildCurve() {
    const pts = [];
    const N = 300;
    for (let i = 0; i <= N; i++) {
      const t = THETA_MIN + (THETA_MAX - THETA_MIN) * (i / N);
      pts.push({ x: t, y: J(t) });
    }
    return pts;
  }

  // ── Initialise the Chart.js instance ──
  function initChart() {
    const ctx = document.getElementById('gdChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            // Smooth parabola
            label: 'J(θ) = (θ − 2)²',
            data: buildCurve(),
            type: 'line',
            borderColor: 'rgba(99,102,241,0.9)',
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.1,
            order: 3,
            parsing: false,
          },
          {
            // GD path (line connecting steps)
            label: 'GD path',
            data: [],
            type: 'line',
            borderColor: 'rgba(245,158,11,0.45)',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0,
            order: 2,
            parsing: false,
          },
          {
            // GD step markers
            label: 'Steps',
            data: [],
            type: 'scatter',
            borderColor: '#f59e0b',
            backgroundColor: pts => {
              // Last point = bright, others = faded
              const arr = pts.dataset.data;
              return pts.dataIndex === arr.length - 1
                ? '#f59e0b'
                : 'rgba(245,158,11,0.4)';
            },
            pointRadius: pts => pts.dataIndex === pts.dataset.data.length - 1 ? 8 : 5,
            pointHoverRadius: 8,
            order: 1,
            parsing: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 120 },
        plugins: {
          legend: {
            labels: { color: '#8b949e', font: { size: 11 }, boxWidth: 16 }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` θ = ${ctx.parsed.x.toFixed(3)},  J(θ) = ${ctx.parsed.y.toFixed(3)}`
            },
            backgroundColor: '#1e2530',
            borderColor: '#30363d',
            borderWidth: 1,
            titleColor: '#c9d1d9',
            bodyColor: '#8b949e',
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: THETA_MIN,
            max: THETA_MAX,
            title: { display: true, text: 'θ', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e', maxTicksLimit: 10 }
          },
          y: {
            min: 0,
            max: 70,
            title: { display: true, text: 'J(θ)', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e' }
          }
        }
      }
    });
  }

  // ── Update chart data to show first `count` steps ──
  function renderSteps(count) {
    const visible = steps.slice(0, count + 1);
    const pathData   = visible.map(s => ({ x: s.theta, y: s.cost }));
    const markerData = visible.map(s => ({ x: s.theta, y: s.cost }));

    chart.data.datasets[1].data = pathData;
    chart.data.datasets[2].data = markerData;
    chart.update('none');

    // Info chips
    if (visible.length > 0) {
      const last = visible[visible.length - 1];
      document.getElementById('gdCurStep').textContent  = visible.length - 1;
      document.getElementById('gdCurTheta').textContent = last.theta.toFixed(4);
      document.getElementById('gdCurCost').textContent  = last.cost.toFixed(4);
    }
  }

  // ── Refresh everything when a control changes ──
  function rebuild() {
    cancelAnimationFrame(animFrame);
    const eta      = parseFloat(document.getElementById('gdLR').value);
    const maxSteps = parseInt(document.getElementById('gdSteps').value);
    const start    = parseFloat(document.getElementById('gdStart').value);

    steps = computeSteps(start, eta, maxSteps);
    displayedCount = 0;
    renderSteps(0);
    updateHint(eta);

    document.getElementById('gdStatus').textContent = '';
  }

  function updateHint(eta) {
    const hint = document.getElementById('gdHint');
    if (eta < 0.05) {
      hint.style.color = '#3b82f6';
      hint.textContent = 'Very small η → extremely slow convergence.';
    } else if (eta < 0.8) {
      hint.style.color = '#22c55e';
      hint.textContent = 'Good range — expect stable convergence.';
    } else if (eta < 1.0) {
      hint.style.color = '#f59e0b';
      hint.textContent = 'Large η — convergence may oscillate.';
    } else if (eta < 1.0 + 1e-9) {
      hint.style.color = '#ef4444';
      hint.textContent = 'η = 1 → algorithm oscillates indefinitely.';
    } else {
      hint.style.color = '#ef4444';
      hint.textContent = 'η > 1 → DIVERGENCE! Cost grows each step.';
    }
  }

  // ── Public init ──
  function init() {
    initChart();

    // Controls
    const lrSlider     = document.getElementById('gdLR');
    const stepsSlider  = document.getElementById('gdSteps');
    const startSlider  = document.getElementById('gdStart');
    const lrVal        = document.getElementById('gdLRVal');
    const stepsVal     = document.getElementById('gdStepsVal');
    const startVal     = document.getElementById('gdStartVal');

    lrSlider.addEventListener('input', () => {
      lrVal.textContent = parseFloat(lrSlider.value).toFixed(2);
      rebuild();
    });
    stepsSlider.addEventListener('input', () => {
      stepsVal.textContent = stepsSlider.value;
      rebuild();
    });
    startSlider.addEventListener('input', () => {
      startVal.textContent = parseFloat(startSlider.value).toFixed(1);
      rebuild();
    });

    document.getElementById('gdReset').addEventListener('click', () => {
      cancelAnimationFrame(animFrame);
      displayedCount = 0;
      renderSteps(0);
      document.getElementById('gdStatus').textContent = '';
    });

    document.getElementById('gdStep').addEventListener('click', () => {
      cancelAnimationFrame(animFrame);
      if (displayedCount < steps.length - 1) {
        displayedCount++;
        renderSteps(displayedCount);
        const last = steps[displayedCount];
        if (Math.abs(last.theta) > 55 || !isFinite(last.theta)) {
          document.getElementById('gdStatus').textContent = '⚠ Diverged — try reducing η.';
        }
      } else {
        document.getElementById('gdStatus').textContent = 'Reached max steps.';
      }
    });

    document.getElementById('gdRun').addEventListener('click', () => {
      cancelAnimationFrame(animFrame);
      function animate() {
        if (displayedCount < steps.length - 1) {
          displayedCount++;
          renderSteps(displayedCount);
          const last = steps[displayedCount];
          if (Math.abs(last.theta) > 55 || !isFinite(last.theta)) {
            document.getElementById('gdStatus').textContent = '⚠ Diverged — try reducing η.';
            return;
          }
          animFrame = requestAnimationFrame(animate);
        } else {
          document.getElementById('gdStatus').textContent = 'Converged (or max steps reached).';
        }
      }
      animate();
    });

    rebuild();
  }

  return { init };
})();
