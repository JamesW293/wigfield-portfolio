/**
 * learning-curves.js
 * Plots training and validation MSE as a function of training set size
 * for a polynomial model of adjustable degree.
 * Illustrates the bias-variance tradeoff:
 *   Low degree  → both curves plateau high (high bias / underfitting)
 *   High degree → large gap between curves (high variance / overfitting)
 */

const LearningCurves = (() => {

  let chart = null;
  let allData = null;   // { xTrain, yTrain, xVal, yVal }

  const MIN_TRAIN = 5;  // minimum subset size

  /**
   * For a given polynomial degree, compute train and val MSE as a function
   * of the number of training examples used.
   */
  function computeCurves(degree) {
    const { xTrain, yTrain, xVal, yVal } = allData;
    const maxN = xTrain.length;
    const trainMSEs = [];
    const valMSEs   = [];
    const sizes     = [];

    for (let n = MIN_TRAIN; n <= maxN; n += 2) {
      const xSub = xTrain.slice(0, n);
      const ySub = yTrain.slice(0, n);

      // Clamp degree so normal equations remain solvable
      const d = Math.min(degree, n - 2, 10);

      const theta = MathUtils.fitPolynomial(xSub, ySub, d);

      const yHatTrain = xSub.map(x => MathUtils.evalPolynomial(theta, x));
      const trainMSE  = MathUtils.mse(yHatTrain, ySub);

      const yHatVal   = xVal.map(x => MathUtils.evalPolynomial(theta, x));
      const valMSE    = MathUtils.mse(yHatVal, yVal);

      sizes.push(n);
      trainMSEs.push({ x: n, y: Math.min(trainMSE, 5) });
      valMSEs.push(  { x: n, y: Math.min(valMSE,   5) });
    }

    return { sizes, trainMSEs, valMSEs };
  }

  function fitBadgeClass(degree) {
    if (degree <= 2) return ['fit-underfitting', '⬇ High Bias (Underfitting)'];
    if (degree <= 5) return ['fit-good',         '✓ Good Balance'];
    return               ['fit-overfitting',     '↑ High Variance (Overfitting)'];
  }

  function initChart() {
    const ctx = document.getElementById('lcChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Training MSE',
            data: [],
            borderColor: 'rgba(99,102,241,0.9)',
            backgroundColor: 'rgba(99,102,241,0.08)',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
            fill: false,
            parsing: false,
          },
          {
            label: 'Validation MSE',
            data: [],
            borderColor: 'rgba(239,68,68,0.9)',
            backgroundColor: 'rgba(239,68,68,0.08)',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
            fill: false,
            parsing: false,
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
            mode: 'index',
            intersect: false,
            backgroundColor: '#1e2530',
            borderColor: '#30363d',
            borderWidth: 1,
            titleColor: '#c9d1d9',
            bodyColor: '#8b949e',
            callbacks: {
              title: items => `Training size: ${items[0].parsed.x}`,
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(4)}`
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: 'Training set size (m)', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e', maxTicksLimit: 10 }
          },
          y: {
            min: 0,
            max: 3.5,
            title: { display: true, text: 'MSE', color: '#8b949e' },
            grid:  { color: 'rgba(48,54,61,0.6)' },
            ticks: { color: '#8b949e' }
          }
        }
      }
    });
  }

  function update(degree) {
    const { trainMSEs, valMSEs } = computeCurves(degree);

    chart.data.datasets[0].data = trainMSEs;
    chart.data.datasets[1].data = valMSEs;
    chart.update('none');

    // Final MSE values (last training size)
    const finalTrain = trainMSEs[trainMSEs.length - 1];
    const finalVal   = valMSEs[valMSEs.length - 1];
    document.getElementById('lcTrainMSE').textContent = finalTrain ? finalTrain.y.toFixed(4) : '—';
    document.getElementById('lcValMSE').textContent   = finalVal   ? finalVal.y.toFixed(4)   : '—';

    // Fit badge
    const [cls, label] = fitBadgeClass(degree);
    const badge = document.getElementById('lcFitBadge');
    badge.textContent = label;
    badge.className   = `fit-badge ${cls}`;
  }

  function init() {
    allData = MathUtils.generateLCData(60, 40, 7, 0.45);
    initChart();

    const degreeSlider = document.getElementById('lcDegree');
    const degreeVal    = document.getElementById('lcDegreeVal');

    degreeSlider.addEventListener('input', () => {
      const d = parseInt(degreeSlider.value);
      degreeVal.textContent = d;
      update(d);
    });

    update(1);
  }

  return { init };
})();
