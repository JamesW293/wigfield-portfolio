# CITS5508 Machine Learning: Introduction to Machine Learning
[cite_start]**Instructor:** Marcell Szikszai [cite: 2]
[cite_start]**Year:** 2026 [cite: 3]
[cite_start]**University:** The University of Western Australia [cite: 5]

---

## 1. Overview and Reading Materials
### The Machine Learning Landscape
[cite_start]This lecture introduces the foundational concepts of Machine Learning (ML)[cite: 1, 8]. The core topics covered include:
* [cite_start]What ML is and why it is used[cite: 9, 10].
* [cite_start]Types of ML systems[cite: 11].
* [cite_start]Main challenges in ML[cite: 12].
* [cite_start]Testing and validating models[cite: 12].

### Recommended Reading
* [cite_start]**Textbook:** *Hands-on Machine Learning with Scikit-Learn, Keras & TensorFlow* (2nd Edition) by Aurélien Géron, O'Reilly Media, 2022[cite: 16, 17, 18, 19, 23, 26].
* [cite_start]**Chapter:** Chapter 1 - The Machine Learning landscape[cite: 24].
* [cite_start]**Resources:** Available online through UWA OneSearch[cite: 27]. [cite_start]Example code is hosted on GitHub[cite: 28].

---

## 2. What is Machine Learning?
[cite_start]Machine Learning algorithms are tools for the automatic acquisition of knowledge[cite: 36]. [cite_start]It is also known as inductive learning, which is a form of logical inference that obtains generic conclusions from a particular set of examples[cite: 37, 38]. 

* [cite_start]**Arthur Samuel (1959):** "Machine Learning is the field of study that gives computers the ability to learn without being explicitly programmed." [cite: 42, 43]
* [cite_start]**Tom Mitchell (1997):** "A computer program is said to learn from experience E with respect to some task T and some performance measure P, if its performance on T, as measured by P, improves with experience E." [cite: 44, 45]

### Example: Spam Filter
* [cite_start]**Experience (E):** Examples of spam emails (flagged by users) and regular/non-spam emails[cite: 49, 50, 51].
* [cite_start]**Task (T):** Decide if a new email is spam or not[cite: 52, 53].
* [cite_start]**Performance Measure (P):** How good the filter is at identifying new emails correctly[cite: 54, 55]. [cite_start]In this case, accuracy (the ratio of correctly classified emails) is a common metric[cite: 57].
* [cite_start]**Data Structure:** Each example is described by a feature vector and an associated label[cite: 62]. [cite_start]The goal is to construct a classifier that correctly assigns labels to new unlabelled examples[cite: 63].

---

## 3. Types of Machine Learning Systems
[cite_start]ML systems can be categorised based on their training supervision, ability to learn incrementally, and generalization approach[cite: 221, 222, 223].

### A. Supervised vs. Unsupervised Learning
**Supervised Learning:**
* [cite_start]The learning algorithm uses a data set with both descriptive features (attributes) and a target feature (label)[cite: 80, 81].
* **Classification:** The target variable is typically a nominal label set. [cite_start]Example: Approving or denying a credit card[cite: 91, 128].
* [cite_start]**Regression:** The target variable is a real value[cite: 91].
* [cite_start]**Common Algorithms:** Linear Regression, Logistic Regression, k-Nearest Neighbors, Support Vector Machines (SVMs), Decision Trees, and Random Forests[cite: 152, 153, 154, 155, 156].

**Unsupervised Learning:**
* [cite_start]The training data is unlabelled[cite: 159].
* [cite_start]**Clustering:** e.g., k-means, DBSCAN, Hierarchical Cluster Analysis (HCA)[cite: 166, 187, 188].
* [cite_start]**Visualization & Dimensionality Reduction:** e.g., PCA, LLE, t-SNE[cite: 189, 190, 191, 192].
* [cite_start]**Association Rule Learning:** e.g., Apriori, Eclat[cite: 193, 194, 195].
* [cite_start]**Anomaly Detection:** Learning what "normal" data looks like to detect abnormal instances[cite: 176, 177].

### B. Instance-based vs. Model-based Learning
* [cite_start]**Instance-based learning:** The system "memorises" the training examples and generalizes to new cases by using a similarity measure[cite: 211].
* [cite_start]**Model-based learning:** The system builds a mathematical model from the training examples and uses it to make predictions on new data[cite: 218].

---

## 4. Formal Definitions and Mathematical Notations
In supervised learning, the data and models are formally defined as follows:

* [cite_start]**Data Set ($D$):** Composed of $n$ examples and $m$ attributes[cite: 94, 95].
* [cite_start]**Example:** Denoted as an $m$-dimensional tuple $D_{i} = (x_{i1}, x_{i2}, ..., x_{im}, y_{i}) = (\vec{x_{i}}, y_{i})$[cite: 101].
* [cite_start]**Target Function ($f$):** The ideal unknown function $f: \mathcal{X} \rightarrow \mathcal{Y}$, where $\mathcal{X}$ is the input space and $\mathcal{Y}$ is the output space[cite: 112].
* [cite_start]**Learning Model ($g$):** The algorithm searches a hypothesis space $\mathcal{H}$ to find a function $g: \mathcal{X} \rightarrow \mathcal{Y}$ that approximates $f$[cite: 114, 115].

### Simple Classification Model (Linear Model)
[cite_start]Consider $\mathcal{X} = \mathbb{R}^{m}$ (m-dimensional Euclidean space) and $\mathcal{Y} = \{-1, +1\}$ (binary classification)[cite: 125, 126]. [cite_start]The model applies weights $(w_{1}, w_{2}, ..., w_{m})$ to the coordinates of $\vec{x}$[cite: 132].

The model makes decisions based on a threshold:
[cite_start]$$\sum_{i=1}^{m}w_{i}x_{i} > -b$$ [cite: 147]

This hypothesis $h(\vec{x})$ can be rewritten using the sign function:
[cite_start]$$h(\vec{x}) = \text{sgn}\left(\left(\sum_{i=1}^{m}w_{i}x_{i}\right) + b\right)$$ [cite: 138]

Where the sign function is defined as:
[cite_start]$$\text{sgn}~x := \begin{cases}-1 & \text{if}~x<0,\\ +1 & \text{if}~x>0.\end{cases}$$ [cite: 141]

---

## 5. Main Challenges of Machine Learning
[cite_start]The success of an ML system is heavily dependent on data quality and model complexity[cite: 264, 265]. Primary challenges include:
* [cite_start]Insufficient quantity of training data[cite: 228].
* [cite_start]Non-representative or poor-quality data[cite: 229].
* [cite_start]Irrelevant features[cite: 230].
* [cite_start]**Overfitting or underfitting:** A model must be neither too simple (underfitting, e.g., Degree 1 polynomial) nor too complex (overfitting, e.g., Degree 15 polynomial) to generalize well[cite: 231, 234, 242, 265].

---

## 6. Testing and Validation
To evaluate performance and ensure the model generalizes to new data:
* [cite_start]**Train/Test Split:** Data is typically split into a training set (e.g., 80%) and a test set (e.g., 20%)[cite: 252, 254].
* [cite_start]**Generalisation Error:** The error rate measured on the test set is called the generalisation error (or out-of-sample error)[cite: 255].
* [cite_start]**Validation Set:** Because using the test set to pick hyperparameter values can cause the model to overfit the test data, a separate validation set is required[cite: 256].