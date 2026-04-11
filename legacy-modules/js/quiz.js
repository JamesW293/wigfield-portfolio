/**
 * quiz.js
 * Knowledge check — 5 conceptual questions based on CITS5508 lecture notes
 * (Weeks 1–4: Intro to ML, ML Projects, Regression Models, Regularisation).
 */

const Quiz = (() => {

  const QUESTIONS = [
    {
      topic: 'Gradient Descent',
      text: 'What happens when the learning rate η is set too large in Gradient Descent?',
      options: [
        'The algorithm converges slowly but always reaches the minimum.',
        'The algorithm may overshoot the minimum and diverge.',
        'The algorithm ignores the gradient entirely.',
        'Training MSE becomes zero immediately.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! A learning rate that is too large causes the update step to overshoot the minimum. The cost function can bounce back and forth, growing larger each step — i.e., divergence. For the simple function J(θ) = (θ−2)², convergence is only guaranteed for η < 1.',
        incorrect: 'Incorrect. A large η causes the gradient descent update θ ← θ − η·∇J to overshoot the minimum. The step is so large that the algorithm ends up further from the optimum than it started. This is called divergence. You can observe this in the Gradient Descent module by setting η > 1.',
      }
    },
    {
      topic: 'Polynomial Regression',
      text: 'A degree-10 polynomial fitted to 15 training points achieves near-zero training MSE but performs poorly on unseen data. What problem does this describe?',
      options: [
        'Underfitting — the model is too simple.',
        'Overfitting — the model memorises noise in training data.',
        'Data leakage — test data was included in training.',
        'Feature scaling — inputs were not normalised.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! Near-zero training error combined with high validation/test error is the hallmark of overfitting (high variance). The polynomial has enough parameters to perfectly interpolate the training points — including their noise — but this learned pattern does not generalise.',
        incorrect: 'Incorrect. This is overfitting. A high-degree polynomial has enough flexibility to pass through (or near) every training point, but the curve it learns is dominated by the random noise rather than the true underlying pattern. As a result, it generalises poorly to new data. You can see this in the Polynomial Regression module at degree 8+.',
      }
    },
    {
      topic: 'Regularisation',
      text: 'Which regularisation method can reduce a model\'s coefficients to exactly zero, thereby performing automatic feature selection?',
      options: [
        'Ridge Regression (ℓ₂ penalty)',
        'Lasso Regression (ℓ₁ penalty)',
        'Batch Gradient Descent',
        'The Normal Equation',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! Lasso applies an ℓ₁ penalty (sum of |θⱼ|). Due to the geometry of the ℓ₁ constraint region (a diamond/hypercube), the optimal solution often lies at a corner where some coefficients are exactly zero. Ridge (ℓ₂) only shrinks coefficients toward zero — it never sets them exactly to zero.',
        incorrect: 'Incorrect. Lasso Regression uses an ℓ₁ (absolute value) penalty. Unlike Ridge\'s ℓ₂ (squared) penalty, the ℓ₁ constraint region has sharp corners — and the cost function\'s optimum tends to land at a corner where some coefficients equal exactly zero. This is why Lasso performs automatic feature selection.',
      }
    },
    {
      topic: 'Bias–Variance Trade-off',
      text: 'On a learning curve, both the training error and validation error plateau at a high value (they are close to each other but not close to zero). What does this diagnose?',
      options: [
        'High variance — the model is overfitting.',
        'High bias — the model is underfitting.',
        'The dataset is too large.',
        'The learning rate is too small.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! When both curves converge to a high error value, the model is underfitting (high bias). Adding more training data will not help — the model is too simple to capture the underlying pattern. The solution is to use a more complex model, add better features, or reduce regularisation.',
        incorrect: 'Incorrect. When both training and validation error plateau at a high value with a small gap between them, this is the signature of high bias (underfitting). The model\'s capacity is too low to represent the true pattern. In contrast, overfitting (high variance) would show a large gap: low training error but high validation error.',
      }
    },
    {
      topic: 'Model Selection',
      text: 'You have finished training a model and want to estimate how well it generalises. You notice you have been tuning hyperparameters against the test set. What is the problem, and what is the standard solution?',
      options: [
        'No problem — the test set is designed for hyperparameter tuning.',
        'The test set estimate is now optimistically biased; use a separate validation set (holdout) for tuning.',
        'You should re-train the model from scratch on the full dataset.',
        'Switch from batch to stochastic gradient descent.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! If you repeatedly evaluate on the test set to guide hyperparameter choices, you are effectively "fitting" those choices to the test set. Your reported test error becomes an optimistic (over-confident) estimate of true generalisation error. The fix is holdout validation: split off a validation set from training data, use it for all tuning decisions, and reserve the test set for a single final evaluation.',
        incorrect: 'Incorrect. Evaluating against the test set while tuning hyperparameters causes test-set leakage — the test set is no longer an unbiased proxy for unseen data. As per the lecture notes on "Testing and Validating": hold out a validation set from the training data for all model selection and hyperparameter tuning, and keep the test set sealed until final evaluation.',
      }
    },

    // ── Mid-semester sample question topics ──────────────────────────────

    {
      topic: 'Supervised vs Unsupervised',
      text: 'Which of the following is an example of a supervised learning task?',
      options: [
        'Grouping customers into segments based on purchase history, with no predefined categories.',
        'Predicting whether an email is spam or not-spam using a labelled dataset of past emails.',
        'Reducing a 100-dimensional dataset to 2 dimensions for visualisation.',
        'Detecting unusual server log entries without any labelled examples of attacks.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! Spam detection uses labelled training examples (spam / not-spam), so it is supervised learning. The model learns a mapping from features → label. Regression and classification are both supervised. The other options are unsupervised: clustering (A), dimensionality reduction (C), and anomaly detection without labels (D).',
        incorrect: 'Incorrect. Supervised learning requires labelled training data — each example has a known output y. Spam classification (B) fits this definition exactly. Clustering, PCA/dimensionality reduction, and label-free anomaly detection are all unsupervised because they discover structure from data without being given ground-truth labels.',
      }
    },
    {
      topic: 'Supervised vs Unsupervised',
      text: 'K-Means clustering is best described as which type of machine learning?',
      options: [
        'Supervised learning, because we tell it how many clusters K to find.',
        'Unsupervised learning, because it finds structure in data without labels.',
        'Reinforcement learning, because it iteratively improves cluster assignments.',
        'Semi-supervised learning, because it uses both labelled and unlabelled data.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! K-Means is unsupervised — the data points have no ground-truth labels. The algorithm discovers groupings on its own by minimising within-cluster distances. Specifying K is a hyperparameter choice made by the practitioner, not a form of labelling.',
        incorrect: 'Incorrect. K-Means is unsupervised. No labels are provided during training; the algorithm finds clusters purely from the geometry of the data. Specifying K tells the algorithm how many groups to find, but the assignment of points to clusters is learned without any ground-truth supervision.',
      }
    },
    {
      topic: 'Classification — Sigmoid vs Softmax',
      text: 'For a binary classification problem (N = 2), which output function f should be used in h(x) = f(wᵀx)?',
      options: [
        'Sigmoid: σ(z) = 1 / (1 + e⁻ᶻ)',
        'Softmax over 2 classes only',
        'Identity function f(z) = z',
        'ReLU: f(z) = max(0, z)',
      ],
      correct: 0,
      feedback: {
        correct: 'Correct! For binary classification, the sigmoid function maps the raw logit z = wᵀx to a probability in (0, 1). If σ(z) ≥ 0.5 we predict class 1; otherwise class 0. The decision boundary is the hyperplane wᵀx = 0 where σ = 0.5 exactly.',
        incorrect: 'Incorrect. For N = 2 (binary classification), the sigmoid σ(z) = 1/(1+e⁻ᶻ) is the standard choice. It squashes any real-valued logit to (0, 1), which we interpret as P(class = 1). The identity and ReLU do not produce valid probabilities. Softmax with 2 classes is mathematically equivalent to sigmoid, but sigmoid is the conventional, simpler form.',
      }
    },
    {
      topic: 'Classification — Sigmoid vs Softmax',
      text: 'For a 5-class classification problem (N = 5), which output function should be used?',
      options: [
        'Softmax, producing a probability distribution over all 5 classes.',
        'Sigmoid applied independently to each of the 5 output nodes.',
        'Identity function — raw logits are used directly.',
        'Absolute value, to ensure all outputs are positive.',
      ],
      correct: 0,
      feedback: {
        correct: 'Correct! Softmax produces K outputs that are all positive and sum to 1.0 — a proper probability distribution. The predicted class is argmax over those probabilities. Softmax(z)_k = e^(z_k) / Σ e^(z_j). For N > 2, it is the standard multi-class output function.',
        incorrect: 'Incorrect. For N > 2 classes, softmax is the correct choice. It takes a vector of K logits and produces a probability distribution: all outputs are positive and they sum to exactly 1.0. Applying sigmoid independently to each node (B) does not guarantee the outputs sum to 1, which would make them uninterpretable as a proper distribution.',
      }
    },
    {
      topic: 'Feature Scaling',
      text: 'Standardisation (z-score scaling) transforms feature x to have which properties?',
      options: [
        'Range [0, 1] with minimum 0 and maximum 1.',
        'All values rounded to the nearest integer.',
        'Mean = 0 and standard deviation = 1.',
        'Sum of all values equal to 1.',
      ],
      correct: 2,
      feedback: {
        correct: 'Correct! Standardisation applies z = (x − μ) / σ. Subtracting the mean centres the data at 0; dividing by the standard deviation scales it so that σ = 1. This is sometimes called z-score normalisation. It does not constrain the range to [0,1] — that is min-max normalisation.',
        incorrect: 'Incorrect. Standardisation uses the formula x\' = (x − μ) / σ, which produces a feature with mean = 0 and std = 1 (option C). Min-max normalisation (A) maps to [0, 1] using x\' = (x − min)/(max − min). Neither rounding nor sum-to-1 normalisation are standard feature scaling methods in this context.',
      }
    },
    {
      topic: 'Feature Scaling',
      text: 'You train a gradient descent model on data where Feature 1 ranges 0–1000 and Feature 2 ranges 0–1, without scaling. What is the most likely consequence?',
      options: [
        'The model will immediately overfit because the large feature dominates.',
        'Gradient descent will converge slowly due to elongated, narrow loss contours requiring a tiny learning rate.',
        'The Normal Equation will produce division-by-zero errors.',
        'The model will ignore Feature 2 entirely because it is too small.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! With vastly different feature scales, the loss surface is a highly elongated ellipse. The gradient in the steep direction (Feature 1) is huge while in the flat direction (Feature 2) it is tiny. A learning rate large enough to make progress on Feature 2 will overshoot on Feature 1, causing zigzagging. A small enough learning rate to avoid overshooting makes Feature 2 converge glacially slowly. Scaling makes contours circular, fixing both problems.',
        incorrect: 'Incorrect. The core problem is the shape of the loss surface. Different feature scales create an elongated ellipse: one direction has a huge curvature, the other very small. This forces gradient descent to use a very small learning rate to avoid overshooting the steep direction, which in turn makes progress along the flat direction extremely slow. This is why feature scaling is important for all gradient-based methods.',
      }
    },
    {
      topic: 'Early Stopping',
      text: 'In the early stopping code, partial_fit() is used instead of fit() inside the training loop. Why?',
      options: [
        'partial_fit() uses less RAM than fit() for large datasets.',
        'partial_fit() continues training the model for one epoch without resetting its weights, allowing incremental epoch-by-epoch training.',
        'fit() cannot accept preprocessed data; partial_fit() bypasses this restriction.',
        'partial_fit() automatically saves the best model checkpoint internally.',
      ],
      correct: 1,
      feedback: {
        correct: 'Correct! fit() reinitialises (resets) the model weights from scratch every time it is called. Inside an epoch loop, calling fit() each iteration would restart training repeatedly — not train for multiple epochs. partial_fit() performs one pass over the data continuing from the current weights, which is exactly what we need to accumulate epochs and monitor validation error across them.',
        incorrect: 'Incorrect. The key distinction is that fit() resets weights on every call, while partial_fit() continues from the current model state. In the early stopping loop, the goal is to train one epoch at a time and check validation error after each. Only partial_fit() allows this — calling fit() in a loop would just keep restarting training from scratch.',
      }
    },
    {
      topic: 'Early Stopping',
      text: 'In the early stopping code, what is the role of the patience variable?',
      options: [
        'It sets the maximum number of total training epochs allowed.',
        'It controls the learning rate decay schedule.',
        'It defines how many consecutive epochs without validation improvement are allowed before training is stopped.',
        'It sets the batch size used by SGD during each epoch.',
      ],
      correct: 2,
      feedback: {
        correct: 'Correct! The patience counter (curr in the code) increments each epoch the validation error does not improve. When curr reaches patience, training stops and the best saved model is restored. A larger patience value tolerates more "bad" epochs before stopping — useful when validation curves are noisy. A smaller patience stops training sooner, potentially underfitting.',
        incorrect: 'Incorrect. Patience controls when to give up waiting for improvement. The counter curr increments each time validation error fails to beat the best recorded value. Once curr >= patience, the loop breaks and the best checkpoint is used. It is not a maximum epoch limit (that would be max_iter), nor is it related to learning rate or batch size.',
      }
    },
  ];

  let score = 0;
  let answered = 0;

  function build() {
    score = 0;
    answered = 0;
    const container = document.getElementById('quizContainer');
    const scorePanel = document.getElementById('quizScorePanel');
    scorePanel.style.display = 'none';
    container.innerHTML = '';

    QUESTIONS.forEach((q, qi) => {
      const div = document.createElement('div');
      div.className = 'quiz-question';
      div.id = `qq-${qi}`;

      div.innerHTML = `
        <div class="question-meta">
          <span class="q-number">${qi + 1}</span>
          <span class="q-topic">${q.topic}</span>
        </div>
        <p class="question-text">${q.text}</p>
        <div class="options-list" id="opts-${qi}">
          ${q.options.map((opt, oi) => `
            <button class="option-btn" data-qi="${qi}" data-oi="${oi}">
              <span class="option-letter">${String.fromCharCode(65 + oi)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="fb-${qi}"></div>
      `;

      container.appendChild(div);
    });

    // Attach click handlers
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', handleAnswer);
    });
  }

  function handleAnswer(e) {
    const btn = e.currentTarget;
    const qi  = parseInt(btn.dataset.qi);
    const oi  = parseInt(btn.dataset.oi);
    const q   = QUESTIONS[qi];

    // Disable all buttons for this question
    const optsBtns = document.querySelectorAll(`#opts-${qi} .option-btn`);
    optsBtns.forEach(b => { b.disabled = true; });

    const isCorrect = oi === q.correct;

    // Style the chosen button
    btn.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Also highlight the correct answer if wrong
    if (!isCorrect) {
      optsBtns[q.correct].classList.add('correct');
    }

    // Show feedback
    const fb = document.getElementById(`fb-${qi}`);
    fb.className = `quiz-feedback show ${isCorrect ? 'correct-fb' : 'incorrect-fb'}`;
    fb.innerHTML = `<strong>${isCorrect ? '✓ Correct' : '✗ Incorrect'}</strong>${isCorrect ? q.feedback.correct : q.feedback.incorrect}`;

    if (isCorrect) score++;
    answered++;

    if (answered === QUESTIONS.length) {
      setTimeout(showScore, 600);
    }
  }

  function showScore() {
    const panel = document.getElementById('quizScorePanel');
    const title = document.getElementById('quizScoreTitle');
    const msg   = document.getElementById('quizScoreMsg');

    const pct = Math.round((score / QUESTIONS.length) * 100);
    let emoji, feedback;

    if (pct === 100) {
      emoji = '🎯'; feedback = 'Perfect! You have a strong grasp of all four concepts covered so far.';
    } else if (pct >= 80) {
      emoji = '✓'; feedback = `${score}/${QUESTIONS.length} — Great work! Review the questions you missed using the visualisers above.`;
    } else if (pct >= 60) {
      emoji = '~'; feedback = `${score}/${QUESTIONS.length} — Getting there. Spend more time with the interactive modules for the topics you missed.`;
    } else {
      emoji = '↺'; feedback = `${score}/${QUESTIONS.length} — Revisit the visualisers and lecture notes, then retry.`;
    }

    title.textContent = `${emoji}  ${pct}%`;
    msg.textContent = feedback;
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function init() {
    build();
    document.getElementById('quizRetry').addEventListener('click', build);
  }

  return { init };
})();
