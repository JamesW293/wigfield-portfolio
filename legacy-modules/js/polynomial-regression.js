/**
 * polynomial-regression.js
 * Fits a polynomial of adjustable degree to noisy sin(x) data.
 * Demonstrates underfitting → good fit → overfitting as degree increases.
 */

const PolyRegression = (() => {

  let chart = null;
  let data  = null;    // { xTrain, yTrain, xTrue, yTrue }

  const CURVE_N = 300; // number of points for the fitted curve
  const X_MIN   = -Math.PI;
  const X_MAX   =  Math.PI;

  function buildFitCurve(theta) {
    const pts = [];
    for (let i = 0; i <= CURVE_N; i++) {
      const x = X_MIN + (X_MAX - X_MIN) * (i / CURVE_N);
      const y = MathUtils.evalPolynomial(theta, x);
      pts.push({ x, y });
    }
    return pts;
  }

  function initChart() {
    const ctx = document.getElementById('polyChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            // True function sin(x)
            label: 'True: sin(x)',
            data: [],
            type: 'line',
            borderColor: 'rgba(34,197,94,0.6)',
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            tension: 0.1,
            order: 3,
            parsing: false,
          },
          {
            // Fitted polynomial
            label: 'Polynomial fit',
            data: [],
            type: 'line',
            borderColor: '#f59e0b',
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0,
            order: 2,
            parsing: false,
          },
          {
            // Training data scatter
            label: 'Training data',
            data: [],
            type: 'scatter',
            borderColor: 'rgba(99,102,241,0.9)',
            backgroundColor: 'rgba(99,102,241,0.35)',
            pointRadius: 5,
            pointHoverRadius: 7,
            order: 1,
            parsing: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 150 },
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
          }
        },
        scales: {
          x: {
            type: 'linear',
            min: X_MIN - 0.3,
            max: X_MAX + 0.3,
            title: { display: true, text: 'x', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e', maxTicksLimit: 8 }
          },
          y: {
            min: -3,
            max:  3,
            title: { display: true, text: 'y', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e' }
          }
        }
      }
    });
  }

  function fitAndRender(degree) {
    const { xTrain, yTrain, xTrue, yTrue } = data;

    // Clamp degree to avoid extreme numerical issues
    const d = Math.min(degree, xTrain.length - 2, 12);
    const theta = MathUtils.fitPolynomial(xTrain, yTrain, d);

    // Evaluate fit over dense grid
    const fitCurve = buildFitCurve(theta);

    // Train MSE
    const yHat   = xTrain.map(x => MathUtils.evalPolynomial(theta, x));
    const trainMSE = MathUtils.mse(yHat, yTrain);

    // Update chart datasets
    chart.data.datasets[0].data = xTrue.map((x, i) => ({ x, y: yTrue[i] }));
    chart.data.datasets[1].data = fitCurve;
    chart.data.datasets[2].data = xTrain.map((x, i) => ({ x, y: yTrain[i] }));
    chart.update('none');

    // Update info chips
    document.getElementById('polyMSE').textContent       = trainMSE.toFixed(4);
    document.getElementById('polyDegreeChip').textContent = d;

    // Fit badge
    const badge = document.getElementById('polyFitBadge');
    if (d <= 1) {
      badge.textContent = '⬇ Underfitting';
      badge.className   = 'fit-badge fit-underfitting';
    } else if (d <= 5) {
      badge.textContent = '✓ Good Fit';
      badge.className   = 'fit-badge fit-good';
    } else {
      badge.textContent = '↑ Overfitting';
      badge.className   = 'fit-badge fit-overfitting';
    }
  }

  function loadData(seed) {
    data = MathUtils.generateSinData(30, seed, 0.35);
    // Pre-populate true curve
    chart.data.datasets[0].data = data.xTrue.map((x, i) => ({ x, y: data.yTrue[i] }));
    chart.update('none');
  }

  function init() {
    initChart();

    let seed = 42;
    loadData(seed);
    fitAndRender(1);

    const degreeSlider = document.getElementById('polyDegree');
    const degreeVal    = document.getElementById('polyDegreeVal');

    degreeSlider.addEventListener('input', () => {
      const d = parseInt(degreeSlider.value);
      degreeVal.textContent = d;
      fitAndRender(d);
    });

    document.getElementById('polyResample').addEventListener('click', () => {
      seed = Math.floor(Math.random() * 9999);
      loadData(seed);
      fitAndRender(parseInt(degreeSlider.value));
    });
  }

  return { init };
})();
