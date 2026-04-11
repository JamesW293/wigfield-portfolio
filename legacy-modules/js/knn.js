/**
 * knn.js
 * Interactive K-Nearest Neighbours visualiser.
 * - Canvas decision-boundary heatmap (background colour = predicted class)
 * - Click canvas to set a query point, see k nearest neighbours highlighted
 * - K slider, distance metric toggle (Euclidean / Manhattan)
 * - Shows sorted neighbour distances and majority vote
 */

const KNN = (() => {
  'use strict';

  // ── seeded dataset (2 classes, 40 points) ─────────────────────────────────
  const TRAIN = [
    // Class 0 (blue) — upper-left cluster
    {x:1.2,y:7.8},{x:1.8,y:6.5},{x:2.5,y:8.1},{x:0.9,y:5.9},{x:3.1,y:7.2},
    {x:1.5,y:9.0},{x:2.8,y:6.0},{x:0.5,y:7.0},{x:3.5,y:8.5},{x:2.0,y:5.5},
    {x:1.0,y:8.8},{x:3.8,y:6.8},{x:2.2,y:9.2},{x:0.7,y:6.2},{x:4.0,y:7.5},
    {x:1.6,y:7.0},{x:2.9,y:5.2},{x:3.3,y:9.0},{x:0.3,y:8.0},{x:4.5,y:8.0},
    // Class 1 (red) — lower-right cluster
    {x:6.2,y:2.8},{x:7.1,y:1.9},{x:5.8,y:3.5},{x:8.0,y:2.5},{x:6.8,y:4.0},
    {x:7.5,y:3.2},{x:5.5,y:2.0},{x:8.5,y:1.5},{x:6.0,y:4.5},{x:7.8,y:4.2},
    {x:5.2,y:3.0},{x:8.8,y:3.0},{x:6.5,y:1.5},{x:7.2,y:5.0},{x:5.0,y:4.0},
    {x:8.2,y:4.8},{x:6.3,y:3.8},{x:7.6,y:2.2},{x:5.7,y:4.8},{x:9.0,y:2.0},
  ];
  const LABELS = [
    0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,
    1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,
  ];

  const RANGE = { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
  const CLASS_COLORS = ['#60a5fa', '#f87171']; // blue, red
  const CLASS_NAMES  = ['Class A', 'Class B'];

  let canvas, ctx;
  let queryPt = null;    // { x, y } in data space
  let heatmap = null;    // ImageData cache keyed by k+metric
  let heatmapKey = '';

  // ── distance functions ─────────────────────────────────────────────────────
  function euclidean(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }
  function manhattan(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  // ── KNN predict ────────────────────────────────────────────────────────────
  function predict(qx, qy, k, metric) {
    const distFn = metric === 'manhattan' ? manhattan : euclidean;
    const dists = TRAIN.map((pt, i) => ({
      dist: distFn({ x: qx, y: qy }, pt),
      label: LABELS[i],
      pt,
    })).sort((a, b) => a.dist - b.dist);

    const neighbours = dists.slice(0, k);
    const votes = [0, 0];
    neighbours.forEach(n => votes[n.label]++);
    const predictedClass = votes[0] >= votes[1] ? 0 : 1;
    return { predictedClass, votes, neighbours };
  }

  // ── coordinate conversions ────────────────────────────────────────────────
  function dataToCanvas(dx, dy) {
    const { xMin, xMax, yMin, yMax } = RANGE;
    const cx = ((dx - xMin) / (xMax - xMin)) * canvas.width;
    const cy = canvas.height - ((dy - yMin) / (yMax - yMin)) * canvas.height;
    return { cx, cy };
  }
  function canvasToData(cx, cy) {
    const { xMin, xMax, yMin, yMax } = RANGE;
    const dx = xMin + (cx / canvas.width) * (xMax - xMin);
    const dy = yMin + (1 - cy / canvas.height) * (yMax - yMin);
    return { dx, dy };
  }

  // ── heatmap generation ────────────────────────────────────────────────────
  function buildHeatmap(k, metric) {
    const key = `${k}_${metric}`;
    if (key === heatmapKey && heatmap) return heatmap;

    const W = canvas.width;
    const H = canvas.height;
    const imgData = ctx.createImageData(W, H);

    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const { dx, dy } = canvasToData(px, py);
        const { predictedClass, votes } = predict(dx, dy, k, metric);
        // confidence = fraction of votes for winning class
        const conf = votes[predictedClass] / k;
        // base colour for class
        const base = predictedClass === 0 ? [60, 130, 200] : [200, 80, 80];
        const alpha = 0.15 + conf * 0.25; // 0.15–0.4
        const i = (py * W + px) * 4;
        imgData.data[i + 0] = base[0];
        imgData.data[i + 1] = base[1];
        imgData.data[i + 2] = base[2];
        imgData.data[i + 3] = Math.round(alpha * 255);
      }
    }

    heatmap = imgData;
    heatmapKey = key;
    return heatmap;
  }

  // ── draw ──────────────────────────────────────────────────────────────────
  function draw(k, metric) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Heatmap background
    const hm = buildHeatmap(k, metric);
    ctx.putImageData(hm, 0, 0);

    // Grid lines (faint)
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let v = 0; v <= 10; v++) {
      const { cx } = dataToCanvas(v, 0);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, canvas.height); ctx.stroke();
      const { cy } = dataToCanvas(0, v);
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(canvas.width, cy); ctx.stroke();
    }

    // Training points
    TRAIN.forEach((pt, i) => {
      const { cx, cy } = dataToCanvas(pt.x, pt.y);
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
      ctx.fillStyle = CLASS_COLORS[LABELS[i]];
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    });

    if (!queryPt) return;

    const { predictedClass, neighbours } = predict(queryPt.x, queryPt.y, k, metric);
    const { cx: qcx, cy: qcy } = dataToCanvas(queryPt.x, queryPt.y);

    // Draw lines to k neighbours
    neighbours.forEach(n => {
      const { cx: ncx, cy: ncy } = dataToCanvas(n.pt.x, n.pt.y);
      ctx.beginPath();
      ctx.moveTo(qcx, qcy);
      ctx.lineTo(ncx, ncy);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Highlight k neighbours with rings
    neighbours.forEach(n => {
      const { cx: ncx, cy: ncy } = dataToCanvas(n.pt.x, n.pt.y);
      ctx.beginPath();
      ctx.arc(ncx, ncy, 9, 0, 2 * Math.PI);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Query point
    ctx.beginPath();
    ctx.arc(qcx, qcy, 7, 0, 2 * Math.PI);
    ctx.fillStyle = CLASS_COLORS[predictedClass];
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // Label query point
    ctx.font = 'bold 12px system-ui';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText('?', qcx, qcy + 4);
  }

  // ── update neighbour table ────────────────────────────────────────────────
  function updateTable(k, metric) {
    const panel = document.getElementById('knn-result-panel');
    if (!panel) return;
    if (!queryPt) {
      panel.innerHTML = '<p class="muted-hint">Click the canvas to place a query point.</p>';
      return;
    }
    const { predictedClass, votes, neighbours } = predict(queryPt.x, queryPt.y, k, metric);
    const distFn = metric === 'manhattan' ? manhattan : euclidean;

    let rows = neighbours.map((n, i) =>
      `<tr>
        <td>${i + 1}</td>
        <td>${n.pt.x.toFixed(1)}, ${n.pt.y.toFixed(1)}</td>
        <td style="color:${CLASS_COLORS[n.label]}">${CLASS_NAMES[n.label]}</td>
        <td>${n.dist.toFixed(3)}</td>
      </tr>`
    ).join('');

    panel.innerHTML = `
      <div class="knn-verdict" style="border-color:${CLASS_COLORS[predictedClass]}">
        Predicted: <strong style="color:${CLASS_COLORS[predictedClass]}">${CLASS_NAMES[predictedClass]}</strong>
        &nbsp;·&nbsp; Votes: A=${votes[0]} / B=${votes[1]}
      </div>
      <table class="fs-table" style="margin-top:0.8rem">
        <thead><tr><th>#</th><th>Point</th><th>Class</th><th>Distance (${metric === 'manhattan' ? 'L1' : 'L2'})</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  // ── event handlers ────────────────────────────────────────────────────────
  function getK() {
    return parseInt(document.getElementById('knn-k').value, 10);
  }
  function getMetric() {
    return document.getElementById('knn-metric').value;
  }

  function onCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;
    const { dx, dy } = canvasToData(cx, cy);
    queryPt = { x: dx, y: dy };
    const k = getK(); const metric = getMetric();
    draw(k, metric);
    updateTable(k, metric);
  }

  function onParamChange() {
    heatmap = null; heatmapKey = '';
    const k = getK(); const metric = getMetric();
    document.getElementById('knn-k-val').textContent = k;
    draw(k, metric);
    updateTable(k, metric);
  }

  // ── init ──────────────────────────────────────────────────────────────────
  function init() {
    canvas = document.getElementById('knnCanvas');
    ctx = canvas.getContext('2d');

    // Fix canvas pixel dimensions
    canvas.width = 420;
    canvas.height = 420;

    document.getElementById('knn-k').addEventListener('input', onParamChange);
    document.getElementById('knn-metric').addEventListener('change', onParamChange);
    canvas.addEventListener('click', onCanvasClick);

    // Initial draw (no query point)
    heatmap = null; heatmapKey = '';
    draw(getK(), getMetric());
    updateTable(getK(), getMetric());
  }

  return { init };
})();
