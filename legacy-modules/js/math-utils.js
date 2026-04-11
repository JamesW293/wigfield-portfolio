/**
 * math-utils.js
 * Matrix operations and polynomial fitting utilities for CITS5508 study app.
 * Uses the Normal Equation: θ = (XᵀX)⁻¹Xᵀy  (solved via Gaussian elimination)
 */

const MathUtils = (() => {

  /** Solve Ax = b via Gaussian elimination with partial pivoting. */
  function solveLinear(A, b) {
    const n = A.length;
    // Build augmented matrix [A | b], working on copies
    const aug = A.map((row, i) => [...row, b[i]]);

    for (let col = 0; col < n; col++) {
      // Partial pivot: find row with largest absolute value in this column
      let maxRow = col;
      for (let row = col + 1; row < n; row++) {
        if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
      }
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];

      const pivot = aug[col][col];
      if (Math.abs(pivot) < 1e-12) continue; // singular / near-singular column

      // Eliminate below
      for (let row = col + 1; row < n; row++) {
        const factor = aug[row][col] / pivot;
        for (let k = col; k <= n; k++) aug[row][k] -= factor * aug[col][k];
      }
    }

    // Back-substitution
    const x = new Array(n).fill(0);
    for (let row = n - 1; row >= 0; row--) {
      x[row] = aug[row][n];
      for (let col = row + 1; col < n; col++) x[row] -= aug[row][col] * x[col];
      x[row] /= aug[row][row];
    }
    return x;
  }

  /**
   * Fit a polynomial of given degree to (xData, yData) using the Normal Equation.
   * Returns the coefficient vector [θ₀, θ₁, ..., θ_d] where
   *   ŷ = θ₀ + θ₁x + θ₂x² + … + θ_d xᵈ
   */
  function fitPolynomial(xData, yData, degree) {
    const m = xData.length;
    const n = degree + 1;

    // Vandermonde design matrix X  (m × n)
    const X = xData.map(x => Array.from({ length: n }, (_, j) => Math.pow(x, j)));

    // XᵀX  (n × n)
    const XtX = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) =>
        X.reduce((s, row) => s + row[i] * row[j], 0)
      )
    );

    // Xᵀy  (n × 1)
    const Xty = Array.from({ length: n }, (_, i) =>
      X.reduce((s, row, k) => s + row[i] * yData[k], 0)
    );

    return solveLinear(XtX, Xty);
  }

  /** Evaluate polynomial with coefficient vector θ at x. */
  function evalPolynomial(theta, x) {
    return theta.reduce((sum, c, j) => sum + c * Math.pow(x, j), 0);
  }

  /** Mean Squared Error between predictions and targets. */
  function mse(pred, actual) {
    const m = pred.length;
    return pred.reduce((s, p, i) => s + (p - actual[i]) ** 2, 0) / m;
  }

  /** Seeded pseudo-random number generator (mulberry32). */
  function makePRNG(seed) {
    let s = seed;
    return function () {
      s |= 0; s = s + 0x6d2b79f5 | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Box-Muller transform: N(0, sigma²) using a provided rand() function. */
  function gaussianNoise(rand, sigma = 1) {
    const u = 1 - rand();
    const v = rand();
    return sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /**
   * Generate noisy sinusoidal data for the polynomial regression module.
   * Returns { xTrain, yTrain, xTrue, yTrue }
   */
  function generateSinData(n = 30, seed = 42, noise = 0.35) {
    const rand = makePRNG(seed);
    const xTrain = Array.from({ length: n }, () => rand() * (2 * Math.PI) - Math.PI);
    xTrain.sort((a, b) => a - b);
    const yTrain = xTrain.map(x => Math.sin(x) + gaussianNoise(rand, noise));

    // Dense true curve
    const xTrue = Array.from({ length: 200 }, (_, i) => -Math.PI + (2 * Math.PI * i) / 199);
    const yTrue = xTrue.map(x => Math.sin(x));

    return { xTrain, yTrain, xTrue, yTrue };
  }

  /**
   * Generate data for the learning curves module.
   * Returns { xTrain, yTrain, xVal, yVal }
   */
  function generateLCData(nTrain = 60, nVal = 40, seed = 7, noise = 0.45) {
    const rand = makePRNG(seed);
    const all = Array.from({ length: nTrain + nVal }, () => rand() * 6 - 3);
    const makeY = x => 0.5 * x * x - x + gaussianNoise(rand, noise);

    const xTrain = all.slice(0, nTrain).sort((a, b) => a - b);
    const yTrain = xTrain.map(makeY);
    const xVal   = all.slice(nTrain).sort((a, b) => a - b);
    const yVal   = xVal.map(makeY);
    return { xTrain, yTrain, xVal, yVal };
  }

  return { fitPolynomial, evalPolynomial, mse, makePRNG, gaussianNoise, generateSinData, generateLCData };
})();
