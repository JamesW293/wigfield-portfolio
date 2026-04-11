/**
 * main.js
 * Entry point — tab switching, module lazy-initialisation, KaTeX rendering.
 */

(function () {
  'use strict';

  // ── Tab switching ──────────────────────────────────────────────────────
  const tabs    = document.querySelectorAll('.tab-btn');
  const modules = document.querySelectorAll('.module');

  // Track which modules have been initialised (lazy-init on first visit)
  const initialised = {
    gd:             false,
    polyreg:        false,
    regularization: false,
    learningcurves: false,
    classification: false,
    featurescaling: false,
    earlystopping:  false,
    linalg:         false,
    calculus:       false,
    functions:      false,
    ridgelasso:     false,
    knn:            false,
    mlconcepts:     false,
    quiz:           false,
  };

  function activateTab(target) {
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.target === target);
      t.setAttribute('aria-selected', t.dataset.target === target);
    });
    modules.forEach(m => {
      m.classList.toggle('active', m.id === `module-${target}`);
    });

    // Lazy-initialise each module the first time it's visited
    if (!initialised[target]) {
      switch (target) {
        case 'gd':             GradientDescent.init();     break;
        case 'polyreg':        PolyRegression.init();      break;
        case 'regularization': Regularization.init();      break;
        case 'learningcurves': LearningCurves.init();      break;
        case 'classification': Classification.init();      break;
        case 'featurescaling': FeatureScaling.init();      break;
        case 'earlystopping':  EarlyStopping.init();       break;
        case 'linalg':         LinearAlgebra.init();       break;
        case 'calculus':       Calculus.init();            break;
        case 'functions':      FunctionsExplorer.init();   break;
        case 'ridgelasso':     RidgeLasso.init();          break;
        case 'knn':            KNN.init();                 break;
        case 'mlconcepts':     MLConcepts.init();          break;
        case 'quiz':           Quiz.init();                break;
      }
      initialised[target] = true;

      // After injecting new DOM (quiz), re-render any KaTeX in the new content
      if (window.renderMathInElement) {
        renderMathInElement(document.getElementById(`module-${target}`), {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\(', right: '\\)', display: false },
          ],
          throwOnError: false,
        });
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.target));
  });

  // ── Boot the first tab (Gradient Descent) ─────────────────────────────
  // Give KaTeX auto-render a tick to finish before Chart.js canvas sizing
  window.addEventListener('load', () => {
    activateTab('gd');
  });

})();
