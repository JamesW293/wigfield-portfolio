/**
 * ml-concepts.js
 * "Introduction to Machine Learning" textbook content — sub-tabs:
 *   1. Tom Mitchell's E/T/P Definition — interactive fill-in + examples
 *   2. Types of ML Systems — taxonomy explorer (supervised/unsupervised/semi/self/RL + batch/online + instance/model)
 *   3. ML Challenges — animated challenge cards with mitigation strategies
 */

const MLConcepts = (() => {
  'use strict';

  // ── Sub-tab wiring ─────────────────────────────────────────────────────────
  function initSubTabs() {
    const btns   = document.querySelectorAll('#module-mlconcepts .sub-btn');
    const panels = document.querySelectorAll('#module-mlconcepts .sub-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.panel).classList.add('active');
      });
    });
  }

  // ── Panel 1: Mitchell's Definition ────────────────────────────────────────

  const EXAMPLES = [
    {
      task: 'Email Spam Filter',
      T: 'Classify emails as spam or not spam',
      E: 'A corpus of labelled emails (spam / not spam)',
      P: 'Fraction of emails correctly classified',
    },
    {
      task: 'Chess-Playing Agent',
      T: 'Play chess',
      E: 'Games played against itself or other players',
      P: 'Percentage of games won',
    },
    {
      task: 'House Price Predictor',
      T: 'Predict the selling price of a house',
      E: 'Historical house sales data',
      P: 'Mean squared error between predicted and actual prices',
    },
    {
      task: 'Medical Diagnosis',
      T: 'Diagnose whether a tumour is malignant or benign',
      E: 'Labelled medical images from previous patients',
      P: 'Sensitivity and specificity on a held-out test set',
    },
  ];

  let exIdx = 0;

  function renderExample() {
    const ex = EXAMPLES[exIdx];
    document.getElementById('mlc-task-name').textContent = ex.task;
    document.getElementById('mlc-T').textContent = ex.T;
    document.getElementById('mlc-E').textContent = ex.E;
    document.getElementById('mlc-P').textContent = ex.P;
    document.getElementById('mlc-ex-counter').textContent = `${exIdx + 1} / ${EXAMPLES.length}`;
  }

  function initMitchell() {
    document.getElementById('mlc-prev').addEventListener('click', () => {
      exIdx = (exIdx - 1 + EXAMPLES.length) % EXAMPLES.length;
      renderExample();
    });
    document.getElementById('mlc-next').addEventListener('click', () => {
      exIdx = (exIdx + 1) % EXAMPLES.length;
      renderExample();
    });
    renderExample();
  }

  // ── Panel 2: Types of ML Systems ──────────────────────────────────────────

  const ML_TYPES = [
    {
      id: 'supervised',
      label: 'Supervised',
      icon: '🏷',
      color: '#60a5fa',
      desc: 'Training data includes <strong>labels</strong> (desired outputs). The model learns a mapping from inputs to outputs.',
      examples: 'Linear/Logistic Regression, Decision Trees, SVMs, Neural Networks.',
      subtypes: 'Classification (discrete labels) · Regression (continuous values)',
    },
    {
      id: 'unsupervised',
      label: 'Unsupervised',
      icon: '🔍',
      color: '#a78bfa',
      desc: 'Training data has <strong>no labels</strong>. The model finds hidden structure or patterns on its own.',
      examples: 'K-Means Clustering, PCA, Autoencoders, Association Rule Mining.',
      subtypes: 'Clustering · Dimensionality Reduction · Anomaly Detection',
    },
    {
      id: 'semisupervised',
      label: 'Semi-supervised',
      icon: '◑',
      color: '#34d399',
      desc: 'A <strong>small amount of labelled</strong> data combined with a large amount of unlabelled data. Useful when labelling is expensive.',
      examples: 'Deep Belief Networks (Google Photos face recognition).',
      subtypes: 'Combines supervised + unsupervised techniques',
    },
    {
      id: 'selfsupervised',
      label: 'Self-supervised',
      icon: '♻',
      color: '#fbbf24',
      desc: 'Labels are <strong>generated from the data itself</strong> (e.g., predict masked words). No human annotation needed.',
      examples: 'BERT, GPT language models — predict masked/next tokens.',
      subtypes: 'Contrastive learning · Masked modelling · Next-token prediction',
    },
    {
      id: 'rl',
      label: 'Reinforcement Learning',
      icon: '🎮',
      color: '#f97316',
      desc: 'An <strong>agent</strong> learns by interacting with an environment, receiving <strong>rewards</strong> or penalties for actions.',
      examples: 'AlphaGo, game-playing agents, robotics control.',
      subtypes: 'Policy · Value function · Model-based RL',
    },
  ];

  const LEARNING_MODES = [
    {
      label: 'Batch vs Online Learning',
      items: [
        {
          name: 'Batch (Offline)',
          icon: '📦',
          color: '#60a5fa',
          desc: 'The system is trained on <strong>all available data at once</strong>. Must be retrained from scratch when new data arrives. Can be resource-intensive.',
        },
        {
          name: 'Online (Incremental)',
          icon: '🌊',
          color: '#34d399',
          desc: 'The system learns <strong>continuously</strong> from a stream of data, one instance (or mini-batch) at a time. Adapts to new data quickly. Good for systems that evolve.',
        },
      ],
    },
    {
      label: 'Instance-based vs Model-based',
      items: [
        {
          name: 'Instance-based',
          icon: '📌',
          color: '#a78bfa',
          desc: 'The system <strong>memorises training examples</strong> and generalises by comparing new instances to stored ones (e.g. KNN). Simple but can be slow at prediction time.',
        },
        {
          name: 'Model-based',
          icon: '📐',
          color: '#f97316',
          desc: 'The system <strong>builds a model</strong> of the data (e.g., a line, polynomial, or neural network) and uses that model to make predictions. Faster at inference.',
        },
      ],
    },
  ];

  function initTypes() {
    // Render type cards
    const grid = document.getElementById('mlc-types-grid');
    grid.innerHTML = ML_TYPES.map(t => `
      <div class="mlc-type-card" data-id="${t.id}" style="border-color:${t.color}40">
        <div class="mlc-type-header" style="color:${t.color}">
          <span class="mlc-type-icon">${t.icon}</span>
          <span class="mlc-type-label">${t.label}</span>
        </div>
        <p class="mlc-type-desc">${t.desc}</p>
        <div class="mlc-type-meta">
          <span class="mlc-tag">Examples</span> ${t.examples}
        </div>
        <div class="mlc-type-meta">
          <span class="mlc-tag">Subtypes</span> ${t.subtypes}
        </div>
      </div>
    `).join('');

    // Render learning mode cards
    const modeSection = document.getElementById('mlc-modes-section');
    modeSection.innerHTML = ML_LEARNING_MODES_HTML();
  }

  function ML_LEARNING_MODES_HTML() {
    return LEARNING_MODES.map(group => `
      <div class="mlc-mode-group">
        <h4 class="mlc-mode-title">${group.label}</h4>
        <div class="mlc-mode-row">
          ${group.items.map(item => `
            <div class="mlc-mode-card" style="border-color:${item.color}50">
              <div class="mlc-mode-name" style="color:${item.color}">${item.icon} ${item.name}</div>
              <p>${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // ── Panel 3: ML Challenges ─────────────────────────────────────────────────

  const CHALLENGES = [
    {
      title: 'Insufficient Training Data',
      icon: '📉',
      color: '#f87171',
      problem: 'ML algorithms need <strong>many examples</strong> to work well. Even complex problems may need thousands to millions of samples.',
      mitigation: 'Collect more data, use data augmentation, transfer learning, or simpler models that require fewer examples.',
      quote: '"With enough data, even simple models outperform complex models with less data." — Banko & Brill (2001)',
    },
    {
      title: 'Non-representative Training Data',
      icon: '⚖',
      color: '#fbbf24',
      problem: 'If training data doesn\'t represent the full distribution (sampling bias), the model will <strong>generalise poorly</strong> to real-world data.',
      mitigation: 'Ensure training data is a representative sample. Be aware of selection bias and survivorship bias in data collection.',
      quote: 'Example: Training a face recogniser only on photos of adults will fail on children.',
    },
    {
      title: 'Poor Quality Data',
      icon: '🗑',
      color: '#f97316',
      problem: 'Errors, outliers, and missing values in data cause the model to learn <strong>incorrect patterns</strong> — "garbage in, garbage out".',
      mitigation: 'Data cleaning: discard or fix outliers, handle missing values (imputation), remove duplicate records.',
      quote: 'Data scientists report spending ~80% of their time on data cleaning.',
    },
    {
      title: 'Irrelevant Features',
      icon: '🎰',
      color: '#a78bfa',
      problem: 'Including <strong>noisy or irrelevant features</strong> can confuse a model. The system may learn spurious correlations.',
      mitigation: 'Feature selection (keep only useful features), feature extraction (PCA, embeddings), feature engineering (domain knowledge).',
      quote: '"Garbage in, garbage out" also applies to the features you choose.',
    },
    {
      title: 'Overfitting',
      icon: '📌',
      color: '#f472b6',
      problem: 'The model performs well on training data but <strong>fails to generalise</strong> to new data — it has memorised noise and detail.',
      mitigation: 'Regularisation (Ridge/Lasso), reduce model complexity, get more training data, use dropout, early stopping.',
      quote: 'High variance: the model is too sensitive to small fluctuations in training data.',
    },
    {
      title: 'Underfitting',
      icon: '📏',
      color: '#60a5fa',
      problem: 'The model is <strong>too simple</strong> to capture the underlying structure of the data — poor performance on training AND test sets.',
      mitigation: 'Use a more powerful model, add features, reduce regularisation, train longer.',
      quote: 'High bias: the model has too many assumptions and can\'t fit the true data pattern.',
    },
  ];

  let expandedChallenge = null;

  function renderChallenges() {
    const grid = document.getElementById('mlc-challenges-grid');
    grid.innerHTML = CHALLENGES.map((c, i) => `
      <div class="mlc-challenge-card ${expandedChallenge === i ? 'expanded' : ''}"
           data-idx="${i}" style="border-color:${c.color}50">
        <div class="mlc-challenge-header" style="color:${c.color}">
          <span class="mlc-challenge-icon">${c.icon}</span>
          <span class="mlc-challenge-title">${c.title}</span>
          <span class="mlc-challenge-toggle">${expandedChallenge === i ? '▲' : '▼'}</span>
        </div>
        ${expandedChallenge === i ? `
        <div class="mlc-challenge-body">
          <div class="mlc-challenge-section">
            <span class="mlc-tag" style="background:${c.color}22;color:${c.color}">Problem</span>
            <p>${c.problem}</p>
          </div>
          <div class="mlc-challenge-section">
            <span class="mlc-tag" style="background:#22c55e22;color:#22c55e">Mitigation</span>
            <p>${c.mitigation}</p>
          </div>
          <div class="mlc-challenge-quote">${c.quote}</div>
        </div>` : ''}
      </div>
    `).join('');

    // Re-attach click handlers
    grid.querySelectorAll('.mlc-challenge-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        expandedChallenge = expandedChallenge === idx ? null : idx;
        renderChallenges();
      });
    });
  }

  function initChallenges() {
    renderChallenges();
  }

  // ── init ──────────────────────────────────────────────────────────────────
  function init() {
    initSubTabs();
    initMitchell();
    initTypes();
    initChallenges();
  }

  return { init };
})();
