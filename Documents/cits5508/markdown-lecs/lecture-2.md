# [cite_start]CITS5508 Machine Learning: Overview of a Machine Learning Project [cite: 267]
[cite_start]**Instructor:** Marcell Szikszai [cite: 268]
[cite_start]**Year:** 2026 [cite: 269]
[cite_start]**University:** The University of Western Australia [cite: 271]

---

## 1. Overview and Reading Materials
[cite_start]This lecture covers the continuation of the simple learning model, an overview of an end-to-end machine learning project, performance measures, and multiclass classification[cite: 293]. 

### Recommended Reading
* [cite_start]**Textbook:** *Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow* (2nd Edition) by Aurélien Géron, O'Reilly Media, 2022[cite: 273, 277, 278, 282, 287, 288].
* [cite_start]**Chapters:** Chapter 2 (End-to-End Machine Learning Project) and Chapter 3 (Classification)[cite: 283, 284].
* [cite_start]**Resources:** Available online through UWA OneSearch[cite: 289]. [cite_start]Example code and exercise solutions are available on the book's GitHub repository[cite: 290].

---

## 2. Recap: Supervised Learning and Simple Models
[cite_start]Machine learning algorithms automate constructing a model that identifies relationships between input features and target variables[cite: 298].
* [cite_start]A target function exists: $f:\mathcal{X}\rightarrow\mathcal{Y}$, meaning $y=f(x)$[cite: 300].
* [cite_start]The model selects a hypothesis $g\approx f$ from the hypothesis space using labelled input-examples $(x_{1},y_{1}),...,(x_{n},y_{n})$[cite: 301, 302].

### The Simple Learning Model and Bias Trick
[cite_start]The simple model combines a weighted sum of features into a score and compares it to a threshold[cite: 305].
[cite_start]$$h(x)=\text{sgn}\left(\left(\sum_{i=1}^{m}w_{i}x_{i}\right)+b\right)$$ [cite: 306]

[cite_start]By treating the bias $b$ as an initial weight $w_{0}$ and introducing a dummy feature $x_{0}=1$, the model can be simplified[cite: 309, 310, 311]. This allows the model to be rewritten as a vector dot product:
[cite_start]$$\text{sgn}\left(\sum_{i=0}^{m}w_{i}x_{i}\right) = \text{sgn}\left(\begin{pmatrix}w_{0}\\ w_{1}\\ \vdots\\ w_{m}\end{matrix}^{T}\begin{pmatrix}1\\ x_{1}\\ \vdots\\ x_{m}\end{matrix}\right)$$ [cite: 313]
[cite_start]$$h(x)=\text{sgn}(w^{T}x)$$ [cite: 319]

### NumPy Vectorisation and Training
* [cite_start]Using NumPy vectorisation (e.g., `np.sign(X @ w)`) eliminates the need for slow `for` loops, drastically reducing execution time[cite: 322, 335, 336, 337].
* [cite_start]The algorithm updates weights when it encounters incorrect classifications[cite: 340, 341]. 
* [cite_start]The update rule is $w\leftarrow w+y_{i}x_{i}$ if $y_{i}\ne h(x_{i})$, otherwise the weight remains $w$[cite: 343, 344].

---

## 3. End-to-End Machine Learning Project Steps
[cite_start]A complete machine learning project involves a systematic workflow[cite: 373, 374]:
1. [cite_start]Understand the problem and check assumptions (includes business and data understanding)[cite: 375, 395].
2. [cite_start]Visualise and explore the data to support problem understanding[cite: 376].
3. [cite_start]Prepare the data for a Machine Learning algorithm[cite: 377].
4. [cite_start]Select a model, train, validate, and fine-tune it[cite: 378].
5. [cite_start]Present the solution[cite: 379].
6. [cite_start]Launch, monitor, and continuously check assumptions[cite: 380].

---

## 4. Performance Measures for Regression
[cite_start]When working with real data like the California housing dataset, selecting an appropriate performance measure is critical[cite: 398, 419]. [cite_start]Common options include[cite: 420]:

* [cite_start]**Mean Squared Error (MSE):** $MSE(X,h)=\frac{1}{m}\sum_{i=1}^{m}(h(x^{(i)})-y^{(i)})^{2}$ [cite: 421]
* [cite_start]**Mean Absolute Error (MAE):** $MAE(X,h)=\frac{1}{m}\sum_{i=1}^{m}|h(x^{(i)})-y^{(i)}|$ [cite: 421]

[cite_start]*(Note: $X$ is the matrix of feature values, $y^{(i)}$ is the label of the i-th instance, and $h$ is the prediction function[cite: 422].)*

---

## 5. Classification Performance Evaluation
[cite_start]To explore classification, the Modified National Institute of Standards and Technology (MNIST) dataset is used, comprising 70,000 images of handwritten digits where each image has **784** features ($28\times28$)[cite: 520, 521]. 

[cite_start]A toy binary classification problem evaluates whether an image is a "5" or "not-5"[cite: 529, 531]. [cite_start]Before training, data is split into a training and test set (e.g., via `train_test_split`) with a `random_state` seed to avoid data snooping bias and ensure reproducibility[cite: 540, 541, 545].

### Why Accuracy is Often Insufficient
[cite_start]Accuracy is the ratio of correct predictions to total predictions[cite: 559, 560]. [cite_start]However, in imbalanced datasets, accuracy is misleading[cite: 567]. [cite_start]For instance, a custom classifier that strictly predicts "not-5" will still achieve over **90%** accuracy simply because most digits are not 5s[cite: 568, 580].

### The Confusion Matrix, Precision, and Recall
[cite_start]A better evaluation method is the confusion matrix, which counts how often instances of class A are classified as class B[cite: 583, 584].

* [cite_start]**Precision (Positive Predictive Value):** The proportion of positive predictions that are actually correct[cite: 603, 606].
  [cite_start]$$precision=\frac{True~Positives}{True~Positives+False~Positives}$$ [cite: 604]
* [cite_start]**Recall (True Positive Rate or Sensitivity):** The proportion of actual positives that are correctly predicted[cite: 609, 612].
  [cite_start]$$recall=\frac{True~Positives}{True~Positives+False~Negatives}$$ [cite: 610]
* [cite_start]**$F_{1}$ Score:** The harmonic mean of precision and recall, providing a single metric that balances both[cite: 683, 684].
  [cite_start]$$F_{1}=\frac{2}{\frac{1}{precision}+\frac{1}{recall}}$$ [cite: 685]

### Precision/Recall Trade-off
[cite_start]Different applications require prioritizing either precision or recall[cite: 636]. 
* [cite_start]Precision is prioritised when false positives are highly costly (e.g., predicting it is safe to change lanes while driving)[cite: 645, 646].
* Recall is prioritised when false negatives are highly costly (e.g., diagnosing cancer)[cite: 647, 648].

### Receiver Operating Characteristic (ROC) Curve
The ROC curve plots the True Positive Rate (recall) against the False Positive Rate (FPR) across different thresholds[cite: 691, 692]. 
* [cite_start]**FPR:** The proportion of negative instances incorrectly classified as positive ($1 - specificity$)[cite: 698].
* [cite_start]A high-performing classifier will have a large Area Under the Curve (AUC)[cite: 721].

---

## 6. Sampling Bias and Multiclass Classification
* **Sampling Bias:** A model's predictions can fail drastically if the training data is unrepresentative. A historical example is the 1936 US presidential election, where a poll predicted Landon would win due to sampling wealthier individuals, but Roosevelt won with **62%** of the vote[cite: 740, 741, 742, 744, 746].
* [cite_start]**Multiclass Classification:** Designed to discriminate between multiple classes ($N>2$)[cite: 749, 750]. [cite_start]Algorithms like Softmax Regression, Random Forests, and Naive Bayes handle multiple classes directly, whereas Support Vector Machines are strictly binary and require specific techniques to scale[cite: 751, 752, 753].