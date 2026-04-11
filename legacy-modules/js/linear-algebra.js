/**
 * linear-algebra.js
 * Interactive visualisers for vectors and matrices (PDF 2 — Linear Algebra).
 * Sub-sections: Vectors | Matrix Multiply | Transpose | Det & Inverse
 */

const LinearAlgebra = (() => {
  'use strict';

  // ── Sub-nav ──────────────────────────────────────────────────────────────
  function initSubNav() {
    const section = document.getElementById('module-linalg');
    section.querySelectorAll('.sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        section.querySelectorAll('.sub-btn').forEach(b => b.classList.toggle('active', b === btn));
        section.querySelectorAll('.sub-panel').forEach(p => p.classList.toggle('active', p.id === btn.dataset.sub));
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // VECTORS
  // ═══════════════════════════════════════════════════════════════
  function initVectors() {
    function getVec(ids) {
      return ids.map(id => parseFloat(document.getElementById(id).value) || 0);
    }

    function renderVecBox(containerId, vec, label) {
      const el = document.getElementById(containerId);
      if (!el) return;
      el.innerHTML = `<div class="vec-label-top">${label}</div>` +
        vec.map(v => `<div class="vec-cell">${v % 1 === 0 ? v : v.toFixed(2)}</div>`).join('');
    }

    function update() {
      const u = getVec(['va1','va2','va3']);
      const v = getVec(['vb1','vb2','vb3']);
      const sum = u.map((x, i) => x + v[i]);
      const dot = u.reduce((acc, x, i) => acc + x * v[i], 0);
      const normU = Math.sqrt(u.reduce((a, x) => a + x * x, 0));
      const normV = Math.sqrt(v.reduce((a, x) => a + x * x, 0));

      renderVecBox('vec-u-display', u, 'u');
      renderVecBox('vec-v-display', v, 'v');
      renderVecBox('vec-sum-display', sum, 'u+v');

      const dotTerms = u.map((x, i) => `(${x} × ${v[i]})`).join(' + ');
      document.getElementById('dot-expansion').textContent =
        `u · v = ${dotTerms} = ${dot.toFixed(4)}`;

      document.getElementById('norm-u').textContent =
        `||u||₂ = √(${u.map(x => `${x}²`).join('+')}) = ${normU.toFixed(4)}`;
      document.getElementById('norm-v').textContent =
        `||v||₂ = √(${v.map(x => `${x}²`).join('+')}) = ${normV.toFixed(4)}`;

      if (normU > 0 && normV > 0) {
        const cosT = Math.max(-1, Math.min(1, dot / (normU * normV)));
        const angle = (Math.acos(cosT) * 180 / Math.PI).toFixed(1);
        document.getElementById('vec-angle').textContent =
          `angle between u and v = arccos(${(dot/(normU*normV)).toFixed(3)}) = ${angle}°`;
      } else {
        document.getElementById('vec-angle').textContent = 'angle: undefined (zero vector)';
      }
    }

    ['va1','va2','va3','vb1','vb2','vb3'].forEach(id =>
      document.getElementById(id).addEventListener('input', update));
    update();
  }

  // ═══════════════════════════════════════════════════════════════
  // MATRIX MULTIPLY — step-by-step
  // ═══════════════════════════════════════════════════════════════
  let mmState = null;
  let autoTimer = null;

  function readMatrix(prefix, rows, cols) {
    const mat = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const el = document.getElementById(`${prefix}_${i}_${j}`);
        row.push(el ? (parseFloat(el.value) || 0) : 0);
      }
      mat.push(row);
    }
    return mat;
  }

  function matMul(A, B) {
    const n = A.length, p = B.length, q = B[0].length;
    const C = Array.from({length: n}, () => new Array(q).fill(0));
    for (let i = 0; i < n; i++)
      for (let j = 0; j < q; j++)
        for (let k = 0; k < p; k++)
          C[i][j] += A[i][k] * B[k][j];
    return C;
  }

  function buildInputTable(containerId, rows, cols, prefix, defaults) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const table = document.createElement('table');
    table.className = 'mat-table mat-input-table';
    for (let i = 0; i < rows; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
        const td = document.createElement('td');
        const inp = document.createElement('input');
        inp.type = 'number';
        inp.id = `${prefix}_${i}_${j}`;
        inp.className = 'mat-cell-input';
        inp.value = defaults && defaults[i] && defaults[i][j] !== undefined
          ? defaults[i][j]
          : (Math.floor(Math.random() * 7) - 3);
        td.appendChild(inp);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    container.innerHTML = '';
    container.appendChild(table);
  }

  function buildDisplayTable(containerId, rows, cols, prefix, values, empty) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const table = document.createElement('table');
    table.className = 'mat-table mat-display-table';
    for (let i = 0; i < rows; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
        const td = document.createElement('td');
        td.className = 'mat-cell' + (empty ? ' mat-cell-empty' : '');
        td.id = `mc-${prefix}-${i}-${j}`;
        td.textContent = empty ? '?' : (values ? round2(values[i][j]) : '');
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    container.innerHTML = '';
    container.appendChild(table);
  }

  function round2(v) { return parseFloat(v.toFixed(2)); }

  function applyHighlights(rA, cA, cB, i, j) {
    document.querySelectorAll('#mm-display-A .mat-cell, #mm-display-B .mat-cell, #mm-display-C .mat-cell')
      .forEach(c => c.classList.remove('hl-row','hl-col','hl-active','hl-done'));

    if (i < 0) return;

    for (let k = 0; k < cA; k++) {
      const c = document.getElementById(`mc-A-${i}-${k}`);
      if (c) c.classList.add('hl-row');
    }
    for (let k = 0; k < cA; k++) {
      const c = document.getElementById(`mc-B-${k}-${j}`);
      if (c) c.classList.add('hl-col');
    }
    const active = document.getElementById(`mc-C-${i}-${j}`);
    if (active) active.classList.add('hl-active');

    const stepsDone = i * cB + j;
    for (let s = 0; s < stepsDone; s++) {
      const ri = Math.floor(s / cB), ci = s % cB;
      const prev = document.getElementById(`mc-C-${ri}-${ci}`);
      if (prev) prev.classList.add('hl-done');
    }
  }

  function showExpansion(A, B, i, j) {
    const row = A[i];
    const col = B.map(r => r[j]);
    const terms = row.map((v, k) =>
      `<span class="dot-term"><span class="dot-a">${v}</span>×<span class="dot-b">${col[k]}</span></span>`
    ).join(' + ');
    const result = row.reduce((acc, v, k) => acc + v * col[k], 0);
    document.getElementById('mm-expansion').innerHTML =
      `C[${i+1}][${j+1}] = ${terms} = <strong class="dot-result">${round2(result)}</strong>`;
  }

  function mmSetup() {
    const rA = parseInt(document.getElementById('mm-rA').value);
    const cA = parseInt(document.getElementById('mm-cA').value);
    const cB = parseInt(document.getElementById('mm-cB').value);

    const defaultA = [[1,2,0],[4,1,2],[3,0,1]].map(r => r.slice(0, cA)).slice(0, rA);
    const defaultB = [[2,1],[0,3],[1,2]].map(r => r.slice(0, cB)).slice(0, cA);

    buildInputTable('mm-input-A', rA, cA, 'A', defaultA);
    buildInputTable('mm-input-B', cA, cB, 'B', defaultB);

    document.querySelectorAll('#mm-input-A .mat-cell-input, #mm-input-B .mat-cell-input')
      .forEach(inp => inp.addEventListener('input', mmReset));

    mmReset();
  }

  function mmReset() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    document.getElementById('mm-btn-auto').textContent = '▶ Auto Play';

    const rA = parseInt(document.getElementById('mm-rA').value);
    const cA = parseInt(document.getElementById('mm-cA').value);
    const cB = parseInt(document.getElementById('mm-cB').value);
    const A = readMatrix('A', rA, cA);
    const B = readMatrix('B', cA, cB);
    const C = matMul(A, B);
    mmState = { A, B, C, step: -1, rA, cA, cB };

    buildDisplayTable('mm-display-A', rA, cA, 'A', A, false);
    buildDisplayTable('mm-display-B', cA, cB, 'B', B, false);
    buildDisplayTable('mm-display-C', rA, cB, 'C', null, true);

    document.getElementById('mm-expansion').innerHTML = 'Click <strong>Next Step →</strong> to begin';
    document.getElementById('mm-step-info').textContent = `Step 0 / ${rA * cB}`;
    document.getElementById('mm-btn-step').disabled = false;
    document.getElementById('mm-btn-auto').disabled = false;
  }

  function mmStep() {
    if (!mmState) return;
    const { A, B, C, rA, cA, cB } = mmState;
    const total = rA * cB;
    mmState.step++;

    if (mmState.step >= total) {
      // All done
      applyHighlights(rA, cA, cB, -1, -1);
      document.querySelectorAll('#mm-display-C .mat-cell').forEach(c => c.classList.add('hl-done'));
      document.getElementById('mm-expansion').innerHTML =
        `<strong style="color:var(--green)">Complete! All ${total} cells computed.</strong>`;
      document.getElementById('mm-step-info').textContent = `Done — ${total} / ${total}`;
      document.getElementById('mm-btn-step').disabled = true;
      document.getElementById('mm-btn-auto').disabled = true;
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; document.getElementById('mm-btn-auto').textContent = '▶ Auto Play'; }
      return;
    }

    const i = Math.floor(mmState.step / cB);
    const j = mmState.step % cB;

    const cCell = document.getElementById(`mc-C-${i}-${j}`);
    if (cCell) {
      cCell.textContent = round2(C[i][j]);
      cCell.classList.remove('mat-cell-empty');
    }

    applyHighlights(rA, cA, cB, i, j);
    showExpansion(A, B, i, j);
    document.getElementById('mm-step-info').textContent = `Step ${mmState.step + 1} / ${total}`;
  }

  function initMatMul() {
    document.getElementById('mm-rA').addEventListener('change', mmSetup);
    document.getElementById('mm-cA').addEventListener('change', mmSetup);
    document.getElementById('mm-cB').addEventListener('change', mmSetup);
    document.getElementById('mm-btn-reset').addEventListener('click', mmReset);
    document.getElementById('mm-btn-step').addEventListener('click', mmStep);
    document.getElementById('mm-btn-auto').addEventListener('click', () => {
      if (autoTimer) {
        clearInterval(autoTimer); autoTimer = null;
        document.getElementById('mm-btn-auto').textContent = '▶ Auto Play';
      } else {
        document.getElementById('mm-btn-auto').textContent = '⏸ Pause';
        autoTimer = setInterval(() => {
          if (!mmState || mmState.step >= mmState.rA * mmState.cB - 1) {
            mmStep(); // fire final step
            clearInterval(autoTimer); autoTimer = null;
            document.getElementById('mm-btn-auto').textContent = '▶ Auto Play';
            return;
          }
          mmStep();
        }, 700);
      }
    });
    mmSetup();
  }

  // ═══════════════════════════════════════════════════════════════
  // TRANSPOSE
  // ═══════════════════════════════════════════════════════════════
  function initTranspose() {
    function renderStaticTable(containerId, mat, label) {
      const el = document.getElementById(containerId);
      if (!el) return;
      let html = `<div class="mat-label">${label}</div><table class="mat-table mat-display-table mat-tp-table">`;
      mat.forEach((row, ri) => {
        html += '<tr>';
        row.forEach((v, ci) => {
          html += `<td class="mat-cell" data-ri="${ri}" data-ci="${ci}">${v}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      el.innerHTML = html;
    }

    function rebuildInputs() {
      const rows = parseInt(document.getElementById('tp-rows').value);
      const cols = parseInt(document.getElementById('tp-cols').value);
      const defaults = [[1,2,3],[4,5,6],[7,8,9]];
      const container = document.getElementById('tp-input-grid');
      const table = document.createElement('table');
      table.className = 'mat-table mat-input-table';
      for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
          const td = document.createElement('td');
          const inp = document.createElement('input');
          inp.type = 'number';
          inp.id = `tp_${i}_${j}`;
          inp.className = 'mat-cell-input';
          inp.value = (defaults[i] && defaults[i][j] !== undefined) ? defaults[i][j] : 0;
          inp.addEventListener('input', updateTranspose);
          td.appendChild(inp);
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      container.innerHTML = '';
      container.appendChild(table);
      updateTranspose();
    }

    function updateTranspose() {
      const rows = parseInt(document.getElementById('tp-rows').value);
      const cols = parseInt(document.getElementById('tp-cols').value);
      const mat = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const el = document.getElementById(`tp_${i}_${j}`);
          row.push(el ? (parseFloat(el.value) || 0) : 0);
        }
        mat.push(row);
      }
      const T = mat[0].map((_, j) => mat.map(r => r[j]));
      renderStaticTable('tp-display-original', mat, `A (${rows}×${cols})`);
      renderStaticTable('tp-display-transposed', T, `Aᵀ (${cols}×${rows})`);

      // Cross-highlight on hover
      document.querySelectorAll('#tp-display-original .mat-cell, #tp-display-transposed .mat-cell').forEach(cell => {
        cell.addEventListener('mouseenter', () => {
          const ri = cell.dataset.ri, ci = cell.dataset.ci;
          // In original: this is (ri, ci), in transpose it became (ci, ri)
          document.querySelectorAll('#tp-display-original .mat-cell').forEach(c =>
            c.classList.toggle('hl-tp-orig', c.dataset.ri === ri && c.dataset.ci === ci));
          document.querySelectorAll('#tp-display-transposed .mat-cell').forEach(c =>
            c.classList.toggle('hl-tp-trans', c.dataset.ri === ci && c.dataset.ci === ri));
        });
        cell.addEventListener('mouseleave', () => {
          document.querySelectorAll('.hl-tp-orig, .hl-tp-trans').forEach(c =>
            c.classList.remove('hl-tp-orig', 'hl-tp-trans'));
        });
      });
    }

    document.getElementById('tp-rows').addEventListener('change', rebuildInputs);
    document.getElementById('tp-cols').addEventListener('change', rebuildInputs);
    rebuildInputs();
  }

  // ═══════════════════════════════════════════════════════════════
  // DETERMINANT & INVERSE
  // ═══════════════════════════════════════════════════════════════
  function initDetInv() {
    function matHtml(mat) {
      let html = '<table class="mat-table mat-display-table mat-inline">';
      mat.forEach(row => {
        html += '<tr>' + row.map(v => `<td class="mat-cell">${typeof v === 'number' ? v.toFixed(3) : v}</td>`).join('') + '</tr>';
      });
      return html + '</table>';
    }

    function update() {
      const a = parseFloat(document.getElementById('di-a').value) || 0;
      const b = parseFloat(document.getElementById('di-b').value) || 0;
      const c = parseFloat(document.getElementById('di-c').value) || 0;
      const d = parseFloat(document.getElementById('di-d').value) || 0;
      const det = a * d - b * c;

      document.getElementById('di-det-steps').innerHTML =
        `det(A) = <em>ad</em> − <em>bc</em> = (${a})(${d}) − (${b})(${c})` +
        ` = ${(a*d).toFixed(2)} − ${(b*c).toFixed(2)} = <strong>${det.toFixed(4)}</strong>`;

      if (Math.abs(det) < 1e-10) {
        document.getElementById('di-inv-display').innerHTML =
          `<span style="color:var(--red)">Singular matrix — determinant = 0, no inverse exists.</span>`;
        document.getElementById('di-verify').innerHTML = '';
      } else {
        const inv = [[d/det, -b/det], [-c/det, a/det]];
        document.getElementById('di-inv-display').innerHTML =
          `<div>A⁻¹ = (1 / ${det.toFixed(4)}) × ${matHtml([[d, -b],[-c, a]])} = ${matHtml(inv)}</div>`;

        const ident = matMul([[a,b],[c,d]], inv);
        document.getElementById('di-verify').innerHTML =
          `A × A⁻¹ = ${matHtml(ident)} <span style="color:var(--green)">≈ I ✓</span>`;
      }
    }

    ['di-a','di-b','di-c','di-d'].forEach(id =>
      document.getElementById(id).addEventListener('input', update));
    update();
  }

  // ═══════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════
  function init() {
    initSubNav();
    initVectors();
    initMatMul();
    initTranspose();
    initDetInv();
  }

  return { init };
})();
