/**
 * early-stopping.js
 * Animated visualiser for patience-based early stopping with SGD.
 * Based on CITS5508 mid-sem sample question 4.
 */

const EarlyStopping = (() => {
  'use strict';

  let esChart = null;
  let esState = null;
  let esTimer = null;

  // Simple seeded RNG for reproducible curves
  function makeRng(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  function generateCurves() {
    const rng = makeRng(1337);
    const N = 80;
    const train = [], val = [];
    for (let e = 0; e < N; e++) {
      // Train: smooth exponential decrease
      const tBase = 1.8 * Math.exp(-e * 0.065) + 0.18;
      // Val: decreases then slowly creeps up (overfitting)
      const vBase = 1.8 * Math.exp(-e * 0.065) + 0.18 + 0.00045 * Math.pow(Math.max(0, e - 16), 2);
      const n = () => (rng() - 0.5) * 0.04;
      train.push(parseFloat(Math.max(0.1, tBase + n()).toFixed(5)));
      val.push(parseFloat(Math.max(0.1, vBase + n()).toFixed(5)));
    }
    return { train, val };
  }

  const CURVES = generateCurves(); // fixed curves, only patience & display vary

  function getPatience() { return parseInt(document.getElementById('es-patience').value) || 10; }

  function resetES() {
    if (esTimer) { clearInterval(esTimer); esTimer = null; }
    document.getElementById('es-btn-auto').textContent = '▶ Auto';
    document.getElementById('es-btn-auto').disabled = false;
    document.getElementById('es-btn-step').disabled = false;

    esState = {
      patience:   getPatience(),
      epoch:      0,
      bestVal:    Infinity,
      bestEpoch:  -1,
      curr:       0,
      stopped:    false,
    };

    updateChips();
    document.getElementById('es-status').innerHTML =
      'Press <strong>Step →</strong> or <strong>▶ Auto</strong> to simulate training.';
    renderESChart([], [], -1, -1);
  }

  function updateChips() {
    const { patience, epoch, bestVal, bestEpoch, curr } = esState;
    document.getElementById('es-curr-epoch').textContent = epoch;
    const pct = curr / patience;
    const col = pct < 0.4 ? 'var(--green)' : pct < 0.8 ? 'var(--yellow)' : 'var(--red)';
    document.getElementById('es-patience-counter').innerHTML =
      `<span style="color:${col}">${curr}</span> / ${patience}`;
    document.getElementById('es-best-rmse').textContent = bestVal === Infinity ? '—' : bestVal.toFixed(5);
    document.getElementById('es-best-epoch').textContent = bestEpoch < 0 ? '—' : bestEpoch + 1;
  }

  function esStep() {
    if (!esState || esState.stopped) return;
    const { train, val } = CURVES;
    const e = esState.epoch;
    if (e >= train.length) { esState.stopped = true; return; }

    const valErr = val[e];
    esState.epoch++;

    const improved = valErr < esState.bestVal;
    if (improved) {
      esState.bestVal   = valErr;
      esState.bestEpoch = e;
      esState.curr      = 0;
    } else {
      esState.curr++;
    }

    updateChips();

    if (esState.curr >= esState.patience) {
      esState.stopped = true;
      document.getElementById('es-status').innerHTML =
        `<span style="color:var(--red)"><strong>Early stop triggered</strong></span> at epoch ${esState.epoch}. ` +
        `Best model saved from epoch <strong>${esState.bestEpoch + 1}</strong> ` +
        `(val RMSE = <strong>${esState.bestVal.toFixed(5)}</strong>). ` +
        `Continuing beyond this would increase overfitting.`;
      document.getElementById('es-btn-step').disabled = true;
      document.getElementById('es-btn-auto').disabled = true;
      if (esTimer) { clearInterval(esTimer); esTimer = null; document.getElementById('es-btn-auto').textContent = '▶ Auto'; }
    } else {
      const patience = esState.patience;
      const curr     = esState.curr;
      if (improved) {
        document.getElementById('es-status').innerHTML =
          `Epoch ${esState.epoch}: val RMSE = ${valErr.toFixed(5)} — ` +
          `<span style="color:var(--green)">↓ new best</span>. Counter reset to 0.`;
      } else {
        document.getElementById('es-status').innerHTML =
          `Epoch ${esState.epoch}: val RMSE = ${valErr.toFixed(5)} — ` +
          `<span style="color:var(--yellow)">no improvement</span>. Patience: ${curr}/${patience}.`;
      }
    }

    renderESChart(
      train.slice(0, esState.epoch),
      val.slice(0, esState.epoch),
      esState.bestEpoch,
      esState.stopped ? esState.epoch - 1 : -1
    );
  }

  function renderESChart(trainData, valData, bestEpoch, stopEpoch) {
    const ctx = document.getElementById('esChart').getContext('2d');
    if (esChart) esChart.destroy();

    const labels = trainData.map((_, i) => i + 1);

    const datasets = [
      {
        label: 'Train RMSE',
        data: trainData,
        borderColor: '#6366f1', borderWidth: 2, pointRadius: 0, tension: 0.3,
      },
      {
        label: 'Validation RMSE',
        data: valData,
        borderColor: '#f59e0b', borderWidth: 2, pointRadius: 0, tension: 0.3,
      },
    ];

    if (bestEpoch >= 0 && bestEpoch < valData.length) {
      datasets.push({
        label: `Best model (epoch ${bestEpoch + 1})`,
        data: labels.map((_, i) => i === bestEpoch ? valData[bestEpoch] : null),
        type: 'scatter', pointRadius: 9,
        backgroundColor: '#22c55e', borderColor: '#22c55e', showLine: false,
      });
    }

    if (stopEpoch >= 0 && stopEpoch < valData.length) {
      datasets.push({
        label: `Early stop (epoch ${stopEpoch + 1})`,
        data: labels.map((_, i) => i === stopEpoch ? valData[stopEpoch] : null),
        type: 'scatter', pointRadius: 9,
        backgroundColor: '#ef4444', borderColor: '#ef4444', showLine: false,
      });
    }

    esChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: {
            grid: { color: '#30363d' }, ticks: { color: '#8b949e' },
            title: { display: true, text: 'Epoch', color: '#8b949e' }
          },
          y: {
            min: 0,
            grid: { color: '#30363d' }, ticks: { color: '#8b949e' },
            title: { display: true, text: 'RMSE', color: '#8b949e' }
          }
        },
        plugins: {
          legend: { labels: { color: '#c9d1d9', font: { size: 11 }, boxWidth: 20 } }
        }
      }
    });
  }

  function init() {
    document.getElementById('es-patience').addEventListener('change', resetES);
    document.getElementById('es-btn-reset').addEventListener('click', resetES);
    document.getElementById('es-btn-step').addEventListener('click', esStep);
    document.getElementById('es-btn-auto').addEventListener('click', () => {
      if (esTimer) {
        clearInterval(esTimer); esTimer = null;
        document.getElementById('es-btn-auto').textContent = '▶ Auto';
      } else {
        document.getElementById('es-btn-auto').textContent = '⏸ Pause';
        esTimer = setInterval(() => {
          if (!esState || esState.stopped) {
            clearInterval(esTimer); esTimer = null;
            document.getElementById('es-btn-auto').textContent = '▶ Auto';
            return;
          }
          esStep();
        }, 80);
      }
    });
    resetES();
  }

  return { init };
})();
